import React, { useEffect, useState } from 'react'
import MainLayout from '@layouts/MainLayout'
import Banner from '@components/Banner'
import CardProduct from '@components/CardProduct'
import { getAllProducts } from '@utils/services/productServices.js'
const HomePage = () => {
    const [products, setProducts] = useState([])
    const [take, setTake] = useState(8)
    const [skip, setSkip] = useState(0)
    const [totalProducts, setTotalProducts] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [page, setPage] = useState(1)
    useEffect(() => {
        const fetchProduct = async () => {
            setIsLoading(true)
            const response = await getAllProducts(take, skip)
            setProducts(response.products)
            setTotalProducts(response.totalProduct)
        }
        fetchProduct()
    }, [take, skip])

    const handlePrev = () => {
        if (skip > 0) {
            setSkip(skip - take)
            setPage(page - 1)
        }
    }
    const handleNext = () => {
        if (totalProducts > products.length) {
            setSkip(skip + take)
            setPage(page + 1)
        }
    }
    return (
        <MainLayout>
            <Banner />
            <div className='flex flex-col max-w-full mx-auto min-h-screen mt-10'>
                <div className='mt-10 text-center '>
                    <p className='text-3xl font-bold text-primary'>All Foods</p>
                </div>
                <div className='px-4 mt-10 text-center'>
                    <form action='#'>
                        <input
                            type='text'
                            className='w-[75%] px-2 py-4 text-primary border font-normal focus:ring-primary focus:ring-1 focus:outline-none rounded-lg'
                            placeholder='Search Food...'
                        />
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
                        <div className=' grid grid-cols-2 mx-36 my-10 md:grid-cols-4'>
                            {products.map((product, index) => (
                                <CardProduct
                                    key={index}
                                    id={product.id}
                                    name={product.name}
                                    productCategory={product.Category.name}
                                    description={product.description}
                                    price={product.price}
                                    imgSrc={product.image_url}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
            <div className='mb-20 text-center space-x-5'>
                {skip > 0 && (
                    <button
                        className='bg-primary text-white font-semibold px-3 py-2 hover:bg-secondary rounded-md'
                        onClick={() => handlePrev()}>
                        Prev
                    </button>
                )}
                {totalProducts > 8 && <span>{page}</span>}

                {totalProducts > products.length &&
                    skip + take < totalProducts && (
                        <button
                            className='bg-primary text-white font-semibold px-3 py-2 hover:bg-secondary rounded-md'
                            onClick={() => handleNext()}>
                            Next
                        </button>
                    )}
            </div>
        </MainLayout>
    )
}

export default HomePage
