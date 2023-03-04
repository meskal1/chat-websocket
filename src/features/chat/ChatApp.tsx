import { useEffect, useState } from 'react'

import { StreamChat } from 'stream-chat'
import { Streami18n, enTranslations, Chat } from 'stream-chat-react'
import Cookies from 'universal-cookie'

import { LoadingProgress } from '../../components/LoadingProgress/LoadingProgress'
import { WorkspaceController } from '../../context/WorkspaceController'
import { useChecklist } from '../../hooks/useChecklist'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { deleteCookies } from '../../utils/deleteCookies'

import { ChatContainer } from './ChatContainer/ChatContainer'
import { Sidebar } from './Sidebar/Sidebar'
import './ChatApp.scss'

const cookies = new Cookies()

const apiKey = process.env.REACT_APP_API_KEY!
const targetOrigin = process.env.REACT_APP_BASE_URL!

const i18nInstance = new Streami18n({
  language: 'en',
  translationsForLanguage: {
    ...enTranslations,
  },
})

const client = StreamChat.getInstance(apiKey, {
  enableInsights: true,
  enableWSFallback: true,
})

export const ChatApp = () => {
  const [chatClient, setChatClient] = useState<{} | null>(null)
  const authToken = cookies.get('token')
  const matches700 = useMediaQuery('(max-width: 700px)')
  const userData = {
    id: cookies.get('userId'),
    name: cookies.get('username'),
    image: cookies.get('avatarURL'),
    hashedPassword: cookies.get('hashedPassword'),
  }

  useChecklist({ chatClient: client, targetOrigin: targetOrigin })

  useEffect(() => {
    const connectUser = async () => {
      try {
        await client.connectUser(userData, authToken)
        setChatClient(client)
      } catch (e: any) {
        if (new RegExp('was deleted').test(e.message)) {
          deleteCookies()
          client.disconnectUser()
        }
      }
    }

    if (authToken) {
      connectUser()
    }

    return () => {
      client.disconnectUser()
    }
  }, [])

  if (!chatClient) return <LoadingProgress />

  if (matches700) return <div>Sorry, this app adaptive only for desktop</div>

  return (
    <div className="app-content">
      <Chat {...{ client, i18nInstance }}>
        <WorkspaceController>
          <Sidebar />
          <ChatContainer />
        </WorkspaceController>
      </Chat>
    </div>
  )
}
