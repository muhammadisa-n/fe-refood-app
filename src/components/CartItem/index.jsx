import React from 'react'
import { MdRemoveShoppingCart } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const CartItem = ({ product, onRemove, total_harga, total_produk }) => {
    const { id, nama, harga, image_url } = product

    return (
        <div className='flex items-center justify-between py-4 border-b'>
            <div className='flex items-center'>
                <img
                    src={image_url}
                    alt={nama}
                    className='object-cover w-16 h-16 mr-4 rounded-lg'
                />
                <div>
                    <h2 className='text-lg font-semibold'>{nama}</h2>
                    <p className='text-gray-500'>
                        Rp {harga?.toLocaleString('id-ID')}
                    </p>
                    <p className='text-gray-600'>Jumlah: {total_produk}</p>
                    <p className='text-gray-600'>
                        Total Harga: Rp {total_harga?.toLocaleString('id-ID')}
                    </p>
                </div>
            </div>
            <button
                onClick={() => onRemove(id)}
                className='flex items-center justify-center w-8 h-8 text-red-500 transition duration-300 ease-in-out rounded-full hover:bg-red-100'>
                <MdRemoveShoppingCart size={20} />
            </button>
        </div>
    )
}

export default CartItem
