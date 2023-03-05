import { useEffect, useState } from 'react'

import { CustomSnackbar } from '../components/CustomSnackbar/CustomSnackbar'
import { IntroAnimation } from '../components/IntroAnimation/IntroAnimation'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { AppRoutes } from '../routes/routes'
import { sessionData } from '../utils/sessionData'

import { initializeUserTC } from './appSlice'

import './App.scss'
import '../styles/index.scss'

const App = () => {
  const distpatch = useAppDispatch()
  const [isInitialized, setIsInitialized] = useState(false)

  const handleAnimationLoaded = () => setIsInitialized(true)

  useEffect(() => {
    distpatch(initializeUserTC(sessionData()))
  }, [])

  if (!isInitialized) return <IntroAnimation isAnimationLoaded={handleAnimationLoaded} />

  return (
    <div className="app">
      <AppRoutes />
      <CustomSnackbar />
    </div>
  )
}

export default App
