import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, ArrowLeft, Moon } from 'lucide-react'

// Types
type Lens = 'jungian' | 'spiritual' | 'neuroscience' | 'narrative' | 'cultural'

interface Answer {
  text: string
  scores: Partial<Record<Lens, number>>
}

interface Question {
  id: number
  text: string
  answers: Answer[]
}

interface BeliefProfile {
  primary: Lens
  secondary: Lens
  scores: Record<Lens, number>
}

// Quiz data from directive
const questions: Question[] = [
  {
    id: 1,
    text: "When something unexpected happens in your life, your first instinct is to...",
    answers: [
      { text: "Look for what it reveals about your deeper self", scores: { jungian: 2 } },
      { text: "Consider if there's a message or sign in it", scores: { spiritual: 2 } },
      { text: "Think about what psychological process might explain it", scores: { neuroscience: 2 } },
      { text: "See it as a chapter in your ongoing story", scores: { narrative: 2 } },
    ]
  },
  {
    id: 2,
    text: "If a friend described a vivid dream to you, you'd most want to ask...",
    answers: [
      { text: '"What feelings came up? What felt familiar?"', scores: { jungian: 2 } },
      { text: '"Do you think it was trying to tell you something?"', scores: { spiritual: 2 } },
      { text: '"What happened yesterday that might have triggered it?"', scores: { neuroscience: 2 } },
      { text: '"What\'s going on in your life right now?"', scores: { narrative: 2 } },
    ]
  },
  {
    id: 3,
    text: "The idea that resonates most with you is...",
    answers: [
      { text: "We all share deep universal patterns of experience", scores: { cultural: 2, jungian: 1 } },
      { text: "There's more to reality than what we can see and measure", scores: { spiritual: 2 } },
      { text: "The brain is the most fascinating machine ever built", scores: { neuroscience: 2 } },
      { text: "Everyone is the main character in their own epic story", scores: { narrative: 2 } },
    ]
  },
  {
    id: 4,
    text: "When you remember a powerful dream, you tend to focus on...",
    answers: [
      { text: "The symbols and images — what could they represent?", scores: { jungian: 2, cultural: 1 } },
      { text: "The feeling it left you with — like it meant something important", scores: { spiritual: 2 } },
      { text: "The connections to recent events or worries", scores: { neuroscience: 2 } },
      { text: "The storyline — why did it unfold that way?", scores: { narrative: 2 } },
    ]
  },
  {
    id: 5,
    text: "Which phrase feels most true to you?",
    answers: [
      { text: '"Know thyself" — the unexamined life isn\'t worth living', scores: { jungian: 2 } },
      { text: '"Everything happens for a reason" — even if we can\'t always see it', scores: { spiritual: 2 } },
      { text: '"The mind is what the brain does" — consciousness is beautiful biology', scores: { neuroscience: 2 } },
      { text: '"We tell ourselves stories in order to live"', scores: { narrative: 2, cultural: 1 } },
    ]
  },
  {
    id: 6,
    text: "You'd be most fascinated to learn that your dream...",
    answers: [
      { text: "Appears in myths and stories across every human culture", scores: { cultural: 2, jungian: 1 } },
      { text: "Was a visit from something beyond your conscious mind", scores: { spiritual: 2 } },
      { text: "Was your brain rehearsing for a real-world challenge", scores: { neuroscience: 2 } },
      { text: "Perfectly mirrors a turning point in your waking life", scores: { narrative: 2 } },
    ]
  }
]

const lensDescriptions: Record<Lens, { name: string; description: string }> = {
  jungian: {
    name: 'Archetypal',
    description: 'You see dreams as conversations with the deeper self. Symbols, shadows, and the collective unconscious speak to you.'
  },
  spiritual: {
    name: 'Mystical',
    description: 'You sense there\'s more than meets the eye. Dreams feel like messages from beyond ordinary consciousness.'
  },
  neuroscience: {
    name: 'Cognitive',
    description: 'You appreciate the elegant machinery of the mind. Dreams are the brain doing meaningful work while you sleep.'
  },
  narrative: {
    name: 'Storyteller',
    description: 'You understand life through story. Dreams are your subconscious writing the next chapter.'
  },
  cultural: {
    name: 'Universal',
    description: 'You see the patterns that connect all humans. Dreams tap into symbols shared across time and cultures.'
  }
}

// Restore from localStorage
const STORAGE_KEY = 'dreamlens_quiz_progress'

function loadProgress(): { currentQuestion: number; selectedAnswers: (number | null)[] } | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : null
  } catch {
    return null
  }
}

function saveProgress(currentQuestion: number, selectedAnswers: (number | null)[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ currentQuestion, selectedAnswers }))
}

function clearProgress() {
  localStorage.removeItem(STORAGE_KEY)
}

