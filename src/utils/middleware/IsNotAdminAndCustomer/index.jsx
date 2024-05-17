import React from "react"
import { Navigate, useLocation } from "react-router-dom"
const IsNotAdminAndSeller = ({ children }) => {
  const data = JSON.parse(localStorage.getItem("data-app"))
  const location = useLocation()
  if (data.user.role === "Customer") {
    return (
      <Navigate to="/access-forbidden" state={{ from: location }} replace />
    )
  } else {
    return children
  }
}
export default IsNotAdminAndSeller
