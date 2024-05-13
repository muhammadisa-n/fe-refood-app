import React from "react"

const Label = (props) => {
  const { htmlfor, children } = props
  return (
    <label
      htmlFor={htmlfor}
      className="block mb-2 text-sm font-bold text-slate-700"
    >
      {children}
    </label>
  )
}

export default Label
