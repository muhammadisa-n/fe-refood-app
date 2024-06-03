import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import InputForm from '@components/InputForm'
import Button from '@components/Button'
import { useNavigate } from 'react-router-dom'
import AlertMessage from '@components/AlertMessage'
import AuthLayout from '@layouts/AuthLayout'
import { register } from '@utils/services/authServices.js'
import {
    fetchProvinces,
    fetchCities,
    fetchDistricts,
    fetchVillages,
} from '@utils/services/locationServices.js'
const RegisterPage = () => {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confPassword, setConfPassword] = useState('')
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
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const HandleRegister = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        const data = {
            fullname: fullName,
            email: email,
            password: password,
            confPassword: confPassword,
            province: selectedProvinceName,
            city: selectedCityName,
            district: selectedDistrictName,
            village: selectedVillageName,
            postal_code: postalCode,
            address: address,
            role: selectedRole,
            no_hp: noHp,
        }
        try {
            const response = await register(data)
            const msg = response.message
            navigate('/login', { state: { message: msg } })
        } catch (error) {
            setErrorMessage(error.message)
        } finally {
            setIsLoading(false)
        }
    }
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

    return (
        <AuthLayout
            title='Sign Up'
            subtitle='Enter your information to Register'
            margin='mt-10'>
            {/* alert */}
            {errorMessage && (
                <AlertMessage
                    colorBg='text-red-800 bg-red-50'
                    onClick={() => setErrorMessage('')}
                    colorBtn='bg-red-50 text-red-500'>
                    {errorMessage}
                </AlertMessage>
            )}
            {/* end alert */}
            <form onSubmit={HandleRegister}>
                <div className='flex w-full gap-2'>
                    <div className='w-full mb-5'>
                        <label
                            htmlFor='role'
                            className='block mb-2 text-sm font-bold text-slate-700'>
                            Register As
                        </label>
                        <select
                            name='role'
                            onChange={(e) => setSelectedRole(e.target.value)}
                            value={selectedRole}
                            id='role'
                            className='w-full px-3 py-2 text-sm border rounded text-slate-700'>
                            <option value=''>Choose Role</option>
                            <option value='Customer'>Customer</option>
                            <option value='Seller'>Seller</option>
                        </select>
                    </div>
                </div>
                <div className='flex w-full gap-2'>
                    {selectedRole === 'Seller' ? (
                        <div className='w-1/2'>
                            <InputForm
                                label='Name Merchant'
                                name='fullname'
                                placeholder='Name Merchant...'
                                type='text'
                                value={fullName}
                                OnChange={(e) => setFullName(e.target.value)}
                            />
                        </div>
                    ) : (
                        <div className='w-1/2'>
                            <InputForm
                                label='Full Name'
                                name='fullname'
                                placeholder='Your FullName...'
                                type='text'
                                value={fullName}
                                OnChange={(e) => setFullName(e.target.value)}
                            />
                        </div>
                    )}

                    <div className='w-1/2'>
                        <InputForm
                            label='Email'
                            name='email'
                            placeholder='example@mail.com'
                            type='email'
                            value={email}
                            OnChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>
                <div className='flex w-full gap-2'>
                    <div className='w-1/2'>
                        <InputForm
                            label='Password'
                            name='password'
                            placeholder='********'
                            type='password'
                            value={password}
                            OnChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className='w-1/2'>
                        <InputForm
                            label='Confirm Password'
                            name='confPassword'
                            placeholder='********'
                            type='password'
                            value={confPassword}
                            OnChange={(e) => setConfPassword(e.target.value)}
                        />
                    </div>
                </div>
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
                                value={selectedProvince}
                                onChange={handleProvinceChange}
                                className='w-full px-3 py-2 text-sm border rounded text-slate-700'>
                                <option value=''>Choose Province</option>
                                {provinces.map((province) => (
                                    <option
                                        key={province.id}
                                        value={province.id}>
                                        {province.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className='w-1/2'>
                        {selectedProvince ? (
                            <div className='mb-6'>
                                <label
                                    htmlFor='city'
                                    className='block mb-2 text-sm font-bold text-slate-700'>
                                    City
                                </label>
                                <select
                                    name='city'
                                    id='city'
                                    value={selectedCity}
                                    onChange={handleCityChange}
                                    className='w-full px-3 py-2 text-sm border rounded text-slate-700'>
                                    <option value=''>Choose City</option>
                                    {cities.map((city) => (
                                        <option key={city.id} value={city.id}>
                                            {city.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        ) : (
                            <div>
                                <label
                                    htmlFor='city'
                                    className='block mb-2 text-sm font-bold text-slate-700'>
                                    City
                                </label>
                                <select
                                    name='city'
                                    id='city'
                                    value=''
                                    onChange={handleCityChange}
                                    className='w-full px-3 py-2 text-sm border rounded text-slate-700'>
                                    <option value=''>Choose City</option>
                                    {cities.map((city) => (
                                        <option key={city.id} value={city.id}>
                                            {city.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>
                </div>
                <div className='flex w-full gap-2'>
                    <div className='w-1/2'>
                        {selectedCity ? (
                            <div className='mb-6'>
                                <label
                                    htmlFor='district'
                                    className='block mb-2 text-sm font-bold text-slate-700'>
                                    District
                                </label>
                                <select
                                    name='district'
                                    id='district'
                                    value={selectedDistrict}
                                    onChange={handleDistrictChange}
                                    className='w-full px-3 py-2 text-sm border rounded text-slate-700'>
                                    <option value=''>Choose District</option>
                                    {districts.map((district) => (
                                        <option
                                            key={district.id}
                                            value={district.id}>
                                            {district.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        ) : (
                            <div className='mb-6'>
                                <label
                                    htmlFor='district'
                                    className='block mb-2 text-sm font-bold text-slate-700'>
                                    District
                                </label>
                                <select
                                    name='district'
                                    id='district'
                                    value=''
                                    onChange={handleDistrictChange}
                                    className='w-full px-3 py-2 text-sm border rounded text-slate-700'>
                                    <option value=''>Choose District</option>
                                    {districts.map((district) => (
                                        <option
                                            key={district.id}
                                            value={district.id}>
                                            {district.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>
                    <div className='w-1/2'>
                        {selectedDistrict ? (
                            <div className='mb-6'>
                                <label
                                    htmlFor='village'
                                    className='block mb-2 text-sm font-bold text-slate-700'>
                                    Village
                                </label>
                                <select
                                    name='village'
                                    id='village'
                                    value={selectedVillage}
                                    onChange={handleVillageChange}
                                    className='w-full px-3 py-2 text-sm border rounded text-slate-700'>
                                    <option value=''>Choose Village</option>
                                    {villages.map((village) => (
                                        <option
                                            key={village.id}
                                            value={village.id}>
                                            {village.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        ) : (
                            <div className='mb-6'>
                                <label
                                    htmlFor='village'
                                    className='block mb-2 text-sm font-bold text-slate-700'>
                                    Village
                                </label>
                                <select
                                    name='village'
                                    id='village'
                                    value=''
                                    onChange={handleVillageChange}
                                    className='w-full px-3 py-2 text-sm border rounded text-slate-700'>
                                    <option value=''>Choose Village</option>
                                    {villages.map((village) => (
                                        <option
                                            key={village.id}
                                            value={village.id}>
                                            {village.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>
                </div>
                <div className='flex w-full gap-2'>
                    <div className='w-1/2'>
                        <InputForm
                            label='Postal Code'
                            name='postal_code'
                            placeholder='Postal Code.....'
                            type='text'
                            value={postalCode}
                            OnChange={(e) => setPostalCode(e.target.value)}
                        />
                    </div>
                    <div className='w-1/2'>
                        <InputForm
                            label='No Handphone'
                            name='no_hp'
                            placeholder='08xxxxxxxxxx'
                            type='text'
                            value={noHp}
                            OnChange={(e) => setNoHp(e.target.value)}
                        />
                    </div>
                </div>
                <div className='flex w-full gap-2'>
                    <div className='w-full'>
                        <InputForm
                            label='Address / Street'
                            name='address'
                            placeholder='Address.....'
                            type='text'
                            value={address}
                            OnChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                </div>
                <div className='w-full mb-2 text-center'>
                    <p className='text-base font-medium text-black'>
                        Already Have Account ?{' '}
                        <NavLink
                            className='font-bold text-primary '
                            to='/login'>
                            Login Now
                        </NavLink>
                    </p>
                </div>
                <Button
                    disabled={isLoading}
                    classname={`w-full bg-primary relative ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}>
                    {isLoading ? (
                        <div className='absolute inset-0 flex items-center justify-center'>
                            <div className='animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white'></div>
                        </div>
                    ) : (
                        'Sign Up'
                    )}
                </Button>
            </form>
        </AuthLayout>
    )
}
export default RegisterPage
