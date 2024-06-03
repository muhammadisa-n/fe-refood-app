import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import DashboardLayout from '@layouts/DashboardLayout'
import AlertMessage from '@components/AlertMessage/index.jsx'
import InputForm from '@components/InputForm/index.jsx'
import Button from '@components/Button/index.jsx'
import Swal from 'sweetalert2'
import {
    getDetailCategory,
    updateCategory,
} from '@utils/services/adminServices.js'

const AdminUpdateCategoryPage = () => {
    const { id } = useParams()
    const [name, setName] = useState('')
    const navigate = useNavigate()
    const [errorMessage, SetErrorMessage] = useState('')
    const [image, setImage] = useState('')
    const [previewImg, setPreviewImg] = useState('')
    const [categoryNotFound, setCategoryNotFound] = useState(false)
    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const category = await getDetailCategory(id)
                setName(category.name)
                if (category.url_image) {
                    setPreviewImg(category.url_image)
                }
            } catch (error) {
                if (error.status_code === 404) {
                    setCategoryNotFound(true)
                }
            }
        }
        fetchCategory()
    }, [id])

    const handleUpdate = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('name', name)
        formData.append('image', image)
        try {
            const response = await updateCategory(id, formData)
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
                            Update Category
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
                        {categoryNotFound === true ? (
                            <>
                                <div
                                    className={`flex items-center p-4 mb-4  rounded-lg  text-red-800 bg-red-50`}
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
                                        Category Not Found
                                    </div>
                                </div>
                            </>
                        ) : (
                            <form onSubmit={handleUpdate}>
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
                                            className='w-[100px] h-[100px] px-2 py-2 bg-transparent rounded-2xl object-cover '
                                            alt='Preview Category'
                                        />
                                    </div>
                                )}

                                <Button classname='w-[30%] bg-primary rounded-lg'>
                                    Update Category
                                </Button>
                            </form>
                        )}
                    </div>
                </div>
            </DashboardLayout>
        </>
    )
}

export default AdminUpdateCategoryPage