export default function Quiz() {
  const navigate = useNavigate()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(
    Array(questions.length).fill(null)
  )
  const [showResults, setShowResults] = useState(false)
  const [beliefProfile, setBeliefProfile] = useState<BeliefProfile | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Load saved progress on mount
  useEffect(() => {
    const saved = loadProgress()
    if (saved) {
      setCurrentQuestion(saved.currentQuestion)
      setSelectedAnswers(saved.selectedAnswers)
    }
  }, [])

  // Save progress on change
  useEffect(() => {
    if (!showResults) {
      saveProgress(currentQuestion, selectedAnswers)
    }
  }, [currentQuestion, selectedAnswers, showResults])

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = answerIndex
    setSelectedAnswers(newAnswers)

    // Auto-advance after selection with longer delay for visible feedback
    setIsTransitioning(true)
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
      } else {
        calculateResults(newAnswers)
      }
      setIsTransitioning(false)
    }, 600)
  }

  const calculateResults = (answers: (number | null)[]) => {
    const scores: Record<Lens, number> = {
      jungian: 0,
      spiritual: 0,
      neuroscience: 0,
      narrative: 0,
      cultural: 0
    }

    // Calculate scores
    answers.forEach((answerIndex, questionIndex) => {
      if (answerIndex !== null) {
        const answer = questions[questionIndex].answers[answerIndex]
        Object.entries(answer.scores).forEach(([lens, points]) => {
          scores[lens as Lens] += points
        })
      }
    })

    // Sort lenses by score (descending), then by recency as tiebreaker
    const sortedLenses = (Object.keys(scores) as Lens[]).sort((a, b) => {
      if (scores[b] !== scores[a]) return scores[b] - scores[a]
      // Tiebreaker: find last answer that contributed to each lens
      for (let i = answers.length - 1; i >= 0; i--) {
        const answerIndex = answers[i]
        if (answerIndex !== null) {
          const answer = questions[i].answers[answerIndex]
          const aHasPoints = (answer.scores[a] || 0) > 0
          const bHasPoints = (answer.scores[b] || 0) > 0
          if (aHasPoints && !bHasPoints) return -1
          if (bHasPoints && !aHasPoints) return 1
        }
      }
      return 0
    })

    const profile: BeliefProfile = {
      primary: sortedLenses[0],
      secondary: sortedLenses[1],
      scores
    }

    setBeliefProfile(profile)
    setShowResults(true)
    clearProgress()

    // Store in localStorage for dream input page
    localStorage.setItem('dreamlens_belief_profile', JSON.stringify(profile))
  }

  const handleBack = () => {
    if (currentQuestion > 0) {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentQuestion(currentQuestion - 1)
        setIsTransitioning(false)
      }, 150)
    }
  }

  const handleRetake = () => {
    setSelectedAnswers(Array(questions.length).fill(null))
    setCurrentQuestion(0)
    setShowResults(false)
    setBeliefProfile(null)
    clearProgress()
  }

  const handleContinue = () => {
    navigate('/dream')
  }

  // Results screen
  if (showResults && beliefProfile) {
    const primary = lensDescriptions[beliefProfile.primary]
    const secondary = lensDescriptions[beliefProfile.secondary]

    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
        <div className="max-w-lg w-full">
          {/* Result card */}
          <div className="bg-bg-card border border-border rounded-2xl p-8 mb-8 text-center">
            <div className="inline-flex items-center gap-2 text-accent-secondary mb-6">
              <Moon className="w-5 h-5" />
              <span className="text-sm font-medium">Your interpretation lens</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-display font-bold mb-3">
              {primary.name}
            </h1>
            <p className="text-text-secondary mb-8">
              {primary.description}
            </p>

            <div className="border-t border-border pt-6">
              <p className="text-sm text-text-secondary mb-2">Secondary lens</p>
              <p className="font-display font-semibold text-accent-primary">
                {secondary.name}
              </p>
              <p className="text-sm text-text-secondary mt-1">
                {secondary.description}
              </p>
            </div>
          </div>

          {/* Actions */}
          <button
            onClick={handleContinue}
            className="w-full flex items-center justify-center gap-2 bg-accent-primary hover:bg-accent-primary/90 text-white font-semibold px-8 py-4 rounded-xl transition-dream glow-violet mb-4"
          >
            <span>Tell me about your dream</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={handleRetake}
            className="w-full text-text-secondary hover:text-text-primary text-sm transition-dream"
          >
            Retake quiz
          </button>
        </div>
      </div>
    )
  }

  // Quiz screen
  const question = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <div className="max-w-xl w-full">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-text-secondary mb-2">
            <span>{currentQuestion + 1} of {questions.length}</span>
          </div>
          <div className="h-1 bg-bg-card rounded-full overflow-hidden">
            <div
              className="h-full bg-accent-primary transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div
          className={`transition-all duration-300 ${
            isTransitioning ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'
          }`}
        >
          <h2 className="text-xl md:text-2xl font-display font-semibold mb-8 leading-relaxed">
            {question.text}
          </h2>

          {/* Answers */}
          <div className="space-y-3">
            {question.answers.map((answer, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                  selectedAnswers[currentQuestion] === index
                    ? 'border-accent-primary bg-accent-primary/10'
                    : 'border-border hover:border-accent-primary/50 hover:bg-bg-secondary'
                }`}
              >
                {answer.text}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between">
          {currentQuestion > 0 ? (
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-dream"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          ) : (
            <div />
          )}
          <button
            onClick={handleRetake}
            className="text-text-secondary hover:text-text-primary text-sm transition-dream"
          >
            Start fresh
          </button>
        </div>
      </div>
    </div>
  )
}
