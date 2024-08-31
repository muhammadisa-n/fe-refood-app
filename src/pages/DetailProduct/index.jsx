import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getProductById } from '@utils/services/productServices.js'
import { useCart } from '@context/CartContext.jsx'
import { addCart, createOrder } from '@utils/services/customerServices.js'
import MainLayout from '@layouts/MainLayout'
import { useUser } from '@context/userContext.jsx'
import ImgDefault from '@assets/seller_default.png'
import { FaWhatsapp } from 'react-icons/fa'
import Swal from 'sweetalert2'
const DetailProductPage = () => {
    const { refreshCart } = useCart()
    const { role } = useUser()
    const token = localStorage.getItem('access_token')
    const { id } = useParams()
    const [product, setProduct] = useState([])
    const [totalProduct, setTotalProduct] = useState(1)
    const [productNotFound, setProductNotFound] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [jenisLayanan, setJenisLayanan] = useState('Ambil Di Tempat')
    const [isModalOpen, setIsModalOpen] = useState()
    const [waktuMakan, setWaktuMakan] = useState()
    const [noMeja, setNoMeja] = useState('')
    const openModal = () => setIsModalOpen(true)
    const closeModal = () => setIsModalOpen(false)
    const navigate = useNavigate()
    const decrease = () => {
        if (totalProduct === 1) {
            return
        }
        {
            setTotalProduct((prev) => prev - 1)
        }
    }
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
    }, [id])

    const handleAddToCart = async () => {
        const hargaDiskon = hargaSetelaDiskon(product.harga, product.diskon)
        const data = {
            total_produk: totalProduct,
            total_harga: hargaDiskon * totalProduct,
            product_id: product.id,
        }
        try {
            const response = await addCart(data)
            await Swal.fire({
                icon: 'success',
                title: `${response.message}`,
                showConfirmButton: true,
                timer: 2000,
            })
            refreshCart()
        } catch (error) {
            console.error(error)
        }
    }
    const handleAddToOrder = async () => {
        const hargaDiskon = hargaSetelaDiskon(product.harga, product.diskon)
        const data = {
            products: [
                {
                    product_id: product.id,
                    sub_total_produk: totalProduct,
                    sub_total_harga: hargaDiskon * totalProduct,
                },
            ],
            jenis_layanan: jenisLayanan,
            waktu_makan: jenisLayanan === 'Makan Di Tempat' ? waktuMakan : null,
            no_meja: noMeja,
            total_pembayaran:
                hargaSetelaDiskon(product.harga, product.diskon) * totalProduct,
            total_produk: totalProduct,
        }
        console.log(data)
        try {
            const response = await createOrder(data)
            navigate(`/my-orders/checkout/${response.dataOrder.id}`)
        } catch (error) {
            setIsLoading(false)
        } finally {
            setIsLoading(false)
        }
    }
    const convertPhoneNumber = (phoneNumber) => {
        if (phoneNumber?.startsWith('08')) {
            return '62' + phoneNumber.slice(1)
        }
        return phoneNumber
    }
    const hargaSetelaDiskon = (harga, diskon) => {
        return diskon && diskon > 0 ? (harga * (100 - diskon)) / 100 : harga
    }
    return (
        <MainLayout>
            {productNotFound ? (
                <div className='flex items-center justify-center max-w-full min-h-screen'>
                    <div>
                        <h5 className='text-4xl text-center text-slate-400'>
                            Data Product Not Found
                        </h5>
                    </div>
                </div>
            ) : (
                <>
                    <div className='h-32 mx-2 mt-8 bg-white rounded-md shadow-xl md:mb-28 md:flex md:flex-wrap md:mx-32'>
                        <div className='flex'>
                            <div className='flex px-3 border-r-2 border-gray-500 md:px-8 md:my-2'>
                                <div className='my-auto mr-4 md:mr-8'>
                                    <img
                                        className='object-cover w-10 h-10 border border-gray-300 rounded-full md:w-20 md:h-20'
                                        src={
                                            product.Seller?.ava_image_url
                                                ? product.Seller.ava_image_url
                                                : ImgDefault
                                        }
                                        alt=''
                                    />
                                </div>
                                <Link
                                    to={`/products?seller=${product.Seller?.nama}`}
                                    className='my-auto'>
                                    <p className='text-xs font-semibold md:text-xl'>
                                        {product.Seller?.nama}
                                    </p>
                                </Link>
                            </div>

                            <div className='w-5/12 mx-3 my-auto text-gray-500 md:w-8/12 max-sm:text-sm '>
                                <p className='text-sm font-semibold md:text-base'>
                                    {product.Seller?.alamat},
                                    {product.Seller?.kelurahan},
                                    {product.Seller?.kecamatan},
                                    {product.Seller?.kota},
                                    {product.Seller?.provinsi},
                                    {product.Seller?.kode_pos}
                                </p>
                                <a
                                    href={`https://wa.me/${convertPhoneNumber(product.Seller?.no_hp)}?text=Hai,%20Apakah%20Produk%20Tersedia?`}
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
                    <div className='flex flex-col pb-10 mt-4 md:flex-row md:px-52'>
                        <div className='md:basis-1/2 md:flex md:flex-col md:justify-between'>
                            <div className='hidden md:block '>
                                <img
                                    className='object-cover cursor-pointer rounded-xl w-[400px] h-[400px]'
                                    src={product.image_url}
                                    alt='product-image'
                                />
                            </div>
                            <div className='md:hidden'>
                                <img
                                    className='w-[100%] h-[300px] object-cover mt-10 rounded-2xl mx-2 my-5'
                                    src={product.image_url}
                                    alt='product-image'
                                />
                            </div>
                        </div>
                        <div className='p-6 description md:basis-1/2 md:py-10'>
                            <p className='mb-6 text-xs font-semibold tracking-widest uppercase text-primary'>
                                {product.Category?.nama}
                            </p>

                            <h1 className='text-3xl font-semibold capitalize md:text-4xl'>
                                {product.nama}
                            </h1>
                            <p className='hidden my-10 leading-7 text-black md:block'>
                                {product.deskripsi}
                            </p>
                            <p className='my-6 leading-7 text-black md:hidden'>
                                {product.deskripsi}
                            </p>
                            {product.diskon && product.diskon > 0 ? (
                                <>
                                    <div className='flex items-center'>
                                        <span className='text-3xl font-[700] mr-4 text-slate-400 line-through'>
                                            Rp.{' '}
                                            {product.harga?.toLocaleString(
                                                'id-Id'
                                            )}
                                        </span>
                                    </div>
                                    <div className='flex items-center'>
                                        <span className='text-3xl font-[700] mr-4'>
                                            Rp.{' '}
                                            {hargaSetelaDiskon(
                                                product.harga,
                                                product.diskon
                                            ).toLocaleString('id-ID')}
                                        </span>
                                    </div>
                                </>
                            ) : (
                                <div className='flex items-center'>
                                    <span className='text-3xl font-[700] mr-4'>
                                        Rp.{' '}
                                        {product.harga?.toLocaleString('id-Id')}
                                    </span>
                                </div>
                            )}

                            {token && role === 'Customer' && (
                                <>
                                    <div className='flex flex-col mt-8 md:flex-row'>
                                        <div className=' w-[100%] flex justify-around md:justify-center items-center space-x-10 rounded-lg p-3 md:p-2 md:mr-4 md:w-[150px]'>
                                            <button
                                                disabled={isLoading}
                                                onClick={decrease}
                                                className='px-2 text-2xl font-semibold transition-all border md:text-xl text-primary hover:opacity-50'>
                                                -
                                            </button>
                                            <p className='md:text-[14px] font-bold'>
                                                {totalProduct}
                                            </p>
                                            <button
                                                disabled={isLoading}
                                                onClick={() =>
                                                    setTotalProduct(
                                                        (prev) => prev + 1
                                                    )
                                                }
                                                className=' text-[24px] md:text-[20px] font-semibold text-primary border px-2 transition-all hover:opacity-50'>
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <div className='flex justify-between mt-4 md:flex-wrap'>
                                        <div className='px-4 mx-auto md:px-0'>
                                            <button
                                                disabled={isLoading}
                                                onClick={handleAddToCart}
                                                className={`px-6 md:px-12 py-3 mt-4 font-semibold text-white rounded-lg shadow-xl bg-primary md:mt-0 md:py-3 md:text-base hover:bg-secondary hover:text-primary ${isLoading ? 'bg-orange-800' : ''}`}>
                                                Add to cart
                                            </button>
                                        </div>
                                        <div className='px-4 mx-auto'>
                                            <button
                                                disabled={isLoading}
                                                onClick={openModal}
                                                className={`px-12 py-3 mt-4 font-semibold text-white rounded-lg shadow-xl bg-primary md:mt-0 md:py-3 md:text-base hover:bg-secondary hover:text-primary ${isLoading ? 'bg-orange-800' : ''}`}>
                                                Order
                                            </button>
                                        </div>
                                        {isModalOpen && (
                                            <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
                                                <div className='w-11/12 max-w-md p-8 bg-white rounded-lg shadow-lg'>
                                                    <h2 className='mb-4 text-xl font-bold'>
                                                        Order Confirmation
                                                    </h2>
                                                    <div className='mb-4'>
                                                        <h3 className='text-lg font-semibold'>
                                                            {product.nama}
                                                        </h3>
                                                        <p>
                                                            Harga: Rp.{' '}
                                                            {product.harga?.toLocaleString(
                                                                'id-Id'
                                                            )}
                                                        </p>
                                                        <p>
                                                            Jumlah:{' '}
                                                            {totalProduct}
                                                        </p>
                                                        {product.diskon && (
                                                            <>
                                                                <p>
                                                                    Diskon:
                                                                    {
                                                                        product.diskon
                                                                    }
                                                                    %
                                                                </p>
                                                                <p>
                                                                    Harga
                                                                    Diskon: Rp.{' '}
                                                                    {hargaSetelaDiskon(
                                                                        product.harga,
                                                                        product.diskon
                                                                    ).toLocaleString(
                                                                        'id-Id'
                                                                    )}
                                                                </p>
                                                            </>
                                                        )}
                                                        <p>
                                                            Total Harga: Rp.{' '}
                                                            {(
                                                                hargaSetelaDiskon(
                                                                    product.harga,
                                                                    product.diskon
                                                                ) * totalProduct
                                                            ).toLocaleString(
                                                                'id-Id'
                                                            )}
                                                        </p>
                                                    </div>
                                                    <div className='mb-4'>
                                                        <label className='block mb-2 text-sm font-medium text-gray-600'>
                                                            Pilih Jenis Layanan
                                                        </label>
                                                        <select
                                                            value={jenisLayanan}
                                                            onChange={(e) =>
                                                                setJenisLayanan(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className='w-full p-2 border border-gray-300 rounded-md'>
                                                            <option value='Ambil Di Tempat'>
                                                                Ambil Di Tempat
                                                            </option>
                                                            <option value='Makan Di Tempat'>
                                                                Makan Di Tempat
                                                            </option>
                                                        </select>
                                                    </div>
                                                    {jenisLayanan ===
                                                        'Makan Di Tempat' && (
                                                        <>
                                                            <div className='mb-4'>
                                                                <label className='block mb-2 text-sm font-medium text-gray-600'>
                                                                    Waktu Makan
                                                                </label>
                                                                <input
                                                                    type='time'
                                                                    value={
                                                                        waktuMakan
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setWaktuMakan(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    className='w-full p-2 border border-gray-300 rounded-md'
                                                                />
                                                            </div>
                                                            <div className='mb-4'>
                                                                <label className='block mb-2 text-sm font-medium text-gray-600'>
                                                                    Nomor Meja
                                                                </label>
                                                                <input
                                                                    type='number'
                                                                    value={
                                                                        noMeja
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setNoMeja(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    className='w-full p-2 border border-gray-300 rounded-md hide-arrow'
                                                                    placeholder='Masukkan nomor meja'
                                                                />
                                                            </div>
                                                        </>
                                                    )}
                                                    <div className='mt-4 text-right'>
                                                        <button
                                                            className='px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-700'
                                                            onClick={
                                                                closeModal
                                                            }>
                                                            Close
                                                        </button>
                                                        <button
                                                            className='px-4 py-2 ml-2 text-white bg-green-500 rounded-md hover:bg-green-700'
                                                            onClick={
                                                                handleAddToOrder
                                                            }>
                                                            Confirm Order
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </>
            )}
        </MainLayout>
    )
}

export default DetailProductPage
