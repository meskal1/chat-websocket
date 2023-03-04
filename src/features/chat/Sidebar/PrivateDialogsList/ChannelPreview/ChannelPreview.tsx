import { useCallback, FC, useEffect, useState } from 'react'

import { clsx } from 'clsx'
import { ChannelPreviewUIComponentProps, useChatContext } from 'stream-chat-react'

import { useWorkspaceController } from '../../../../../context/WorkspaceController'
import type { StreamChatType } from '../../../../../types'

import { DirectMessagingChannelPreview } from './DirectMessagingChannelPreview/DirectMessagingChannelPreview'
import './ChannelPreview.scss'

type TeamChannelPreviewProps = ChannelPreviewUIComponentProps<StreamChatType> & {
  type: string
}

export const ChannelPreview: FC<TeamChannelPreviewProps> = ({ channel }) => {
  const { channel: activeChannel, setActiveChannel } = useChatContext<StreamChatType>()
  const [unreadMessages, setUnreadMessages] = useState(channel.countUnread())
  const { displayWorkspace } = useWorkspaceController()

  const handleClick = useCallback(() => {
    displayWorkspace('Chat')
    if (setActiveChannel) {
      setActiveChannel(channel)
    }
    setUnreadMessages(0)
  }, [channel, displayWorkspace, setActiveChannel])

  useEffect(() => {
    if (channel.countUnread() > 0 && channel?.id !== activeChannel?.id) {
      setUnreadMessages(channel.countUnread())
    }
  }, [channel.countUnread()])

  return (
    <button
      className={clsx('channel-preview', { selected: channel?.id === activeChannel?.id })}
      onClick={handleClick}
    >
      <DirectMessagingChannelPreview channel={channel} />
      {unreadMessages > 0 && <div className="total-unread-count">{unreadMessages}</div>}
    </button>
  )
}
