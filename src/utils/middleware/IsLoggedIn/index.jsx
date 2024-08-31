import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
const IsLoggedIn = () => {
    const token = localStorage.getItem('access_token')
    const location = useLocation()
    if (token) {
        return <Outlet />
    } else {
        return <Navigate to='/login' state={{ from: location }} replace />
    }
}
export default IsLoggedIn
