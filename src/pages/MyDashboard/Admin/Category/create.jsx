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
    const navigate = useNavigate()
    const handleSave = async (e) => {
        e.preventDefault()
        const data = {
            name: name,
        }
        try {
            const response = await createCategory(data)
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
