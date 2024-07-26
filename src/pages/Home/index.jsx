import React, { useEffect, useState } from 'react'
import MainLayout from '@layouts/MainLayout'
import Banner from '@components/Banner'
import CardProduct from '@components/CardProduct'
import { getAllProducts } from '@utils/services/productServices.js'
import { getAllCategory } from '@utils/services/categoryServices.js'
import { useDebounce } from 'use-debounce'
import CardCategory from '@components/CardCategory'
import FastFood from '@assets/fast-food.png'
import { Link } from 'react-router-dom'
import axios from 'axios'
const HomePage = () => {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [take, setTake] = useState(8)
    const [totalPage, setTotalPage] = useState()
    const [totalProduct, setTotalProduct] = useState()
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [searchValue] = useDebounce(search, 1000)

    const fetchProduct = async () => {
        try {
            const response = await getAllProducts(page, take, searchValue)
            setProducts(response.products)
            setTotalProduct(response.total_product)
            setPage(response.paging.current_page)
            setTotalPage(response.paging.total_page)
        } catch (error) {
            console.error('Failed to fetch products:', error)
        }
    }
    // const fetchCategory = async () => {
    //     try {
    //         const response = await getAllCategory()
    //         setCategories(response.categories)
    //     } catch (error) {
    //         console.error('Failed to fetch categories:', error)
    //     }
    // }
    useEffect(() => {
        fetchProduct()
    }, [page, take, searchValue])
    // useEffect(() => {
    //     fetchCategory()
    // }, [])
    const handlePrev = () => {
        if (page > 1) {
            setPage(page - 1)
        }
    }
    const handleNext = () => {
        if (page < totalPage) {
            setPage(page + 1)
        }
    }

    return (
        <MainLayout>
            <div className='container mx-auto mt-10 '>
                {/* <div className='flex flex-wrap'>
                    {categories.map((category, index) => (
                        <CardCategory
                            key={index}
                            title={category.nama}
                            imgSrc={FastFood}
                        />
                    ))}
                </div> */}
            </div>
            <div className='px-4 mt-10 text-center'>
                <input
                    type='text'
                    className='w-[75%] px-2 py-4 text-primary border font-semibold focus:ring-primary focus:ring-1 focus:outline-none rounded-lg bg-slate-100'
                    placeholder='Search Food...'
                    onChange={(e) => {
                        setSearch(e.target.value)
                    }}
                />
            </div>
            {totalProduct === 0 ? (
                <>
                    <div className='my-10 '>
                        <h5 className='text-4xl text-center text-slate-400'>
                            No Data Product
                        </h5>
                    </div>
                </>
            ) : (
                <>
                    <div className='container py-10 mx-auto'>
                        <div className='flex flex-wrap'>
                            {products.map((product, index) => (
                                <CardProduct
                                    key={index}
                                    id={product.id}
                                    name={product.nama}
                                    productCategory={product.Category.nama}
                                    description={product.deskripsi}
                                    price={product.harga}
                                    imgSrc={product.image_url}
                                />
                            ))}
                        </div>
                    </div>
                </>
            )}

            {totalPage > 1 && (
                <>
                    <div className='mb-20 space-x-5 text-center'>
                        <button
                            className='px-3 py-2 font-semibold text-white rounded-md bg-primary hover:bg-secondary disabled:bg-orange-700'
                            onClick={() => handlePrev()}
                            disabled={page === 1}>
                            Prev
                        </button>

                        <span>{page}</span>

                        <button
                            className={`bg-primary mb-2 text-white font-semibold px-3 py-2 hover:bg-secondary rounded-md  disabled:bg-orange-700`}
                            onClick={() => handleNext()}
                            disabled={page === totalPage || page > totalPage}>
                            Next
                        </button>
                    </div>
                </>
            )}
        </MainLayout>
    )
}

export default HomePage
