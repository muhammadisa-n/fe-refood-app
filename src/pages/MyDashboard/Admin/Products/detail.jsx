import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
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
                {productNotFound ? (
                    <div className='container px-2 py-10 mx-auto my-2 bg-white border rounded-lg'>
                        <h5 className='text-2xl text-center'>
                            Product Not Found
                        </h5>
                    </div>
                ) : (
                    <div className='container px-2 py-10 mx-auto my-2 bg-white border rounded-lg'>
                        <div className='flex flex-wrap mx-auto lg:w-4/5'>
                            <img
                                className='object-cover object-center w-full border border-gray-200 rounded-lg lg:w-1/3'
                                src={`${product.image_url}`}
                            />
                            <div className='w-full mt-6 lg:w-1/2 lg:pl-10 lg:py-6 lg:mt-0'>
                                <h2 className='text-sm tracking-widest text-gray-500 title-font'>
                                    {product?.Category?.nama}
                                </h2>
                                <h1 className='mb-1 text-3xl font-medium text-gray-900 title-font'>
                                    {product?.nama}
                                </h1>
                                <p className='leading-relaxed'>
                                    {product?.deskripsi}
                                </p>
                                <div className='flex mt-10'>
                                    <span className='text-2xl font-medium text-gray-900 title-font'>
                                        Rp {product?.harga}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    )
}

export default AdminDetailProductPage
