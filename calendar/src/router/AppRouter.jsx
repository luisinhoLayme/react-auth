import { Route, Routes } from "react-router-dom"
import { Navigate } from "react-router-dom"
import { useAuthStore } from "../hooks"
import { useEffect } from "react"
import { Auth } from '../auth'
import { CalendarPage } from '../calendar'

export const AppRouter = () => {

  const { status, checkAuthToken } = useAuthStore()

  useEffect(() => {
    checkAuthToken()
  }, [])

  // const authStatus = 'not-authenticated' // 'authenticated' // 'not-authenticated'
  if ( status === 'checking' ) {
    return (
      <p>Cargando...</p>
    )
  }

  return (
      <Routes>
        { status === 'not-authenticated'
          ? (
            <>
              <Route path="auth/login" element={ <Auth /> } />
              <Route path="*" element={ <Navigate to="/auth/login" /> } />
            </>
          )
          : (
            <>
              <Route path="/" element={ <CalendarPage /> } />
              <Route path="*" element={ <Navigate to="/" /> } />
            </>
          )
        }
      </Routes>
  )
}
