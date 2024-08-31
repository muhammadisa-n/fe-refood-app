import { jwtDecode } from 'jwt-decode'
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
const IsSeller = ({ children }) => {
    const location = useLocation()
    const token = localStorage.getItem('access_token')
    if (token) {
        const decoded = jwtDecode(token)
        if (decoded.user_role === 'Seller') {
            return children
        } else {
            return (
                <Navigate
                    to='/access-forbidden'
                    state={{ from: location }}
                    replace
                />
            )
        }
    }
}
export default IsSeller
