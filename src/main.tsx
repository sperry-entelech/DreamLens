import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'

// Layout
import Layout from './components/Layout'

// Pages
import Landing from './pages/Landing'
import Quiz from './pages/Quiz'
import Dream from './pages/Dream'
import Results from './pages/Results'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="quiz" element={<Quiz />} />
          <Route path="dream" element={<Dream />} />
          <Route path="results" element={<Results />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
