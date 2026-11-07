import '@fontsource/bebas-neue/400.css'
import '@fontsource/shrikhand/400.css'
import '@fontsource/fredoka/300.css'
import '@fontsource/fredoka/400.css'
import '@fontsource/fredoka/600.css'
import '@fontsource/josefin-sans/300.css'
import '@fontsource/josefin-sans/400.css'
import '@fontsource/allura/400.css'
import './index.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'framer-motion'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
        <App />
      </BrowserRouter>
    </MotionConfig>
  </StrictMode>,
)
