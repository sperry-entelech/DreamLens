# DreamLens

**Three ways to read the same dream.**

A personalized dream interpretation platform that matches meaning-making to the user's belief system — not binary "good/bad" readings but multi-perspective explorations.

![DreamLens](https://img.shields.io/badge/React-19-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-4.1-blue)

---

## Quick Start

```bash
# Clone the repository
git clone https://github.com/sperry-entelech/DreamLens.git
cd DreamLens

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your credentials (see Environment Variables below)

# Start development server
npm run dev
```

---

## Architecture Overview

### Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Frontend | React 19 + Vite 7 | Fast, modern UI framework |
| Styling | Tailwind CSS 4 | Utility-first CSS with cosmic dark theme |
| Routing | React Router 7 | Client-side navigation |
| Database | Supabase | PostgreSQL with auth & real-time |
| AI Engine | Claude API (Sonnet) | Dream interpretation via few-shot prompting |
| API Proxy | Vercel Serverless | Secure API key handling |
| Deployment | Vercel | Edge-optimized hosting |

### Folder Structure

```
dreamlens/
├── api/                    # Vercel serverless functions
│   └── interpret.ts        # Claude API proxy
├── src/
│   ├── components/
│   │   └── Layout.tsx      # Navbar + outlet wrapper
│   ├── pages/
│   │   ├── Landing.tsx     # Homepage with waitlist
│   │   ├── Quiz.tsx        # Belief assessment (6 questions)
│   │   ├── Dream.tsx       # Dream input + metadata
│   │   └── Results.tsx     # Three-perspective display
│   ├── lib/
│   │   ├── supabase.ts     # Supabase client + types
│   │   ├── interpret.ts    # Interpretation engine
│   │   └── fewShotExamples.ts  # Curated examples per lens
│   ├── main.tsx            # App entry + routing
│   └── index.css           # Cosmic theme + animations
├── few-shot-library/       # High-quality interpretation examples
│   ├── jungian_examples.md
│   ├── spiritual_examples.md
│   ├── neuroscience_examples.md
│   ├── narrative_examples.md
│   └── cultural_examples.md
├── directives/             # SOP documentation
├── vercel.json             # Vercel configuration
└── package.json
```

---

## How It Works

### User Flow

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Landing   │───▶│    Quiz     │───▶│   Dream     │───▶│   Results   │
│   Page      │    │  (6 Q's)    │    │   Input     │    │  (3 lenses) │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
                          │                   │
                          ▼                   ▼
                   localStorage         sessionStorage
                  (belief_profile)     (interpretations)
```

### Interpretation Pipeline

1. **Quiz Assessment**: User answers 6 questions that determine their primary and secondary "lenses" (Jungian, Spiritual, Neuroscience, Narrative, Cultural)

2. **Dream Input**: User describes their dream (20-500 words) with optional metadata (mood, recurring, lucid)

3. **Few-Shot Prompting**: For each lens, the system:
   - Loads lens-specific configuration (tone, key question)
   - Includes 2-3 curated interpretation examples
   - Calls Claude API with the personalized prompt

4. **Three Perspectives**: User receives three distinct interpretations, each offering a different dimension of meaning

### Belief System Lenses

| Lens | Approach | Key Question |
|------|----------|--------------|
| **Jungian** | Shadow work, archetypes, individuation | "What part of yourself is this dream inviting you to integrate?" |
| **Spiritual** | Messages, synchronicity, guidance | "What might the universe be communicating through this dream?" |
| **Neuroscience** | Memory consolidation, threat simulation | "What is your brain working through while you sleep?" |
| **Narrative** | Metaphor, life themes, storytelling | "What story is your mind telling about your life right now?" |
| **Cultural** | Universal symbols, cross-cultural patterns | "What universal human experience does this dream tap into?" |

---

## Environment Variables

Create a `.env` file in the root directory:

```env
# Supabase (get from supabase.com project settings)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Claude API (get from console.anthropic.com)
ANTHROPIC_API_KEY=sk-ant-...
```

**Important**: The `ANTHROPIC_API_KEY` is only used server-side in Vercel. Never expose it in client code.

---

## Supabase Setup

### Database Schema

Run these migrations in your Supabase SQL editor:

```sql
-- Waitlist table for email capture
create table waitlist (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  created_at timestamptz default now()
);

-- Enable Row Level Security
alter table waitlist enable row level security;

-- Allow anonymous inserts to waitlist
create policy "Allow anonymous inserts" on waitlist
  for insert with check (true);

-- Optional: Dreams table for future user accounts
create table dreams (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  dream_text text not null,
  belief_profile jsonb,
  created_at timestamptz default now()
);

-- Optional: Interpretations table
create table interpretations (
  id uuid primary key default gen_random_uuid(),
  dream_id uuid references dreams(id),
  lens text not null,
  interpretation text not null,
  created_at timestamptz default now()
);
```

---

## Deployment

### Vercel

1. Push code to GitHub
2. Connect repo to Vercel
3. Set environment variables in Vercel dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `ANTHROPIC_API_KEY`
4. Deploy

The `vercel.json` handles routing for both the SPA and API endpoints.

---

## Cost Estimates

| Resource | Estimate | Notes |
|----------|----------|-------|
| **Claude API** | ~$0.02/interpretation | 3 API calls × ~$0.006 each |
| **Supabase** | Free tier | 500MB database, 50K monthly requests |
| **Vercel** | Free tier | 100GB bandwidth, serverless functions |

**Monthly projection** (1,000 interpretations): ~$20 in API costs

---

## Development

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on localhost:5173 |
| `npm run build` | TypeScript check + Vite production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint on all files |

---

## License

Private project. All rights reserved.

---

## Credits

Built by [Sperry Entelech](https://entelech.co) with:
- Claude API by Anthropic
- Few-shot prompting methodology inspired by Nick Saraev
- Design inspiration from CoStar's bold minimalism
