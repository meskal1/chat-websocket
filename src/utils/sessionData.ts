import Cookies from 'universal-cookie'

const cookies = new Cookies()

export const sessionData = () => {
  const username = cookies.get('username') || ''
  const userId = cookies.get('userId') || ''

  return { username, userId }
}
