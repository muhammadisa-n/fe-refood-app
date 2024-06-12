import React from 'react'

const Input = (props) => {
    const {
        type,
        placeholder,
        name,
        id = name,
        value,
        OnChange,
        disabled,
    } = props
    return (
        <input
            type={type}
            id={id}
            className={`w-full px-3 py-2 text-sm border rounded text-slate-700 placeholder-opacity-50 hide-arrow 
                ${disabled ? 'bg-gray-200 text-slate-700 border-gray-300' : ''}`}
            placeholder={placeholder}
            name={name}
            value={value}
            disabled={disabled}
            onChange={OnChange}
        />
    )
}

export default Input
