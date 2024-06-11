import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProductById } from '@utils/services/productServices.js'
import DashboardLayout from '@layouts/DashboardLayout'
const AdminDetailProductPage = () => {
    const { id } = useParams()
    const [product, setProduct] = useState([])
    const [productNotFound, setProductNotFound] = useState(false)
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await getProductById(id)
                setProduct(response)
            } catch (error) {
                if (error.status_code === 404) {
                    setProductNotFound(true)
                }
            }
        }
        fetchProduct()
    }, [])
    return (
        <DashboardLayout>
            <div className='px-6 pt-6 '>
                <div className='flex flex-col '>
                    <h1 className='text-3xl font-semibold text-primary'>
                        Detail Product
                    </h1>
                </div>
                <div className='container px-2 py-10 mx-auto bg-white rounded-lg my-2 border'>
                    <div className='lg:w-4/5 mx-auto flex flex-wrap'>
                        <img
                            className='lg:w-1/3 w-full object-cover object-center rounded-lg border border-gray-200'
                            src={`${product.url_image}`}
                        />
                        <div className='lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0'>
                            <h2 className='text-sm title-font text-gray-500 tracking-widest'>
                                {product?.Category?.name}
                            </h2>
                            <h1 className='text-gray-900 text-3xl title-font font-medium mb-1'>
                                {product?.name}
                            </h1>
                            <p className='leading-relaxed'>
                                {product?.description}
                            </p>
                            <div className='flex mt-10'>
                                <span className='title-font font-medium text-2xl text-gray-900'>
                                    Rp {product?.price}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default AdminDetailProductPage
