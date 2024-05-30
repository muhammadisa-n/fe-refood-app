import { jwtDecode } from 'jwt-decode'
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
const IsAdmin = ({ children }) => {
    const token = localStorage.getItem('access_token')
    const data = jwtDecode(token)
    const location = useLocation()
    if (data.user_role === 'Admin') {
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
export default IsAdmin
