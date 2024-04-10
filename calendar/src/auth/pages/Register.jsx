import { useContext } from "react"
import { useForm } from "../../hooks/useForm"
import { AuthContext } from "../context/AuthContext"
import clsx from "clsx"
import Swal from "sweetalert2"
import { useAuthStore } from "../../hooks/useAuthStore"
import { useEffect } from "react"

const registerFormFields = {
  registerName: '',
  registerEmail: '',
  registerPassword: '',
  registerPassword2: ''
}

export const Register = () => {
  const { toggle, setToggle } = useContext(AuthContext)
  const { startRegister, errorMessage } = useAuthStore()

  const { registerName, registerEmail, registerPassword, registerPassword2, onIputChange:onRegisterInputChange } = useForm(registerFormFields)

  const registerSubmit = (e) => {
    e.preventDefault()
    if ( registerPassword !== registerPassword2 ) {
      Swal.fire('Error en registro', 'Las claves no son iguales', 'error')
      return;
    }

    startRegister({name: registerName, email: registerEmail, password: registerPassword})
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
        { 'hidden': !toggle }
      )
    }>
      <h2 className="text-center font-bold text-3xl mb-4">Registro</h2>
      <form onSubmit={registerSubmit} className="max-w-sm mx-auto animate-pulse-one">
        <div className="mb-5">
          <input
            type="text"
            className="input-auth"
            placeholder="Kylie Quuien"
            required
            name="registerName"
            value={registerName}
            onChange={onRegisterInputChange}
          />
        </div>
        <div className="mb-5">
          <input
            type="email"
            id="email"
            className="input-auth"
            placeholder="name@google.com"
            required
            name="registerEmail"
            value={registerEmail}
            onChange={onRegisterInputChange}
          />
        </div>
        <div className="mb-5">
          <input
            type="password"
            className="input-auth"
            placeholder="**************"
            required
            name="registerPassword"
            value={registerPassword}
            onChange={onRegisterInputChange}
          />
        </div>
        <div className="mb-5">
          <input
            type="password"
            className="input-auth"
            required
            placeholder="**************"
            name="registerPassword2"
            value={registerPassword2}
            onChange={onRegisterInputChange}
          />
        </div>
        <div className="flex items-start mb-5">
          <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Ya tienes una cuenta?
            <a
              href="#"
              onClick={() => setToggle(t => !t)}
              className="text-blue-600 hover:underline dark:text-blue-500"
            >
              Inicia Sesion
            </a>
          </label>
        </div>
        <button type="submit" className="button-form">Register new account</button>
      </form>
    </div>
  )
}
