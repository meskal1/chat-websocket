import { lazy, Suspense } from 'react'

import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom'

import { LoadingProgress } from '../components/LoadingProgress/LoadingProgress'
import { PATH } from '../constants/routePaths.enum'
import { Page404 } from '../features/404/Page404'
import { useAppSelector } from '../hooks/useAppSelector'

const ChatApp = lazy(() =>
  import('../features/chat/ChatApp').then(module => ({ default: module.ChatApp }))
)
const Login = lazy(() =>
  import('../features/auth/Login/Login').then(module => ({ default: module.Login }))
)
const Signup = lazy(() =>
  import('../features/auth/Signup/Signup').then(module => ({ default: module.Signup }))
)

const PrivateRoutes = () => {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

  return isLoggedIn ? (
    <Suspense fallback={<LoadingProgress />}>
      <Outlet />
    </Suspense>
  ) : (
    <Navigate to={PATH.LOGIN} replace />
  )
}

const AuthRoutes = () => {
  const location = useLocation()
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  let preventAuthLinks = false

  if (isLoggedIn) {
    switch (location.pathname) {
      case PATH.LOGIN:
      case PATH.SIGNUP:
        preventAuthLinks = true
    }
  }

  return preventAuthLinks ? (
    <Navigate to={PATH.CHAT} replace />
  ) : (
    <Suspense fallback={<LoadingProgress />}>
      <Outlet />
    </Suspense>
  )
}

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route path="/" element={<Navigate to={PATH.CHAT} replace />} />
        <Route path={PATH.CHAT} element={<ChatApp />} />
      </Route>

      <Route element={<AuthRoutes />}>
        <Route path={PATH.LOGIN} element={<Login />} />
        <Route path={PATH.SIGNUP} element={<Signup />} />
      </Route>

      <Route path="*" element={<Page404 />} />
    </Routes>
  )
}
