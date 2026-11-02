const AUTH_KEY = 'unplan-authenticated'

export function signIn() {
  window.sessionStorage.setItem(AUTH_KEY, 'true')
}

export function signOut() {
  window.sessionStorage.removeItem(AUTH_KEY)
}

export function isAuthenticated() {
  return window.sessionStorage.getItem(AUTH_KEY) === 'true'
}
