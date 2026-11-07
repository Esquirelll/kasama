import { useSyncExternalStore } from 'react'
import { DEMO_PASSWORD, DEMO_USERNAME, SESSION_KEY } from '@/config/demoAuth'

// DEMO ONLY: a sessionStorage flag, not real auth.
const listeners = new Set<() => void>()
const emit = () => listeners.forEach((l) => l())
const subscribe = (l: () => void) => {
  listeners.add(l)
  return () => listeners.delete(l)
}

export function isLoggedIn(): boolean {
  try {
    return sessionStorage.getItem(SESSION_KEY) === '1'
  } catch {
    return false
  }
}

export function login(username: string, password: string): boolean {
  if (username.trim() === DEMO_USERNAME && password === DEMO_PASSWORD) {
    try {
      sessionStorage.setItem(SESSION_KEY, '1')
    } catch {
      /* storage unavailable: session lasts only for this page load */
    }
    emit()
    return true
  }
  return false
}

export function logout(): void {
  try {
    sessionStorage.removeItem(SESSION_KEY)
  } catch {
    /* ignore */
  }
  emit()
}

export function useAuth() {
  const loggedIn = useSyncExternalStore(subscribe, isLoggedIn, () => false)
  return { loggedIn, login, logout }
}
