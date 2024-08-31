import React, { useEffect, useState, useRef } from 'react'
import DashboardLayout from '@layouts/DashboardLayout'
import { reportIncomeSeller } from '@utils/services/sellerServices.js'
import { useUser } from '@context/userContext.jsx'
import moment from 'moment-timezone'
import { PiFilePdfFill } from 'react-icons/pi'
import { FaFileExcel } from 'react-icons/fa'
import { HiDocumentDownload } from 'react-icons/hi'
import 'moment/locale/id'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import * as XLSX from 'xlsx'
const SellerReportIncomePage = () => {
    const { user, refreshUser } = useUser()
    const [data, setData] = useState([])
    const [totalSemuaPendapatan, setTotalSemuaPendapatan] = useState(0)
    const [totalPendapatanHariIni, setTotalPendapatanHariIni] = useState(0)
    const [totalPendapatanBulanIni, setTotalPendapatanBulanIni] = useState(0)
    const tableRef = useRef()
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const [isModalOpen, setIsModalOpen] = useState(false)

    const openModal = () => setIsModalOpen(true)
    const closeModal = () => setIsModalOpen(false)

    const fetchReportData = async () => {
        try {
            const response = await reportIncomeSeller(startDate, endDate)
            setData(response.dataPendapatan || [])
            setTotalSemuaPendapatan(response.totalSemuaPendapatan || 0)
            setTotalPendapatanHariIni(response.totalPendapatanHariIni || 0)
            setTotalPendapatanBulanIni(response.totalPendapatanBulanIni || 0)
        } catch (error) {
            console.error('Error Fetching Report Sales', error)
        }
    }

    useEffect(() => {
        refreshUser()
    }, [])

    useEffect(() => {
        fetchReportData()
    }, [startDate, endDate])

    const exportPDF = () => {
        html2canvas(tableRef.current).then((canvas) => {
            const imgData = canvas.toDataURL('image/png')
            const pdf = new jsPDF('p', 'mm', 'a4')

            pdf.setFontSize(16)
            pdf.text(`Data Laporan Pendapatan`, 10, 10)

            pdf.addImage(imgData, 'PNG', 10, 20, 190, 0)
            pdf.save(
                `Data-Laporan-Pendapatan ${startDate ? startDate : new Date().toLocaleDateString()}${endDate ? `- ${endDate}` : ''}.pdf`
            )
        })
    }
    const exportExcel = () => {
        const fileName = `Data Laporan Pendapatan.xlsx`
        const ws = XLSX.utils.json_to_sheet(
            data.map((item, index) => ({
                NO: index + 1,
                Tanggal: moment(item?.waktu_transaksi)
                    .locale('id')
                    .format('D MMMM YYYY'),
                'Total Pendapatan': `Rp. ${item?._sum.total_pembayaran.toLocaleString('id-ID')}`,
            }))
        )

        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, ws, `Data Laporan Pendapatan.xlsx`)
        XLSX.writeFile(wb, fileName)
    }
    return (
        <DashboardLayout>
            <div className='px-6 pt-6'>
                <div className='flex flex-col'>
                    <h1 className='text-3xl font-semibold text-primary'>
                        Laporan Pendapatan
                    </h1>
                    <div className='flex flex-wrap my-4'>
                        <div className='w-full mx-0 md:mx-4 md:my-0 my-4 md:w-1/4 h-[100px] rounded-[8px] bg-white border-l-4 border-primary flex items-center justify-between px-7 hover:shadow-lg transform hover:scale-105 transition duration-300 ease-out'>
                            <div>
                                <h2 className='text-base font-bold leading-3 text-primary'>
                                    Total Pendapatan
                                </h2>
                                <h1 className='mt-2 text-xl font-bold text-gray-600'>
                                    Rp.{' '}
                                    {totalSemuaPendapatan.toLocaleString(
                                        'id-ID'
                                    )}
                                </h1>
                            </div>
                        </div>
                        <div className='w-full mx-0 md:mx-4 md:my-0 my-4 md:w-1/4 h-[100px] rounded-[8px] bg-white border-l-4 border-primary flex items-center justify-between px-7 hover:shadow-lg transform hover:scale-105 transition duration-300 ease-out'>
                            <div>
                                <h2 className='text-base font-bold leading-3 text-primary'>
                                    Total Pendapatan Hari Ini
                                </h2>
                                <h1 className='mt-2 text-xl font-bold text-gray-600'>
                                    Rp.{' '}
                                    {totalPendapatanHariIni.toLocaleString(
                                        'id-ID'
                                    )}
                                </h1>
                            </div>
                        </div>
                        <div className='w-full mx-0 md:mx-4 md:my-0 my-4 md:w-1/4 h-[100px] rounded-[8px] bg-white border-l-4 border-primary flex items-center justify-between px-7 hover:shadow-lg transform hover:scale-105 transition duration-300 ease-out'>
                            <div>
                                <h2 className='text-base font-bold leading-3 text-primary'>
                                    Total Pendapatan Bulan Ini
                                </h2>
                                <h1 className='mt-2 text-xl font-bold text-gray-600'>
                                    Rp.{' '}
                                    {totalPendapatanBulanIni.toLocaleString(
                                        'id-ID'
                                    )}
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='mt-5 basis-[85%]'>
                    <div className='overflow-x-auto'>
                        <div className='flex justify-between w-full'>
                            <div className='flex px-2 mb-5'>
                                <label>
                                    Tanggal Mulai:{' '}
                                    <input
                                        type='date'
                                        value={startDate}
                                        onChange={(e) =>
                                            setStartDate(e.target.value)
                                        }
                                        className='border'
                                    />
                                </label>
                                <label className='ml-4'>
                                    Tanggal Akhir:{' '}
                                    <input
                                        type='date'
                                        value={endDate}
                                        onChange={(e) =>
                                            setEndDate(e.target.value)
                                        }
                                        className='ml-2 border'
                                    />
                                </label>
                            </div>
                            <div className='mb-5'>
                                <button
                                    disabled={data === 0}
                                    onClick={openModal}
                                    className='inline-flex px-2 py-1 mt-2 text-white rounded-md bg-primary'>
                                    Generate Report
                                    <HiDocumentDownload size={24} />
                                </button>
                            </div>
                            {isModalOpen && (
                                <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
                                    <div className='w-11/12 max-w-md p-8 bg-white rounded-lg shadow-lg'>
                                        <h2 className='mb-4 text-xl font-bold'>
                                            Generate Report
                                        </h2>
                                        <ul className='space-y-4'>
                                            <button
                                                className='inline-flex w-full px-4 py-2 text-left rounded-md hover:bg-gray-200'
                                                onClick={() => {
                                                    exportPDF()
                                                    closeModal()
                                                }}>
                                                PDF
                                                <PiFilePdfFill size={24} />
                                            </button>
                                            <button
                                                className='inline-flex w-full px-4 py-2 text-left rounded-md hover:bg-gray-200'
                                                onClick={() => {
                                                    exportExcel()
                                                    closeModal()
                                                }}>
                                                Excel
                                                <FaFileExcel size={20} />
                                            </button>
                                        </ul>
                                        <div className='mt-4 text-right'>
                                            <button
                                                className='px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-700'
                                                onClick={closeModal}>
                                                Close
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <table
                            ref={tableRef}
                            className='w-full mb-4 text-sm text-left text-white border rtl:text-right'>
                            <thead className='text-xs text-black uppercase bg-white'>
                                <tr>
                                    <th scope='col' className='px-6 py-3'>
                                        NO
                                    </th>
                                    <th scope='col' className='px-6 py-3'>
                                        Tanggal
                                    </th>
                                    <th scope='col' className='px-6 py-3'>
                                        Total Pendapatan
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.length === 0 ? (
                                    <tr className='text-black border-b'>
                                        <td
                                            colSpan='7'
                                            className='px-6 py-4 text-center'>
                                            Data Pendapatan Tidak Ada
                                        </td>
                                    </tr>
                                ) : (
                                    data.map((item, index) => (
                                        <tr
                                            className='text-black bg-white border-b'
                                            key={index}>
                                            <td className='px-6 py-4'>
                                                {index + 1}
                                            </td>
                                            <td>
                                                {moment(item?.waktu_transaksi)
                                                    .locale('id')
                                                    .format('D MMMM YYYY')}
                                            </td>
                                            <td className='px-6 py-4'>
                                                Rp.{' '}
                                                {item?._sum.total_pembayaran.toLocaleString(
                                                    'id-ID'
                                                )}
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

export default SellerReportIncomePage
