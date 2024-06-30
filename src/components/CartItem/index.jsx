import React from 'react'
import { MdRemoveShoppingCart } from 'react-icons/md'
import { useCart } from '@context/CartContext.jsx'
import { deleteCart } from '@utils/services/customerServices.js'
import { createOrder } from '@utils/services/customerServices'
import { useNavigate } from 'react-router-dom'

const CartItem = ({
    cartId,
    imgSrc,
    productId,
    name,
    totalHarga,
    categoryName,
    totalProduct,
}) => {
    const { refreshCart } = useCart()
    const navigate = useNavigate()
    const handleRemove = async () => {
        await deleteCart(productId)
        refreshCart()
    }
    const handleAddToOrder = async () => {
        const data = {
            total_produk: totalProduct,
            total_harga: totalHarga,
            product_id: productId,
        }
        try {
            const response = await createOrder(data)
            navigate(`/my-orders/checkout/${response.dataOrder.id}`)
        } catch (error) {
            console.error(error)
        } finally {
        }
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
                        Total Product : {totalProduct}
                    </span>
                </div>
                <div className='flex items-center justify-between px-5 pb-5'>
                    <span className='text-base font-bold text-black'>
                        Rp. {totalHarga?.toLocaleString('id-Id')}
                    </span>
                    <button
                        className='h-12 px-2 font-semibold text-white rounded-md bg-primary '
                        onClick={handleAddToOrder}>
                        Order
                    </button>
                </div>
                <button
                    onClick={handleRemove}
                    className='absolute top-0 right-0 flex items-center justify-center w-8 h-8 text-xs text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full'>
                    <MdRemoveShoppingCart size={20} />
                </button>
            </div>
        </div>
    )
}

export default CartItem
