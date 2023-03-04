import { setAppError } from '../../app/appSlice'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { useEffectAfterMount } from '../../hooks/useEffectAfterMount'
import './CustomSnackbar.scss'

export const CustomSnackbar = () => {
  const dispatch = useAppDispatch()
  const error = useAppSelector(state => state.app.error)

  const handleClose = () => dispatch(setAppError(''))

  useEffectAfterMount(() => {
    const closeError = setTimeout(() => {
      handleClose()
    }, 4000)

    return () => {
      clearTimeout(closeError)
    }
  }, [error])

  if (!error) return null

  return (
    <div className="error-container" onClick={handleClose}>
      {error}
    </div>
  )
}
