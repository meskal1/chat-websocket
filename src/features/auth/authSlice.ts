import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import { RequestStatusType } from '../../app/appSlice'
import { authAPI, LoginParamsType, SignupParamsType } from '../../services/authApi'
import { handleServerNetworkError } from '../../utils/errorUtils'
import { setCookie } from '../../utils/setCookie'

const initialState = {
  status: 'idle' as RequestStatusType,
  isLoggedIn: false,
}

export const logInTC = createAsyncThunk(
  'auth/logIn',
  async (data: LoginParamsType, { dispatch, rejectWithValue }) => {
    try {
      const response = await authAPI.login(data)

      setCookie(response.data)

      return true
    } catch (e) {
      handleServerNetworkError(dispatch, e as Error | AxiosError)

      return rejectWithValue(false)
    }
  }
)

export const signUpTC = createAsyncThunk(
  'auth/signUp',
  async (data: SignupParamsType, { dispatch, rejectWithValue }) => {
    try {
      const response = await authAPI.signup(data)

      setCookie(response.data)

      return true
    } catch (e) {
      handleServerNetworkError(dispatch, e as Error | AxiosError)

      return rejectWithValue(false)
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLoggedIn(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(logInTC.pending, state => {
        state.status = 'loading'
      })
      .addCase(logInTC.fulfilled, state => {
        state.isLoggedIn = true
        state.status = 'idle'
      })
      .addCase(logInTC.rejected, state => {
        state.status = 'idle'
      })

    builder
      .addCase(signUpTC.pending, state => {
        state.status = 'loading'
      })
      .addCase(signUpTC.fulfilled, state => {
        state.isLoggedIn = true
        state.status = 'idle'
      })
      .addCase(signUpTC.rejected, state => {
        state.status = 'idle'
      })
  },
})

export const authReducer = authSlice.reducer

// ACTIONS
export const { setIsLoggedIn } = authSlice.actions

// TYPES
export type AuthStateType = typeof initialState
