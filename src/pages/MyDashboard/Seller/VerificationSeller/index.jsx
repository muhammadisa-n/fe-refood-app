import React, { useEffect, useState } from 'react'
import DashboardLayout from '@layouts/DashboardLayout/index.jsx'
import { useNavigate } from 'react-router-dom'
import AlertMessage from '@components/AlertMessage/index.jsx'
import InputForm from '@components/InputForm/index.jsx'
import Button from '@components/Button/index.jsx'
import { verifySeller } from '@utils/services/sellerServices.js'
import Swal from 'sweetalert2'
import { useUser } from '@context/userContext.jsx'

const VerificationSellerPage = () => {
    const { user } = useUser()
    const navigate = useNavigate()
    const [linkMap, setLinkMap] = useState('')
    const [errorMessage, SetErrorMessage] = useState('')
    const [image, setImage] = useState('')
    const [previewImg, setPreviewImg] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSave = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        const formData = new FormData()
        formData.append('link_map', linkMap)
        formData.append('image', image)
        try {
            const response = await verifySeller(formData)
            await Swal.fire({
                icon: 'success',
                title: `${response.message}`,
                showConfirmButton: true,
                timer: 2000,
            })
            navigate('/my-dashboard')
        } catch (error) {
            SetErrorMessage(error.message)
        } finally {
            setIsLoading(false)
        }
    }
    const loadImage = (e) => {
        const image = e.target.files[0]
        setImage(image)
        setPreviewImg(URL.createObjectURL(image))
    }
    const fetchData = () => {
        if (user.link_map_alamat_toko !== null) {
            setLinkMap(user.link_map_alamat_toko)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])
    return (
        <DashboardLayout>
            <div className='px-6 pt-6 '>
                <div className='flex items-center'>
                    <h1 className='text-3xl font-semibold text-primary'>
                        Verification Seller
                    </h1>
                </div>
                <div className=' w-[60%] items-center justify-center pb-4 mt-5 '>
                    {user.is_active === true ? (
                        <div
                            className={`flex items-center p-4 mb-2  rounded-lg  text-green-800 bg-green-200 mt-3`}
                            role='alert'>
                            <svg
                                className='flex-shrink-0 w-4 h-4'
                                aria-hidden='true'
                                xmlns='http://www.w3.org/2000/svg'
                                fill='currentColor'
                                viewBox='0 0 20 20'>
                                <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z' />
                            </svg>
                            <div className='text-sm font-medium ms-3'>
                                Your Account Has Ben Activated
                            </div>
                        </div>
                    ) : (
                        <>
                            {errorMessage && (
                                <AlertMessage
                                    colorBg='text-red-800 bg-red-50'
                                    onClick={() => SetErrorMessage('')}
                                    colorBtn='bg-red-50 text-red-500'>
                                    {errorMessage}
                                </AlertMessage>
                            )}
                            <form onSubmit={handleSave}>
                                <InputForm
                                    label='Link Gmaps Toko'
                                    name='link_map'
                                    placeholder='https://maps.app.goo.gl/xxxxx'
                                    type='text'
                                    value={linkMap}
                                    disabled={isLoading}
                                    OnChange={(e) => setLinkMap(e.target.value)}
                                />
                                <div></div>
                                <div className='mb-6'>
                                    <label
                                        htmlFor='image'
                                        className='block mb-2 text-sm font-bold text-slate-700'>
                                        Sample Product
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
                                            className='w-[250px] h-[250px] px-2 py-2 bg-white'
                                            alt='Preview Sample Product'
                                        />
                                    </div>
                                )}

                                <Button
                                    disabled={isLoading}
                                    classname={`w-[30%] bg-primary relative ${isLoading ? 'opacity-50' : ''}`}>
                                    {isLoading ? (
                                        <div className='absolute inset-0 flex items-center justify-center'>
                                            <div className='w-4 h-4 border-t-2 border-b-2 border-white rounded-full animate-spin'></div>
                                        </div>
                                    ) : (
                                        'Submit'
                                    )}
                                </Button>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </DashboardLayout>
    )
}

export default VerificationSellerPage
