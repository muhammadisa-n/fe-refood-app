import React from 'react'
import { Link } from 'react-router-dom'

const CardProduct = ({
    imgSrc,
    name,
    price,
    id,
    description,
    productCategory,
    diskon,
    seller,
}) => {
    const hargaSetelaDiskon = (harga, diskon) => {
        return diskon && diskon > 0 ? (harga * (100 - diskon)) / 100 : harga
    }

    return (
        <div className='w-full px-4 mb-6 sm:w-1/2 md:w-1/3 lg:w-1/4'>
            <div className='flex flex-col h-full overflow-hidden shadow-lg rounded-2xl'>
                <div className='w-full h-40'>
                    <img
                        src={imgSrc}
                        alt='product-image'
                        title={name}
                        className='object-cover w-full h-full rounded-t-lg'
                    />
                </div>

                <div className='flex flex-col flex-1 p-4'>
                    <span className='text-xs font-bold text-gray-600'>
                        {productCategory}
                    </span>
                    <Link
                        to={`/products?seller=${seller?.nama}`}
                        className='flex-1'>
                        <h5 className='mt-2 text-base font-semibold text-primary hover:text-orange-300'>
                            {seller?.nama}
                        </h5>
                    </Link>
                    <Link to={`product/detail/${id}`} className='flex-1'>
                        <h5 className='mt-2 text-xl font-semibold text-black'>
                            {name}
                        </h5>
                        <p className='text-sm text-gray-400 line-clamp-3'>
                            {description}
                        </p>
                    </Link>
                    <div className='mt-2'>
                        {diskon && diskon > 0 ? (
                            <>
                                <div className='flex justify-between'>
                                    <span className='text-base font-bold line-through text-slate-400'>
                                        Rp. {price?.toLocaleString('id-ID')}
                                    </span>
                                </div>
                                <span className='text-base font-bold text-black'>
                                    Rp.{' '}
                                    {hargaSetelaDiskon(
                                        price,
                                        diskon
                                    ).toLocaleString('id-ID')}
                                </span>
                            </>
                        ) : (
                            <span className='text-base font-bold text-black'>
                                Rp. {price?.toLocaleString('id-ID')}
                            </span>
                        )}
                    </div>
                    <div className='flex items-center justify-end mt-4'>
                        <Link
                            to={`/product/detail/${id}`}
                            className='inline-block px-4 py-2 font-semibold text-white rounded-md bg-primary'>
                            Detail
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardProduct
