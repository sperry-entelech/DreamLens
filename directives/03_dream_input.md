# Directive 03: Dream Input Interface

## Goal
Build a beautiful, calming dream entry page where users describe their dream in natural language.

## Inputs
- User's belief_profile from quiz (stored in state)
- Text input: 50-500 words of dream description

## Process
1. Create DreamInputPage component
2. Build textarea with character/word count
3. Add gentle prompt suggestions if field is empty
4. Include optional metadata: mood on waking, recurring (y/n), lucid (y/n)
5. Submit button sends dream_text + belief_profile to interpretation engine
6. Show loading state with dreamy animation during API call
7. Navigate to /results when interpretation returns

## UI Specifications
- Large textarea, dark background, subtle border glow on focus
- Placeholder text: "Last night I dreamed that..."
- Word count indicator (gentle, not restrictive)
- Optional toggles below textarea:
  - "How did you feel when you woke up?" (dropdown: peaceful, anxious, confused, inspired, neutral)
  - "Have you had this dream before?" (toggle)
  - "Were you aware you were dreaming?" (toggle)
- Submit button: "Explore My Dream →"

## Prompt Suggestions (shown if textarea empty for 5+ seconds)
Rotate through these gently:
- "Describe the scene — where were you?"
- "Who else was there? Anyone familiar?"
- "What were you doing or trying to do?"
- "What was the strongest feeling?"
- "Include any details that stood out, even small ones"

## Validation
- Minimum 20 words (gentle nudge, not hard block)
- Maximum 2000 characters
- No empty submissions
- Sanitize input before API call

## Loading State
While waiting for interpretation:
- Gentle pulsing animation (constellation or nebula)
- Rotating messages:
  - "Exploring the layers of your dream..."
  - "Finding meaning through your lens..."
  - "Weaving together three perspectives..."
- Estimated wait: 3-8 seconds

## Edge Cases
- API timeout: show retry button with "Dreams are complex — let's try again"
- API error: store dream locally, offer to try again later
- Very short input (<20 words): suggest adding more detail but allow submission
- Very long input (>2000 chars): gentle truncation warning
