import React, { useState } from 'react'
import AuthLayout from '@layouts/AuthLayout/index.jsx'
import AlertMessage from '@components/AlertMessage/index.jsx'
import InputForm from '@components/InputForm/index.jsx'
import Button from '@components/Button/index.jsx'
import { forgotPassword } from '@utils/services/authServices.js'

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const response = await forgotPassword(email)
            setMessage(response.message)
        } catch (error) {
            setErrorMessage(error.message)
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <AuthLayout
            title='Reset Password'
            subtitle='Please Fill The Form To Reset Password'>
            {errorMessage && (
                <AlertMessage
                    colorBg='text-red-800 bg-red-50'
                    onClick={() => setErrorMessage('')}
                    colorBtn='bg-red-50 text-red-500'>
                    {errorMessage}
                </AlertMessage>
            )}
            {message && (
                <AlertMessage
                    colorBg='text-green-800 bg-green-50'
                    onClick={() => setMessage('')}
                    colorBtn='bg-green-50 text-green-500'>
                    {message}
                </AlertMessage>
            )}
            <form onSubmit={handleSubmit}>
                <InputForm
                    label='Email'
                    name='email'
                    placeholder='example@mail.com'
                    type='email'
                    disabled={isLoading}
                    value={email}
                    OnChange={(e) => setEmail(e.target.value)}
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
    )
}

export default ForgotPasswordPage
