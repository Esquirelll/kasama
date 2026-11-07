import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

/** DEMO ONLY guard: redirects to /login when the demo session flag is missing. */
export function RequireAuth() {
  const { loggedIn } = useAuth()
  const location = useLocation()
  return loggedIn ? <Outlet /> : <Navigate to="/login" replace state={{ from: location }} />
}
