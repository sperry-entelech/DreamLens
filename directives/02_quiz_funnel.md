# Directive 02: Belief System Quiz Funnel

## Goal
Build a 6-question quiz that determines the user's primary and secondary interpretation lens without being obvious about the categorization.

## Inputs
- 5 belief system lenses (Jungian, Spiritual, Neuroscience, Narrative, Cultural)
- Design: One question per screen, smooth transitions, progress indicator
- Mobile-first layout

## Process
1. Create QuizPage component with state management for answers
2. Build 6 quiz questions (each maps to lens scoring)
3. Implement scoring algorithm that weights answers across all 5 lenses
4. Display results as "Your Interpretation Profile" (primary + secondary lens)
5. Store belief_profile in local state (and Supabase if authenticated)
6. Navigate to /dream after profile is set

## Quiz Questions

### Q1: When something unexpected happens in your life, your first instinct is to...
- A: Look for what it reveals about your deeper self (Jungian +2)
- B: Consider if there's a message or sign in it (Spiritual +2)
- C: Think about what psychological process might explain it (Neuroscience +2)
- D: See it as a chapter in your ongoing story (Narrative +2)

### Q2: If a friend described a vivid dream to you, you'd most want to ask...
- A: "What feelings came up? What felt familiar?" (Jungian +2)
- B: "Do you think it was trying to tell you something?" (Spiritual +2)
- C: "What happened yesterday that might have triggered it?" (Neuroscience +2)
- D: "What's going on in your life right now?" (Narrative +2)

### Q3: The idea that resonates most with you is...
- A: We all share deep universal patterns of experience (Cultural +2, Jungian +1)
- B: There's more to reality than what we can see and measure (Spiritual +2)
- C: The brain is the most fascinating machine ever built (Neuroscience +2)
- D: Everyone is the main character in their own epic story (Narrative +2)

### Q4: When you remember a powerful dream, you tend to focus on...
- A: The symbols and images — what could they represent? (Jungian +2, Cultural +1)
- B: The feeling it left you with — like it meant something important (Spiritual +2)
- C: The connections to recent events or worries (Neuroscience +2)
- D: The storyline — why did it unfold that way? (Narrative +2)

### Q5: Which phrase feels most true to you?
- A: "Know thyself" — the unexamined life isn't worth living (Jungian +2)
- B: "Everything happens for a reason" — even if we can't always see it (Spiritual +2)
- C: "The mind is what the brain does" — consciousness is beautiful biology (Neuroscience +2)
- D: "We tell ourselves stories in order to live" (Narrative +2, Cultural +1)

### Q6: You'd be most fascinated to learn that your dream...
- A: Appears in myths and stories across every human culture (Cultural +2, Jungian +1)
- B: Was a visit from something beyond your conscious mind (Spiritual +2)
- C: Was your brain rehearsing for a real-world challenge (Neuroscience +2)
- D: Perfectly mirrors a turning point in your waking life (Narrative +2)

## Scoring Algorithm
```
For each lens: sum all points from answers
Sort lenses by score descending
Primary = highest score
Secondary = second highest score
If tie: use the lens from the most recent answer as tiebreaker
```

## Output
```json
{
  "primary": "jungian",
  "secondary": "narrative",
  "scores": {
    "jungian": 7,
    "spiritual": 2,
    "neuroscience": 1,
    "narrative": 5,
    "cultural": 3
  }
}
```

## UX Requirements
- One question per screen (not a wall of questions)
- Smooth slide/fade transition between questions
- Progress dots or bar at top
- Back button to change previous answers
- No "right/wrong" framing — all answers are equally valid
- Results screen: "Your Dream Lens: [Primary]" with brief description
- CTA: "Tell me about your dream →"

## Edge Cases
- User closes browser mid-quiz: store partial progress in localStorage
- Equal scores across 3+ lenses: show "You're a multi-perspective thinker" and let them pick primary
- User wants to retake: allow from results screen
