import React, { useState } from 'react'
import { Link } from 'react-router-dom'
const CardProduct = ({
    imgSrc,
    name,
    price,
    id,
    description,
    productCategory,
}) => {
    return (
        <div className='flex justify-center'>
            <div className='w-full  max-w-sm mx-6 bg-white border rounded-lg shadow '>
                <img
                    src={imgSrc}
                    alt='product-image'
                    title={name}
                    className='p-2 mx-auto rounded-lg md:h-[200px]   w-[200px] object-cover '
                />
                <div className='px-2 pb-2'>
                    <span className='text-xs font-bold text-gray-600'>
                        {productCategory}
                    </span>
                    <Link to={`product/detail/${id}`}>
                        <h5 className='text-xl font-semibold text-black'>
                            {name}
                        </h5>
                        <div className='md:h-16'>
                            <p className='text-sm text-gray-400'>
                                {description.substring(0, 75)}
                                {'...'}
                            </p>
                        </div>
                    </Link>
                </div>
                <div className='flex items-center justify-between px-2 pb-2 mt-5'>
                    <span className='text-base font-bold text-black'>
                        Rp. {price}
                    </span>
                    <Link
                        to={`product/detail/${id}`}
                        className=' h-10 px-1 py-2 font-semibold text-white rounded-md bg-primary items-center justify-center'
                        text-center>
                        Detail
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default CardProduct
