import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { RequireAuth } from '@/components/layout/RequireAuth'
import { isLoggedIn } from '@/hooks/useAuth'
import HomePage from '@/pages/HomePage'
import LoginPage from '@/pages/LoginPage'

// Dev-only page: excluded from production builds entirely.
const DesignCheck = import.meta.env.DEV ? lazy(() => import('@/pages/DesignCheck')) : null

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={isLoggedIn() ? '/home' : '/login'} replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route element={<RequireAuth />}>
        <Route path="/home" element={<HomePage />} />
      </Route>
      {DesignCheck && (
        <Route
          path="/design-check"
          element={
            <Suspense fallback={null}>
              <DesignCheck />
            </Suspense>
          }
        />
      )}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
