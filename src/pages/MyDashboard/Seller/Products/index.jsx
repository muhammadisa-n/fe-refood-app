import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DashboardLayout from '@layouts/DashboardLayout'
import Swal from 'sweetalert2'
import {
    deleteProduct,
    getAllProducts,
} from '@utils/services/sellerServices.js'
import { useDebounce } from 'use-debounce'
import { useUser } from '@context/userContext.jsx'
const SellerProductsPage = () => {
    const { user, refreshUser } = useUser()
    const [products, setProducts] = useState([])
    const [take, setTake] = useState(10)
    const [totalPage, setTotalPage] = useState()
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [searchValue] = useDebounce(search, 1000)
    const fetchProducts = async () => {
        try {
            const response = await getAllProducts(page, take, searchValue)
            setProducts(response.products)
            setPage(response.paging.current_page)
            setTotalPage(response.paging.total_page)
        } catch (error) {
            console.error('Error Fetching Product', error)
        }
    }
    useEffect(() => {
        refreshUser()
        fetchProducts()
    }, [page, take, searchValue])
    const handleDelete = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    setIsLoading(true)
                    const response = await deleteProduct(id)
                    Swal.fire({
                        title: 'Deleted!',
                        text: `${response.message}`,
                        icon: 'success',
                    })
                    fetchProducts()
                } catch (error) {
                    console.error('Error Delete Product', error)
                } finally {
                    setIsLoading(false)
                }
            }
        })
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

    return (
        <DashboardLayout>
            <div className='px-6 pt-6 '>
                <div className='flex flex-col'>
                    <h1 className='text-3xl font-semibold text-primary'>
                        My Products
                    </h1>
                    <div className='my-4 flex justify-between'>
                        <Link
                            to={
                                user.is_active || isLoading
                                    ? '/my-dashboard/seller/products/create'
                                    : null
                            }
                            className={`px-2 py-2 text-white rounded-lg  ${
                                isLoading || user.is_active
                                    ? 'bg-primary'
                                    : 'bg-orange-900'
                            }`}>
                            Add Product
                        </Link>
                        <input
                            type='text'
                            className='w-[20%] px-1 py-1 text-black border-2 font-light  rounded-lg '
                            placeholder='Search...'
                            onChange={(e) => {
                                setSearch(e.target.value)
                            }}
                        />
                    </div>
                </div>
                <div className='mt-5 basis-[85%] '>
                    <div className='relative overflow-x-auto'>
                        <table className='w-full text-sm text-left text-white rtl:text-right border'>
                            <thead className='text-xs text-black uppercase bg-white '>
                                <tr>
                                    <th scope='col' className='px-6 py-3'>
                                        Product name
                                    </th>
                                    <th scope='col' className='px-6 py-3'>
                                        Category
                                    </th>
                                    <th scope='col' className='px-6 py-3'>
                                        Price
                                    </th>
                                    <th scope='col' className='px-6 py-3'>
                                        Status
                                    </th>
                                    <th scope='col' className='px-6 py-3'>
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.length === 0 ? (
                                    <tr className='text-black  border-b'>
                                        <td className='px-6 py-4'>
                                            No Data Product
                                        </td>
                                    </tr>
                                ) : (
                                    <>
                                        {products.map((product, index) => (
                                            <tr
                                                className='text-black bg-white border-b '
                                                key={index}>
                                                <td className='px-6 py-4'>
                                                    {product.name}
                                                </td>
                                                <td className='px-6 py-4 '>
                                                    {product.Category.name}
                                                </td>
                                                <td className='px-6 py-4'>
                                                    {product.price}
                                                </td>
                                                <td className='px-6 py-4'>
                                                    {product.is_active
                                                        ? 'Active'
                                                        : 'Not Active'}
                                                </td>
                                                <td className='px-6 py-4'>
                                                    <Link
                                                        type='button'
                                                        to={
                                                            user.is_active
                                                                ? `/my-dashboard/seller/products/update/${product.id}`
                                                                : null
                                                        }
                                                        className={`p-1 mx-2 text-white rounded-lg  hover:bg-sky-700 ${isLoading || !user.is_active ? 'bg-sky-900' : 'bg-sky-600'}`}>
                                                        Update
                                                    </Link>
                                                    <button
                                                        disabled={
                                                            isLoading ||
                                                            !user.is_active
                                                        }
                                                        onClick={() =>
                                                            handleDelete(
                                                                product.id
                                                            )
                                                        }
                                                        className={`p-1 text-white  rounded-lg hover:bg-red-700 ${isLoading || !user.is_active ? 'bg-red-900' : 'bg-red-600'}`}>
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </>
                                )}
                            </tbody>
                        </table>
                        <div className='mt-4 text-right space-x-3'>
                            <button
                                className='bg-primary text-white font-semibold px-2 py-1 hover:bg-secondary rounded-md disabled:bg-orange-700'
                                onClick={() => handlePrev()}
                                disabled={page === 1}>
                                Prev
                            </button>

                            <span>{page}</span>

                            <button
                                className={`bg-primary mb-2 text-white font-semibold px-2 py-1 hover:bg-secondary rounded-md  disabled:bg-orange-700`}
                                onClick={() => handleNext()}
                                disabled={
                                    page === totalPage || page > totalPage
                                }>
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default SellerProductsPage
