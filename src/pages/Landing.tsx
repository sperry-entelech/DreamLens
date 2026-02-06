import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Moon, ArrowRight, Sparkles, Brain, Layers, Mail, Check, Loader2 } from 'lucide-react'
import { supabase } from '../lib/supabase'

export default function Landing() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid email')
      return
    }

    setStatus('loading')
    setErrorMsg('')

    try {
      const { error } = await supabase
        .from('waitlist')
        .insert([{ email: email.toLowerCase().trim() }])

      if (error) {
        if (error.code === '23505') {
          // Already exists - treat as success
          setStatus('success')
          setEmail('')
        } else {
          throw error
        }
      } else {
        setStatus('success')
        setEmail('')
      }
    } catch (err) {
      console.error('Waitlist error:', err)
      setStatus('error')
      setErrorMsg('Something went wrong. Please try again.')
    }
  }

  return (
    <div className="min-h-screen cosmic-bg flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <Moon className="w-10 h-10 text-accent-primary" />
          <h1 className="text-4xl md:text-5xl font-display font-bold text-text-primary">
            DreamLens
          </h1>
        </div>

        {/* Tagline - CoStar style: confident, short, intelligent */}
        <p className="text-xl md:text-2xl text-text-secondary text-center max-w-xl mb-4 font-display">
          Three ways to read the same dream.
        </p>
        <p className="text-text-secondary text-center max-w-md mb-12">
          A journaling tool that interprets your dreams through multiple analytical frames.
          No verdicts. Just perspectives.
        </p>

        {/* Features - concise, no fluff */}
        <div className="grid md:grid-cols-3 gap-4 max-w-2xl mb-12">
          <div className="bg-bg-card/50 border border-border rounded-xl p-5 text-center">
            <Brain className="w-6 h-6 text-accent-secondary mx-auto mb-2" />
            <h3 className="font-display font-semibold text-sm">Matched to you</h3>
          </div>
          <div className="bg-bg-card/50 border border-border rounded-xl p-5 text-center">
            <Layers className="w-6 h-6 text-accent-primary mx-auto mb-2" />
            <h3 className="font-display font-semibold text-sm">Multiple frames</h3>
          </div>
          <div className="bg-bg-card/50 border border-border rounded-xl p-5 text-center">
            <Sparkles className="w-6 h-6 text-accent-warm mx-auto mb-2" />
            <h3 className="font-display font-semibold text-sm">Meaning, not verdicts</h3>
          </div>
        </div>

        {/* CTA */}
        <Link
          to="/quiz"
          className="group flex items-center gap-2 bg-accent-primary hover:bg-accent-primary/90 text-white font-semibold px-8 py-4 rounded-xl transition-dream glow-violet"
        >
          <span>Start</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>

        <p className="mt-4 text-text-secondary text-sm">
          2 minutes · No account required
        </p>

        {/* Waitlist signup */}
        <div className="mt-12 w-full max-w-md">
          <div className="border-t border-border pt-8">
            <p className="text-center text-text-secondary text-sm mb-4">
              Or join the waitlist for updates
            </p>

            {status === 'success' ? (
              <div className="flex items-center justify-center gap-2 text-accent-secondary animate-fade-in">
                <Check className="w-5 h-5" />
                <span>You're on the list!</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-3 bg-bg-card border border-border rounded-xl focus:border-accent-primary focus:outline-none transition-dream text-sm"
                  disabled={status === 'loading'}
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="flex items-center justify-center gap-2 bg-bg-card border border-border hover:border-accent-primary px-4 py-3 rounded-xl transition-dream disabled:opacity-50"
                >
                  {status === 'loading' ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Mail className="w-5 h-5" />
                  )}
                </button>
              </form>
            )}

            {errorMsg && (
              <p className="mt-2 text-center text-sm text-red-400">{errorMsg}</p>
            )}
          </div>
        </div>
      </div>

      {/* Footer - simple, not flowery */}
      <footer className="border-t border-border py-6 text-center text-text-secondary text-sm">
        <p>A tool for thinking about your nights.</p>
      </footer>
    </div>
  )
}
