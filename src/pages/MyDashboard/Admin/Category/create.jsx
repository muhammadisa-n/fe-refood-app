import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import DashboardLayout from '@layouts/DashboardLayout'
import AlertMessage from '@components/AlertMessage/index.jsx'
import InputForm from '@components/InputForm/index.jsx'
import Button from '@components/Button/index.jsx'
import Swal from 'sweetalert2'
import { createCategory } from '@utils/services/adminServices.js'

const AdminCreateCategoryPage = () => {
    const [name, setName] = useState('')
    const [errorMessage, SetErrorMessage] = useState('')
    const [image, setImage] = useState('')
    const [previewImg, setPreviewImg] = useState('')
    const navigate = useNavigate()
    const handleSave = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('name', name)
        formData.append('image', image)
        try {
            const response = await createCategory(formData)
            Swal.fire({
                icon: 'success',
                title: `${response.message}`,
                showConfirmButton: true,
                timer: 1500,
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/my-dashboard/admin/category')
                }
            })
        } catch (error) {
            SetErrorMessage(error.message)
        }
    }
    const loadImage = (e) => {
        const image = e.target.files[0]
        setImage(image)
        setPreviewImg(URL.createObjectURL(image))
    }
    return (
        <>
            <DashboardLayout>
                <div className='px-6 pt-6  '>
                    <div className='flex items-center'>
                        <h1 className='text-3xl font-semibold text-primary'>
                            Add Category
                        </h1>
                    </div>
                    <div className='my-4'>
                        <Link
                            to='/my-dashboard/admin/category'
                            className='px-2 py-2 text-white rounded-lg bg-red-500'>
                            Back
                        </Link>
                    </div>
                    <div className=' w-[60%] items-center justify-center pb-4 mt-5 '>
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
                                label='Name Category'
                                name='name'
                                placeholder='Name Category...'
                                type='text'
                                value={name}
                                OnChange={(e) => setName(e.target.value)}
                            />
                            <div className='mb-6'>
                                <label
                                    htmlFor='image'
                                    className='block mb-2 text-sm font-bold text-slate-700'>
                                    Image Category
                                </label>
                                <div className='relative inline-block'>
                                    <input
                                        type='file'
                                        className='file:absolute file:right-0 file:bg-primary bg-white py-2 px-4 rounded-full file:text-white file:border-0  file:rounded-full'
                                        onChange={loadImage}
                                    />
                                </div>
                            </div>
                            {previewImg && (
                                <div className='my-4'>
                                    <img
                                        src={previewImg}
                                        className='w-[100px] h-[100px] px-2 py-2 bg-white'
                                        alt='Preview Category'
                                    />
                                </div>
                            )}

                            <Button classname='w-[30%] bg-primary rounded-lg'>
                                Add Category
                            </Button>
                        </form>
                    </div>
                </div>
            </DashboardLayout>
        </>
    )
}

export default AdminCreateCategoryPage
