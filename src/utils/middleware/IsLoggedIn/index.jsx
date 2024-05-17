import React from "react"
import { Navigate, Outlet, useLocation } from "react-router-dom"
const IsLoggedIn = () => {
  const data = JSON.parse(localStorage.getItem("data-app"))
  const location = useLocation()
  if (data.status === true) {
    return <Outlet />
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
}
export default IsLoggedIn
