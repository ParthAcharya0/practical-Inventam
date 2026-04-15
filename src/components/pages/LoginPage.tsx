import { useState } from "react"
import { useAuth } from "@/context/AuthContext"
import { Navigate } from "react-router"
import type { FormEvent } from "react"

export default function LoginPage() {
  const { login, isAuthenticated, isLoggingIn, loginError } = useAuth()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [localError, setLocalError] = useState<string | null>(null)

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLocalError(null)

    if (!username.trim() || !password.trim()) {
      setLocalError("Username and password are required.")
      return
    }

    await login(username, password)
  }

  const errorMessage = localError || loginError

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-lg shadow-black/5">
          <div className="mb-8">
            <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground">
              Login
            </h1>
          </div>
          {errorMessage && (
            <div className="mb-6 flex items-center gap-3 rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label
                htmlFor="login-username"
                className="block text-sm font-medium text-foreground"
              >
                Username
              </label>
              <input
                id="login-username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                autoComplete="username"
                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground transition-colors outline-none placeholder:text-muted-foreground"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="login-password"
                className="block text-sm font-medium text-foreground"
              >
                Password
              </label>
              <input
                id="login-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground transition-colors outline-none placeholder:text-muted-foreground"
              />
            </div>

            <button
              id="login-submit"
              type="submit"
              disabled={isLoggingIn}
              className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50"
            >
              {isLoggingIn ? (
                <span className="inline-flex items-center gap-2">
                  Signing in…
                </span>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <div className="mt-6 rounded-xl bg-muted/50 px-4 py-3 text-center text-xs text-muted-foreground">
            <span className="font-medium">Demo credentials:</span>
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-foreground">
              emilys
            </code>
            {" / "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-foreground">
              emilyspass
            </code>
          </div>
        </div>
      </div>
    </div>
  )
}
