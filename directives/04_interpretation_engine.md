# Directive 04: Interpretation Engine (Few-Shot Claude API)

## Goal
Build the core AI interpretation engine that generates 3 meaning perspectives based on the user's belief system profile using few-shot prompting with curated example libraries.

## Inputs
- dream_text: string (user's dream description)
- belief_profile: { primary: string, secondary: string, scores: object }
- few-shot examples from /few-shot-library/{lens}_examples.md
- Optional: mood, recurring, lucid metadata

## Process
1. Create Supabase Edge Function: interpret-dream
2. Load few-shot examples for the user's primary and secondary lenses
3. Construct system prompt with lens-specific voice and approach
4. Include 3 few-shot examples from primary lens, 2 from secondary
5. Send dream_text as user message
6. Parse structured response into 3 interpretation cards
7. Return JSON response to frontend
8. Store interpretation in Supabase

## System Prompt Template
```
You are DreamLens, a thoughtful dream interpreter who offers meaning
through multiple perspectives. You NEVER give binary good/bad readings.
You NEVER claim certainty about what a dream "means." You offer
possibilities that invite reflection.

For this interpretation, use primarily the {primary_lens} framework
with elements of {secondary_lens}.

{PRIMARY_LENS_DESCRIPTION}

{SECONDARY_LENS_DESCRIPTION}

Your output must contain exactly 3 sections:
1. "What this might be processing..." — the emotional or cognitive dimension
2. "What this could be inviting you to explore..." — the growth dimension
3. "What this connects to in your waking life..." — the practical dimension

Each section: 3-5 sentences. Warm but intelligent tone. Reference specific
elements from the dream. Make the person feel seen, not diagnosed.

{MOOD_CONTEXT if provided}
{RECURRING_CONTEXT if provided}
{LUCID_CONTEXT if provided}
```

## Lens Descriptions (for system prompt injection)

### Jungian/Archetypal
```
You interpret through Carl Jung's framework of archetypes, shadow work,
and the collective unconscious. Dreams are messages from the deeper Self,
revealing aspects of personality seeking integration. You look for:
shadow figures, anima/animus projections, the Hero's journey,
transformation symbols, and individuation themes. Your tone is deep,
exploratory, and empowering.
```

### Spiritual/Mystical
```
You interpret through a spiritual lens that honors the mystery of
consciousness. Dreams may carry messages, synchronicities, or guidance
from dimensions beyond ordinary awareness. You look for: recurring
symbols as signs, emotional resonance as truth indicators, connections
to life transitions, and invitations to trust intuition. Your tone is
reverent, open, and wonder-filled.
```

### Neuroscience/Processing
```
You interpret through modern neuroscience's understanding of sleep and
dreaming. Dreams serve functions like memory consolidation, emotional
regulation, threat simulation, and creative problem-solving. You look
for: connections to recent events, emotional processing patterns,
rehearsal of challenges, and integration of new learning. Your tone is
grounded, educational, and reassuring.
```

### Narrative/Personal
```
You interpret dreams as stories your subconscious is telling about your
life. Like a skilled author, your dreaming mind uses metaphor, symbolism,
and narrative structure to explore themes you're living through. You look
for: plot parallels to waking life, character stand-ins for real people
or aspects of self, setting as emotional landscape, and resolution
patterns. Your tone is warm, reflective, like a good therapist.
```

### Cultural/Symbolic
```
You interpret through cross-cultural symbolism and shared human meaning
patterns. Across civilizations, certain dream elements carry remarkably
consistent significance. You look for: water as emotion/unconscious,
flight as freedom/transcendence, teeth as anxiety/transition, houses as
self/psyche, and animals as instincts/guides. Your tone is expansive,
connecting, and anthropological.
```

## API Call Structure
```javascript
const response = await fetch('https://api.anthropic.com/v1/messages', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': ANTHROPIC_API_KEY,
    'anthropic-version': '2023-06-01'
  },
  body: JSON.stringify({
    model: 'claude-sonnet-4-5-20250929',
    max_tokens: 1500,
    system: systemPrompt, // includes lens description + few-shot examples
    messages: [
      // Few-shot examples as user/assistant pairs
      { role: 'user', content: fewShotDream1 },
      { role: 'assistant', content: fewShotInterpretation1 },
      { role: 'user', content: fewShotDream2 },
      { role: 'assistant', content: fewShotInterpretation2 },
      { role: 'user', content: fewShotDream3 },
      { role: 'assistant', content: fewShotInterpretation3 },
      // Actual user dream
      { role: 'user', content: `I dreamed that: ${dreamText}` }
    ]
  })
});
```

## Response Parsing
Expected output structure from Claude:
```json
{
  "processing": "What this might be processing: ...",
  "exploring": "What this could be inviting you to explore: ...",
  "connecting": "What this connects to in your waking life: ..."
}
```

If Claude returns prose instead of JSON, parse by looking for the three section headers and extracting content between them.

## Edge Cases
- API rate limit: queue and retry with exponential backoff
- Malformed response: attempt regex extraction of 3 sections, fallback to single-paragraph interpretation
- Dream too vague (<20 words): prepend instruction "The dreamer provided a brief description. Offer what you can while gently noting that more detail enables richer interpretation."
- Inappropriate content in dream: Claude's built-in safety handles this; the system prompt should note "Interpret all dream content as symbolic rather than literal"
- API key missing: return clear error directing to setup

## Cost Estimate
- Sonnet 4.5: ~$3/1M input, ~$15/1M output tokens
- Average interpretation: ~2000 input tokens (system + few-shot + dream), ~800 output tokens
- Cost per interpretation: ~$0.018
- 1000 interpretations: ~$18
- Well within MVP budget
