import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'

import { Input } from '../../../components/Input/Input'
import { PATH } from '../../../constants/routePaths.enum'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { login } from '../../../utils/validationSchema'
import { logInTC } from '../authSlice'
import './Login.scss'

export const Login = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const status = useAppSelector(state => state.auth.status)

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: login,
    onSubmit: async values => {
      const { username, password } = values
      const payloadData = { username, password }

      const response = await dispatch(logInTC(payloadData))

      if (response.payload) {
        navigate(PATH.CHAT)
      }
    },
  })

  const handleNavigate = () => navigate(PATH.SIGNUP)

  return (
    <div className="login-container">
      <div className="login-content">
        <h2 className="login-title">Sign in</h2>
        <form className="login-form" onSubmit={formik.handleSubmit}>
          <Input
            placeholder={'Username'}
            errorText={(formik.touched.username && formik.errors.username) || ''}
            {...formik.getFieldProps('username')}
            value={formik.values.username}
            onChange={formik.handleChange}
          />
          <Input
            placeholder={'Password'}
            type={'password'}
            errorText={(formik.touched.password && formik.errors.password) || ''}
            {...formik.getFieldProps('password')}
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          <div className="buttons-container">
            <button
              type="submit"
              className={`primary-button ${status === 'loading' ? 'disabled' : ''}`}
            >
              Sign in
            </button>
            <button
              type="button"
              className={`secondary-button ${status === 'loading' ? 'disabled' : ''}`}
              onClick={handleNavigate}
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
