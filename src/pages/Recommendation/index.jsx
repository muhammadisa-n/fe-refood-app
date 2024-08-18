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
    const [take, setTake] = useState(8)
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [searchValue] = useDebounce(prediksi, 100)
    const [isButtonDisabled, setIsButtonDisabled] = useState(true)

    const fetchProduct = async () => {
        if (prediksi !== '') {
            try {
                const response = await getAllProductRecomendation(
                    page,
                    take,
                    searchValue
                )
                setProducts(response.products)
                setTotalProduct(response.total_product)
                setPage(response.paging.current_page)
                setTotalPage(response.paging.total_page)
            } catch (error) {
                console.error('Failed to fetch products:', error)
            }
        } else {
            setTotalProduct(0)
        }
    }

    useEffect(() => {
        fetchProduct()
    }, [page, take, searchValue])

    useEffect(() => {
        const checkIfButtonShouldBeDisabled = () => {
            if (
                !preferensiRasa &&
                !jenisMakanan &&
                (kebutuhanDiet === 'Tidak Ada' || !kebutuhanDiet) &&
                bahanDisukai.length === 0 &&
                bahanTidakDisukai.length === 0
            ) {
                setIsButtonDisabled(true)
            } else {
                setIsButtonDisabled(false)
            }
        }

        checkIfButtonShouldBeDisabled()
    }, [
        preferensiRasa,
        jenisMakanan,
        kebutuhanDiet,
        bahanDisukai,
        bahanTidakDisukai,
    ])

    const handleRecommendation = async () => {
        try {
            const response = await axios.post(
                'https://recommendation.refood-app.site/api/get-recomendation',
                {
                    'Preferensi Rasa': preferensiRasa,
                    'Jenis Makanan': jenisMakanan,
                    'Kebutuhan Diet': kebutuhanDiet,
                    'Bahan-Bahan yang Disukai': bahanDisukai.join(','),
                    'Bahan-Bahan yang Tidak Disukai':
                        bahanTidakDisukai.join(','),
                }
            )
            setPrediksi(response.data.prediction)
            fetchProduct()
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
            <div className='flex flex-col max-w-full min-h-screen mx-auto mt-10'>
                <div className='container py-5 mx-auto'>
                    <div className='flex flex-wrap mx-auto'>
                        <div className='flex flex-col w-1/4'>
                            <label
                                htmlFor='preferensi_rasa'
                                className='text-xl'>
                                Preferensi Rasa
                            </label>
                            <select
                                name='preferensi_rasa'
                                id='preferensi_rasa'
                                className='px-2 py-2 border rounded-lg'
                                value={preferensiRasa}
                                onChange={(e) =>
                                    setPreferensiRasa(e.target.value)
                                }>
                                <option value=''>Preferensi Rasa</option>
                                <option value='Manis'>Manis</option>
                                <option value='Asam'>Asam</option>
                                <option value='Asin'>Asin</option>
                                <option value='Pedas'>Pedas</option>
                                <option value='Pahit'>Pahit</option>
                            </select>
                        </div>
                        <div className='flex flex-col w-1/4 mx-auto'>
                            <label htmlFor='jenis_makanan' className='text-xl'>
                                Jenis Makanan
                            </label>
                            <select
                                name='jenis_makanan'
                                id='jenis_makanan'
                                className='px-2 py-2 border rounded-lg'
                                value={jenisMakanan}
                                onChange={(e) =>
                                    setJenisMakanan(e.target.value)
                                }>
                                <option value=''>Jenis Makanan</option>
                                <option value='Makanan Cepat Saji'>
                                    Makanan Cepat Saji
                                </option>
                                <option value='Makanan Rumahan'>
                                    Makanan Rumahan
                                </option>
                            </select>
                        </div>
                        <div className='flex flex-col w-1/4 mx-auto'>
                            <label htmlFor='kebutuhan_diet' className='text-xl'>
                                Kebutuhan Diet
                            </label>
                            <select
                                name='kebutuhan_diet'
                                id='kebutuhan_diet'
                                className='px-2 py-2 border rounded-lg'
                                value={kebutuhanDiet}
                                onChange={(e) =>
                                    setKebutuhanDiet(e.target.value)
                                }>
                                <option value='Tidak Ada'>Tidak Ada</option>
                                <option value='Vegan'>Vegan</option>
                                <option value='Vegetarian'>Vegetarian</option>
                            </select>
                        </div>
                    </div>
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
                                    id='Daging'
                                    name='Daging'
                                    value='Daging'
                                    checked={isBahanDisukaiChecked('Daging')}
                                    onChange={handleBahanDisukaiChange}
                                    disabled={isDisabledDisukai('Daging')}
                                />
                                <label htmlFor='Daging'> Daging</label>
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
                                    id='daging-tdk'
                                    name='daging-tdk'
                                    value='Daging'
                                    checked={isBahanTidakDisukaiChecked(
                                        'Daging'
                                    )}
                                    onChange={handleBahanTidakDisukaiChange}
                                    disabled={isDisabledTidakDisukai('Daging')}
                                />
                                <label htmlFor='daging-tdk'> Daging</label>
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
                <div className='mx-10 mt-10'>
                    <p className='text-xl font-bold text-primary'>
                        Hasil Rekomendasi: {prediksi}
                    </p>
                </div>
                {totalProduct === 0 ? (
                    <h5 className='text-4xl text-center text-slate-400'>
                        No Data Product
                    </h5>
                ) : (
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
                )}
                {totalPage > 1 && (
                    <div className='mb-20 space-x-5 text-center'>
                        <button
                            className='px-3 py-2 font-semibold text-white rounded-md bg-primary hover:bg-secondary disabled:bg-orange-700'
                            onClick={() => handlePrev()}
                            disabled={page === 1}>
                            Sebelumnya
                        </button>
                        <span>{page}</span>
                        <button
                            className={`bg-primary mb-2 text-white font-semibold px-3 py-2 hover:bg-secondary rounded-md disabled:bg-orange-700`}
                            onClick={() => handleNext()}
                            disabled={page === totalPage || page > totalPage}>
                            Selanjutnya
                        </button>
                    </div>
                )}
            </div>
        </MainLayout>
    )
}

export default RecommendationPage
