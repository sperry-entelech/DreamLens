import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Brain, Sparkles, Heart, Compass, Globe, Share2, RefreshCw, Mail, Check, Loader2 } from 'lucide-react'
import { supabase } from '../lib/supabase'
import type { InterpretationResult } from '../lib/interpret'

interface StoredInterpretation {
  dreamText: string
  interpretations: InterpretationResult[]
  metadata?: {
    mood?: string
    isRecurring?: boolean
    isLucid?: boolean
  }
  timestamp: string
}

// Map icon names to components
const iconMap = {
  brain: Brain,
  sparkles: Sparkles,
  heart: Heart,
  compass: Compass,
  globe: Globe
}

export default function Results() {
  const navigate = useNavigate()
  const [data, setData] = useState<StoredInterpretation | null>(null)
  const [copied, setCopied] = useState(false)
  const [email, setEmail] = useState('')
  const [waitlistStatus, setWaitlistStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [waitlistError, setWaitlistError] = useState('')

  // Load interpretation data on mount
  useEffect(() => {
    const saved = sessionStorage.getItem('dreamlens_interpretation')
    if (saved) {
      try {
        setData(JSON.parse(saved))
      } catch {
        console.error('Failed to parse interpretation data')
        navigate('/dream')
      }
    } else {
      // No data, redirect to dream input
      navigate('/dream')
    }
  }, [navigate])

  // Share functionality
  const handleShare = async () => {
    if (!data) return

    const shareText = data.interpretations.map(interp => {
      const sections = interp.sections.map(s => `**${s.title}**\n${s.content}`).join('\n\n')
      return `## ${interp.lens} Lens\n\n${sections}`
    }).join('\n\n---\n\n')

    const fullText = `My Dream Interpretation from DreamLens\n\n${shareText}\n\n---\nExplore your dreams at dreamlens.app`

    try {
      await navigator.clipboard.writeText(fullText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  // Waitlist signup
  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !email.includes('@')) {
      setWaitlistError('Please enter a valid email address')
      return
    }

    setWaitlistStatus('loading')
    setWaitlistError('')

    try {
      const { error } = await supabase
        .from('waitlist')
        .insert([{ email: email.toLowerCase().trim() }])

      if (error) {
        if (error.code === '23505') {
          // Unique constraint violation - email already exists
          setWaitlistStatus('success')
          setEmail('')
        } else {
          throw error
        }
      } else {
        setWaitlistStatus('success')
        setEmail('')
      }
    } catch (err) {
      console.error('Waitlist error:', err)
      setWaitlistStatus('error')
      setWaitlistError('Something went wrong. Please try again.')
    }
  }

  // Show loading state while data loads
  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-accent-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Your Dream, Three Perspectives
          </h1>
          <p className="text-text-secondary">
            Each lens offers a different dimension of meaning. None are "right" — together, they illuminate.
          </p>
        </div>

        {/* Interpretation cards */}
        <div className="space-y-6 mb-12">
          {data.interpretations.map((interp, index) => {
            const IconComponent = iconMap[interp.icon] || Sparkles

            return (
              <div
                key={interp.lensType}
                className="bg-bg-card border border-border rounded-2xl p-6 transition-dream hover:border-accent-primary/50 animate-fade-in-up"
                style={{
                  animationDelay: `${index * 150}ms`,
                  animationFillMode: 'both'
                }}
              >
                {/* Card header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-2.5 rounded-xl bg-${interp.color}/20`}>
                    <IconComponent className={`w-6 h-6 text-${interp.color}`} />
                  </div>
                  <div>
                    <span className={`text-sm font-medium text-${interp.color}`}>
                      {interp.lens} Lens
                    </span>
                  </div>
                </div>

                {/* Interpretation sections */}
                <div className="space-y-6">
                  {interp.sections.map((section, sectionIndex) => (
                    <div key={sectionIndex}>
                      <h3 className="font-display font-semibold text-text-primary mb-2">
                        {section.title}
                      </h3>
                      <p className="text-text-secondary leading-relaxed">
                        {section.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-bg-card border border-border rounded-xl hover:border-accent-primary transition-dream"
          >
            {copied ? (
              <>
                <Check className="w-5 h-5 text-accent-secondary" />
                <span className="text-accent-secondary">Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-5 h-5" />
                Share Interpretation
              </>
            )}
          </button>
          <Link
            to="/dream"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-bg-card border border-border rounded-xl hover:border-accent-secondary transition-dream"
          >
            <RefreshCw className="w-5 h-5" />
            Explore Another Dream
          </Link>
        </div>

        {/* Waitlist CTA */}
        <div className="bg-bg-card/50 border border-border rounded-2xl p-8 text-center">
          <h3 className="text-xl font-display font-semibold mb-2">
            Want to track your dream patterns?
          </h3>
          <p className="text-text-secondary mb-6">
            Join the waitlist for dream journaling, pattern insights, and personalized guidance.
          </p>

          {waitlistStatus === 'success' ? (
            <div className="flex items-center justify-center gap-2 text-accent-secondary">
              <Check className="w-5 h-5" />
              <span>You're on the list! We'll be in touch.</span>
            </div>
          ) : (
            <form onSubmit={handleWaitlistSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 bg-bg-secondary border border-border rounded-xl focus:border-accent-primary focus:outline-none transition-dream"
                disabled={waitlistStatus === 'loading'}
              />
              <button
                type="submit"
                disabled={waitlistStatus === 'loading'}
                className="flex items-center justify-center gap-2 bg-accent-primary hover:bg-accent-primary/90 text-white font-semibold px-6 py-3 rounded-xl transition-dream disabled:opacity-50"
              >
                {waitlistStatus === 'loading' ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Mail className="w-5 h-5" />
                )}
                Join Waitlist
              </button>
            </form>
          )}

          {waitlistError && (
            <p className="mt-3 text-sm text-red-400">{waitlistError}</p>
          )}
        </div>

        {/* Footer link */}
        <div className="mt-8 text-center">
          <Link
            to="/quiz"
            className="text-text-secondary hover:text-accent-primary text-sm transition-dream"
          >
            Retake the belief quiz →
          </Link>
        </div>
      </div>
    </div>
  )
}
