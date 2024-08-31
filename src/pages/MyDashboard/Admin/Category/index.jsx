import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DashboardLayout from '@layouts/DashboardLayout'
import { getAllCategory } from '@utils/services/adminServices.js'
import { useDebounce } from 'use-debounce'
const AdminCategoryPage = () => {
    const [categories, setCategories] = useState([])
    const [take, setTake] = useState(10)
    const [totalPage, setTotalPage] = useState()
    const [totalCategory, setTotalCategory] = useState()
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [searchValue] = useDebounce(search, 1000)
    const fetchCategory = async () => {
        try {
            const response = await getAllCategory(page, take, searchValue)
            setCategories(response.categories)
            setTotalCategory(response.total_category)
            setPage(response.paging.current_page)
            setTotalPage(response.paging.total_page)
        } catch (error) {
            console.error('Error Fetching Category', error)
        }
    }
    useEffect(() => {
        fetchCategory()
    }, [page, take, searchValue])

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
                    <div className='flex justify-between my-4'>
                        <Link
                            to='/my-dashboard/admin/category/create'
                            className='px-2 py-2 text-white rounded-lg bg-primary'>
                            Add Category
                        </Link>
                    </div>
                </div>
                <div className='mt-5 basis-[85%]  '>
                    <div className='overflow-x-auto '>
                        <div className='flex justify-between w-full'>
                            <div className='px-2'>
                                <select
                                    name='take'
                                    id='take'
                                    value={take}
                                    onChange={(e) => setTake(e.target.value)}
                                    className={` px-1 py-1 text-sm  rounded text-slate-700 bg-white mr-2 my-0 md:my-1 border`}>
                                    <option value='10'>10</option>
                                    <option value='25'>25</option>
                                    <option value='50'>50</option>
                                    <option value='100'>100</option>
                                </select>
                                <label htmlFor='take'>Data Per Page</label>
                            </div>
                            <div className='px-2 '>
                                <input
                                    type='text'
                                    className='px-2 py-1 mb-2 font-light text-black border-2 rounded-lg w-52 md:w-full'
                                    placeholder='Search...'
                                    onChange={(e) => {
                                        setSearch(e.target.value)
                                    }}
                                />
                            </div>
                        </div>
                        <table className='w-full text-sm text-left text-white border rtl:text-right'>
                            <thead className='text-xs text-black uppercase bg-white '>
                                <tr>
                                    <th scope='col' className='px-6 py-3'>
                                        No
                                    </th>
                                    <th scope='col' className='px-6 py-3'>
                                        Category name
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {totalCategory === 0 ? (
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
                                                {category.nama}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                        {totalPage > 1 && (
                            <>
                                <div className='mt-4 space-x-3 text-right'>
                                    <button
                                        className='px-2 py-1 font-semibold text-white rounded-md bg-primary hover:bg-secondary disabled:bg-orange-700'
                                        onClick={() => handlePrev()}
                                        disabled={page === 1}>
                                        Prev
                                    </button>

                                    <span>{page}</span>

                                    <button
                                        className={`bg-primary mb-2 text-white font-semibold px-2 py-1 hover:bg-secondary rounded-md  disabled:bg-orange-700`}
                                        onClick={() => handleNext()}
                                        disabled={
                                            page === totalPage ||
                                            page > totalPage
                                        }>
                                        Next
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default AdminCategoryPage
