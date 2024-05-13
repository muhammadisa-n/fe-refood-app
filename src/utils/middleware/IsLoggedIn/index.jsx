import React, { useContext } from "react"
import { Navigate, Outlet, useLocation } from "react-router-dom"
import AuthContext from "@context/authContext"
const IsLoggedIn = () => {
  const { loggedIn } = useContext(AuthContext)
  const location = useLocation()
  if (loggedIn === true) {
    return <Outlet />
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
}
export default IsLoggedIn
