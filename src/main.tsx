import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router"
import './index.css'
import App from './App.tsx'
import { startMocks } from './mocks'

// Start MSW and then render the app
async function bootstrap() {
  try {
    if (import.meta.env.DEV) {
      console.log('🚀 Starting MSW...')
      // Start MSW but don't wait for it to complete
      startMocks().catch(error => {
        console.warn('⚠️ MSW failed to start:', error)
      })
    }
    
    console.log('🎨 Rendering app...')
    createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StrictMode>,
    )
    console.log('✅ App rendered successfully')
  } catch (error) {
    console.error('❌ Failed to start app:', error)
  }
}

bootstrap()
