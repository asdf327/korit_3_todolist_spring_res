import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google'

const gooleClientId = '606239361320-ahu6jvsu7a0tp5qputnlokav27no38pg.apps.googleusercontent.com';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={gooleClientId}>
      <App />
    </GoogleOAuthProvider>
    
  </StrictMode>,
)
