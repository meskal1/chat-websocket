import { useNavigate } from 'react-router'

import { PATH } from '../../constants/routePaths.enum'

import './Page404.scss'

export const Page404 = () => {
  const navigate = useNavigate()

  const handleClickNavigate = () => navigate(PATH.CHAT)

  return (
    <div className="page404-container">
      <h1 className="page404-title">Page not found!</h1>
      <button className="button" onClick={handleClickNavigate}>
        <p>Back to home page</p>
      </button>
    </div>
  )
}
