# DreamLens — Claude Code Quickstart

## Before You Start
You need:
- [ ] Node.js installed
- [ ] Claude Code installed (`npm install -g @anthropic-ai/claude-code`)
- [ ] A Supabase account (free tier: supabase.com)
- [ ] An Anthropic API key (for the interpretation engine)
- [ ] A Vercel account (free tier, for deployment)

## Step 1: Create Supabase Project
1. Go to supabase.com → New Project
2. Name it "dreamlens"
3. Save your project URL and anon key
4. Go to SQL Editor → Run the schema from CLAUDE.md (the CREATE TABLE statements)

## Step 2: Set Up Your Workspace
```bash
mkdir dreamlens
cd dreamlens
# Copy all the files from the scaffold (CLAUDE.md, directives/, few-shot-library/)
```

## Step 3: Create .env File
```bash
# Create .env with your actual keys
echo "VITE_SUPABASE_URL=your_supabase_url_here" > .env
echo "VITE_SUPABASE_ANON_KEY=your_anon_key_here" >> .env
echo "ANTHROPIC_API_KEY=your_api_key_here" >> .env
```

## Step 4: Launch Claude Code
```bash
claude
```

## Step 5: Execute Directives in Order

### Prompt 1: Project Setup
```
Read CLAUDE.md and directives/01_project_setup.md. Initialize the project 
exactly as specified. Set up Vite + React + TypeScript + Tailwind with the 
cosmic dark theme. Create the routing structure with placeholder pages. 
Verify the dev server runs.
```

### Prompt 2: Quiz Funnel
```
Read directives/02_quiz_funnel.md. Build the complete quiz funnel with all 
6 questions, the scoring algorithm, and smooth transitions between questions. 
Make it mobile-first with the cosmic theme. Store results in React state 
and navigate to /dream on completion.
```

### Prompt 3: Dream Input
```
Read directives/03_dream_input.md. Build the dream input page with the 
textarea, optional metadata toggles, word count, prompt suggestions, and 
the submit flow. Include the loading animation state. Connect to the 
belief_profile from the quiz.
```

### Prompt 4: Interpretation Engine
```
Read directives/04_interpretation_engine.md and ALL files in the 
few-shot-library/ folder. Build the Supabase Edge Function that calls 
Claude's API with the few-shot examples. Load the correct examples based 
on the user's primary and secondary lens. Parse the response into the 
3-section format. Handle errors gracefully.
```

**Alternative if Supabase Edge Functions are complex:**
```
For MVP, build the interpretation as a client-side API call to Anthropic 
(we'll move to edge functions later). Use the pattern from 
directives/04_interpretation_engine.md but call the API directly from 
the React app. The API key can be in .env for now — we'll secure it 
before public launch.
```

### Prompt 5: Results Display
```
Read directives/05_results_display.md. Build the results page with 3 
interpretation cards using the teal/violet/amber color scheme. Add the 
staggered reveal animation. Include share functionality and the CTAs 
for exploring another dream and joining the waitlist.
```

### Prompt 6: Landing Page
```
Read directives/06_waitlist_landing.md. Build the landing page with the 
hero section, how-it-works steps, and email capture. Connect the waitlist 
form to Supabase. Make this the homepage at /. Make it genuinely beautiful — 
this is the first thing people see.
```

## Step 6: Test the Full Loop
```
Run through the complete flow: Landing → Quiz → Dream Input → Results.
Fix any issues. Make sure it feels smooth on mobile. Test with at least 
3 different dreams.
```

## Step 7: Deploy
```
Help me deploy this to Vercel. Set up the environment variables and 
make sure the Supabase connection works in production.
```

## Estimated Timeline
- Directive 01: 15-20 minutes
- Directive 02: 30-45 minutes  
- Directive 03: 20-30 minutes
- Directive 04: 30-45 minutes
- Directive 05: 20-30 minutes
- Directive 06: 20-30 minutes
- Testing + fixes: 30-60 minutes
- Deployment: 15-20 minutes

**Total: 3-5 hours to shipped MVP**

## The Nick Saraev Principle
"It's no longer the construction of the workflow that matters. It's building 
a really good prompt with high-quality examples."

The few-shot library IS this product. The quiz IS the differentiator. 
Everything else is scaffolding. If the interpretations feel generic, 
improve the examples. That's where you spend your taste.
