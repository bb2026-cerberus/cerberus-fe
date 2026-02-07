import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppProviders from './app/providers/AppProviders'
import registerServiceWorker from '@/app/pwa/registerServiceWorker'
import '@/styles/tokens.css'
import './index.css'
import App from './App.tsx'

registerServiceWorker()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </StrictMode>,
)
