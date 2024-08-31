import React, { useEffect, useState } from 'react'
import DashboardLayout from '@layouts/DashboardLayout'
import { getAllSellers } from '@utils/services/adminServices.js'
import { Link } from 'react-router-dom'
import { useDebounce } from 'use-debounce'
import {
    fetchProvinces,
    fetchCities,
    fetchDistricts,
    fetchVillages,
} from '@utils/services/locationServices.js'
const AdminDataSellerPage = () => {
    const [sellers, setSellers] = useState([])
    const [take, setTake] = useState(10)
    const [totalPage, setTotalPage] = useState()
    const [totalSeller, setTotalSeller] = useState()
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [searchValue] = useDebounce(search, 1000)
    const [selectedProvince, setSelectedProvince] = useState('')
    const [selectedProvinceName, setSelectedProvinceName] = useState('')
    const [selectedCity, setSelectedCity] = useState('')
    const [selectedCityName, setSelectedCityName] = useState('')
    const [selectedDistrict, setSelectedDistrict] = useState('')
    const [selectedDistrictName, setSelectedDistrictName] = useState('')
    const [selectedVillage, setSelectedVillage] = useState('')
    const [selectedVillageName, setSelectedVillageName] = useState('')
    const [provinces, setProvinces] = useState([])
    const [cities, setCities] = useState([])
    const [districts, setDistricts] = useState([])
    const [villages, setVillages] = useState([])
    useEffect(() => {
        const loadProvinces = async () => {
            try {
                const provincesData = await fetchProvinces()
                setProvinces(provincesData)
            } catch (error) {
                console.error('Error fetching provinces:', error)
            }
        }

        loadProvinces()
    }, [])

    const handleProvinceChange = async (event) => {
        const selectedProvinceId = event.target.value
        const provinceName =
            event.target.options[event.target.selectedIndex].text
        setSelectedProvince(selectedProvinceId)
        setSelectedProvinceName(provinceName)
        console.log(selectedProvinceName)
        setSelectedCity('')
        setSelectedDistrict('')
        setSelectedVillage('')
        setSelectedCityName('')
        setSelectedDistrictName('')
        setSelectedVillageName('')

        try {
            const citiesData = await fetchCities(selectedProvinceId)
            setCities(citiesData)
        } catch (error) {
            console.error('Error fetching cities:', error)
        }
    }

    const handleCityChange = async (event) => {
        const selectedCityId = event.target.value
        const cityName = event.target.options[event.target.selectedIndex].text
        setSelectedCity(selectedCityId)
        setSelectedCityName(cityName)
        setSelectedDistrict('')
        setSelectedVillage('')
        setSelectedDistrictName('')
        setSelectedVillageName('')

        try {
            const districtsData = await fetchDistricts(selectedCityId)
            setDistricts(districtsData)
        } catch (error) {
            console.error('Error fetching districts:', error)
        }
    }

    const handleDistrictChange = async (event) => {
        const selectedDistrictId = event.target.value
        const districtName =
            event.target.options[event.target.selectedIndex].text
        setSelectedDistrict(selectedDistrictId)
        setSelectedDistrictName(districtName)
        setSelectedVillage('')
        setSelectedVillageName('')

        try {
            const villagesData = await fetchVillages(selectedDistrictId)
            setVillages(villagesData)
        } catch (error) {
            console.error('Error fetching villages:', error)
        }
    }

    const handleVillageChange = (event) => {
        setSelectedVillage(event.target.value)
        const villageName =
            event.target.options[event.target.selectedIndex].text
        setSelectedVillageName(villageName)
    }
    const fetchSellers = async () => {
        try {
            const response = await getAllSellers(
                page,
                take,
                searchValue,
                selectedProvinceName,
                selectedCityName,
                selectedDistrictName,
                selectedVillageName
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
        fetchSellers()
    }, [
        page,
        take,
        searchValue,
        selectedProvinceName,
        selectedCityName,
        selectedDistrictName,
        selectedVillageName,
    ])

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
            <div className='px-6 pt-6'>
                <div className='flex flex-col'>
                    <h1 className='text-3xl font-semibold text-primary'>
                        Data Seller
                    </h1>
                </div>
                <div className='mt-5 basis-[85%]'>
                    <div className='overflow-x-auto'>
                        <div className='flex justify-between w-full'>
                            <div className='px-2'>
                                <select
                                    name='take'
                                    id='take'
                                    value={take}
                                    onChange={(e) => setTake(e.target.value)}
                                    className='px-1 py-1 my-0 mr-2 text-sm bg-white border rounded text-slate-700 md:my-1'>
                                    <option value='10'>10</option>
                                    <option value='25'>25</option>
                                    <option value='50'>50</option>
                                    <option value='100'>100</option>
                                </select>
                                <label htmlFor='take'>Data Per Page</label>
                            </div>
                            <div className='px-2'>
                                <input
                                    type='text'
                                    className='px-2 py-1 mb-2 font-light text-black border-2 rounded-lg w-52 md:w-full'
                                    placeholder='Search...'
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className='flex gap-4 mt-4'>
                            <div className='w-1/4'>
                                <select
                                    value={selectedProvince}
                                    onChange={handleProvinceChange}
                                    className='w-full p-2 border rounded'>
                                    <option value=''>Pilih Provinsi</option>
                                    {provinces.map((province) => (
                                        <option
                                            key={province.id}
                                            value={province.id}>
                                            {province.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='w-1/4'>
                                <select
                                    value={selectedCity}
                                    onChange={handleCityChange}
                                    className='w-full p-2 border rounded'>
                                    <option value=''>Pilih Kota</option>
                                    {cities.map((city) => (
                                        <option key={city.id} value={city.id}>
                                            {city.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='w-1/4'>
                                <select
                                    value={selectedDistrict}
                                    onChange={handleDistrictChange}
                                    className='w-full p-2 border rounded'>
                                    <option value=''>Pilih Kecamatan</option>
                                    {districts.map((district) => (
                                        <option
                                            key={district.id}
                                            value={district.id}>
                                            {district.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='w-1/4 mb-4'>
                                <select
                                    value={selectedVillage}
                                    onChange={handleVillageChange}
                                    className='w-full p-2 border rounded'>
                                    <option value=''>Pilih Desa</option>
                                    {villages.map((village) => (
                                        <option
                                            key={village.id}
                                            value={village.id}>
                                            {village.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <table className='w-full text-sm text-left text-white border rtl:text-right'>
                            <thead className='text-xs text-black uppercase bg-white'>
                                <tr>
                                    <th scope='col' className='px-6 py-3'>
                                        Nama Seller
                                    </th>
                                    <th scope='col' className='px-6 py-3'>
                                        No Hp
                                    </th>
                                    <th scope='col' className='px-6 py-3'>
                                        Total Produk
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
                                    sellers.map((seller, index) => (
                                        <tr
                                            className='text-black bg-white border-b'
                                            key={index}>
                                            <td className='px-6 py-4'>
                                                {seller.nama}
                                            </td>
                                            <td className='px-6 py-4'>
                                                {seller.no_hp}
                                            </td>
                                            <td className='px-6 py-4'>
                                                {seller.Products.length}
                                            </td>
                                            <td className='px-6 py-4'>
                                                <Link
                                                    type='button'
                                                    to={`/my-dashboard/admin/data-sellers/${seller.id}`}
                                                    className='p-2 mx-2 text-white rounded-lg bg-sky-600 hover:bg-sky-700'>
                                                    Detail
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                        {totalPage > 1 && (
                            <div className='mt-4 space-x-3 text-right'>
                                <button
                                    className='px-2 py-1 font-semibold text-white rounded-md bg-primary hover:bg-secondary disabled:bg-orange-700'
                                    onClick={handlePrev}
                                    disabled={page === 1}>
                                    Prev
                                </button>
                                <span>{page}</span>
                                <button
                                    className='px-2 py-1 mb-2 font-semibold text-white rounded-md bg-primary hover:bg-secondary disabled:bg-orange-700'
                                    onClick={handleNext}
                                    disabled={
                                        page === totalPage || page > totalPage
                                    }>
                                    Next
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default AdminDataSellerPage
