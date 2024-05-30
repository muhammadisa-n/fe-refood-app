import { jwtDecode } from 'jwt-decode'
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
const IsCustomer = ({ children }) => {
    const location = useLocation()
    const token = localStorage.getItem('access_token')
    if (token) {
        try {
            const decoded = jwtDecode(token)
            if (decoded.user_role === 'Customer') {
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
        } catch (e) {
            return <Navigate to='/login' state={{ from: location }} replace />
        }
    }
}
export default IsCustomer
