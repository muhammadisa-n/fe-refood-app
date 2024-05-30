import React from 'react'
import BannnerImage from '@assets/Banner.png'
const Banner = () => {
    return (
        <>
            <div className='h-[300px] w-full  items-center flex justify-center mt-5'>
                <img src={BannnerImage} title='Banner' />
            </div>
        </>
    )
}

export default Banner
