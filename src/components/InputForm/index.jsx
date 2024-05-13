import React from "react"
import Label from "./Label"
import Input from "./Input"

const InputForm = (props) => {
  const { label, type, placeholder, name, value, OnChange } = props
  return (
    <div className="mb-6">
      <Label htmlfor={name}>{label}</Label>
      <Input
        type={type}
        placeholder={placeholder}
        name={name}
        id={name}
        value={value}
        OnChange={OnChange}
      />
    </div>
  )
}

export default InputForm
