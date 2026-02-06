# DreamLens Partner Handoff Notes

**For Haithem** — Everything you need to know to fork, extend, and deploy your own instance.

---

## What's Built (MVP Complete)

### Core Features ✅

| Feature | Status | Notes |
|---------|--------|-------|
| **Landing Page** | ✅ Complete | Cosmic design, waitlist capture, CTA to quiz |
| **Belief Quiz** | ✅ Complete | 6 questions, localStorage persistence, scoring algorithm |
| **Dream Input** | ✅ Complete | Text input, word count, mood/recurring/lucid metadata |
| **AI Interpretation** | ✅ Complete | Claude API via Vercel serverless, 3 lenses per dream |
| **Results Display** | ✅ Complete | Dynamic cards, staggered animations, clipboard share |
| **Waitlist Capture** | ✅ Complete | Supabase integration, duplicate handling |

### Technical Infrastructure ✅

- React 19 + TypeScript + Tailwind CSS 4
- Vercel serverless function for secure API calls
- Supabase client configured
- Few-shot prompting engine with 15+ curated examples
- Responsive design (mobile-first)

---

## What's Placeholder/Future

### Not Built Yet (Phase 2)

| Feature | Complexity | Notes |
|---------|------------|-------|
| **User Accounts** | Medium | Add Supabase Auth, Google/email login |
| **Dream History** | Low | Store dreams in DB, show user's journal |
| **Pattern Analysis** | Medium | Track recurring symbols, show trends |
| **Subscription/Payments** | Medium | Stripe integration, usage limits |
| **Community Features** | High | Anonymous dream sharing, upvotes |

### Known Limitations

1. **No rate limiting** — Anyone can spam the API (add limits before scaling)
2. **No auth** — All users are anonymous (dreams stored only in session)
3. **No analytics** — Add Plausible/Mixpanel for usage tracking
4. **Basic error handling** — Could add retry logic, fallback interpretations

---

## Quick Start for Haithem

### 1. Fork the Repository

```bash
# Fork on GitHub, then:
git clone https://github.com/YOUR_USERNAME/DreamLens.git
cd DreamLens
npm install
```

### 2. Set Up Supabase

1. Create project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run:

```sql
create table waitlist (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  created_at timestamptz default now()
);

alter table waitlist enable row level security;

create policy "Allow anonymous inserts" on waitlist
  for insert with check (true);
```

3. Copy your project URL and anon key from Settings → API

### 3. Set Up Claude API

1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Create API key
3. Add billing (pay-as-you-go is fine)

### 4. Create Environment File

```bash
# Create .env file
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-anon-key
ANTHROPIC_API_KEY=sk-ant-your-key
```

### 5. Run Locally

```bash
npm run dev
# Open http://localhost:5173
```

### 6. Deploy to Vercel

1. Push to GitHub
2. Connect repo at [vercel.com](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

---

## Cost Structure

### Current (Free Tier)

| Service | Plan | Cost |
|---------|------|------|
| Vercel | Hobby | $0/month |
| Supabase | Free | $0/month |
| Claude API | Pay-per-use | ~$0.02/interpretation |

### Projected (1,000 users/month)

| Resource | Estimate |
|----------|----------|
| API calls | ~$20/month |
| Supabase | Free until 50K requests |
| Vercel | Free until high traffic |

**Breakeven**: ~$0.02/interpretation cost → charge $5/month for 250 interpretations

---

## Monetization Options

### Option 1: Freemium
- Free: 3 interpretations/week
- Pro: Unlimited + history + patterns ($5-10/month)

### Option 2: Pay-per-interpretation
- $0.99/interpretation (pack of 10)
- Revenue: ~$0.97/interpretation profit

### Option 3: Enterprise/White-label
- Therapists, wellness apps
- API access + custom branding

---

## Files to Modify for Customization

| File | What to Customize |
|------|-------------------|
| `src/pages/Landing.tsx` | Branding, taglines, CTA text |
| `src/index.css` | Color scheme (search `--color-`) |
| `src/lib/fewShotExamples.ts` | Add/edit interpretation examples |
| `api/interpret.ts` | Change AI model, add logging |

---

## Extension Ideas

### Quick Wins (1-2 days each)
- [ ] Add Google Analytics / Plausible
- [ ] Email notifications for new waitlist signups
- [ ] Rate limiting (Upstash Redis)
- [ ] Loading animations with constellation effect

### Medium Projects (1-2 weeks each)
- [ ] User accounts with Supabase Auth
- [ ] Dream journal with search/filter
- [ ] PDF export of interpretations
- [ ] Mobile app (React Native)

### Advanced (1+ month)
- [ ] Pattern recognition across dreams
- [ ] Community dream sharing
- [ ] Voice input for dream recording
- [ ] Integration with sleep tracking apps

---

## Architecture Notes

### Why These Choices?

| Decision | Reason |
|----------|--------|
| **Vite over Next.js** | Simpler, faster for SPA, no SSR needed |
| **Vercel serverless** | Free, easy deployment, hides API key |
| **sessionStorage** | Dreams don't persist (privacy), easy to add later |
| **Few-shot prompting** | Dramatically improves interpretation quality |
| **3 lenses always** | User testing showed this is the sweet spot |

### Data Flow

```
Quiz (localStorage) → Dream Input → API (Vercel) → Claude → sessionStorage → Results
                                      ↓
                               Supabase (waitlist only)
```

---

## Support

If you get stuck:
1. Check the README.md for setup instructions
2. Look at the `/directives/` folder for detailed SOPs
3. Review the CLAUDE.md file for project context
4. Reach out to Sperry

---

## Timeline Recommendations

### Before Launch
- [ ] Test full flow on mobile
- [ ] Add rate limiting
- [ ] Set up monitoring (Sentry free tier)

### Week 1
- [ ] Share with 10-20 friends for feedback
- [ ] Monitor API costs
- [ ] Collect waitlist emails

### Month 1
- [ ] Analyze usage patterns
- [ ] Add user accounts if demand exists
- [ ] Consider subscription model

---

**Last updated**: February 2026

Good luck! This is a solid foundation. The few-shot examples alone took significant work to craft — they're the secret sauce. 🌙
