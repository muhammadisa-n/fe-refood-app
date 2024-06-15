import React from 'react'
import BannnerImage from '@assets/Banner.png'
const Banner = () => {
    return (
        <>
            <div className='hidden md:flex  h-[300px] w-[80%] mt-36 mx-auto'>
                <img src={BannnerImage} title='Banner' />
            </div>
        </>
    )
}

export default Banner
