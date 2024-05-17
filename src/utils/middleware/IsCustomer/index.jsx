import React from "react"
import { Navigate, useLocation } from "react-router-dom"
const IsCustomer = ({ children }) => {
  const data = JSON.parse(localStorage.getItem("data-app"))
  const location = useLocation()
  if (data.user.role === "Customer") {
    return children
  } else {
    return (
      <Navigate to="/access-forbidden" state={{ from: location }} replace />
    )
  }
}
export default IsCustomer
