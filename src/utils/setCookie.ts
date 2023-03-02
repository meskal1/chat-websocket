import Cookies from 'universal-cookie'

import { SignupResponseType } from '../services/authApi'

const cookies = new Cookies()

export const setCookie = (data: Partial<SignupResponseType>) => {
  cookies.set('token', data.token, { path: '/', maxAge: 604800 })
  cookies.set('username', data.username, { path: '/', maxAge: 604800 })
  cookies.set('userId', data.userId, { path: '/', maxAge: 604800 })
  if (data.avatarURL) {
    cookies.set('avatarURL', data.avatarURL, { path: '/', maxAge: 604800 })
  }

  if (data.hashedPassword) {
    cookies.set('hashedPassword', data.hashedPassword, { path: '/', maxAge: 604800 })
  }
}
