import { ChangeEvent, FC, InputHTMLAttributes } from 'react'

import './Input.scss'

type InputType = InputHTMLAttributes<HTMLInputElement> & {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  name: string
  value: string
  placeholder: string
  errorText?: string
  type?:
    | 'password'
    | 'text'
    | 'checkbox'
    | 'date'
    | 'file'
    | 'number'
    | 'radio'
    | 'submit'
    | 'tel'
    | 'hidden'
    | 'email'
    | 'datetime-local'
    | 'range'
    | 'time'
}

export const Input: FC<InputType> = ({
  value,
  onChange,
  name,
  errorText,
  type = 'text',
  placeholder,
  ...props
}) => {
  return (
    <label className="input-content">
      <span className="error-input">{errorText}</span>
      <input
        autoComplete="off"
        className={`input ${value && 'input-not-empty'}`}
        name={name}
        type={type}
        onChange={onChange}
        value={value}
        {...props}
      />
      <span className="placeholder">{placeholder}</span>
    </label>
  )
}
