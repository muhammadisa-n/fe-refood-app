import React, { useEffect, useState } from 'react'
import Header from '@components/Header'
import Footer from '@components/Footer'
import Banner from '@components/Banner'
import foodImg1 from '@assets/fast.png'
import foodImg2 from '@assets/foodhome.png'

import CardCategory from '@components/CardCategory'
import CardProduct from '@components/CardProduct'
import { getAllProducts } from '@utils/services/productServices.js'
import { useCart } from '@context/CartContext'
const HomePage = () => {
    const { addToCart, refreshCart } = useCart()
    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await getAllProducts()
            setProducts(response)
        }
        fetchProduct()
    }, [])

    const handleAddCart = async (id) => {
        try {
            await addToCart(id)
            await refreshCart()
        } catch (error) {
            console.error(error)
        }
    }

    const categories = [
        {
            title: 'Fast Food',
            imgSrc: foodImg1,
            linkHref: '/category',
        },
        {
            title: 'Home Food',
            imgSrc: foodImg2,
            linkHref: '/category',
        },
    ]

    return (
        <>
            <Header />
            <Banner />
            <div className='flex flex-col max-w-full min-h-screen mt-10'>
                <div className='flex items-center w-40 px-4 mx-2 md:mx-[70px] text-center text-white rounded-md h-11 bg-primary'>
                    <p className='font-semibold'>Food Category</p>
                </div>
                <div className='grid grid-cols-2 mx-10 my-10 md:grid-cols-2'>
                    {categories.map((item, index) => (
                        <CardCategory
                            key={index}
                            imgSrc={item.imgSrc}
                            title={item.title}
                            linkHref={item.linkHref}
                        />
                    ))}
                </div>
                <div className='mt-10 text-center '>
                    <p className='text-3xl font-bold text-primary'>All Foods</p>
                </div>
                <div className='px-4 mt-10 text-center'>
                    <form action='#'>
                        <input
                            type='text'
                            className='w-[75%] px-2 py-4 text-primary font-normal focus:ring-primary focus:ring-1 focus:outline-none rounded-lg'
                            placeholder='Search Food...'
                        />
                        <button className='px-5 py-3 mx-2 text-lg font-semibold text-white rounded-lg bg-primary'>
                            Search
                        </button>
                    </form>
                </div>

                {products.length === 0 ? (
                    <>
                        <div className='mx-10 my-10 md:grid-cols-4'>
                            <h5 className='text-center text-slate-400 text-4xl'>
                                No Data Product
                            </h5>
                        </div>
                    </>
                ) : (
                    <>
                        <div className='grid grid-cols-3 mx-10 my-10 md:grid-cols-4'>
                            {products.map((product, index) => (
                                <CardProduct
                                    key={index}
                                    id={product.id}
                                    name={product.name}
                                    description={product.description}
                                    price={product.price}
                                    onClick={() => handleAddCart(product.id)}
                                    imgSrc={product.url_image}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>

            <Footer />
        </>
    )
}

export default HomePage
