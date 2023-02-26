import * as yup from 'yup'

const username = yup
  .string()
  .max(100, 'Name should be less then 100 characters')
  .required('Username is required')
const password = yup
  .string()
  .min(6, 'Password must contain at least 6 characters')
  .max(30, 'Password is too long')
  .required('Password is required')
const confirmPassword = yup
  .string()
  .oneOf([yup.ref('password')], 'Password does not match')
  .required('Confirm your password')

export const login = yup.object({ username, password })

export const signup = yup.object({ username, password, confirmPassword })
