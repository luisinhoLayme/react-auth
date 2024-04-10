import { useDispatch, useSelector } from "react-redux"
import { calendarApi } from "../api"
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store/auth/authSlice"
import { onLogoutCalendar } from "../store"

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector( state => state.auth )
  const dispatch = useDispatch()

  const startLogin = async ({ email, password }) => {
    dispatch( onChecking() )

    try {
      const { data } = await calendarApi.post('/auth', { email, password })
      localStorage.setItem('token', data.token)
      localStorage.setItem('token-init-date', new Date().getTime())
      const {id, name} = data.user
      dispatch( onLogin({id, name}) )
    } catch (err) {
      dispatch(onLogout('Credenciales incorrectas'))
      setTimeout(() => {
        dispatch(clearErrorMessage())
      }, 10)
    }
  }
  const startRegister = async ({name, email, password}) => {
    dispatch(onChecking())

    try {
      const { data } = await calendarApi.post('/auth/new', { name, email, password })
      localStorage.setItem('token', data.token)
      localStorage.setItem('token-init-date', new Date().getTime())
      dispatch( onLogin({id: data.user.id, name: data.user.name}) )
    } catch (err) {
      // console.log(err.response.data)
      dispatch(onLogout(err.response.data?.error || ''))
      setTimeout(() => {
        dispatch(clearErrorMessage())
      }, 10)
    }
  }

  const checkAuthToken = async () => {
    const token = localStorage.getItem('token')
    if ( !token ) return dispatch(onLogout())

    try {
      const { data } = await calendarApi.get('auth/renew')
      localStorage.setItem('token', data.newToken)
      localStorage.setItem('token-init-date', new Date().getTime())
      dispatch( onLogin({id: data.id, name: data.name}) )
    } catch (err) {
      localStorage.clear()
      dispatch(onLogout())
    }
  }

  const startLogout = () => {
    localStorage.clear()
    dispatch(onLogoutCalendar())
    dispatch(onLogout())
  }

  return {
    // props
    errorMessage,
    user,
    status,

    //methods
    startLogin,
    startRegister,
    startLogout,
    checkAuthToken,
  }
}

