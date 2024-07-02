import React, { useEffect } from 'react'
import defaultProfileImg from '@assets/userdefault.png'
import { useUser } from '@context/userContext.jsx'
import { RiMenu2Line } from 'react-icons/ri'
const TopBar = ({ toggleSidebar }) => {
    const { user, refreshUser } = useUser()
    useEffect(() => {
        refreshUser()
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

            <div className='relative flex items-center gap-4'>
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
