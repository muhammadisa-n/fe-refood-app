import { jwtDecode } from 'jwt-decode'
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
const IsAdminAndSeller = ({ children }) => {
    const location = useLocation()
    const token = localStorage.getItem('access_token')
    if (token) {
        const decoded = jwtDecode(token)
        if (decoded.user_role === 'Customer') {
            return (
                <Navigate
                    to='/access-forbidden'
                    state={{ from: location }}
                    replace
                />
            )
        } else {
            return children
        }
    }
}
export default IsAdminAndSeller
