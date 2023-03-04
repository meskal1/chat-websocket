import { FC } from 'react'

import s from './CloseButton.module.scss'

type CloseButtonType = {
  onClose: (e: any) => void
}

export const CloseButton: FC<CloseButtonType> = ({ onClose }) => {
  return <button className={s.closeButton} onClick={onClose} />
}
