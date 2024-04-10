import { AuthProvider } from "../context/AuthProvider"
import { Login, Register } from "../pages"

export const Auth = () => {

  return (
    <AuthProvider>
      <section className="grid bg-[#403E3E] text-white place-content-center min-h-svh">
        <Login />
        <Register />
      </section>
    </AuthProvider>
  )
}
