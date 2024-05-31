import React from 'react'

const Button = (props) => {
    const {
        children = 'Button',
        classname = 'bg-primary ',
        onClick,
        disabled,
    } = props
    return (
        <>
            <button
                disabled={disabled}
                className={`h-10 px-2 font-semibold text-white rounded-md ${classname} `}
                onClick={onClick}>
                {children}
            </button>
        </>
    )
}

export default Button
