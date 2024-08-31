import React, { useEffect, useState } from 'react'
import defaultProfileImg from '@assets/userdefault.png'
import { useUser } from '@context/userContext.jsx'
import { RiMenu2Line } from 'react-icons/ri'
import { jwtDecode } from 'jwt-decode'
import { FaWhatsapp } from 'react-icons/fa'
const TopBar = ({ toggleSidebar }) => {
    const { user, refreshUser } = useUser()
    const [token, setToken] = useState(localStorage.getItem('access_token'))
    const decoded = jwtDecode(token)
    useEffect(() => {
        if (token) {
            refreshUser()
        }
    }, [])
    return (
        <div className='flex  items-center justify-between md:justify-end h-[70px] px-6 shadow-lg '>
            <div className='px-2'>
                <button
                    className='rounded-md text-primary md:hidden'
                    onClick={toggleSidebar}>
                    <RiMenu2Line size={32} />
                </button>
            </div>
            <div className='relative flex items-center gap-4 jus'>
                {decoded.user_role === 'Seller' ? (
                    <div className=''>
                        <a
                            type='button'
                            href={`https://wa.me/6287833380742?text=Halo,%20saya%20dari%20${user?.nama}%20Ingin%20Bertanya?`}
                            className='inline-flex w-full py-2 mx-1 mt-2 font-semibold text-white bg-green-500 rounded-lg'
                            target='_blank'>
                            <FaWhatsapp size={24} className='mx-2' />
                            Hubungi Admin
                        </a>
                    </div>
                ) : (
                    <></>
                )}
                <div className='flex items-center gap-3'>
                    <p className='font-bold tracking-widest'>{user?.nama}</p>
                    <img
                        src={
                            user?.ava_image_url
                                ? user.ava_image_url
                                : defaultProfileImg
                        }
                        alt='profile-image'
                        className='h-[50px] w-[50px] rounded-full object-cover'
                    />
                </div>
            </div>
        </div>
    )
}

export default TopBar
