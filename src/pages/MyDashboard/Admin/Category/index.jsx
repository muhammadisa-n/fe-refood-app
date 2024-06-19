import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DashboardLayout from '@layouts/DashboardLayout'
import Swal from 'sweetalert2'
import {
    deleteCategory,
    getAllCategory,
} from '@utils/services/adminServices.js'
import { useDebounce } from 'use-debounce'
const AdminCategoryPage = () => {
    const [categories, setCategories] = useState([])
    const [size, setSize] = useState(8)
    const [totalPage, setTotalPage] = useState()
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [searchValue] = useDebounce(search, 1000)
    const fetchCategory = async () => {
        try {
            const response = await getAllCategory(page, size, searchValue)
            setCategories(response.categories)
            setPage(response.paging.current_page)
            setTotalPage(response.paging.total_page)
        } catch (error) {
            console.error('Error Fetching Category', error)
        }
    }
    useEffect(() => {
        fetchCategory()
    }, [page, size, searchValue])
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
                <div className='flex flex-col '>
                    <h1 className='text-3xl font-semibold text-primary'>
                        List Category
                    </h1>
                    <div className='my-4 flex justify-between'>
                        <Link
                            to='/my-dashboard/admin/category/create'
                            className='px-2 py-2 text-white rounded-lg bg-primary'>
                            Add Category
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
                <div className='mt-5 basis-[85%]  '>
                    <div className='relative overflow-x-auto'>
                        <table className='w-full text-sm text-left text-white rtl:text-right border'>
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

export default AdminCategoryPage
