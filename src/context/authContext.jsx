import axios from "axios"
import React, { createContext, useEffect, useState } from "react"
const AuthContext = createContext()
const AuthContextProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState(undefined)

  const getLoggedIn = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}` + "loggedIn",
      { withCredentials: true }
    )
    setLoggedIn(response.data.data.status)
    setUser(response.data.data.user)
    localStorage.setItem("data-app", JSON.stringify(response.data.data))
  }
  useEffect(() => {
    getLoggedIn()
  }, [])

  return (
    <AuthContext.Provider value={{ loggedIn, getLoggedIn, user }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
export { AuthContextProvider }
