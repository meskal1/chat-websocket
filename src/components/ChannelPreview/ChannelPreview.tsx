import { useCallback } from 'react'

import clsx from 'clsx'
import { ChannelPreviewUIComponentProps, useChatContext } from 'stream-chat-react'

import { useWorkspaceController } from '../../context/WorkspaceController'
import type { StreamChatType } from '../../types'

import { DirectMessagingChannelPreview } from './DirectMessagingChannelPreview'
import { TeamChannelPreview } from './TeamChannelPreview'

type TeamChannelPreviewProps = ChannelPreviewUIComponentProps<StreamChatType> & {
  type: string
}

export const ChannelPreview = ({ channel, type }: TeamChannelPreviewProps) => {
  const { channel: activeChannel, setActiveChannel } = useChatContext<StreamChatType>()
  const { displayWorkspace } = useWorkspaceController()

  const handleClick = useCallback(() => {
    displayWorkspace('Chat')
    if (setActiveChannel) {
      setActiveChannel(channel)
    }
  }, [channel, displayWorkspace, setActiveChannel])

  return (
    <button
      className={clsx('channel-preview', { selected: channel?.id === activeChannel?.id })}
      onClick={handleClick}
    >
      {type === 'team' ? (
        <TeamChannelPreview
          name={channel?.data?.name || (channel?.data?.id as string) || 'random'}
        />
      ) : (
        <DirectMessagingChannelPreview channel={channel} />
      )}
    </button>
  )
}
