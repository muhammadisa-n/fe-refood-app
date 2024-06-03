import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DashboardLayout from '@layouts/DashboardLayout'
import Swal from 'sweetalert2'
import { deleteCategory } from '@utils/services/adminServices.js'
import { getAllCategory } from '@utils/services/categoryServices.js'
const AdminCategoryPage = () => {
    const [categories, setCategories] = useState([])
    const [token, setToken] = useState(localStorage.getItem('access_token'))
    const fetchCategory = async () => {
        try {
            const response = await getAllCategory()
            setCategories(response)
        } catch (error) {
            console.error('Error Fetching Category', error)
        }
    }
    useEffect(() => {
        if (token) {
            fetchCategory()
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
                    const response = await deleteCategory(id)
                    Swal.fire({
                        title: 'Deleted!',
                        text: `${response.message}`,
                        icon: 'success',
                    })
                    fetchCategory()
                } catch (error) {
                    console.error('Error Delete Category', error)
                }
            }
        })
    }
    return (
        <DashboardLayout>
            <div className='px-6 pt-6 '>
                <div className='flex flex-col '>
                    <h1 className='text-3xl font-semibold text-primary'>
                        List Category
                    </h1>
                    <div className='my-4'>
                        <Link
                            to='/my-dashboard/admin/category/create'
                            className='px-2 py-2 text-white rounded-lg bg-primary'>
                            Add Category
                        </Link>
                    </div>
                </div>
                <div className='mt-5 basis-[85%]  '>
                    <div className='relative overflow-x-auto'>
                        <table className='w-full text-sm text-left text-white rtl:text-right'>
                            <thead className='text-xs text-black uppercase bg-white '>
                                <tr>
                                    <th scope='col' className='px-6 py-3'>
                                        No
                                    </th>
                                    <th scope='col' className='px-6 py-3'>
                                        Category name
                                    </th>
                                    <th scope='col' className='px-6 py-3'>
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.length === 0 ? (
                                    <tr className='text-black border-b'>
                                        <td className='px-6 py-4'>
                                            No Data Category
                                        </td>
                                    </tr>
                                ) : (
                                    categories.map((category, index) => (
                                        <tr
                                            className='text-black bg-white border-b'
                                            key={index}>
                                            <td className='px-6 py-4'>
                                                {index + 1}
                                            </td>
                                            <td className='px-6 py-4'>
                                                {category.name}
                                            </td>
                                            <td className='px-6 py-4'>
                                                <Link
                                                    type='button'
                                                    to={`/my-dashboard/admin/category/update/${category.id}`}
                                                    className='p-1 mx-2 text-white rounded-lg bg-sky-600 hover:bg-sky-700'>
                                                    Update
                                                </Link>
                                                <button
                                                    onClick={() =>
                                                        handleDelete(
                                                            category.id
                                                        )
                                                    }
                                                    className='p-1 text-white bg-red-600 rounded-lg hover:bg-red-700'>
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default AdminCategoryPage
