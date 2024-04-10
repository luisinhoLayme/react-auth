import { useContext } from "react"
import { useForm } from "../../hooks/useForm"
import { AuthContext } from "../context/AuthContext"
import clsx from "clsx"
import { useAuthStore } from "../../hooks/useAuthStore"
import { useEffect } from "react"
import Swal from "sweetalert2"

const loginFormFields = {
  loginEmail: '',
  loginPassword: ''
}

export const Login = () => {

  const { startLogin, errorMessage } = useAuthStore()

  const { toggle, setToggle } = useContext(AuthContext)
  const { loginEmail, loginPassword, onIputChange: onLoginInputChange } = useForm(loginFormFields)

  const loginSubmit = (e) => {
    e.preventDefault()
    startLogin({ email: loginEmail, password: loginPassword })
  }

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire('Error en la autenticacion', errorMessage, 'error')
    }
  }, [errorMessage])

  return (
    <div className={
      clsx(
        "min-w-[90svw] my-sm:min-w-[unset] my-sm:max-w-sm my-sm:w-[24rem] p-2  shadow shadow-current rounded-md",
        { 'hidden': toggle }
      )
    }>
      <h2 className="text-center font-bold text-3xl mb-4">Ingreso</h2>
      <form onSubmit={loginSubmit} className="max-w-sm animate-pulse-one">
        <div className="mb-5">
          <input
            type="email"
            className="input-auth"
            placeholder="name@google.com"
            required
            name="loginEmail"
            value={loginEmail}
            onChange={onLoginInputChange}
          />
        </div>
        <div className="mb-5">
          <input
            type="password"
            className="input-auth"
            placeholder="***********"
            required
            name="loginPassword"
            value={loginPassword}
            onChange={onLoginInputChange}
          />
        </div>
        <div className="flex items-start mb-5">
          <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            No tienes cuenta?
            <a
              href="#"
              onClick={() => setToggle(t => !t)}
              className="text-blue-600 ml-2 hover:underline dark:text-blue-500"
            >
              Crea un cuenta
            </a>
          </label>
        </div>
        <button type="submit" className="button-form">Submit</button>
      </form>
    </div>
  )
}
