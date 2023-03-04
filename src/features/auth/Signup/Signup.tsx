import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'

import { Input } from '../../../components/Input/Input'
import { PATH } from '../../../constants/routePaths.enum'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { getRandomImage } from '../../../utils/getRandomImage'
import { signup } from '../../../utils/validationSchema'
import { signUpTC } from '../authSlice'
import './Signup.scss'

export const Signup = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const status = useAppSelector(state => state.auth.status)

  const formik = useFormik({
    initialValues: {
      username: '',
      avatarURL: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: signup,
    onSubmit: async values => {
      const { username, avatarURL, password } = values
      const payloadData = { username, avatarURL: avatarURL || getRandomImage(), password }

      const response = await dispatch(signUpTC(payloadData))

      if (response.payload) {
        navigate(PATH.CHAT)
      }
    },
  })

  const handleNavigate = () => navigate(PATH.LOGIN)

  return (
    <div className="signup-container">
      <div className="signup-content">
        <h2 className="signup-title">Sign up</h2>
        <form className="signup-form" onSubmit={formik.handleSubmit}>
          <Input
            placeholder={'Username'}
            errorText={(formik.touched.username && formik.errors.username) || ''}
            {...formik.getFieldProps('username')}
            value={formik.values.username}
            onChange={formik.handleChange}
          />

          <Input
            placeholder={'Avatar URL'}
            errorText={(formik.touched.avatarURL && formik.errors.avatarURL) || ''}
            {...formik.getFieldProps('avatarURL')}
            value={formik.values.avatarURL}
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

          <Input
            placeholder={'Confirm password'}
            type={'password'}
            errorText={(formik.touched.confirmPassword && formik.errors.confirmPassword) || ''}
            {...formik.getFieldProps('confirmPassword')}
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
          />

          <div className="buttons-container">
            <button
              type="submit"
              className={`primary-button ${status === 'loading' ? 'disabled' : ''}`}
            >
              Sign up
            </button>
            <button
              type="button"
              className={`secondary-button ${status === 'loading' ? 'disabled' : ''}`}
              onClick={handleNavigate}
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
