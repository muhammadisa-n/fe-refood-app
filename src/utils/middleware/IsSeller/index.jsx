import React from "react"
import { Navigate, useLocation } from "react-router-dom"
const IsSeller = ({ children }) => {
  const data = JSON.parse(localStorage.getItem("data-app"))
  const location = useLocation()
  if (data.user.role === "Seller") {
    return children
  } else {
    return (
      <Navigate to="/access-forbidden" state={{ from: location }} replace />
    )
  }
}
export default IsSeller
