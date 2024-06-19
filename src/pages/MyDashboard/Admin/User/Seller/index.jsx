import React, { useEffect, useState } from 'react'
import DashboardLayout from '@layouts/DashboardLayout'
import { activateSeller, getAllSellers } from '@utils/services/adminServices.js'
import { Link } from 'react-router-dom'
import { useDebounce } from 'use-debounce'
const AdminSellerListPage = () => {
    const [sellers, setSellers] = useState([])
    const [size, setSize] = useState(8)
    const [totalPage, setTotalPage] = useState()
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [searchValue] = useDebounce(search, 1000)
    const fetchSeller = async () => {
        try {
            const response = await getAllSellers(page, size, searchValue)
            setSellers(response.sellers)
            setPage(response.paging.current_page)
            setTotalPage(response.paging.total_page)
        } catch (error) {
            console.error('Error Fetching Product', error)
        }
    }

    const handleUpdateStatus = async (sellerId, newStatus) => {
        try {
            await activateSeller(sellerId, newStatus)
            setSellers(
                sellers.map((seller) =>
                    seller.id === sellerId
                        ? { ...seller, is_active: newStatus }
                        : seller
                )
            )
        } catch (error) {
            console.error('Error Updating Seller Status', error)
        }
    }

    useEffect(() => {
        fetchSeller()
    }, [page, size, searchValue])

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
                        List Seller
                    </h1>
                    <div className='my-4 flex justify-between'>
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
                                        Name
                                    </th>
                                    <th scope='col' className='px-6 py-3'>
                                        Email
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
                                {sellers.length === 0 ? (
                                    <tr className='text-black  border-b'>
                                        <td className='px-6 py-4'>
                                            No Data Seller
                                        </td>
                                    </tr>
                                ) : (
                                    <>
                                        {sellers.map((seller, index) => (
                                            <tr
                                                className='text-black bg-white border-b '
                                                key={index}>
                                                <td className='px-6 py-4'>
                                                    {seller.name}
                                                </td>
                                                <td className='px-6 py-4 '>
                                                    {seller.email}
                                                </td>
                                                <td className='px-6 py-4'>
                                                    {seller.is_active
                                                        ? 'Active'
                                                        : 'Not Active'}
                                                </td>

                                                <td className='px-6 py-4'>
                                                    <Link
                                                        type='button'
                                                        to={`/my-dashboard/admin/sellers/detail/${seller.id}`}
                                                        className='p-2  mx-2 text-white rounded-lg bg-sky-600 hover:bg-sky-700'>
                                                        Detail
                                                    </Link>
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

export default AdminSellerListPage
