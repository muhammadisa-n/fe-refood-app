import React from 'react'
import { MdRemoveShoppingCart } from 'react-icons/md'
import { useCart } from '@context/CartContext.jsx'
import { deleteCart } from '@utils/services/cartServices.js'

const CartItem = ({
    cartId,
    imgSrc,
    productId,
    name,
    totalPrice,
    categoryName,
    quantity,
}) => {
    const { refreshCart } = useCart()

    const handleRemove = async () => {
        await deleteCart(productId)
        refreshCart()
    }
    return (
        <div className='flex justify-center py-2' key={cartId}>
            <div className=' w-[400px]  mx-2 bg-white border rounded-lg relative'>
                <img
                    src={imgSrc}
                    alt=''
                    className=' h-[250px] p-8 rounded-lg '
                />
                <div className='px-5 pb-5'>
                    <span className='text-xs font-bold text-gray-600'>
                        {categoryName}
                    </span>
                    <h5 className='text-xl font-semibold text-black'>{name}</h5>
                    <span className='text-xs font-semibold text-black'>
                        Total Product : {quantity}
                    </span>
                </div>
                <div className='flex items-center justify-between px-5 pb-5'>
                    <span className='text-base font-bold text-black'>
                        Rp. {totalPrice}
                    </span>
                    <button
                        className='h-12 px-2 text-white rounded-md bg-primary font-semibold '
                        onClick={() => alert('success')}>
                        Create Order
                    </button>
                </div>
                <button
                    onClick={handleRemove}
                    className='absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white rounded-full text-xs w-8 h-8 flex items-center justify-center'>
                    <MdRemoveShoppingCart size={20} />
                </button>
            </div>
        </div>
    )
}

export default CartItem
