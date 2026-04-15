import LoginPage from "@/components/pages/LoginPage"
import Dashboard from "@/components/pages/Dashboard"
import { BrowserRouter, Routes, Route, Navigate } from "react-router"
import ProtectedRoute from "./ProtectedRoute"

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
