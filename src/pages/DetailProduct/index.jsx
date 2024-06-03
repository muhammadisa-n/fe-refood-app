import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '@components/Header/index.jsx'
import Footer from '@components/Footer/index.jsx'
import { getProductById } from '@utils/services/productServices.js'

const DetailProductPage = () => {
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
        <>
            <Header />
            <div className='flex items-center justify-center max-w-full min-h-screen bg-light'>
                <div>
                    <div className='container px-5 py-24 mx-auto bg-white my-10'>
                        <div className='lg:w-4/5 mx-auto flex flex-wrap'>
                            <img
                                className='lg:w-1/2 w-full object-cover object-center rounded border border-gray-200'
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
                                    <button className='flex   ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded'>
                                        Button
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*<h1 className='text-3xl font-semibold text-primary font-inter'>*/}
                    {/*    Ini Detail Product id : {id}*/}
                    {/*</h1>*/}
                </div>
            </div>
            <Footer />
        </>
    )
}

export default DetailProductPage
