import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Send, Sparkles, Moon, Loader2, AlertCircle, ChevronDown } from 'lucide-react'
import { interpretDream } from '../lib/interpret'
import type { BeliefProfile, DreamMetadata } from '../lib/interpret'

const MOOD_OPTIONS = [
  'Peaceful',
  'Anxious',
  'Confused',
  'Joyful',
  'Sad',
  'Frightened',
  'Curious',
  'Nostalgic'
]

const PROMPT_STARTERS = [
  { label: 'Flying', text: 'I was flying over a vast landscape...' },
  { label: 'Falling', text: 'I was falling through darkness...' },
  { label: 'Being chased', text: 'Something was chasing me through...' },
  { label: 'Lost', text: 'I was lost in an unfamiliar place...' }
]

export default function Dream() {
  const navigate = useNavigate()
  const [dreamText, setDreamText] = useState('')
  const [beliefProfile, setBeliefProfile] = useState<BeliefProfile | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Metadata state
  const [showMoodPicker, setShowMoodPicker] = useState(false)
  const [selectedMood, setSelectedMood] = useState<string | null>(null)
  const [isRecurring, setIsRecurring] = useState(false)
  const [isLucid, setIsLucid] = useState(false)

  const wordCount = dreamText.trim().split(/\s+/).filter(Boolean).length
  const isValidLength = wordCount >= 20 && wordCount <= 500

  // Load belief profile from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('dreamlens_belief_profile')
    if (saved) {
      try {
        setBeliefProfile(JSON.parse(saved))
      } catch {
        console.error('Failed to parse belief profile')
      }
    }
  }, [])

  const handleSubmit = async () => {
    if (!isValidLength || !beliefProfile) {
      if (!beliefProfile) {
        setError('Please take the quiz first to personalize your interpretation.')
        return
      }
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const metadata: DreamMetadata = {}
      if (selectedMood) metadata.mood = selectedMood.toLowerCase()
      if (isRecurring) metadata.isRecurring = true
      if (isLucid) metadata.isLucid = true

      const result = await interpretDream(dreamText, beliefProfile, metadata)

      if (result.success && result.interpretations.length > 0) {
        // Store in sessionStorage for Results page
        sessionStorage.setItem('dreamlens_interpretation', JSON.stringify({
          dreamText,
          interpretations: result.interpretations,
          metadata,
          timestamp: new Date().toISOString()
        }))
        navigate('/results')
      } else {
        setError(result.error || 'Failed to generate interpretations. Please try again.')
      }
    } catch (err) {
      console.error('Interpretation error:', err)
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handlePromptStarter = (text: string) => {
    setDreamText(text)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 text-accent-secondary mb-4">
            <Moon className="w-5 h-5" />
            <span className="text-sm font-medium">Dream Journal</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Describe your dream
          </h1>
          <p className="text-text-secondary">
            Share as much detail as you remember. The more vivid, the deeper the interpretation.
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-500/50 rounded-xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-200">{error}</p>
              {!beliefProfile && (
                <button
                  onClick={() => navigate('/quiz')}
                  className="mt-2 text-sm text-accent-primary hover:underline"
                >
                  Take the quiz →
                </button>
              )}
            </div>
          </div>
        )}

        {/* Dream input */}
        <div className="bg-bg-card border border-border rounded-2xl p-6 mb-6">
          <textarea
            value={dreamText}
            onChange={(e) => setDreamText(e.target.value)}
            placeholder="I was walking through a forest when I noticed the trees started to glow with a soft blue light. There was a door standing alone in a clearing..."
            className="w-full h-64 bg-transparent border-none resize-none text-text-primary placeholder:text-text-secondary/50 focus:outline-none text-lg leading-relaxed"
            disabled={isLoading}
          />

          <div className="flex flex-wrap justify-between items-center pt-4 border-t border-border mt-4 gap-2">
            <span className={`text-sm ${
              wordCount < 20 ? 'text-text-secondary' :
              wordCount > 500 ? 'text-accent-warm' :
              'text-accent-secondary'
            }`}>
              {wordCount} words {wordCount < 20 && '(minimum 20)'} {wordCount > 500 && '(maximum 500)'}
            </span>
            <div className="flex flex-wrap gap-2">
              {/* Mood picker */}
              <div className="relative">
                <button
                  onClick={() => setShowMoodPicker(!showMoodPicker)}
                  className={`flex items-center gap-1 px-3 py-1.5 text-sm rounded-full border transition-dream ${
                    selectedMood
                      ? 'border-accent-secondary text-accent-secondary bg-accent-secondary/10'
                      : 'border-border text-text-secondary hover:border-accent-secondary hover:text-text-primary'
                  }`}
                >
                  {selectedMood || '+ Mood'}
                  <ChevronDown className="w-3 h-3" />
                </button>
                {showMoodPicker && (
                  <div className="absolute top-full left-0 mt-2 z-10 bg-bg-card border border-border rounded-xl p-2 min-w-[140px] shadow-xl">
                    {MOOD_OPTIONS.map((mood) => (
                      <button
                        key={mood}
                        onClick={() => {
                          setSelectedMood(selectedMood === mood ? null : mood)
                          setShowMoodPicker(false)
                        }}
                        className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-dream ${
                          selectedMood === mood
                            ? 'bg-accent-secondary/20 text-accent-secondary'
                            : 'hover:bg-bg-secondary text-text-secondary hover:text-text-primary'
                        }`}
                      >
                        {mood}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Recurring toggle */}
              <button
                onClick={() => setIsRecurring(!isRecurring)}
                className={`px-3 py-1.5 text-sm rounded-full border transition-dream ${
                  isRecurring
                    ? 'border-accent-primary text-accent-primary bg-accent-primary/10'
                    : 'border-border text-text-secondary hover:border-accent-primary hover:text-text-primary'
                }`}
              >
                {isRecurring ? '✓ Recurring' : '+ Recurring'}
              </button>

              {/* Lucid toggle */}
              <button
                onClick={() => setIsLucid(!isLucid)}
                className={`px-3 py-1.5 text-sm rounded-full border transition-dream ${
                  isLucid
                    ? 'border-accent-warm text-accent-warm bg-accent-warm/10'
                    : 'border-border text-text-secondary hover:border-accent-warm hover:text-text-primary'
                }`}
              >
                {isLucid ? '✓ Lucid' : '+ Lucid'}
              </button>
            </div>
          </div>
        </div>

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          disabled={!isValidLength || isLoading || !beliefProfile}
          className={`w-full flex items-center justify-center gap-2 font-semibold px-8 py-4 rounded-xl transition-dream ${
            isValidLength && !isLoading && beliefProfile
              ? 'bg-accent-primary hover:bg-accent-primary/90 text-white glow-violet'
              : 'bg-bg-card text-text-secondary cursor-not-allowed'
          }`}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Interpreting your dream...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              <span>Interpret My Dream</span>
              <Send className="w-5 h-5" />
            </>
          )}
        </button>

        {/* Loading state message */}
        {isLoading && (
          <p className="text-center text-text-secondary text-sm mt-4">
            Exploring your dream through {beliefProfile?.primary && 'three'} different lenses...
          </p>
        )}

        {/* Prompt suggestions */}
        {!isLoading && (
          <div className="mt-8 text-center">
            <p className="text-sm text-text-secondary mb-3">Need inspiration?</p>
            <div className="flex flex-wrap justify-center gap-2">
              {PROMPT_STARTERS.map((prompt) => (
                <button
                  key={prompt.label}
                  onClick={() => handlePromptStarter(prompt.text)}
                  className="px-3 py-1.5 text-sm bg-bg-card border border-border rounded-full hover:border-accent-secondary transition-dream"
                >
                  {prompt.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* No profile warning */}
        {!beliefProfile && (
          <div className="mt-6 text-center">
            <p className="text-text-secondary text-sm">
              For personalized interpretations,{' '}
              <button
                onClick={() => navigate('/quiz')}
                className="text-accent-primary hover:underline"
              >
                take the 2-minute quiz
              </button>{' '}
              first.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
