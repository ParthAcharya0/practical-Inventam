import AppRoutes from "./routes/AppRoutes"
import { AuthProvider } from "./context/AuthContext"

export function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}

export default App
