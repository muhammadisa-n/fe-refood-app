import React from 'react'
import { Link } from 'react-router-dom'

const CardCategory = ({ imgSrc, title, linkHref }) => {
    return (
        <div className='w-1/2 px-2 mb-4 text-center cursor-pointer lg:w-1/6'>
            <div className='flex flex-col items-center justify-between'>
                <div className='w-16 h-16 overflow-hidden rounded-md'>
                    <img
                        src={imgSrc}
                        alt={title}
                        className='object-cover w-full h-full'
                    />
                </div>
                <div className=''>
                    <h3 className='font-bold text-gray-800'>{title}</h3>
                </div>
            </div>
        </div>
    )
}

export default CardCategory
