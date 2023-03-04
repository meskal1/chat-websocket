import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import { setIsLoggedIn } from '../features/auth/authSlice'
import { authAPI, MeParamsType } from '../services/authApi'
import { deleteCookies } from '../utils/deleteCookies'
import { handleServerNetworkError } from '../utils/errorUtils'

const initialState = {
  status: 'idle' as RequestStatusType,
  error: '',
  isInitialized: false,
}

export const initializeUserTC = createAsyncThunk(
  'auth/initializeUser',
  async (data: MeParamsType, { dispatch, rejectWithValue }) => {
    try {
      const response = await authAPI.me(data)

      if (!response.data.message) {
        deleteCookies()
      } else {
        dispatch(setIsLoggedIn(true))
      }
    } catch (e) {
      handleServerNetworkError(dispatch, e as Error | AxiosError)
    }
  }
)

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppStatus(state, action: PayloadAction<RequestStatusType>) {
      state.status = action.payload
    },
    setAppError(state, action: PayloadAction<string>) {
      state.error = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(initializeUserTC.fulfilled, state => {
        state.isInitialized = true
      })
      .addCase(initializeUserTC.rejected, state => {
        state.isInitialized = true
      })
  },
})

export const appReducer = appSlice.reducer

// ACTIONS
export const { setAppStatus, setAppError } = appSlice.actions

// TYPES
export type RequestStatusType = 'idle' | 'loading'

export type InitialStateType = typeof initialState
