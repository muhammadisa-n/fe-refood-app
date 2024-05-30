import React from 'react'

const AuthLayout = ({ children, title, subtitle, margin = 'mt-0' }) => {
    return (
        <div
            className={`flex items-center justify-center min-h-screen ${margin}  `}>
            <div className='w-full max-w-xl px-4 py-16 bg-white'>
                <h1 className='mb-2 text-3xl font-semibold text-center text-primary '>
                    {title}
                </h1>
                <p className='mb-8 font-medium text-center text-primary'>
                    {subtitle}
                </p>
                {children}
            </div>
        </div>
    )
}

export default AuthLayout
