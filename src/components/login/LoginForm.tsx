import { useEffect, useId, useRef, useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/hooks/useAuth'

// DEMO ONLY: the check happens in the browser (see src/config/demoAuth.ts). It is not secure.
const field =
  'w-full rounded-full border border-white/70 bg-transparent px-5 py-3 font-body text-base text-white ' +
  'placeholder:text-white/45 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold'

const label = 'mb-2 block pl-1 font-nav text-xs uppercase tracking-nav text-white/80'

export function LoginForm({ onSignUp }: { onSignUp?: () => void }) {
  const { login } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')
  const userRef = useRef<HTMLInputElement>(null)
  const passRef = useRef<HTMLInputElement>(null)
  const errorId = useId()

  // Focus the first field on laptops only (on phones it would pop the keyboard open).
  useEffect(() => {
    if (window.matchMedia?.('(min-width: 1024px)').matches) userRef.current?.focus()
  }, [])

  function onSubmit(e: FormEvent) {
    e.preventDefault() // Enter key submits the form, and the page never reloads
    if (!username.trim() || !password) {
      setError('Please enter your username and password.')
      return
    }
    // On success the session flag is set and LoginPage redirects to /home.
    if (!login(username, password)) {
      setError("That username and password don't match. Please try again.")
      setPassword('')
      passRef.current?.focus()
    }
  }

  const invalid = error ? true : undefined

  return (
    <div className="flex flex-col justify-center bg-navy-deep px-7 py-10 sm:px-12 lg:px-14 lg:py-14">
      <h1 className="font-italic text-4xl text-shadow-soft sm:text-5xl">Sign in</h1>
      <span className="mt-3 block h-px w-16 bg-gold" aria-hidden="true" />
      <p className="mt-4 font-body text-white/75">Welcome back. Log in to see your destinations.</p>

      <form onSubmit={onSubmit} noValidate className="mt-8 space-y-5">
        <div>
          <label htmlFor="username" className={label}>Username</label>
          <input
            ref={userRef}
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            autoCapitalize="none"
            spellCheck={false}
            value={username}
            onChange={(e) => { setUsername(e.target.value); setError('') }}
            aria-invalid={invalid}
            aria-describedby={error ? errorId : undefined}
            className={field}
          />
        </div>

        <div>
          <label htmlFor="password" className={label}>Password</label>
          <div className="relative">
            <input
              ref={passRef}
              id="password"
              name="password"
              type={show ? 'text' : 'password'}
              autoComplete="current-password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError('') }}
              aria-invalid={invalid}
              aria-describedby={error ? errorId : undefined}
              className={`${field} pr-20`}
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              aria-pressed={show}
              aria-label={show ? 'Hide password' : 'Show password'}
              className="absolute right-4 top-1/2 -translate-y-1/2 font-nav text-xs uppercase tracking-nav text-white/80 hover:text-gold"
            >
              {show ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>

        <p
          id={errorId}
          role="alert"
          className={error ? 'border-l-2 border-gold pl-3 font-body text-sm text-white' : 'sr-only'}
        >
          {error}
        </p>

        <Button type="submit" variant="gold" className="w-full rounded-full">
          Sign in
        </Button>
      </form>

      {onSignUp && (
        <p className="mt-7 text-white/75">
          New to Kasama?{' '}
          <button type="button" onClick={onSignUp} className="font-semibold text-gold underline underline-offset-4 hover:text-white">Sign up</button>
        </p>
      )}
    </div>
  )
}
