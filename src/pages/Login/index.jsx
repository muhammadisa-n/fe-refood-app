import React, { useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import InputForm from '@components/InputForm'
import Button from '@components/Button'
import AlertMessage from '@components/AlertMessage'
import AuthLayout from '@layouts/AuthLayout/index.jsx'
import { login } from '@utils/services/authServices.js'
import { jwtDecode } from 'jwt-decode'
const LoginPage = () => {
    const location = useLocation()
    const [message, setMessage] = useState(
        location.state ? location.state.message : ''
    )
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const HandleLogin = async (e) => {
        setErrorMessage('')
        e.preventDefault()
        setIsLoading(true)
        const data = {
            email: email,
            password: password,
        }
        try {
            const response = await login(data)
            localStorage.setItem('access_token', response.access_token)
            const decodedData = jwtDecode(response.access_token)
            if (decodedData.user_role !== 'Customer') {
                window.location.href = '/refood/my-dashboard'
            } else {
                window.location.href = '/refood'
            }
        } catch (error) {
            setErrorMessage(error.message)
        } finally {
            setIsLoading(false)
            setMessage('')
        }
    }
    return (
        <AuthLayout
            title='Log In'
            subtitle=' Welcome,Please Enter Your Details'>
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
            <form onSubmit={HandleLogin}>
                <InputForm
                    label='Email'
                    name='email'
                    placeholder='example@mail.com'
                    type='email'
                    value={email}
                    disabled={isLoading}
                    OnChange={(e) => setEmail(e.target.value)}
                />
                <InputForm
                    label='Password'
                    name='password'
                    placeholder='********'
                    type='password'
                    value={password}
                    disabled={isLoading}
                    OnChange={(e) => setPassword(e.target.value)}
                />
                <div className='w-full mb-2 text-center'>
                    <p className='text-sm font-medium text-black'>
                        {"Doesn't Have Account? "}
                        <NavLink
                            className='font-bold text-primary '
                            to='/register'>
                            Register Now
                        </NavLink>
                    </p>
                    <p className='my-2 text-sm font-medium text-black'>
                        <NavLink
                            className='font-bold text-primary '
                            to='/forgot-password'>
                            Forgot Password?
                        </NavLink>
                    </p>
                </div>
                <Button
                    disabled={isLoading}
                    classname={`w-full bg-primary relative ${isLoading ? 'opacity-50' : ''}`}>
                    {isLoading ? (
                        <div className='absolute inset-0 flex items-center justify-center'>
                            <div className='w-4 h-4 border-t-2 border-b-2 border-white rounded-full animate-spin'></div>
                        </div>
                    ) : (
                        'Log In'
                    )}
                </Button>
            </form>
        </AuthLayout>
    )
}

export default LoginPage
