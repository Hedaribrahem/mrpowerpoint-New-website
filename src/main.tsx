import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { AuthProvider } from '@/context/AuthContext'
import './index.css'
import App from './App.tsx'

// ✅ نتحقق من الـ hash قبل React يشتغل
const hash = window.location.hash;
const isRecovery = hash && hash.includes('type=recovery');

// ✅ إذا recovery، نحفظ الـ hash ونمسحه من URL عشان React Router ما يتعارض
if (isRecovery) {
  sessionStorage.setItem('supabase_recovery_hash', hash);
  // نمسح الـ hash من URL بدون ما نعمل refresh
  window.history.replaceState(null, '', window.location.pathname + window.location.search);
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