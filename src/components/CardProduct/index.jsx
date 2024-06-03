import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '@components/Button'
import { BiSolidCartAdd } from 'react-icons/bi'
import { useCart } from '@context/CartContext'
const CardProduct = ({ imgSrc, name, price, id, description }) => {
    const [token, setToken] = useState(localStorage.getItem('access_token'))
    const { addToCart } = useCart()
    const handleAddToCart = async () => {
        try {
            const response = await addToCart(id)
            console.log(response.message)
        } catch (error) {
            console.error('Failed to add product to cart:', error.message)
        }
    }
    return (
        <div className='flex justify-center py-2 '>
            <div className='w-full max-w-sm mx-2 bg-white border rounded-lg shadow '>
                <img src={imgSrc} alt='' className='p-8 rounded-lg ' />
                <div className='px-5 pb-5'>
                    <Link to={`product/detail/${id}`}>
                        <h5 className='text-xl font-semibold text-black'>
                            {name}
                        </h5>
                        <p className='text-sm text-gray-400'>
                            {description.substring(0, 100)}
                        </p>
                    </Link>
                </div>
                <div className='flex items-center justify-between px-5 pb-5'>
                    <span className='text-base font-bold text-black'>
                        Rp. {price}
                    </span>
                    {token && (
                        <Button onClick={() => handleAddToCart()}>
                            <BiSolidCartAdd size={25} />
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CardProduct
