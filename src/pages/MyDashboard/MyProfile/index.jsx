import React, { useEffect, useState } from 'react'
import DashboardLayout from '@layouts/DashboardLayout'
import ImgDefault from '@assets/userdefault.png'
import Swal from 'sweetalert2'
import InputForm from '@components/InputForm'
import AlertMessage from '@components/AlertMessage/index.jsx'
import { getUser, updateUser } from '@utils/services/userServices.js'
import {
    fetchProvinces,
    fetchCities,
    fetchDistricts,
    fetchVillages,
} from '@utils/services/locationServices.js'
import { useUser } from '@context/userContext.jsx'

const DashboardProfilePage = () => {
    const { refreshUser, user, role } = useUser()
    const [openEditMenu, setOpenEditMenu] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
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
    const [noHp, setNoHp] = useState('')
    const [provinces, setProvinces] = useState([])
    const [cities, setCities] = useState([])
    const [districts, setDistricts] = useState([])
    const [villages, setVillages] = useState([])
    const [image, setImage] = useState(null)
    const [previewImg, setPreviewImg] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const fetchUser = async () => {
        const userdata = await getUser()
        setName(userdata.nama)
        setNoHp(userdata.no_hp)
        setAddress(userdata.alamat)
        setPostalCode(userdata.kode_pos)
        setSelectedProvinceName(userdata.provinsi)
        setSelectedCityName(userdata.kota)
        setSelectedDistrictName(userdata.kecamatan)
        setSelectedVillageName(userdata.kelurahan)
        if (userdata.deskripsi) {
            setDescription(userdata.deskripsi)
        }
        if (userdata.ava_image_url) {
            setPreviewImg(userdata.ava_image_url)
        } else {
            setPreviewImg(ImgDefault)
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])

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
    const handleEditMenu = () => {
        setOpenEditMenu(!openEditMenu)
    }
    const handleUpdate = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        const formData = new FormData()
        formData.append('nama', name)
        formData.append('deskripsi', description)
        formData.append('provinsi', selectedProvinceName)
        formData.append('kota', selectedCityName)
        formData.append('kecamatan', selectedDistrictName)
        formData.append('kelurahan', selectedVillageName)
        formData.append('kode_pos', postalCode)
        formData.append('alamat', address)
        formData.append('no_hp', noHp)
        formData.append('image', image)
        try {
            const response = await updateUser(formData)
            await Swal.fire({
                icon: 'success',
                title: `${response.message}`,
                showConfirmButton: true,
                timer: 2000,
            })
            refreshUser()
            setOpenEditMenu(false)
        } catch (error) {
            setErrorMessage(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    const loadImage = (e) => {
        const file = e.target.files[0]
        setImage(file)
        setPreviewImg(URL.createObjectURL(file))
    }

    return (
        <DashboardLayout>
            <div className='px-6 pt-6'>
                <div className='flex items-center'>
                    <h1 className='text-3xl font-semibold text-primary'>
                        My Profile
                    </h1>
                </div>
                {openEditMenu === false ? (
                    <div className='pb-4 mt-5'>
                        <div className='flex flex-col max-w-full mt-10'>
                            <div className='container px-4 py-8 mx-auto'>
                                <div className='w-full mx-auto bg-white rounded-lg shadow-md'>
                                    <div
                                        className={`${role === 'Admin' ? 'justify-start' : 'justify-between'} md:flex relative w-full`}>
                                        <div className='px-4 py-8'>
                                            <img
                                                className='object-cover w-full h-48 rounded-full md:w-48'
                                                src={previewImg}
                                                alt='Profil-image'
                                            />
                                        </div>
                                        <div className='flex items-start px-4 py-8'>
                                            <div>
                                                <h2 className='text-2xl font-semibold text-gray-800'>
                                                    {user?.nama}
                                                </h2>
                                                <p className='mt-2 text-gray-600'>
                                                    Email: {user?.email}
                                                </p>
                                                {role === 'Seller' && (
                                                    <>
                                                        <p className='mt-2 text-gray-600'>
                                                            Phone: {user?.no_hp}
                                                        </p>
                                                        <p className='mt-2 text-gray-600'>
                                                            Address:{' '}
                                                            {`${user?.alamat}, ${user?.kelurahan} ${user?.kecamatan}, ${user?.kota}, ${user?.provinsi}, ${user?.kode_pos}`}
                                                        </p>
                                                    </>
                                                )}
                                            </div>
                                            <div className='md:absolute right-2 top-1'>
                                                <button
                                                    onClick={handleEditMenu}
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
                                                        setErrorMessage('')
                                                    }
                                                    colorBtn='bg-red-50 text-red-500'>
                                                    {errorMessage}
                                                </AlertMessage>
                                            )}
                                            <div className='flex flex-col w-full gap-2'>
                                                <div className='w-full'>
                                                    <InputForm
                                                        label={
                                                            role === 'Seller'
                                                                ? 'Name Merchant'
                                                                : 'Name'
                                                        }
                                                        name='name'
                                                        placeholder={
                                                            role === 'Seller'
                                                                ? 'Name Merchant...'
                                                                : 'Name...'
                                                        }
                                                        type='text'
                                                        value={name}
                                                        disabled={isLoading}
                                                        OnChange={(e) =>
                                                            setName(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </div>
                                                {role === 'Seller' && (
                                                    <div className='w-full'>
                                                        <label
                                                            htmlFor='description'
                                                            className='block mb-2 text-sm font-bold text-slate-700'>
                                                            Description Merchant
                                                        </label>
                                                        <textarea
                                                            rows={4}
                                                            name='description'
                                                            id='description'
                                                            disabled={isLoading}
                                                            placeholder='Description Merchant...'
                                                            value={description}
                                                            onChange={(e) =>
                                                                setDescription(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className={`w-full px-3 py-2 text-sm border rounded text-slate-700  ${isLoading ? 'bg-gray-200 text-slate-700 border-gray-300' : ''}`}
                                                        />
                                                    </div>
                                                )}
                                                {role === 'Seller' && (
                                                    <>
                                                        <div className='flex w-full gap-2'>
                                                            <div className='w-1/2'>
                                                                <label
                                                                    htmlFor='province'
                                                                    className='block mb-2 text-sm font-bold text-slate-700'>
                                                                    Provinsi
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
                                                                        disabled={
                                                                            isLoading
                                                                        }
                                                                        className={`w-full px-3 py-2 text-sm border rounded text-slate-700 placeholder-opacity-50 ${isLoading ? 'bg-gray-200 text-slate-700 border-gray-300' : ''}`}>
                                                                        <option
                                                                            value={
                                                                                selectedProvinceName
                                                                            }>
                                                                            {
                                                                                selectedProvinceName
                                                                            }
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
                                                                    Kota
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
                                                                        disabled={
                                                                            isLoading
                                                                        }
                                                                        className={`w-full px-3 py-2 text-sm border rounded text-slate-700 placeholder-opacity-50 ${isLoading ? 'bg-gray-200 text-slate-700 border-gray-300' : ''}`}>
                                                                        <option
                                                                            value={
                                                                                selectedCityName
                                                                            }>
                                                                            {
                                                                                selectedCityName
                                                                            }
                                                                        </option>
                                                                        {cities.map(
                                                                            (
                                                                                city
                                                                            ) => (
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
                                                                    Kecamatan
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
                                                                        disabled={
                                                                            isLoading
                                                                        }
                                                                        className={`w-full px-3 py-2 text-sm border rounded text-slate-700 placeholder-opacity-50 ${isLoading ? 'bg-gray-200 text-slate-700 border-gray-300' : ''}`}>
                                                                        <option
                                                                            value={
                                                                                selectedDistrictName
                                                                            }>
                                                                            {
                                                                                selectedDistrictName
                                                                            }
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
                                                                    Kelurahan
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
                                                                        disabled={
                                                                            isLoading
                                                                        }
                                                                        className={`w-full px-3 py-2 text-sm border rounded text-slate-700 placeholder-opacity-50 ${isLoading ? 'bg-gray-200 text-slate-700 border-gray-300' : ''}`}>
                                                                        <option
                                                                            value={
                                                                                selectedVillageName
                                                                            }>
                                                                            {
                                                                                selectedVillageName
                                                                            }
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
                                                                    label='Kode Pos'
                                                                    name='postal_code'
                                                                    placeholder='Kode Pos...'
                                                                    type='text'
                                                                    disabled={
                                                                        isLoading
                                                                    }
                                                                    value={
                                                                        postalCode
                                                                    }
                                                                    OnChange={(
                                                                        e
                                                                    ) =>
                                                                        setPostalCode(
                                                                            e
                                                                                .target
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
                                                                    disabled={
                                                                        isLoading
                                                                    }
                                                                    value={noHp}
                                                                    OnChange={(
                                                                        e
                                                                    ) =>
                                                                        setNoHp(
                                                                            e
                                                                                .target
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
                                                                Alamat
                                                            </label>
                                                            <textarea
                                                                rows={4}
                                                                name='address'
                                                                id='address'
                                                                disabled={
                                                                    isLoading
                                                                }
                                                                placeholder='Your Address...'
                                                                value={address}
                                                                onChange={(e) =>
                                                                    setAddress(
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                className={`w-full px-3 py-2 text-sm border rounded text-slate-700  ${isLoading ? 'bg-gray-200 text-slate-700 border-gray-300' : ''}`}
                                                            />
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                            <div className='mb-6'>
                                                <label
                                                    htmlFor='image'
                                                    className='block mb-2 text-sm font-bold text-slate-700'>
                                                    Image Profile
                                                </label>
                                                <div className='relative inline-block'>
                                                    <input
                                                        type='file'
                                                        disabled={isLoading}
                                                        className={`file:absolute file:right-0 file:bg-primary bg-white py-2 px-4 rounded-full file:text-white file:border-0  file:rounded-full ${isLoading ? 'bg-gray-200 ' : ''}`}
                                                        onChange={loadImage}
                                                    />
                                                </div>
                                            </div>
                                            {previewImg && (
                                                <div className='my-4'>
                                                    <img
                                                        src={previewImg}
                                                        className='object-cover w-[250px] h-[250px] px-2 py-2 bg-transparent rounded-full'
                                                        alt='Preview Profile'
                                                    />
                                                </div>
                                            )}
                                            <div className='flex justify-end mt-6'>
                                                <button
                                                    disabled={isLoading}
                                                    onClick={handleUpdate}
                                                    className={`px-4 py-2 text-white rounded bg-primary hover:bg-secondary focus:outline-none relative ${isLoading ? 'opacity-50 hover:opacity-50' : ''}`}>
                                                    {isLoading ? (
                                                        <div className='absolute inset-0 flex items-center justify-center'>
                                                            <div className='w-4 h-4 border-t-2 border-b-2 border-white rounded-full animate-spin'></div>
                                                        </div>
                                                    ) : (
                                                        'Save'
                                                    )}
                                                </button>
                                                <button
                                                    disabled={isLoading}
                                                    onClick={handleEditMenu}
                                                    className={`ml-4 px-4 py-2 text-white rounded bg-red-500 hover:bg-secondary focus:outline-none ${isLoading ? 'opacity-50 hover:opacity-50' : ''}`}>
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

export default DashboardProfilePage
