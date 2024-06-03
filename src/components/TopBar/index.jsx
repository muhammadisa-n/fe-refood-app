import React, { useEffect, useState } from 'react'
import { FaRegBell } from 'react-icons/fa'
import defaultProfileImg from '@assets/userdefault.png'
import { getUser } from '@utils/services/userServices.js'
const TopBar = () => {
    const [user, setUser] = useState([])
    const [token, setToken] = useState(localStorage.getItem('access_token'))
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await getUser()
                setUser(response)
            } catch (error) {
                setUser(null)
                console.error('Error Fetch User', error)
            }
        }
        if (token) {
            fetchUser()
        }
    }, [token])
    return (
        <div className='hidden md:flex items-center justify-end h-[70px] px-6 shadow-lg '>
            <div className='relative flex items-center gap-4'>
                <div className='flex items-center gap-3 pr-6 border-r-[1px] border-white'>
                    <FaRegBell></FaRegBell>
                </div>
                <div className='flex items-center gap-3'>
                    <p className='font-bold tracking-widest'>
                        {user?.fullname}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default TopBar
