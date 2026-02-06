// Dream interpretation engine
// Builds prompts and calls the interpretation API

import { getCombinedExamples, getLensConfig } from './fewShotExamples'
import type { LensType } from './fewShotExamples'

export interface BeliefProfile {
  primary: LensType
  secondary: LensType
  scores: Record<LensType, number>
}

export interface DreamMetadata {
  mood?: string
  isRecurring?: boolean
  isLucid?: boolean
}

export interface InterpretationSection {
  title: string
  content: string
}

export interface InterpretationResult {
  lens: string
  lensType: LensType
  icon: 'brain' | 'sparkles' | 'heart' | 'compass' | 'globe'
  color: string
  glowClass: string
  sections: InterpretationSection[]
}

export interface InterpretationResponse {
  success: boolean
  interpretations: InterpretationResult[]
  error?: string
}

// Map lens to display configuration
const lensDisplayConfig: Record<LensType, { icon: InterpretationResult['icon']; color: string; glowClass: string }> = {
  jungian: { icon: 'sparkles', color: 'accent-primary', glowClass: 'glow-violet' },
  spiritual: { icon: 'compass', color: 'accent-warm', glowClass: 'glow-amber' },
  neuroscience: { icon: 'brain', color: 'accent-secondary', glowClass: 'glow-teal' },
  narrative: { icon: 'heart', color: 'accent-primary', glowClass: 'glow-violet' },
  cultural: { icon: 'globe', color: 'accent-secondary', glowClass: 'glow-teal' }
}

// Build the system prompt for a specific lens
function buildSystemPrompt(lens: LensType): string {
  const config = getLensConfig(lens)
  if (!config) {
    throw new Error(`Unknown lens type: ${lens}`)
  }

  return `You are a dream interpreter using the ${config.name} framework.

Your interpretations are ${config.tone}. You never give binary good/bad readings. You always offer nuanced, thoughtful perspectives that honor the dreamer's experience.

Key question you explore: "${config.keyQuestion}"

IMPORTANT FORMATTING RULES:
- Write in second person ("you", "your")
- Be specific to the dream content provided
- Never use bullet points or lists
- Write in flowing, connected paragraphs
- Aim for 100-150 words per section
- Do NOT include section headers in your response - just write the content for each section

Your response must have exactly 3 sections, separated by "---":

Section 1: What this might be processing...
(Explain what emotional or psychological content the dream may be working through)

---

Section 2: What this could be inviting you to explore...
(Suggest growth opportunities or questions for self-reflection)

---

Section 3: What this connects to in your waking life...
(Help the dreamer see practical connections to their current life situation)`
}

// Build few-shot examples for the prompt
function buildFewShotExamples(primary: LensType, secondary: LensType): string {
  const examples = getCombinedExamples(primary, secondary)

  let examplesText = 'Here are examples of interpretations in this style:\n\n'

  examples.forEach((example, index) => {
    examplesText += `EXAMPLE ${index + 1}:\n`
    examplesText += `Dream: "${example.dream}"\n\n`
    examplesText += `${example.interpretation.processing}\n\n---\n\n`
    examplesText += `${example.interpretation.exploring}\n\n---\n\n`
    examplesText += `${example.interpretation.connecting}\n\n`
    if (index < examples.length - 1) {
      examplesText += '---\n\n'
    }
  })

  return examplesText
}

// Build the user message with dream content
function buildUserMessage(dreamText: string, metadata?: DreamMetadata): string {
  let message = `I dreamed that: ${dreamText}`

  if (metadata) {
    const contextParts: string[] = []
    if (metadata.mood) {
      contextParts.push(`The overall mood of the dream was ${metadata.mood}`)
    }
    if (metadata.isRecurring) {
      contextParts.push('This is a recurring dream for me')
    }
    if (metadata.isLucid) {
      contextParts.push('I was aware I was dreaming during parts of this dream')
    }

    if (contextParts.length > 0) {
      message += '\n\nAdditional context: ' + contextParts.join('. ') + '.'
    }
  }

  return message
}

// Parse the AI response into sections
function parseInterpretation(response: string): InterpretationSection[] {
  const parts = response.split('---').map(part => part.trim()).filter(Boolean)

  const sectionTitles = [
    'What this might be processing',
    'What this could be inviting you to explore',
    'What this connects to in your waking life'
  ]

  return parts.slice(0, 3).map((content, index) => ({
    title: sectionTitles[index] || `Section ${index + 1}`,
    content: content.trim()
  }))
}

// Get the lenses to interpret with based on belief profile
function getLensesToInterpret(profile: BeliefProfile): LensType[] {
  // Always include primary and secondary
  const lenses = [profile.primary, profile.secondary]

  // Add a third lens (the highest scoring one that's not primary or secondary)
  const sortedLenses = Object.entries(profile.scores)
    .sort(([, a], [, b]) => b - a)
    .map(([lens]) => lens as LensType)

  for (const lens of sortedLenses) {
    if (!lenses.includes(lens)) {
      lenses.push(lens)
      break
    }
  }

  // Fallback: if we somehow don't have 3, add neuroscience as default
  while (lenses.length < 3) {
    const fallbacks: LensType[] = ['neuroscience', 'narrative', 'cultural']
    for (const fallback of fallbacks) {
      if (!lenses.includes(fallback)) {
        lenses.push(fallback)
        break
      }
    }
  }

  return lenses.slice(0, 3)
}

// Main interpretation function
export async function interpretDream(
  dreamText: string,
  beliefProfile: BeliefProfile,
  metadata?: DreamMetadata
): Promise<InterpretationResponse> {
  const lenses = getLensesToInterpret(beliefProfile)
  const interpretations: InterpretationResult[] = []

  // Interpret through each lens
  for (const lens of lenses) {
    try {
      const config = getLensConfig(lens)
      if (!config) continue

      const systemPrompt = buildSystemPrompt(lens)
      const fewShotExamples = buildFewShotExamples(beliefProfile.primary, beliefProfile.secondary)
      const userMessage = buildUserMessage(dreamText, metadata)

      // Call our serverless API endpoint
      const response = await fetch('/api/interpret', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          systemPrompt,
          fewShotExamples,
          userMessage,
          lens
        })
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `API request failed: ${response.status}`)
      }

      const data = await response.json()
      const sections = parseInterpretation(data.interpretation)

      const displayConfig = lensDisplayConfig[lens]

      interpretations.push({
        lens: config.name,
        lensType: lens,
        icon: displayConfig.icon,
        color: displayConfig.color,
        glowClass: displayConfig.glowClass,
        sections
      })
    } catch (error) {
      console.error(`Error interpreting with ${lens} lens:`, error)
      // Continue with other lenses even if one fails
    }
  }

  if (interpretations.length === 0) {
    return {
      success: false,
      interpretations: [],
      error: 'Failed to generate interpretations. Please try again.'
    }
  }

  return {
    success: true,
    interpretations
  }
}

// Export for use in components
export type { LensType }
