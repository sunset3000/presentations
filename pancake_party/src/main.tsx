import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '@/pancake_party/src/App'
import '@/src/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
