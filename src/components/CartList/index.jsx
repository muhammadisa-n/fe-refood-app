import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@components/Button/index.jsx'
import { BiSolidCartAdd } from 'react-icons/bi'

const CartList = ({ imgSrc, productId, name, price }) => {
    return (
        <div className='flex justify-center py-2 '>
            <div className='w-full max-w-sm mx-2 bg-white border rounded-lg shadow '>
                <img src={imgSrc} alt='' className='p-8 rounded-lg ' />
                <div className='px-5 pb-5'>
                    <Link to={`product/detail/${productId}`}>
                        <h5 className='text-xl font-semibold text-black'>
                            {name}
                        </h5>
                    </Link>
                </div>
                <div className='flex items-center justify-between px-5 pb-5'>
                    <span className='text-base font-bold text-black'>
                        Rp. {price}
                    </span>
                    <Button>
                        <BiSolidCartAdd size={25} />
                    </Button>
                    <Button>
                        <BiSolidCartAdd size={25} />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default CartList
