import React from 'react'

const Input = (props) => {
    const { type, placeholder, name, id = name, value, OnChange } = props
    return (
        <input
            type={type}
            id={id}
            className='w-full px-3 py-2 text-sm border rounded text-slate-700 placeholder:opacity-50 hide-arrow'
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={OnChange}
        />
    )
}

export default Input
