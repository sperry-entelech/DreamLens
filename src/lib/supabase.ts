import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '⚠️ Supabase credentials not found!\n\n' +
    'To set up Supabase:\n' +
    '1. Create a project at https://supabase.com\n' +
    '2. Copy your project URL and anon key\n' +
    '3. Create a .env file with:\n' +
    '   VITE_SUPABASE_URL=your_url\n' +
    '   VITE_SUPABASE_ANON_KEY=your_key\n' +
    '4. Restart the dev server'
  )
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder'
)

// Type definitions for our database
export interface BeliefProfile {
  primary: string
  secondary: string
  scores: Record<string, number>
}

export interface Dream {
  id: string
  user_id?: string
  dream_text: string
  created_at: string
}

export interface Interpretation {
  id: string
  dream_id: string
  lens: string
  interpretation: string
  created_at: string
}

export interface WaitlistEntry {
  id: string
  email: string
  created_at: string
}
