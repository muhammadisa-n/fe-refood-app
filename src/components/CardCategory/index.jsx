import React from 'react'
import { Link } from 'react-router-dom'

const CardCategory = ({ imgSrc, title, linkHref }) => {
    return (
        <>
            <div className='flex justify-center py-2'>
                <div className='w-full mx-2 bg-white border rounded-lg shadow '>
                    <img src={imgSrc} alt='' className='p-2 mx-auto' />
                    <div className='items-center text-center bg-secondary hover:bg-primary'>
                        <Link to={linkHref}>
                            <h5 className='text-xl font-semibold text-white'>
                                {title}
                            </h5>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CardCategory
