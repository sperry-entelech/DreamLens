# Directive 05: Results Display

## Goal
Display the three interpretation perspectives in a beautiful, shareable card layout that makes people want to screenshot and send to friends.

## Inputs
- interpretation object with 3 sections (processing, exploring, connecting)
- belief_profile (primary + secondary lens names)
- dream_text (for reference/context)
- Optional metadata (mood, recurring, lucid)

## Process
1. Create ResultsPage component
2. Build 3 interpretation cards with distinct visual identity
3. Add share/screenshot functionality
4. Include "Interpret Another Dream" CTA
5. Add "Save to Journal" if authenticated (Phase 2)

## Card Design

### Card 1: "What this might be processing..."
- Icon: brain/wave motif
- Color accent: --accent-secondary (teal)
- Represents the analytical/emotional dimension

### Card 2: "What this could be inviting you to explore..."
- Icon: compass/door motif
- Color accent: --accent-primary (violet)
- Represents the growth/possibility dimension

### Card 3: "What this connects to in your waking life..."
- Icon: bridge/thread motif
- Color accent: --accent-warm (amber)
- Represents the practical/grounding dimension

## Layout
- Mobile: Stacked cards with staggered reveal animation
- Desktop: 3-column grid or stacked with alternating alignment
- Each card: subtle glassmorphism on dark background
- Lens badge at top: "Interpreted through [Primary Lens] with [Secondary Lens]"

## Shareability Features
- "Share Your Reading" button
- Generates a styled image/card (html2canvas or similar)
- Copy link to share (creates shareable URL with dream ID)
- Social meta tags for link previews

## Animation
- Cards appear one at a time with 0.3s stagger
- Subtle floating/breathing animation on cards at rest
- Scroll-triggered reveal on mobile

## CTAs After Results
1. "Explore Another Dream →" (primary)
2. "Retake the Quiz" (if they want a different lens)
3. "Join the Waitlist" (for dream journal features)
4. "Share Your Reading" (viral loop)

## Edge Cases
- Single-section interpretation (API returned less than 3): display what's available, note "Your dream had a focused message today"
- Very long interpretation: truncate with "Read more" expand
- User navigates directly to /results without dream: redirect to /dream
