import Cookies from 'universal-cookie'

const cookies = new Cookies()

export const deleteCookies = () => {
  cookies.remove('token')
  cookies.remove('username')
  cookies.remove('avatarURL')
  cookies.remove('userId')
  cookies.remove('hashedPassword')
}
