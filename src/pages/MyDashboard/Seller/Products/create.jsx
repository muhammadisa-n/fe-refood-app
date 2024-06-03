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
    const [stock, setStock] = useState('')
    const [selectedCategory, setSelectedCategory] = useState()
    const [categories, setCategories] = useState([])
    const navigate = useNavigate()
    const [errorMessage, SetErrorMessage] = useState('')
    const [image, setImage] = useState('')
    const [previewImg, setPreviewImg] = useState('')
    const handleSave = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('name', name)
        formData.append('description', description)
        formData.append('price', price)
        formData.append('stock', stock)
        formData.append('categoryId', selectedCategory)
        formData.append('image', image)
        try {
            const response = await createProduct(formData)
            Swal.fire({
                icon: 'success',
                title: `${response.message}`,
                showConfirmButton: true,
                timer: 1500,
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/my-dashboard/seller/products')
                }
            })
        } catch (error) {
            SetErrorMessage(error.message)
        }
    }
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const category = await getAllCategory()
                setCategories(category)
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
                <div className='px-6 pt-6  '>
                    <div className='flex items-center'>
                        <h1 className='text-3xl font-semibold text-primary'>
                            Add Product
                        </h1>
                    </div>
                    <div className='my-4'>
                        <Link
                            to='/my-dashboard/seller/products'
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
                                label='Name Product'
                                name='name'
                                placeholder='Name Product...'
                                type='text'
                                value={name}
                                OnChange={(e) => setName(e.target.value)}
                            />
                            <InputForm
                                label='Price'
                                name='price'
                                placeholder='10000'
                                type='number'
                                value={price}
                                OnChange={(e) => setPrice(e.target.value)}
                            />
                            <InputForm
                                label='Stock'
                                name='stock'
                                placeholder='100'
                                type='number'
                                value={stock}
                                OnChange={(e) => setStock(e.target.value)}
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
                                    className='w-full px-3 py-2 text-sm border rounded text-slate-700'>
                                    <option value=''>Choose Category</option>
                                    {categories.map((category) => (
                                        <option
                                            key={category.id}
                                            value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='mb-6'>
                                <label
                                    htmlFor='description'
                                    className='block mb-2 text-sm font-bold text-slate-700'>
                                    Description Product
                                </label>
                                <textarea
                                    rows={6}
                                    name='description'
                                    className='w-full px-3 py-2 text-sm border rounded text-slate-700 placeholder:opacity-50'
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
                                        className='file:absolute file:right-0 file:bg-primary bg-white py-2 px-4 rounded-full file:text-white file:border-0  file:rounded-full'
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

                            <Button classname='w-[30%] bg-primary rounded-lg'>
                                Add Product
                            </Button>
                        </form>
                    </div>
                </div>
            </DashboardLayout>
        </>
    )
}

export default SellerCreateProductPage
