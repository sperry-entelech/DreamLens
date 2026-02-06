# Directive 06: Waitlist Landing Page

## Goal
Build a compelling landing page that captures emails for the waitlist and offers immediate access to the quiz + first interpretation as a lead magnet.

## Inputs
- Brand identity from CLAUDE.md design tokens
- Value proposition: "Dream interpretation that matches how you actually make meaning"

## Process
1. Create LandingPage component as the / route
2. Hero section with headline, subtext, and dual CTAs
3. "How It Works" section (3 steps)
4. Email capture for waitlist (Supabase insert)
5. "Try It Now" CTA that goes directly to /quiz

## Copy

### Hero
**Headline**: "Your dreams aren't random."
**Subtext**: "DreamLens interprets your dreams through the lens that actually resonates with you — not generic dictionaries, not one-size-fits-all. Three perspectives. Zero judgment. All meaning."
**CTA 1**: "Explore Your Dreams →" (goes to /quiz)
**CTA 2**: "Join the Waitlist" (scrolls to email capture)

### How It Works
**Step 1**: "Take a 2-minute quiz" — We learn how you naturally make meaning
**Step 2**: "Describe your dream" — Tell us what happened, however you remember it
**Step 3**: "Receive 3 perspectives" — Not what your dream means. What it might mean to YOU.

### Social Proof Section (Phase 2 — placeholder for now)
"Built for people who've always wanted to understand why they dream what they dream."

### Email Capture
**Heading**: "Get early access to DreamLens"
**Subtext**: "Dream journal, pattern tracking, and deeper insights — coming soon."
**Input**: Email field + "Join Waitlist" button
**Success**: "You're in. Sweet dreams. ✨"

## Technical
- Email stored in Supabase waitlist table
- Duplicate email: show "You're already on the list!"
- Basic email format validation
- No external email service needed for MVP

## SEO Meta Tags
- Title: "DreamLens — Dream Interpretation That Matches Your Worldview"
- Description: "Personalized dream interpretation through Jungian, spiritual, scientific, narrative, and cultural lenses. Not generic. Not binary. Yours."
- OG image: cosmic/celestial branded graphic (can be static for MVP)
