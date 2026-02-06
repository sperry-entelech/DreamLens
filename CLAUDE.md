# DreamLens - Personalized Dream Interpretation Platform

## Mission
Build a dream interpretation app that matches meaning-making to the user's belief system — not binary "good/bad" readings but multi-perspective explorations. Built to honor Jada's curiosity about why we dream what we dream.

## Why This Exists
Jada wanted to know the meaning behind her dreams. Not generic dream dictionaries. Not one-size-fits-all. Something that felt true to HER way of making sense of things. DreamLens gives people three interpretations through the lens that actually resonates with who they are.

## Architecture: DOE Framework (Nick Saraev Method)

### Layer 1: Directives (WHAT to do)
- Location: `/directives/` folder
- Format: Markdown SOPs in natural language
- Each directive defines a complete workflow

### Layer 2: Orchestration (WHO decides)
- Claude Code reads directives → chooses actions → calls execution → evaluates → loops
- Self-annealing: if something breaks, fix the script AND update the directive

### Layer 3: Execution (HOW to do it)
- Location: `/executions/` folder
- Deterministic code: React components, Supabase queries, API calls
- Scripts don't hallucinate — they work or throw catchable errors

## Tech Stack
- **Frontend**: React (Vite) + Tailwind CSS
- **Backend**: Supabase (auth, database, edge functions)
- **AI Engine**: Claude API (claude-sonnet-4-5-20250929) via Supabase Edge Functions
- **Payments**: Stripe (later — MVP is free/waitlist)
- **Deployment**: Vercel

## Project Structure
```
dreamlens/
├── CLAUDE.md                    ← You are here
├── directives/
│   ├── 01_project_setup.md      ← Initialize React + Supabase + env
│   ├── 02_quiz_funnel.md        ← Belief system assessment quiz
│   ├── 03_dream_input.md        ← Dream journal entry interface
│   ├── 04_interpretation_engine.md ← Claude API few-shot interpretation
│   ├── 05_results_display.md    ← Three-perspective output UI
│   └── 06_waitlist_landing.md   ← Pre-launch landing page
├── executions/
│   ├── (scripts created by agent during build)
│   └── ...
├── few-shot-library/
│   ├── jungian_examples.md      ← Archetypal interpretation examples
│   ├── spiritual_examples.md    ← Mystical/guidance examples
│   ├── neuroscience_examples.md ← Processing/regulation examples
│   ├── narrative_examples.md    ← Personal story examples
│   └── cultural_examples.md     ← Shared symbolism examples
├── src/
│   ├── components/
│   ├── pages/
│   ├── lib/
│   └── ...
├── supabase/
│   ├── migrations/
│   └── functions/
│       └── interpret-dream/
└── .env
```

## Self-Annealing Protocol
When errors occur:
1. Pause — don't crash
2. Read error message and stack trace
3. Look at the code that caused the error
4. Fix the script in /executions/
5. Update the directive in /directives/ to warn future instances
6. Retry → succeed
7. System is now stronger than before

## Few-Shot Context Preparation (Core Differentiator)

### Principle (from Nick Saraev Video #27)
"It's no longer the construction of the workflow that matters. It's building a really good prompt with high-quality examples."

### Implementation
Each belief system lens has its own few-shot library in `/few-shot-library/`. These contain 5-10 curated example dream interpretations that define the VOICE and APPROACH for that lens. The Claude API call includes the relevant examples based on the user's quiz results.

### Quality Standard
- Zero-shot interpretation = generic, forgettable
- Few-shot interpretation = feels like it was written by someone who GETS your worldview
- The gap between 95% and 99% quality is where this product lives

## Belief System Lenses

### 1. Jungian/Archetypal
- Shadow integration, collective unconscious, anima/animus
- Tone: Deep, exploratory, empowering
- Key question: "What part of yourself is this dream inviting you to integrate?"

### 2. Spiritual/Mystical  
- Messages, synchronicity, guidance from beyond
- Tone: Reverent, open, wonder-filled
- Key question: "What might the universe be communicating through this dream?"

### 3. Neuroscience/Processing
- Memory consolidation, emotional regulation, threat simulation
- Tone: Grounded, educational, reassuring
- Key question: "What is your brain working through while you sleep?"

### 4. Narrative/Personal
- Your subconscious as storyteller, metaphor, life themes
- Tone: Warm, reflective, like a good therapist
- Key question: "What story is your mind telling about your life right now?"

### 5. Cultural/Symbolic
- Shared human symbols, cross-cultural meaning patterns
- Tone: Expansive, connecting, anthropological
- Key question: "What universal human experience does this dream tap into?"

## MVP Scope (Ship This Weekend)
Phase 1 — Core Loop:
1. Landing page with waitlist capture
2. Quiz funnel (5-7 questions) → determines primary + secondary lens
3. Dream input (text field, 50-500 words)
4. Interpretation output: 3 perspectives from their top-matched lenses
5. Save to Supabase for dream journal history

Phase 2 — After Validation:
- User accounts and dream history
- Daily/weekly dream patterns and themes
- Community features
- Subscription ($5-10/month)

## Design Direction
- Dark mode default (dreams happen at night)
- Cosmic/celestial aesthetic — NOT generic purple gradient AI slop
- Typography: distinctive display font + refined body
- Animations: subtle, dreamy transitions (not flashy)
- Mobile-first (people record dreams in bed on their phone)
- Inspiration: CoStar's bold minimalism meets mystical depth

## Database Schema (Supabase)
```sql
-- Users
create table users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  belief_profile jsonb, -- quiz results
  created_at timestamptz default now()
);

-- Dreams
create table dreams (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  dream_text text not null,
  created_at timestamptz default now()
);

-- Interpretations
create table interpretations (
  id uuid primary key default gen_random_uuid(),
  dream_id uuid references dreams(id),
  lens text not null, -- 'jungian', 'spiritual', etc.
  interpretation text not null,
  created_at timestamptz default now()
);

-- Waitlist
create table waitlist (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  created_at timestamptz default now()
);
```

## API Call Pattern (Few-Shot)
```
System prompt: You are a dream interpreter using the {lens_name} framework.
Your interpretations are {tone_description}. You never give binary good/bad
readings. You always offer three dimensions of meaning.

Few-shot examples: [loaded from /few-shot-library/{lens}_examples.md]

User message: "I dreamed that {dream_text}"

Output format:
1. "What this might be processing..." (emotional/cognitive angle)
2. "What this could be inviting you to explore..." (growth angle)  
3. "What this connects to in your waking life..." (practical angle)
```

## Success Metrics
- MVP deployed and shareable link within 48 hours
- 50+ waitlist signups in first week
- 3+ people spontaneously share their interpretation screenshots
- Jada would have loved using this

## Voice & Tone Rules
- NEVER say "This dream means X" (binary)
- ALWAYS offer possibilities, not declarations
- Warm but not saccharine
- Intelligent but not academic
- Respect ALL belief systems equally — no lens is "more valid"
- The app helps people explore meaning, not receive verdicts

## Build Sequence
Execute directives in order: 01 → 02 → 03 → 04 → 05 → 06
Each must be complete and tested before proceeding to next.
