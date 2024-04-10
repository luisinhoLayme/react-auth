import { useState } from "react"
import { AuthContext } from "./AuthContext"

export const AuthProvider = ({ children }) => {

  const [ toggle, setToggle ] = useState(false)

  return (
    <AuthContext.Provider value={{ toggle, setToggle }}>
      { children }
    </AuthContext.Provider>
  )
}
