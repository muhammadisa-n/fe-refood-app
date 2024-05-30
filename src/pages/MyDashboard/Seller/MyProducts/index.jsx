import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DashboardLayout from '@layouts/DashboardLayout'
import Swal from 'sweetalert2'
import {
    deleteProduct,
    getAllProductsSeller,
} from '@utils/services/productServices.js'
const MyProducts = () => {
    const [products, setProducts] = useState([])
    const [token, setToken] = useState(localStorage.getItem('access_token'))
    const fetchProducts = async () => {
        try {
            const response = await getAllProductsSeller()
            setProducts(response)
        } catch (error) {
            setProducts(null)
            console.error('Error Fetching Product', error)
        }
    }
    useEffect(() => {
        if (token) {
            fetchProducts()
        }
    }, [token])
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
                    const response = await deleteProduct(id)
                    Swal.fire({
                        title: 'Deleted!',
                        text: `${response.message}`,
                        icon: 'success',
                    })
                    fetchProducts()
                } catch (error) {
                    console.error('Error Delete Product', error)
                }
            }
        })
    }
    return (
        <DashboardLayout>
            <div className='px-6 pt-6 '>
                <div className='flex flex-col '>
                    <h1 className='text-3xl font-semibold text-primary'>
                        My Products
                    </h1>
                    <div className='my-4'>
                        <Link
                            to='/my-dashboard/seller/products/create'
                            className='px-2 py-2 text-white rounded-lg bg-primary'>
                            Add Product
                        </Link>
                    </div>
                </div>
                <div className='mt-5 basis-[85%]  '>
                    {/* content here */}
                    <div className='relative overflow-x-auto'>
                        <table className='w-full text-sm text-left text-white rtl:text-right'>
                            <thead className='text-xs text-black uppercase bg-white '>
                                <tr>
                                    <th scope='col' className='px-6 py-3'>
                                        Product name
                                    </th>
                                    <th scope='col' className='px-6 py-3'>
                                        Description
                                    </th>
                                    <th scope='col' className='px-6 py-3'>
                                        Price
                                    </th>
                                    <th scope='col' className='px-6 py-3'>
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product, index) => (
                                    <tr
                                        className='text-black bg-white border-b dark:border-gray-700'
                                        key={index}>
                                        <td className='px-6 py-4'>
                                            {product.name}
                                        </td>
                                        <td className='px-6 py-4'>
                                            {product.description}
                                        </td>
                                        <td className='px-6 py-4'>
                                            {product.price}
                                        </td>
                                        <td className='px-6 py-4'>
                                            <Link
                                                type='button'
                                                to={`/my-dashboard/seller/products/edit/${product.id}`}
                                                className='p-1 mx-2 text-white rounded-lg bg-sky-600 hover:bg-sky-700'>
                                                Update
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    handleDelete(product.id)
                                                }
                                                className='p-1 text-white bg-red-600 rounded-lg hover:bg-red-700'>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default MyProducts
