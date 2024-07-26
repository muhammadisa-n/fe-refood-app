import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import DashboardLayout from '@layouts/DashboardLayout'
import AlertMessage from '@components/AlertMessage/index.jsx'
import InputForm from '@components/InputForm/index.jsx'
import Button from '@components/Button/index.jsx'
import Swal from 'sweetalert2'
import { createProduct } from '@utils/services/sellerServices.js'
import { getAllCategory } from '@utils/services/categoryServices.js'

const SellerCreateProductPage = () => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [selectedCategory, setSelectedCategory] = useState()
    const [categories, setCategories] = useState([])
    const navigate = useNavigate()
    const [errorMessage, SetErrorMessage] = useState('')
    const [image, setImage] = useState('')
    const [previewImg, setPreviewImg] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSave = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        const formData = new FormData()
        formData.append('nama', name)
        formData.append('deskripsi', description)
        formData.append('harga', price)
        formData.append('category_id', selectedCategory)
        formData.append('image', image)
        try {
            const response = await createProduct(formData)
            await Swal.fire({
                icon: 'success',
                title: `${response.message}`,
                showConfirmButton: true,
                timer: 2000,
            })
            navigate('/my-dashboard/seller/products')
        } catch (error) {
            SetErrorMessage(error.message)
        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getAllCategory()
                setCategories(response.categories)
            } catch (error) {
                console.error('Error fetching Categories:', error)
            }
        }
        fetchCategories()
    }, [])
    const loadImage = (e) => {
        const image = e.target.files[0]
        setImage(image)
        setPreviewImg(URL.createObjectURL(image))
    }
    return (
        <>
            <DashboardLayout>
                <div className='px-6 pt-6 '>
                    <div className='flex items-center'>
                        <h1 className='text-3xl font-semibold text-primary'>
                            Add Product
                        </h1>
                    </div>
                    <div className='my-4'>
                        <Link
                            to='/my-dashboard/seller/products'
                            className='px-2 py-2 text-white bg-red-500 rounded-lg'>
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
                                label='Name Product'
                                name='name'
                                placeholder='Name Product...'
                                type='text'
                                value={name}
                                disabled={isLoading}
                                OnChange={(e) => setName(e.target.value)}
                            />
                            <InputForm
                                label='Harga'
                                name='price'
                                placeholder='10000'
                                type='number'
                                value={price}
                                disabled={isLoading}
                                OnChange={(e) => setPrice(e.target.value)}
                            />

                            <div className='mb-6'>
                                <label
                                    htmlFor='category'
                                    className='block mb-2 text-sm font-bold text-slate-700'>
                                    Category
                                </label>
                                <select
                                    name='category'
                                    id='category'
                                    value={selectedCategory}
                                    onChange={(e) =>
                                        setSelectedCategory(e.target.value)
                                    }
                                    disabled={isLoading}
                                    className={`w-full px-3 py-2 text-sm border rounded text-slate-700 ${isLoading ? 'bg-gray-200 text-slate-700 border-gray-300' : ''}`}>
                                    <option value=''>Choose Category</option>
                                    {categories.map((category) => (
                                        <option
                                            key={category.id}
                                            value={category.id}>
                                            {category.nama}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='mb-6'>
                                <label
                                    htmlFor='description'
                                    className='block mb-2 text-sm font-bold text-slate-700'>
                                    Deskripsi Produk
                                </label>
                                <textarea
                                    rows={6}
                                    name='description'
                                    disabled={isLoading}
                                    className={`w-full px-3 py-2 text-sm border rounded text-slate-700 placeholder:opacity-50  ${isLoading ? 'bg-gray-200 text-slate-700 border-gray-300' : ''}`}
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                    placeholder='Description Product...'></textarea>
                            </div>
                            <div className='mb-6'>
                                <label
                                    htmlFor='image'
                                    className='block mb-2 text-sm font-bold text-slate-700'>
                                    Image Product
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
                                        alt='Preview Product'
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
                                    'Add Product'
                                )}
                            </Button>
                        </form>
                    </div>
                </div>
            </DashboardLayout>
        </>
    )
}

export default SellerCreateProductPage
