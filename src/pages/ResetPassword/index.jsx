import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import AuthLayout from '@layouts/AuthLayout'
import AlertMessage from '@components/AlertMessage'
import InputForm from '@components/InputForm'
import Button from '@components/Button'
import { verifyForgotPassword } from '@utils/services/authServices.js'
import { MdError } from 'react-icons/md'

const ResetPasswordPage = () => {
    const [newPassword, setNewPassword] = useState('')
    const [confPassword, setConfPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const query = new URLSearchParams(useLocation().search)
    const token = query.get('token')
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        const data = {
            newPassword: newPassword,
            confPassword: confPassword,
        }
        try {
            const response = await verifyForgotPassword(token, data)
            const msg = response.message
            navigate('/login', { state: { message: msg } })
        } catch (error) {
            setErrorMessage(error.message)
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <>
            {!token ? (
                <div className='flex items-center justify-center max-w-xl min-h-screen mx-auto '>
                    <div className='flex flex-col items-center justify-center gap-4 '>
                        <MdError size={32} className='text-red-500' />
                        <h3 className='text-3xl font-bold text-primary'>
                            Error
                        </h3>
                        <button
                            className='underline transition-all text-primary hover:text-secondary '
                            onClick={() => navigate('/')}>
                            Back To Home
                        </button>
                    </div>
                </div>
            ) : (
                <AuthLayout
                    title='Reset Your Password'
                    subtitle='Please Fill The Form To Reset Password'>
                    {errorMessage && (
                        <AlertMessage
                            colorBg='text-red-800 bg-red-50'
                            onClick={() => setErrorMessage('')}
                            colorBtn='bg-red-50 text-red-500'>
                            {errorMessage}
                        </AlertMessage>
                    )}

                    <form onSubmit={handleSubmit}>
                        <InputForm
                            label='New Password'
                            name='newPassword'
                            placeholder='********'
                            type='password'
                            value={newPassword}
                            OnChange={(e) => setNewPassword(e.target.value)}
                        />
                        <InputForm
                            label='Confirm Password'
                            name='confPassword'
                            placeholder='********'
                            type='password'
                            value={confPassword}
                            OnChange={(e) => setConfPassword(e.target.value)}
                        />
                        <Button
                            disabled={isLoading}
                            classname={`w-full bg-primary relative ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}>
                            {isLoading ? (
                                <div className='absolute inset-0 flex items-center justify-center'>
                                    <div className='animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white'></div>
                                </div>
                            ) : (
                                'Submit'
                            )}
                        </Button>
                    </form>
                </AuthLayout>
            )}
        </>
    )
}

export default ResetPasswordPage
