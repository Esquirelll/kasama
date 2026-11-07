import { useState } from 'react'
import { SignUpDialog } from '@/components/auth/SignUpDialog'
import { motion } from 'framer-motion'
import { Navigate, useLocation } from 'react-router-dom'
import { AirplaneBackdrop } from '@/components/layout/AirplaneBackdrop'
import { BrandPanel } from '@/components/login/BrandPanel'
import { LoginForm } from '@/components/login/LoginForm'
import { WaveDivider } from '@/components/ui/WaveDivider'
import { useAuth } from '@/hooks/useAuth'

/** Where to go after login: the page the user tried to open, otherwise /home. */
function targetAfterLogin(state: unknown): string {
  const from = (state as { from?: { pathname?: string; search?: string } } | null)?.from
  const path = from?.pathname
  return path && path.startsWith('/') && path !== '/login' ? path + (from?.search ?? '') : '/home'
}

export default function LoginPage() {
  const { loggedIn } = useAuth()
  const [signUp, setSignUp] = useState(false)
  const location = useLocation()
  // Already logged in (or just logged in): skip the login page.
  if (loggedIn) return <Navigate to={targetAfterLogin(location.state)} replace />

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-slate-main">
      <AirplaneBackdrop />
      <WaveDivider className="absolute inset-x-0 bottom-0 z-0 text-slate-light" />

      <div className="relative z-10 grid min-h-screen place-items-center px-4 py-10 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="grid w-full max-w-[1040px] overflow-hidden rounded-2xl border border-white/15 shadow-[0_30px_80px_rgba(12,36,60,0.55)] lg:grid-cols-2"
        >
          <BrandPanel />
          <LoginForm onSignUp={() => setSignUp(true)} />
        </motion.div>
      </div>
      <SignUpDialog open={signUp} onClose={() => setSignUp(false)} />
    </main>
  )
}
