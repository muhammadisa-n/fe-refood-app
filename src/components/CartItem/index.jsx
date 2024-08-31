import React, { useState } from 'react'
import { MdRemoveShoppingCart } from 'react-icons/md'
import {
    deleteCart,
    updateCartTotalProduk,
    createOrder,
} from '../../utils/services/customerServices'
import { useCart } from '@context/CartContext'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { FaMinus, FaPlus } from 'react-icons/fa'
const CartItem = ({ cartItems }) => {
    const navigate = useNavigate()
    const { refreshCart } = useCart()
    const [jenisLayanan, setJenisLayanan] = useState('Ambil Di Tempat')
    const [isModalOpen, setIsModalOpen] = useState()
    const [waktuMakan, setWaktuMakan] = useState()
    const [noMeja, setNoMeja] = useState('')
    const openModal = () => setIsModalOpen(true)
    const closeModal = () => setIsModalOpen(false)
    const handleUpdateCartItem = async (cartItemId, newTotalProduk) => {
        if (newTotalProduk < 1) return
        await updateCartTotalProduk(cartItemId, newTotalProduk)
        refreshCart()
    }
    const totalBayar = cartItems.reduce((total, item) => {
        return total + (item.total_harga || 0)
    }, 0)
    const handleRemoveCart = async (cartItemId) => {
        await deleteCart(cartItemId)
        refreshCart()
    }

    const handleAddToOrder = async () => {
        const products = cartItems.map((item) => {
            const hargaSetelahDiskon = hargaSetelaDiskon(
                item.Product.harga,
                item.Product.diskon
            )
            return {
                product_id: item.Product.id,
                sub_total_produk: item.total_produk,
                sub_total_harga: hargaSetelahDiskon * item.total_produk,
            }
        })
        const data = {
            products: products,
            total_pembayaran: totalBayar,
            jenis_layanan: jenisLayanan,
            waktu_makan: jenisLayanan === 'Makan Di Tempat' ? waktuMakan : null,
            no_meja: noMeja,
            total_produk: cartItems.reduce(
                (total, p) => total + p.total_produk,
                0
            ),
        }

        try {
            const response = await createOrder(data)
            navigate(`/my-orders/checkout/${response.dataOrder.id}`)
        } catch (error) {
        } finally {
        }
    }
    const hargaSetelaDiskon = (harga, diskon) => {
        return diskon && diskon > 0 ? (harga * (100 - diskon)) / 100 : harga
    }

    return (
        <>
            {cartItems.map((item, index) => (
                <div
                    className='flex items-center justify-between py-4 '
                    key={index}>
                    <div className='flex items-center'>
                        <img
                            src={item.Product.image_url}
                            alt={item.Product.nama}
                            className='object-cover w-16 h-16 mr-4 rounded-lg'
                        />
                        <div>
                            <h2 className='text-lg font-semibold'>
                                {item.Product.nama}
                            </h2>
                            <p className='text-gray-500'>
                                Harga: Rp{' '}
                                {item.Product.harga?.toLocaleString('id-ID')}
                            </p>
                            {item.Product.diskon && (
                                <>
                                    <p className='text-gray-500'>
                                        Diskon:
                                        {item.Product?.diskon}%
                                    </p>
                                    <p className='text-gray-500'>
                                        Harga Diskon: Rp{' '}
                                        {hargaSetelaDiskon(
                                            item.Product?.harga,
                                            item.Product.diskon
                                        ).toLocaleString('id-ID')}
                                    </p>
                                </>
                            )}
                            <p className='text-gray-600'>
                                Jumlah: {item.total_produk}
                            </p>
                            <p className='text-gray-600'>
                                SubTotal Harga: Rp{' '}
                                {item.total_harga.toLocaleString('id-ID')}
                            </p>
                            <div className='flex items-center mt-2'>
                                <button
                                    onClick={() =>
                                        handleUpdateCartItem(
                                            item.id,
                                            item.total_produk - 1
                                        )
                                    }
                                    className='px-2 py-2 text-white rounded-md bg-primary hover:bg-secondary'>
                                    <FaMinus size={14} />
                                </button>
                                <p className='mx-4'>{item.total_produk}</p>
                                <button
                                    onClick={() =>
                                        handleUpdateCartItem(
                                            item.id,
                                            item.total_produk + 1
                                        )
                                    }
                                    className='px-2 py-2 text-white rounded-md bg-primary hover:bg-secondary'>
                                    <FaPlus size={14} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={() => {
                            handleRemoveCart(item.product_id)
                        }}
                        className='flex items-center justify-center w-8 h-8 text-red-500 transition duration-300 ease-in-out rounded-full hover:bg-red-100'>
                        <MdRemoveShoppingCart size={20} />
                    </button>
                </div>
            ))}
            <div className='flex items-center justify-between mt-8'>
                <p className='text-xl font-semibold'>Total Bayar:</p>
                <p className='text-xl font-semibold'>
                    Rp {totalBayar.toLocaleString('id-ID')}
                </p>
            </div>
            <div className='flex justify-end mt-8'>
                <button
                    className='px-4 py-2 text-white rounded-md bg-primary hover:bg-orange-600'
                    onClick={openModal}>
                    Order
                </button>
            </div>
            {isModalOpen && (
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
                    <div className='w-11/12 max-w-md p-8 bg-white rounded-lg shadow-lg'>
                        <h2 className='mb-4 text-xl font-bold'>
                            Order Confirmation
                        </h2>
                        {cartItems.map((item, index) => (
                            <div className='mb-4' key={index}>
                                <h3 className='text-lg font-semibold'>
                                    {item.Product.nama}
                                </h3>
                                <p>Jumlah: {item.total_produk}</p>
                                <p>
                                    Total Harga: Rp.{' '}
                                    {(
                                        hargaSetelaDiskon(
                                            item.Product.harga,
                                            item.Product.diskon
                                        ) * item.total_produk
                                    ).toLocaleString('id-Id')}
                                </p>
                            </div>
                        ))}
                        <div className='items-end justify-end mb-4 font-semibold'>
                            <p>
                                Total Bayar: Rp.{' '}
                                {totalBayar.toLocaleString('id-Id')}
                            </p>
                        </div>
                        <div className='mb-4'>
                            <label className='block mb-2 text-sm font-medium text-gray-600'>
                                Pilih Jenis Layanan
                            </label>
                            <select
                                value={jenisLayanan}
                                onChange={(e) =>
                                    setJenisLayanan(e.target.value)
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
                        {jenisLayanan === 'Makan Di Tempat' && (
                            <>
                                <div className='mb-4'>
                                    <label className='block mb-2 text-sm font-medium text-gray-600'>
                                        Waktu Makan
                                    </label>
                                    <input
                                        type='time'
                                        value={waktuMakan}
                                        onChange={(e) =>
                                            setWaktuMakan(e.target.value)
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
                                        value={noMeja}
                                        onChange={(e) =>
                                            setNoMeja(e.target.value)
                                        }
                                        className='w-full p-2 border border-gray-300 rounded-md hide-arrow'
                                        placeholder='Masukkan Nomor Meja'
                                    />
                                </div>
                            </>
                        )}

                        <div className='mt-4 text-right'>
                            <button
                                className='px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-700'
                                onClick={closeModal}>
                                Close
                            </button>
                            <button
                                className='px-4 py-2 ml-2 text-white bg-green-500 rounded-md hover:bg-green-700'
                                onClick={handleAddToOrder}>
                                Confirm Order
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default CartItem
