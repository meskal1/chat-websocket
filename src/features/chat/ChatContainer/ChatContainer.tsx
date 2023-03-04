import { Channel, DateSeparator, MessageTimestamp, SimpleReactionsList } from 'stream-chat-react'

import { GiphyInMessageFlagProvider } from '../../../context/GiphyInMessageFlagContext'
import { useWorkspaceController } from '../../../context/WorkspaceController'

import { AdminPanel } from './AdminPanel/AdminPanel'
import { ChatInner } from './ChatInner/ChatInner'

import './ChatContainer.scss'

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const ChatContainer = () => {
  const { activeWorkspace } = useWorkspaceController()
  const date = new Date()

  const EmptyChannel = () => {
    return (
      <div className="channel-empty__container">
        <p className="channel-empty__secondary-description">
          Send messages, attachments, links, emojis, and more.
        </p>
      </div>
    )
  }

  return (
    <>
      {activeWorkspace.match('Admin') ? (
        <AdminPanel />
      ) : (
        <div className="channel__container">
          <Channel
            EmptyStateIndicator={EmptyChannel}
            LoadingIndicator={() => null}
            ReactionsList={SimpleReactionsList}
            DateSeparator={() => (
              <DateSeparator
                formatDate={() => `${date.getDate() + ' ' + monthNames[date.getMonth()]}`}
                date={new Date()}
                position={'center'}
              />
            )}
            MessageTimestamp={() => <MessageTimestamp format="H:mm" />}
          >
            <GiphyInMessageFlagProvider>
              <ChatInner />
            </GiphyInMessageFlagProvider>
          </Channel>
        </div>
      )}
    </>
  )
}
