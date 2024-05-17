import React from "react"
import { Navigate, useLocation } from "react-router-dom"
const IsAdmin = ({ children }) => {
  const data = JSON.parse(localStorage.getItem("data-app"))
  const location = useLocation()
  if (data.user.role === "Admin") {
    return children
  } else {
    return (
      <Navigate to="/access-forbidden" state={{ from: location }} replace />
    )
  }
}
export default IsAdmin
