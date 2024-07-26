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
        <div className='w-1/2 px-4 mb-6 md:w-1/3 lg:w-1/4'>
            <div className='flex flex-col overflow-hidden shadow-lg rounded-2xl'>
                <div className=''>
                    <img
                        src={imgSrc}
                        alt='product-image'
                        title={name}
                        className='object-cover w-full h-40 rounded-lg'
                    />
                </div>

                <div className='flex flex-col flex-1 p-4'>
                    <span className='text-xs font-bold text-gray-600'>
                        {productCategory}
                    </span>
                    <Link to={`product/detail/${id}`} className='flex-1'>
                        <h5 className='mt-2 text-xl font-semibold text-black'>
                            {name}
                        </h5>
                        <p className='text-sm text-gray-400 line-clamp-3'>
                            {description}
                        </p>
                    </Link>
                    <div className='flex items-center justify-between mt-2 '>
                        <div className='m'>
                            <span className='text-base font-bold text-black'>
                                Rp. {price?.toLocaleString('id-ID')}
                            </span>
                        </div>
                        <div>
                            <Link
                                to={`/product/detail/${id}`}
                                className='inline-block px-4 py-2 font-semibold text-white rounded-md bg-primary'>
                                Detail
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardProduct
