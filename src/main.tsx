import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppProviders from './app/providers/AppProviders'
import '@/styles/tokens.css'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </StrictMode>,
)
