import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { AuthProvider } from '@/context/AuthContext'
import './index.css'
import App from './App.tsx'

// ✅ نحفظ الـ hash قبل React Router يمسحه
const hash = window.location.hash;
if (hash && hash.includes('access_token')) {
  sessionStorage.setItem('supabase_auth_hash', hash);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)