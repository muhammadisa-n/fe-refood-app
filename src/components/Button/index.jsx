import React from "react"

const Button = (props) => {
  const { children = "Button", classname = "bg-primary ", onClick } = props
  return (
    <>
      <button
        className={`h-10 px-1 font-semibold text-white rounded-md ${classname} `}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  )
}

export default Button
