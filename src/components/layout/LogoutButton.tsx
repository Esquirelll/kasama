import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/hooks/useAuth'

/** Clears the DEMO session and returns to the login page. Reused by the nav in Phase 4. */
export function LogoutButton({ className = '' }: { className?: string }) {
  const { logout } = useAuth()
  const navigate = useNavigate()
  return (
    <Button
      variant="ghost"
      className={className}
      onClick={() => {
        logout()
        navigate('/login', { replace: true })
      }}
    >
      Log out
    </Button>
  )
}
