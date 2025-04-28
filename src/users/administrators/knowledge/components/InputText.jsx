import React from 'react'

const baseInput = 'px-3 py-1.5 border border-neutral-300/60 bg-neutral-100/60 w-ful rounded-lg transition duration-300 ease-in-out disabled:opacity-70 disabled:cursor-not-allowed focus:ring-2 ring-offset-1 focus:ring-neutral-800 focus:outline-none'

const InputText = ({
 type = 'text',
 name,
 disabled = false,
 placeholder = '',
 value = '',
 onChange,
 className,
}) => {
 return (
  <input
   type={type}
   name={name}
   disabled={disabled}
   placeholder={placeholder}
   value={value}
   onChange={onChange}
   className={`${className} ${baseInput}`}
  />
 )
}

export default InputText