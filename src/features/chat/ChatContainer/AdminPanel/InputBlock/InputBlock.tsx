import { ChangeEventHandler, FC } from 'react'

import { ValidationError } from '../ValidationError/ValidationError'
import './InputBlock.scss'

type InputBlockProps = {
  name: string
  error: string | null
  onChange: ChangeEventHandler<HTMLInputElement>
  placeholder?: string
}

export const InputBlock: FC<InputBlockProps> = ({
  name = '',
  error,
  placeholder = 'channel-name',
  onChange,
}) => {
  return (
    <div className="channel-name-input-field">
      <h2>
        <span>Name</span>
        <ValidationError errorMessage={error} />
      </h2>
      <input onChange={onChange} placeholder={placeholder} type="text" value={name} />
    </div>
  )
}
