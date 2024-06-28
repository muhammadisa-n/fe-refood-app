import React, { useEffect } from 'react'
import defaultProfileImg from '@assets/userdefault.png'
import { useUser } from '@context/userContext.jsx'
const TopBar = () => {
    const { user, refreshUser } = useUser()
    useEffect(() => {
        refreshUser()
    }, [])
    return (
        <div className='flex  items-center justify-end h-[70px] px-6 shadow-lg '>
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
