import axios, { AxiosError } from 'axios'
import { Dispatch } from 'redux'

import { setAppError, setAppStatus } from '../app/appSlice'
export const handleServerNetworkError = async (dispatch: Dispatch, error: Error | AxiosError) => {
  if (axios.isAxiosError(error)) {
    dispatch(setAppError(error.response?.data.message))
  }

  dispatch(setAppStatus('idle'))
}
