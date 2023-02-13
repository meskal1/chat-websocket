import { Message, useChannelStateContext } from 'stream-chat-react'

import { useWorkspaceController } from '../../context/WorkspaceController'
import type { StreamChatType } from '../../types'
import { CloseThreadButton } from '../TeamChannelHeader/CloseThreadButton'
import { TeamMessage } from '../TeamMessage/TeamMessage'

export const PinnedMessageList = () => {
  const { pinnedMessageListOpen, togglePinnedMessageListOpen } = useWorkspaceController()
  const { channel } = useChannelStateContext<StreamChatType>()

  if (!pinnedMessageListOpen) return null

  return (
    <div className="pinned-messages__container">
      <div className="pinned-messages__header">
        <div className="workspace-header__title">Pins</div>
        <CloseThreadButton onClick={togglePinnedMessageListOpen} />
      </div>
      <div className="pinned-messages__list">
        {channel.state.pinnedMessages.map(message => (
          <Message
            groupStyles={['single']}
            Message={TeamMessage}
            key={message.id}
            message={message}
          />
        ))}
      </div>
    </div>
  )
}
