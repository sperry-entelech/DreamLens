# Directive 01: Project Setup

## Goal
Initialize the DreamLens project with React (Vite), Tailwind CSS, and Supabase integration.

## Inputs
- Tech stack: React + Vite + Tailwind CSS + Supabase
- Deployment target: Vercel
- Design: Dark mode, cosmic/celestial aesthetic, mobile-first

## Process
1. Initialize Vite React project with TypeScript
2. Install dependencies: tailwindcss, @supabase/supabase-js, lucide-react
3. Configure Tailwind with custom dark cosmic theme
4. Set up Supabase client configuration (lib/supabase.ts)
5. Create base layout with dark theme and navigation structure
6. Set up React Router with routes: /, /quiz, /dream, /results
7. Create .env.example with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
8. Verify dev server runs without errors

## Outputs
- Working React app with routing
- Supabase client configured
- Dark cosmic theme applied globally
- All routes rendering placeholder content

## Edge Cases
- If Supabase env vars missing, show setup instructions in console
- Ensure Tailwind purge config includes all component paths
- Mobile viewport meta tag must be present

## Design Tokens
```css
/* Core palette - cosmic night theme */
--bg-primary: #0a0a1a       /* Deep space */
--bg-secondary: #12122a     /* Nebula dark */
--bg-card: #1a1a3e          /* Card surface */
--text-primary: #e8e8f0     /* Starlight */
--text-secondary: #9898b8   /* Muted cosmic */
--accent-primary: #7c6fea   /* Violet dream */
--accent-secondary: #4ecdc4 /* Teal insight */
--accent-warm: #f7b267      /* Amber intuition */
--border: #2a2a4e           /* Subtle edge */
```
