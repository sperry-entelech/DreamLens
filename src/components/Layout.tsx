import { Outlet, Link, useLocation } from 'react-router-dom'
import { Moon, Sparkles } from 'lucide-react'

export default function Layout() {
  const location = useLocation()
  const isLanding = location.pathname === '/'

  return (
    <div className="min-h-screen cosmic-bg">
      {/* Navigation - hidden on landing page */}
      {!isLanding && (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-bg-primary/80 backdrop-blur-md">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center gap-2 text-xl font-display font-semibold text-text-primary hover:text-accent-primary transition-dream"
            >
              <Moon className="w-6 h-6 text-accent-primary" />
              DreamLens
            </Link>
            <div className="flex items-center gap-1 text-text-secondary text-sm">
              <Sparkles className="w-4 h-4" />
              <span>Explore your dreams</span>
            </div>
          </div>
        </nav>
      )}

      {/* Main content */}
      <main className={!isLanding ? 'pt-20' : ''}>
        <Outlet />
      </main>
    </div>
  )
}
