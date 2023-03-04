import { useEffect } from 'react'

import { CustomSnackbar } from '../components/CustomSnackbar/CustomSnackbar'
import { LoadingProgress } from '../components/LoadingProgress/LoadingProgress'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useAppSelector } from '../hooks/useAppSelector'
import { AppRoutes } from '../routes/routes'
import { sessionData } from '../utils/sessionData'

import { initializeUserTC } from './appSlice'

import './App.scss'
import '../styles/index.scss'

const App = () => {
  const distpatch = useAppDispatch()
  const isInitialized = useAppSelector(state => state.app.isInitialized)

  useEffect(() => {
    distpatch(initializeUserTC(sessionData()))
  }, [])

  return (
    <div className="app">
      {isInitialized ? <AppRoutes /> : <LoadingProgress />}
      <CustomSnackbar />
    </div>
  )
}

export default App
