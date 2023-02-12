import { useEffect } from 'react'

import { StreamChat } from 'stream-chat'
import { Chat, enTranslations, Streami18n } from 'stream-chat-react'
import Cookies from 'universal-cookie'

import Auth from './Auth'
import { useChecklist } from './ChecklistTasks'
import { ChannelContainer } from './components/ChannelContainer/ChannelContainer'
import { Sidebar } from './components/Sidebar/Sidebar'
import { WorkspaceController } from './context/WorkspaceController'
import type { StreamChatType } from './types'

const cookies = new Cookies()
const authToken = cookies.get('token')

const urlParams = new URLSearchParams(window.location.search)

const apiKey = process.env.REACT_APP_API_KEY
const theme = urlParams.get('theme') || 'light'
const targetOrigin = process.env.REACT_APP_BASE_URL

const i18nInstance = new Streami18n({
  language: 'en',
  translationsForLanguage: {
    ...enTranslations,
  },
})

const client = StreamChat.getInstance<any>(apiKey!, {
  enableInsights: true,
  enableWSFallback: true,
})

// client.connectUser({ id: user!, name: user, image: getRandomImage() }, userToken);
if (authToken) {
  client.connectUser(
    {
      id: cookies.get('userId'),
      name: cookies.get('username'),
      fullName: cookies.get('fullName'),
      image: cookies.get('avatarURL'),
      hashedPassword: cookies.get('hashedPassword'),
      phoneNumber: cookies.get('phoneNumber'),
    },
    authToken
  )
}
//  export type StreamChatType = {
// 	attachmentType: TeamAttachmentType;
// 	channelType: TeamChannelType;
// 	commandType: TeamCommandType;
// 	eventType: TeamEventType;
// 	messageType: TeamMessageType;
// 	reactionType: TeamReactionType;
// 	userType: TeamUserType;
//  };

const App = () => {
  useChecklist({ chatClient: client, targetOrigin: targetOrigin! })

  useEffect(() => {
    const handleColorChange = (color: string) => {
      const root = document.documentElement

      if (color.length && color.length === 7) {
        root.style.setProperty('--primary-color', `${color}E6`)
        root.style.setProperty('--primary-color-alpha', `${color}1A`)
      }
    }

    window.addEventListener('message', event => handleColorChange(event.data))

    return () => {
      client.disconnectUser()
      window.removeEventListener('message', event => handleColorChange(event.data))
    }
  }, [])

  if (!authToken) return <Auth />

  return (
    <>
      <div className="app__wrapper str-chat">
        <Chat {...{ client, i18nInstance }} theme={`team ${theme}`}>
          <WorkspaceController>
            <Sidebar />
            <ChannelContainer />
          </WorkspaceController>
        </Chat>
      </div>
    </>
  )
}

export default App
