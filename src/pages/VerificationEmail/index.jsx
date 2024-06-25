import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { verifyEmail } from '@utils/services/authServices.js'
import { MdVerified } from 'react-icons/md'
import { MdError } from 'react-icons/md'
const VerificationEmailPage = () => {
    const [message, setMessage] = useState('')
    const query = new URLSearchParams(useLocation().search)
    const token = query.get('token')
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()
    useEffect(() => {
        const verify = async () => {
            try {
                const response = await verifyEmail(token)
                setMessage(response.message)
            } catch (error) {
                setErrorMessage(error.message)
            }
        }
        verify()
    }, [token])

    return (
        <>
            {!token && (
                <div className='flex items-center justify-center max-w-xl min-h-screen mx-auto '>
                    <div className='flex flex-col items-center justify-center gap-4 '>
                        <MdError size={100} className='text-red-500' />
                        <h3 className='text-3xl font-bold text-primary text-center'>
                            Query Token Not Found
                        </h3>
                        <button
                            className='underline transition-all text-primary hover:text-secondary '
                            onClick={() => navigate('/')}>
                            Back To Home
                        </button>
                    </div>
                </div>
            )}
            {errorMessage ? (
                <div className='flex items-center justify-center max-w-xl min-h-screen mx-auto '>
                    <div className='flex flex-col items-center justify-center gap-4 '>
                        <MdError size={100} className='text-red-500' />
                        <h3 className='text-3xl font-bold text-primary text-center'>
                            {errorMessage}
                        </h3>
                        <button
                            className='underline transition-all text-primary hover:text-secondary '
                            onClick={() => navigate('/')}>
                            Back To Home
                        </button>
                    </div>
                </div>
            ) : (
                <div className='flex items-center justify-center max-w-xl min-h-screen mx-auto '>
                    <div className='flex flex-col items-center justify-center gap-4 '>
                        <MdVerified size={100} className='text-green-500' />
                        <h3 className='text-3xl font-bold text-primary'>
                            {message}
                        </h3>
                        <button
                            className='underline transition-all text-primary hover:text-secondary'
                            onClick={() => navigate('/login')}>
                            Go To Login
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}

export default VerificationEmailPage
