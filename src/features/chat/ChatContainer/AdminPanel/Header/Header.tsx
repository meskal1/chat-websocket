import { FC } from 'react'

import { CloseButton } from '../../../../../components/CloseButton/CloseButton'

import './Header.scss'

type HeaderProps = {
  onClose: () => void
  title: string
}

export const Header: FC<HeaderProps> = ({ onClose, title }) => (
  <div className="admin-panel__form-header">
    <div className="workspace-header__title workspace-header__block">{title}</div>
    <CloseButton onClose={onClose} />
  </div>
)
