import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react"
import axios from "axios"
import { loginUser } from "@/api/todoApi"
import type { LoginResponse } from "@/types/todoTypes"

interface AuthUser {
  id: number
  username: string
  firstName: string
  lastName: string
  email: string
  image: string
}

interface AuthContextType {
  user: AuthUser | null
  token: string | null
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<void>
  logout: () => void
  isLoggingIn: boolean
  loginError: string | null
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [loginError, setLoginError] = useState<string | null>(null)

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("auth_user")
      const storedToken = localStorage.getItem("auth_token")
      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser))
        setToken(storedToken)
      }
    } catch {
      localStorage.removeItem("auth_user")
      localStorage.removeItem("auth_token")
    }
  }, [])

  async function login(username: string, password: string) {
    setIsLoggingIn(true)
    setLoginError(null)
    try {
      const response = await loginUser({ username, password })
      const data: LoginResponse = response.data

      const authUser: AuthUser = {
        id: data.id,
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        image: data.image,
      }

      localStorage.setItem("auth_user", JSON.stringify(authUser))
      localStorage.setItem("auth_token", data.accessToken)
      localStorage.setItem("userId", String(data.id))

      setUser(authUser)
      setToken(data.accessToken)
    } catch (err: unknown) {
      let message = "Login failed. Please check your credentials."
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        message = err.response.data.message
      } else if (err instanceof Error) {
        message = err.message
      }
      setLoginError(message)
      throw err
    } finally {
      setIsLoggingIn(false)
    }
  }

  function logout() {
    setUser(null)
    setToken(null)
    localStorage.removeItem("auth_user")
    localStorage.removeItem("auth_token")
    localStorage.removeItem("userId")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user && !!token,
        login,
        logout,
        isLoggingIn,
        loginError,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return ctx
}
