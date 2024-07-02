import React, { useEffect, useState } from 'react'
import DashboardLayout from '@layouts/DashboardLayout'
import { getAllSellers } from '@utils/services/adminServices.js'
import { Link } from 'react-router-dom'
import { useDebounce } from 'use-debounce'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { PiFilePdfFill } from 'react-icons/pi'

const AdminSellerListPage = () => {
    const [sellers, setSellers] = useState([])
    const [take, setTake] = useState(10)
    const [totalPage, setTotalPage] = useState()
    const [totalSeller, setTotalSeller] = useState()
    const [search, setSearch] = useState('')
    const [status, setStatus] = useState()
    const [page, setPage] = useState(1)
    const [searchValue] = useDebounce(search, 1000)
    const fetchSeller = async () => {
        try {
            const response = await getAllSellers(
                page,
                take,
                searchValue,
                status
            )
            setSellers(response.sellers)
            setTotalSeller(response.total_seller)
            setPage(response.paging.current_page)
            setTotalPage(response.paging.total_page)
        } catch (error) {
            console.error('Error Fetching Product', error)
        }
    }

    useEffect(() => {
        fetchSeller()
    }, [page, take, searchValue, status])

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
    const exportPDF = () => {
        const doc = new jsPDF()
        doc.text('Data Seller', 14, 15)
        doc.autoTable({
            head: [['Name Seller', 'Email', 'No Hp', 'Status']],
            body: sellers.map((seller) => [
                seller.nama,
                seller.email,
                seller.no_hp,
                seller.is_active ? 'Diterima' : 'Ditolak',
            ]),
            startY: 20,
        })
        doc.save('sellers.pdf')
    }
    return (
        <DashboardLayout>
            <div className='px-6 pt-6 '>
                <div className='flex flex-col '>
                    <h1 className='text-3xl font-semibold text-primary'>
                        List Seller
                    </h1>
                </div>
                <div className='mt-5 basis-[85%]  '>
                    <div className='overflow-x-auto'>
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
                                <div className='mb-5 '>
                                    <button
                                        disabled={totalSeller === 0}
                                        onClick={exportPDF}
                                        className='inline-flex px-2 py-1 mt-2 text-white rounded-md bg-primary'>
                                        Export PDF
                                        <PiFilePdfFill size={20} />
                                    </button>
                                </div>
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
                                <div>
                                    <label htmlFor='take'>Filter : </label>
                                    <select
                                        name='take'
                                        id='take'
                                        value={status}
                                        onChange={(e) =>
                                            setStatus(e.target.value)
                                        }
                                        className={` px-1 py-1 text-sm  rounded text-slate-700 bg-white mr-2 my-0 md:my-1 border`}>
                                        <option value=''>Semua</option>
                                        <option value='true'>Diterima</option>
                                        <option value='false'>Ditolak</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <table className='w-full text-sm text-left text-white border rtl:text-right'>
                            <thead className='text-xs text-black uppercase bg-white '>
                                <tr>
                                    <th scope='col' className='px-6 py-3'>
                                        Name Seller
                                    </th>
                                    <th scope='col' className='px-6 py-3'>
                                        Email
                                    </th>
                                    <th scope='col' className='px-6 py-3'>
                                        No Hp
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
                                {totalSeller === 0 ? (
                                    <tr className='text-black border-b'>
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
                                                    {seller.nama}
                                                </td>
                                                <td className='px-6 py-4 '>
                                                    {seller.email}
                                                </td>
                                                <td className='px-6 py-4 '>
                                                    {seller.no_hp}
                                                </td>
                                                <td className='px-6 py-4'>
                                                    {seller.is_active
                                                        ? 'Diterima'
                                                        : 'Ditolak'}
                                                </td>

                                                <td className='px-6 py-4'>
                                                    <Link
                                                        type='button'
                                                        to={`/my-dashboard/admin/sellers/detail/${seller.id}`}
                                                        className='p-2 mx-2 text-white rounded-lg bg-sky-600 hover:bg-sky-700'>
                                                        Detail
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </>
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

export default AdminSellerListPage
