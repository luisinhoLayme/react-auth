import { FaCalendarAlt, FaSignOutAlt } from "react-icons/fa"
import { useAuthStore } from "../../hooks/useAuthStore"

export const Navbar = () => {

  const { user, startLogout } = useAuthStore()

  return (
    <header className="shadow shadow-slate-200 mb-2 flex justify-between items-center px-3 py-2">
      <span className="flex items-center gap-1 font-bold">
        <FaCalendarAlt />
        { user.name }
      </span>

      <button
        type="button"
        onClick={ startLogout }
        className=" flex items-center gap-1 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-4 py-2 text-center"
      >
        <FaSignOutAlt />
        Salir
      </button>
    </header>
  )
}

