import { useNavigate } from 'react-router-dom'

import { PATH } from '../../../constants/routePaths.enum'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { deleteCookies } from '../../../utils/deleteCookies'
import { setIsLoggedIn } from '../../auth/authSlice'

import { PrivateDialogsList } from './PrivateDialogsList/PrivateDialogsList'
import { Search } from './Search/Search'

import './Sidebar.scss'

export const Sidebar = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleLogOut = () => {
    deleteCookies()
    dispatch(setIsLoggedIn(false))
    navigate(PATH.LOGIN)
  }

  return (
    <div className="sidebar">
      <Search />
      <PrivateDialogsList />
      <div className="logout-button-container">
        <button className="logout-button" onClick={handleLogOut}>
          Log out
        </button>
      </div>
    </div>
  )
}
