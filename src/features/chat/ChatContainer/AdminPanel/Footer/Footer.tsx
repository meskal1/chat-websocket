import { FC, MouseEventHandler } from 'react'

type FooterProps = {
  buttonText: string
  onButtonClick: MouseEventHandler<HTMLButtonElement>
}

export const Footer: FC<FooterProps> = ({ buttonText, onButtonClick }) => (
  <div className="admin-panel__form-footer">
    <button onClick={onButtonClick}>{buttonText}</button>
  </div>
)
