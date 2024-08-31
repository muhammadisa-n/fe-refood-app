import React, { createContext, useState, useContext, useEffect } from 'react'
import { getUser } from '@utils/services/userServices.js'
import { jwtDecode } from 'jwt-decode'

const UserContext = createContext()

export const useUser = () => {
    return useContext(UserContext)
}

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState([])
    const token = localStorage.getItem('access_token') || ''
    const [role, setRole] = useState()
    const refreshUser = async () => {
        if (token !== '') {
            try {
                const response = await getUser()
                setUser(response)
                const data = jwtDecode(token)
                setRole(data.user_role)
            } catch (error) {
                setUser(null)
                setRole('')
                console.error('Error Fetch User', error)
            }
        }
    }
    useEffect(() => {
        refreshUser()
    }, [token])
    return (
        <UserContext.Provider value={{ user, refreshUser, role }}>
            {children}
        </UserContext.Provider>
    )
}
