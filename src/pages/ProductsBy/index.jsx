import React, { useEffect, useState } from 'react'
import MainLayout from '@layouts/MainLayout'
import CardProduct from '@components/CardProduct'
import { getAllProducts } from '@utils/services/productServices.js'
import { useDebounce } from 'use-debounce'
import ImgDefault from '@assets/seller_default.png'
import { useLocation, useNavigate } from 'react-router-dom'
import { FaWhatsapp } from 'react-icons/fa'
const ProductsByPage = () => {
    const [products, setProducts] = useState([])
    const [take, setTake] = useState(4)
    const [totalPage, setTotalPage] = useState()
    const [totalProduct, setTotalProduct] = useState()
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [searchValue] = useDebounce(search, 1000)
    const query = new URLSearchParams(useLocation().search)
    const sellerNamequery = decodeURIComponent(query.get('seller'))

    const fetchProduct = async () => {
        try {
            const response = await getAllProducts(
                page,
                take,
                searchValue,
                sellerNamequery
            )
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
    }, [page, take, searchValue, sellerNamequery])
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
    const convertPhoneNumber = (phoneNumber) => {
        if (phoneNumber?.startsWith('08')) {
            return '62' + phoneNumber.slice(1)
        }
        return phoneNumber
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
                    <div className='h-32 mx-2 mt-8 bg-white rounded-md shadow-xl md:mb-10 md:flex md:flex-wrap md:mx-32'>
                        <div className='flex'>
                            <div className='flex px-3 border-r-2 border-gray-500 md:px-8 md:my-2'>
                                <div className='my-auto mr-4 md:mr-8'>
                                    <img
                                        className='object-cover w-10 h-10 border border-gray-300 rounded-full md:w-20 md:h-20'
                                        src={
                                            products[0]?.Seller
                                                ?.ava_image_url || ImgDefault
                                        }
                                        alt={
                                            products[0]?.Seller?.nama ||
                                            'Seller Name'
                                        }
                                    />
                                </div>
                                <div className='my-auto'>
                                    <p className='text-xs font-semibold md:text-xl'>
                                        {products[0]?.Seller?.nama ||
                                            'Seller Name'}
                                    </p>
                                </div>
                            </div>
                            <div className='w-5/12 mx-3 my-auto text-gray-500 md:w-8/12 max-sm:text-sm '>
                                <p className='text-sm font-semibold md:text-base'>
                                    {products[0]?.Seller?.alamat || 'Alamat'},
                                    {products[0]?.Seller?.kelurahan ||
                                        'Kelurahan'}
                                    ,
                                    {products[0]?.Seller?.kecamatan ||
                                        'Kecamatan'}
                                    ,{products[0]?.Seller?.kota || 'Kota'},
                                    {products[0]?.Seller?.provinsi ||
                                        'Provinsi'}
                                    ,
                                    {products[0]?.Seller?.kode_pos ||
                                        'Kode Pos'}
                                </p>
                                <a
                                    href={`https://wa.me/${convertPhoneNumber(products[0]?.Seller?.no_hp)}?text=Hai,%20Apakah%20Produk%20Tersedia?`}
                                    className=''
                                    target='_blank'>
                                    <button className='inline-flex px-2 py-2 mt-3 font-bold text-white bg-green-500 rounded-full hover:bg-green-700'>
                                        <FaWhatsapp
                                            size={24}
                                            className='mx-2'
                                        />
                                        Hubungi Penjual
                                    </button>
                                </a>
                            </div>
                        </div>
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

                    <div className='container py-10 mx-auto'>
                        <p className='mt-3 mb-10 ml-10 text-3xl font-semibold text-primary'>
                            All Product
                        </p>
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

export default ProductsByPage
