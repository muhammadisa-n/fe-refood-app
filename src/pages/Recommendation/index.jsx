import React, { useEffect, useState } from 'react'
import MainLayout from '@layouts/MainLayout'
import CardProduct from '@components/CardProduct'
import axios from 'axios'
import { getAllProductRecomendation } from '../../utils/services/customerServices'
import { useDebounce } from 'use-debounce'

const RecommendationPage = () => {
    const [products, setProducts] = useState([])
    const [size, setSize] = useState(8)
    const [totalPage, setTotalPage] = useState()
    const [totalProduct, setTotalProduct] = useState()
    const [preferensiRasa, setPreferensiRasa] = useState('')
    const [jenisMakanan, setJenisMakanan] = useState('')
    const [kebutuhanDiet, setKebutuhanDiet] = useState('Tidak Ada')
    const [bahanDisukai, setBahanDisukai] = useState([])
    const [bahanTidakDisukai, setBahanTidakDisukai] = useState([])
    const [prediksi, setPrediksi] = useState('')
    const [prediksiMenu, setPrediksiMenu] = useState([])
    const [take, setTake] = useState(8)
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [searchValue] = useDebounce(prediksi, 100)
    const [isButtonDisabled, setIsButtonDisabled] = useState(true)

    // const fetchProduct = async () => {
    //     if (prediksi !== '') {
    //         try {
    //             const response = await getAllProductRecomendation(
    //                 page,
    //                 take,
    //                 searchValue
    //             )
    //             setProducts(response.products)
    //             setTotalProduct(response.total_product)
    //             setPage(response.paging.current_page)
    //             setTotalPage(response.paging.total_page)
    //         } catch (error) {
    //             console.error('Failed to fetch products:', error)
    //         }
    //     } else {
    //         setTotalProduct(0)
    //     }
    // }

    // useEffect(() => {
    //     fetchProduct()
    // }, [page, take, searchValue])

    useEffect(() => {
        const checkIfButtonShouldBeDisabled = () => {
            if (bahanDisukai.length === 0 && bahanTidakDisukai.length === 0) {
                setIsButtonDisabled(true)
            } else {
                setIsButtonDisabled(false)
            }
        }

        checkIfButtonShouldBeDisabled()
    }, [bahanDisukai, bahanTidakDisukai])

    const handleRecommendation = async () => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_RECOMMENDATION_API_URL}`,
                {
                    bahan_disukai: bahanDisukai.join(','),
                    bahan_tidak_disukai: bahanTidakDisukai.join(','),
                }
            )
            setProducts(response.data.result.products_by_category)
            console.log(response.data.result)
        } catch (error) {
            console.error('Gagal mengambil rekomendasi:', error)
        }
    }

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

    const handleBahanDisukaiChange = (e) => {
        const { value } = e.target
        if (
            !bahanDisukai.includes(value) &&
            !bahanTidakDisukai.includes(value)
        ) {
            setBahanDisukai([...bahanDisukai, value])
        } else {
            setBahanDisukai(bahanDisukai.filter((item) => item !== value))
        }
    }

    const handleBahanTidakDisukaiChange = (e) => {
        const { value } = e.target
        if (
            !bahanTidakDisukai.includes(value) &&
            !bahanDisukai.includes(value)
        ) {
            setBahanTidakDisukai([...bahanTidakDisukai, value])
        } else {
            setBahanTidakDisukai(
                bahanTidakDisukai.filter((item) => item !== value)
            )
        }
    }

    const isBahanDisukaiChecked = (value) => bahanDisukai.includes(value)

    const isBahanTidakDisukaiChecked = (value) =>
        bahanTidakDisukai.includes(value)

    const isDisabledDisukai = (value) => bahanTidakDisukai.includes(value)

    const isDisabledTidakDisukai = (value) => bahanDisukai.includes(value)

    return (
        <MainLayout>
            <div className='flex flex-col max-w-full mx-auto mt-10'>
                <div className='container py-5 mx-auto'>
                    <div className='flex flex-wrap mt-4'>
                        <div className='flex flex-col w-1/3'>
                            <p className='text-xl'>Bahan yang Disukai:</p>
                            <div>
                                <input
                                    type='checkbox'
                                    id='Ayam'
                                    name='Ayam'
                                    value='Ayam'
                                    checked={isBahanDisukaiChecked('Ayam')}
                                    onChange={handleBahanDisukaiChange}
                                    disabled={isDisabledDisukai('Ayam')}
                                />
                                <label htmlFor='Ayam'> Ayam</label>
                            </div>
                            <div>
                                <input
                                    type='checkbox'
                                    id='Ikan'
                                    name='Ikan'
                                    value='Ikan'
                                    checked={isBahanDisukaiChecked('Ikan')}
                                    onChange={handleBahanDisukaiChange}
                                    disabled={isDisabledDisukai('Ikan')}
                                />
                                <label htmlFor='Ikan'> Ikan</label>
                            </div>
                            <div>
                                <input
                                    type='checkbox'
                                    id='Sayuran'
                                    name='Sayuran'
                                    value='Sayuran'
                                    checked={isBahanDisukaiChecked('Sayuran')}
                                    onChange={handleBahanDisukaiChange}
                                    disabled={isDisabledDisukai('Sayuran')}
                                />
                                <label htmlFor='Sayuran'> Sayuran</label>
                            </div>
                            <div>
                                <input
                                    type='checkbox'
                                    id='Telor'
                                    name='Telor'
                                    value='Telor'
                                    checked={isBahanDisukaiChecked('Telor')}
                                    onChange={handleBahanDisukaiChange}
                                    disabled={isDisabledDisukai('Telor')}
                                />
                                <label htmlFor='Telor'> Telor</label>
                            </div>
                        </div>
                        <div className='flex flex-col w-1/3'>
                            <p className='text-xl'>Bahan yang Tidak Disukai:</p>
                            <div>
                                <input
                                    type='checkbox'
                                    id='ayam-tdk'
                                    name='ayam-tdk'
                                    value='Ayam'
                                    checked={isBahanTidakDisukaiChecked('Ayam')}
                                    onChange={handleBahanTidakDisukaiChange}
                                    disabled={isDisabledTidakDisukai('Ayam')}
                                />
                                <label htmlFor='ayam-tdk'> Ayam</label>
                            </div>
                            <div>
                                <input
                                    type='checkbox'
                                    id='ikan-tdk'
                                    name='ikan-tdk'
                                    value='Ikan'
                                    checked={isBahanTidakDisukaiChecked('Ikan')}
                                    onChange={handleBahanTidakDisukaiChange}
                                    disabled={isDisabledTidakDisukai('Ikan')}
                                />
                                <label htmlFor='ikan-tdk'> Ikan</label>
                            </div>
                            <div>
                                <input
                                    type='checkbox'
                                    id='telor-tdk'
                                    name='telor-tdk'
                                    value='Telor'
                                    checked={isBahanTidakDisukaiChecked(
                                        'Telor'
                                    )}
                                    onChange={handleBahanTidakDisukaiChange}
                                    disabled={isDisabledTidakDisukai('Telor')}
                                />
                                <label htmlFor='telor-tdk'> Telor</label>
                            </div>
                            <div>
                                <input
                                    type='checkbox'
                                    id='sayuran-tdk'
                                    name='sayuran-tdk'
                                    value='Sayuran'
                                    checked={isBahanTidakDisukaiChecked(
                                        'Sayuran'
                                    )}
                                    onChange={handleBahanTidakDisukaiChange}
                                    disabled={isDisabledTidakDisukai('Sayuran')}
                                />
                                <label htmlFor='sayuran-tdk'> Sayuran</label>
                            </div>
                        </div>
                    </div>
                    <div className='flex mt-4'>
                        <button
                            className='px-4 py-2 font-semibold text-white rounded-md bg-primary disabled:bg-orange-700'
                            onClick={handleRecommendation}
                            disabled={isButtonDisabled}>
                            Dapatkan Rekomendasi
                        </button>
                    </div>
                </div>
                {/* <div className='mx-10 mt-10'>
                    <p className='text-xl font-bold text-primary'>
                        Hasil Rekomendasi:
                    </p>
                </div> */}
            </div>
            {products.length === 0 ? (
                <h5 className='text-4xl text-center text-slate-400'>
                    No Data Product
                </h5>
            ) : (
                <div className='container mx-auto'>
                    <div className='flex flex-wrap'>
                        {products.map((product, index) => (
                            <CardProduct
                                key={index}
                                id={product.id}
                                name={product.nama}
                                productCategory={''}
                                description={product.deskripsi}
                                price={product.harga}
                                imgSrc={product.image_url}
                            />
                        ))}
                    </div>
                </div>
            )}
        </MainLayout>
    )
}

export default RecommendationPage
