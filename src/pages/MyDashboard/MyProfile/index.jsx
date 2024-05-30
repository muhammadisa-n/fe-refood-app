import React, { useEffect, useState } from 'react'
import DashboardLayout from '@layouts/DashboardLayout'
import ImgDefault from '@assets/userdefault.png'
import axiosJWT from '@utils/services/axiosJWT.js'
import Swal from 'sweetalert2'
import InputForm from '@components/InputForm'
import axios from 'axios'
import AlertMessage from '@components/AlertMessage/index.jsx'

const DashboardProfile = () => {
    const [token, setToken] = useState(
        localStorage.getItem('access_token') || ''
    )
    const [openEditMenu, setOpenEditMenu] = useState(false)
    const [user, setUser] = useState()
    const [errorMessage, SetErrorMessage] = useState('')
    const [fullName, setFullName] = useState('')
    const [selectedProvince, setSelectedProvince] = useState('')
    const [selectedProvinceName, setSelectedProvinceName] = useState('')
    const [selectedCity, setSelectedCity] = useState('')
    const [selectedCityName, setSelectedCityName] = useState('')
    const [selectedDistrict, setSelectedDistrict] = useState('')
    const [selectedDistrictName, setSelectedDistrictName] = useState('')
    const [selectedVillage, setSelectedVillage] = useState('')
    const [selectedVillageName, setSelectedVillageName] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [address, setAddress] = useState('')
    const [selectedRole, setSelectedRole] = useState('')
    const [noHp, setNoHp] = useState('')
    const [provinces, setProvinces] = useState([])
    const [cities, setCities] = useState([])
    const [districts, setDistricts] = useState([])
    const [villages, setVillages] = useState([])
    const [image, setImage] = useState(null)
    const [previewImg, setPreviewImg] = useState('')

    const handleUpdate = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('fullname', fullName)
        formData.append('province', selectedProvinceName)
        formData.append('city', selectedCityName)
        formData.append('district', selectedDistrictName)
        formData.append('village', selectedVillageName)
        formData.append('postal_code', postalCode)
        formData.append('address', address)
        formData.append('no_hp', noHp)
        if (image) {
            formData.append('image', image)
        }

        try {
            const response = await axiosJWT.put('user/update', formData)
            Swal.fire({
                icon: 'success',
                title: `${response.data.message}`,
                showConfirmButton: true,
                timer: 1500,
            }).then((result) => {
                if (result.isConfirmed) {
                    setOpenEditMenu(false)
                    getUser()
                }
            })
        } catch (error) {
            if (error.response) {
                SetErrorMessage(error.response.data.message)
            }
        }
    }

    const getUser = async () => {
        const response = await axiosJWT.get('user/get')
        const userdata = response.data.user
        setUser(userdata)
        setFullName(userdata.fullname)
        setNoHp(userdata.no_hp)
        setAddress(userdata.address)
        setPostalCode(userdata.postal_code)
        setSelectedRole(userdata.role)
        setSelectedProvinceName(userdata.province)
        setSelectedCityName(userdata.city)
        setSelectedDistrictName(userdata.district)
        setSelectedVillageName(userdata.village)
        if (userdata.url_image) {
            setPreviewImg(userdata.url_image)
        } else {
            setPreviewImg(ImgDefault)
        }

        // Fetch data kota, kecamatan, dan kelurahan berdasarkan nama provinsi, kota, dan kecamatan yang ada
        if (userdata.province) {
            const province = provinces.find(
                (prov) => prov.name === userdata.province
            )
            if (province) {
                setSelectedProvince(province.id)
                fetchCities(province.id)
            }
        }
        if (userdata.city) {
            const city = cities.find((ct) => ct.name === userdata.city)
            if (city) {
                setSelectedCity(city.id)
                fetchDistricts(city.id)
            }
        }
        if (userdata.district) {
            const district = districts.find(
                (dist) => dist.name === userdata.district
            )
            if (district) {
                setSelectedDistrict(district.id)
                fetchVillages(district.id)
            }
        }
    }

    useEffect(() => {
        if (token) {
            getUser()
        }
    }, [token])

    const loadImage = (e) => {
        const file = e.target.files[0]
        setImage(file)
        setPreviewImg(URL.createObjectURL(file))
    }

    useEffect(() => {
        // Fetch data provinsi dari URL
        axios
            .get(
                'https://muhammadisa226.github.io/api-wilayah-indonesia/api/provinces.json'
            )
            .then((response) => {
                setProvinces(response.data)
            })
            .catch((error) => console.error('Error fetching provinces:', error))
    }, [])

    useEffect(() => {
        if (selectedProvince) {
            fetchCities(selectedProvince)
        }
    }, [selectedProvince])

    useEffect(() => {
        if (selectedCity) {
            fetchDistricts(selectedCity)
        }
    }, [selectedCity])

    useEffect(() => {
        if (selectedDistrict) {
            fetchVillages(selectedDistrict)
        }
    }, [selectedDistrict])

    const fetchCities = (provinceId) => {
        // Fetch data kota berdasarkan id provinsi yang dipilih
        axios
            .get(
                `https://muhammadisa226.github.io/api-wilayah-indonesia/api/regencies/${provinceId}.json`
            )
            .then((response) => {
                setCities(response.data)
            })
            .catch((error) => {
                console.error('Error fetching cities:', error)
            })
    }

    const fetchDistricts = (cityId) => {
        // Fetch data kecamatan berdasarkan id kota yang dipilih
        axios
            .get(
                `https://muhammadisa226.github.io/api-wilayah-indonesia/api/districts/${cityId}.json`
            )
            .then((response) => {
                setDistricts(response.data)
            })
            .catch((error) => console.error('Error fetching districts:', error))
    }

    const fetchVillages = (districtId) => {
        // Fetch data kelurahan berdasarkan id kecamatan yang dipilih
        axios
            .get(
                `https://muhammadisa226.github.io/api-wilayah-indonesia/api/villages/${districtId}.json`
            )
            .then((response) => {
                setVillages(response.data)
            })
            .catch((error) => console.error('Error fetching villages:', error))
    }

    const handleProvinceChange = (event) => {
        const selectedProvinceId = event.target.value
        const provinceName =
            event.target.options[event.target.selectedIndex].text
        setSelectedProvince(selectedProvinceId)
        setSelectedProvinceName(provinceName)
        setSelectedCity('')
        setSelectedDistrict('')
        setSelectedVillage('')
        setSelectedCityName('')
        setSelectedDistrictName('')
        setSelectedVillageName('')

        fetchCities(selectedProvinceId)
    }

    const handleCityChange = (event) => {
        const selectedCityId = event.target.value
        const cityName = event.target.options[event.target.selectedIndex].text
        setSelectedCity(selectedCityId)
        setSelectedCityName(cityName)
        setSelectedDistrict('')
        setSelectedVillage('')
        setSelectedDistrictName('')
        setSelectedVillageName('')

        fetchDistricts(selectedCityId)
    }

    const handleDistrictChange = (event) => {
        const selectedDistrictId = event.target.value
        const districtName =
            event.target.options[event.target.selectedIndex].text
        setSelectedDistrict(selectedDistrictId)
        setSelectedDistrictName(districtName)
        setSelectedVillage('')
        setSelectedVillageName('')

        fetchVillages(selectedDistrictId)
    }

    const handleVillageChange = (event) => {
        const selectedVillageId = event.target.value
        const villageName =
            event.target.options[event.target.selectedIndex].text
        setSelectedVillage(selectedVillageId)
        setSelectedVillageName(villageName)
    }

    return (
        <DashboardLayout>
            <div className='px-6 pt-6'>
                <div className='flex items-center'>
                    <h1 className='text-3xl font-semibold text-primary'>
                        Profil Saya
                    </h1>
                </div>
                {openEditMenu === false ? (
                    <div className='pb-4 mt-5'>
                        <div className='flex flex-col max-w-full mt-10'>
                            <div className='container px-4 py-8 mx-auto'>
                                <div className='w-[75%] mx-auto bg-white rounded-lg shadow-md'>
                                    <div className='justify-between md:flex'>
                                        <div className='px-4 py-8'>
                                            <img
                                                className='object-cover w-full h-48 md:w-48'
                                                src={previewImg}
                                                alt='Profil'
                                            />
                                        </div>
                                        <div className='flex items-start px-4 py-8'>
                                            <div>
                                                <h2 className='text-xl font-semibold text-gray-800'>
                                                    {user?.fullname}
                                                </h2>
                                                <p className='mt-2 text-gray-600'>
                                                    Role: {user?.role}
                                                </p>
                                                <p className='mt-2 text-gray-600'>
                                                    Phone: {user?.no_hp}
                                                </p>
                                                <p className='mt-2 text-gray-600'>
                                                    Address:{' '}
                                                    {`${user?.address}, ${user?.district}, ${user?.city}, ${user?.province}, ${user?.postal_code}`}
                                                </p>
                                            </div>
                                            <div className='ml-auto'>
                                                <button
                                                    onClick={() =>
                                                        setOpenEditMenu(
                                                            !openEditMenu
                                                        )
                                                    }
                                                    className='px-4 py-2 text-white rounded bg-primary hover:bg-secondary focus:outline-none'>
                                                    Edit
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='pb-4 mt-5'>
                        <div className='flex flex-col max-w-full mt-10'>
                            <div className='container px-4 py-8 mx-auto'>
                                <div className='w-[75%] mx-auto bg-white rounded-lg shadow-md'>
                                    <div className=''>
                                        <div className='px-4 py-8'>
                                            {errorMessage && (
                                                <AlertMessage
                                                    colorBg='text-red-800 bg-red-50'
                                                    onClick={() =>
                                                        SetErrorMessage('')
                                                    }
                                                    colorBtn='bg-red-50 text-red-500'>
                                                    {errorMessage}
                                                </AlertMessage>
                                            )}
                                            <div className='flex w-full flex-col gap-2'>
                                                {selectedRole === 'Seller' ? (
                                                    <div className='w-full'>
                                                        <InputForm
                                                            label='Name Merchant'
                                                            name='fullname'
                                                            placeholder='Name Merchant...'
                                                            type='text'
                                                            value={fullName}
                                                            OnChange={(e) =>
                                                                setFullName(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className='w-full'>
                                                        <InputForm
                                                            label='Full Name'
                                                            name='fullname'
                                                            placeholder='Your FullName...'
                                                            type='text'
                                                            value={fullName}
                                                            OnChange={(e) =>
                                                                setFullName(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                )}
                                                <div className='flex w-full gap-2'>
                                                    <div className='w-1/2'>
                                                        <label
                                                            htmlFor='province'
                                                            className='block mb-2 text-sm font-bold text-slate-700'>
                                                            Province
                                                        </label>
                                                        <div className='mb-6'>
                                                            <select
                                                                name='province'
                                                                id='province'
                                                                value={
                                                                    selectedProvince
                                                                }
                                                                onChange={
                                                                    handleProvinceChange
                                                                }
                                                                className='w-full px-3 py-2 text-sm border rounded text-slate-700'>
                                                                <option value=''>
                                                                    Choose
                                                                    Province
                                                                </option>
                                                                {provinces.map(
                                                                    (
                                                                        province
                                                                    ) => (
                                                                        <option
                                                                            key={
                                                                                province.id
                                                                            }
                                                                            value={
                                                                                province.id
                                                                            }>
                                                                            {
                                                                                province.name
                                                                            }
                                                                        </option>
                                                                    )
                                                                )}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className='w-1/2'>
                                                        <label
                                                            htmlFor='city'
                                                            className='block mb-2 text-sm font-bold text-slate-700'>
                                                            City
                                                        </label>
                                                        <div className='mb-6'>
                                                            <select
                                                                name='city'
                                                                id='city'
                                                                value={
                                                                    selectedCity
                                                                }
                                                                onChange={
                                                                    handleCityChange
                                                                }
                                                                className='w-full px-3 py-2 text-sm border rounded text-slate-700'>
                                                                <option value=''>
                                                                    Choose City
                                                                </option>
                                                                {cities.map(
                                                                    (city) => (
                                                                        <option
                                                                            key={
                                                                                city.id
                                                                            }
                                                                            value={
                                                                                city.id
                                                                            }>
                                                                            {
                                                                                city.name
                                                                            }
                                                                        </option>
                                                                    )
                                                                )}
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='flex w-full gap-2'>
                                                    <div className='w-1/2'>
                                                        <label
                                                            htmlFor='district'
                                                            className='block mb-2 text-sm font-bold text-slate-700'>
                                                            District
                                                        </label>
                                                        <div className='mb-6'>
                                                            <select
                                                                name='district'
                                                                id='district'
                                                                value={
                                                                    selectedDistrict
                                                                }
                                                                onChange={
                                                                    handleDistrictChange
                                                                }
                                                                className='w-full px-3 py-2 text-sm border rounded text-slate-700'>
                                                                <option value=''>
                                                                    Choose
                                                                    District
                                                                </option>
                                                                {districts.map(
                                                                    (
                                                                        district
                                                                    ) => (
                                                                        <option
                                                                            key={
                                                                                district.id
                                                                            }
                                                                            value={
                                                                                district.id
                                                                            }>
                                                                            {
                                                                                district.name
                                                                            }
                                                                        </option>
                                                                    )
                                                                )}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className='w-1/2'>
                                                        <label
                                                            htmlFor='village'
                                                            className='block mb-2 text-sm font-bold text-slate-700'>
                                                            Village
                                                        </label>
                                                        <div className='mb-6'>
                                                            <select
                                                                name='village'
                                                                id='village'
                                                                value={
                                                                    selectedVillage
                                                                }
                                                                onChange={
                                                                    handleVillageChange
                                                                }
                                                                className='w-full px-3 py-2 text-sm border rounded text-slate-700'>
                                                                <option value=''>
                                                                    Choose
                                                                    Village
                                                                </option>
                                                                {villages.map(
                                                                    (
                                                                        village
                                                                    ) => (
                                                                        <option
                                                                            key={
                                                                                village.id
                                                                            }
                                                                            value={
                                                                                village.id
                                                                            }>
                                                                            {
                                                                                village.name
                                                                            }
                                                                        </option>
                                                                    )
                                                                )}
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='flex w-full gap-2'>
                                                    <div className='w-1/2'>
                                                        <InputForm
                                                            label='Postal Code'
                                                            name='postal_code'
                                                            placeholder='Postal Code...'
                                                            type='text'
                                                            value={postalCode}
                                                            OnChange={(e) =>
                                                                setPostalCode(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                    <div className='w-1/2'>
                                                        <InputForm
                                                            label='Phone Number'
                                                            name='no_hp'
                                                            placeholder='Phone Number...'
                                                            type='text'
                                                            value={noHp}
                                                            OnChange={(e) =>
                                                                setNoHp(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </div>

                                                <div className='w-full'>
                                                    <label
                                                        htmlFor='address'
                                                        className='block mb-2 text-sm font-bold text-slate-700'>
                                                        Address
                                                    </label>
                                                    <textarea
                                                        name='address'
                                                        id='address'
                                                        placeholder='Your Address...'
                                                        value={address}
                                                        onChange={(e) =>
                                                            setAddress(
                                                                e.target.value
                                                            )
                                                        }
                                                        className='w-full px-3 py-2 text-sm border rounded text-slate-700'
                                                    />
                                                </div>
                                            </div>
                                            <div className='flex justify-end mt-6'>
                                                <button
                                                    onClick={handleUpdate}
                                                    className='px-4 py-2 text-white rounded bg-primary hover:bg-secondary focus:outline-none'>
                                                    Update
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        setOpenEditMenu(
                                                            !openEditMenu
                                                        )
                                                    }
                                                    className='ml-4 px-4 py-2 text-white rounded bg-red-500 hover:bg-secondary focus:outline-none'>
                                                    Close
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    )
}

export default DashboardProfile
