import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import DashboardLayout from '@layouts/DashboardLayout'
import { getDetailSeller } from '@utils/services/adminServices'
import profileImage from '@assets/userdefault.png'
import CardProduct from '@components/CardProduct'
const AdminDetailDataSellerPage = () => {
    const { id } = useParams()
    const [seller, setSeller] = useState([])
    const [sellerNotFound, setSellertNotFound] = useState(false)
    useEffect(() => {
        const fetchSeller = async () => {
            try {
                const response = await getDetailSeller(id)
                setSeller(response)
                console.log(response.Products)
            } catch (error) {
                if (error.status_code === 404) {
                    setSellertNotFound(true)
                }
            }
        }
        fetchSeller()
    }, [id])
    return (
        <DashboardLayout>
            <div className='px-6 pt-6 '>
                <div className='flex flex-col '>
                    <h1 className='text-3xl font-semibold text-primary'>
                        Detail Penjual
                    </h1>
                </div>
                {sellerNotFound ? (
                    <div className='container px-2 py-10 mx-auto my-2 bg-white border rounded-lg'>
                        <h5 className='text-2xl text-center'>
                            Seller Not Found
                        </h5>
                    </div>
                ) : (
                    <>
                        <div className='pb-4 mt-5'>
                            <div className='flex flex-col max-w-full mt-10'>
                                <div className='container px-4 py-8 mx-auto'>
                                    <div className='w-full mx-auto bg-white rounded-lg shadow-md'>
                                        <div
                                            className={`justify-between md:flex  w-full`}>
                                            <div className='px-4 py-8'>
                                                <img
                                                    className='object-cover w-full h-48 rounded-full md:w-48'
                                                    src={
                                                        seller?.ava_image_url
                                                            ? seller.ava_image_url
                                                            : profileImage
                                                    }
                                                    alt='Profil-image'
                                                />
                                            </div>
                                            <div className='flex items-start px-4 py-8'>
                                                <div>
                                                    <h2 className='text-2xl font-semibold text-gray-800'>
                                                        {seller?.nama}
                                                    </h2>
                                                    <p className='mt-2 text-gray-600'>
                                                        Email: {seller?.email}
                                                    </p>
                                                    <p className='mt-2 text-gray-600'>
                                                        No Hp: {seller?.no_hp}
                                                    </p>
                                                    <p className='mt-2 text-gray-600'>
                                                        Alamat Lengkap:{' '}
                                                        {`${seller?.alamat}, ${seller?.kelurahan} ${seller?.kecamatan}, ${seller?.kota}, ${seller?.provinsi}, ${seller?.kode_pos}`}
                                                    </p>
                                                    <p className='mt-2 text-gray-600'>
                                                        Link Gmaps Toko:{' '}
                                                        <a
                                                            href={
                                                                seller?.link_map_alamat_toko
                                                            }
                                                            className='text-blue-500 underline'
                                                            target='_blank'>
                                                            {
                                                                seller?.link_map_alamat_toko
                                                            }
                                                        </a>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <>
                            {seller.Products?.length === 0 ? (
                                <>
                                    <div className='my-10 '>
                                        <h5 className='text-4xl text-center text-slate-400'>
                                            No Data Product
                                        </h5>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className='container mx-auto'>
                                        <h2 className='mb-4 text-3xl font-medium text-black'>
                                            List Product
                                        </h2>
                                        <div className='flex flex-wrap'>
                                            {seller.Products?.map(
                                                (product, index) => (
                                                    <div className='w-full px-4 mb-6 sm:w-1/2 md:w-1/3 lg:w-1/4'>
                                                        <div
                                                            className='flex flex-col h-full overflow-hidden shadow-lg rounded-2xl '
                                                            key={index}>
                                                            <div className='w-full h-40'>
                                                                <img
                                                                    src={
                                                                        product.image_url
                                                                    }
                                                                    alt='product-image'
                                                                    title={
                                                                        product.nama
                                                                    }
                                                                    className='object-cover w-full h-full rounded-t-lg'
                                                                />
                                                            </div>
                                                            <div className='flex flex-col flex-1 p-4'>
                                                                <h5 className='mt-2 text-xl font-semibold text-black'>
                                                                    {
                                                                        product.nama
                                                                    }
                                                                </h5>
                                                                <p className='text-sm text-gray-400 line-clamp-3'>
                                                                    {
                                                                        product.description
                                                                    }
                                                                </p>
                                                                <div className='mt-2'>
                                                                    <div className='flex justify-between'>
                                                                        <span className='text-base font-bold text-black'>
                                                                            Rp.{' '}
                                                                            {product.harga?.toLocaleString(
                                                                                'id-ID'
                                                                            )}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <div className='flex items-center justify-end mt-4'>
                                                                    <Link
                                                                        to={`/my-dashboard/admin/data-sellers/products/${product.id}`}
                                                                        className='inline-block px-4 py-2 font-semibold text-white rounded-md bg-primary'>
                                                                        Detail
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </>
                            )}
                        </>
                    </>
                )}
            </div>
        </DashboardLayout>
    )
}

export default AdminDetailDataSellerPage
