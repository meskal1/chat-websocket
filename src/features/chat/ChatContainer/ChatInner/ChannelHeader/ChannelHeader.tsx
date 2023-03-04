import { useCallback } from 'react'

import { Avatar, TypingIndicator, useChannelStateContext, useChatContext } from 'stream-chat-react'

import { useWorkspaceController } from '../../../../../context/WorkspaceController'
import type { StreamChatType } from '../../../../../types'
import './ChannelHeader.scss'

export const ChannelHeader = () => {
  const { displayWorkspace } = useWorkspaceController()
  const { client } = useChatContext<StreamChatType>()
  const { channel, watcher_count } = useChannelStateContext<StreamChatType>()

  const header = `${channel?.data?.name || channel?.data?.id || 'random'}`

  const openChannelEditPanel = useCallback(() => {
    displayWorkspace('Admin-Channel-Edit')
  }, [displayWorkspace])

  const getMessagingHeader = () => {
    const members = Object.values(channel.state.members).filter(
      ({ user }) => user?.id !== client.userID
    )
    const additionalMembers = members.length - 3

    return (
      <>
        {members.length ? (
          <div className="workspace-header__block">
            {members.map(({ user }, i) => {
              if (i > 2) return null

              return (
                <div key={i} className="workspace-header__block-item">
                  <Avatar image={user?.image} name={user?.name || user?.id} size={50} />
                  <p className="team-channel-header__name user">
                    {user?.name || user?.id || 'Johnny Blaze'}
                  </p>
                </div>
              )
            })}
            {additionalMembers > 0 && (
              <p className="team-channel-header__name user">{`and ${additionalMembers} more`}</p>
            )}
          </div>
        ) : (
          <div className="workspace-header__block">
            <Avatar image={null} size={50} />
            <p className="team-channel-header__name user">Johnny Blaze</p>
          </div>
        )}
      </>
    )
  }

  const getWatcherText = (watchers?: number) => {
    if (!watchers) return 'No users online'

    return `${watchers} online`
  }

  return (
    <div className="team-channel-header__container">
      <div className="typing-indicator">
        <TypingIndicator />
      </div>
      {channel.type === 'messaging' ? (
        getMessagingHeader()
      ) : (
        <div className="workspace-header__block">
          <div className="team-channel-header__name workspace-header__title">{header}</div>
          <button className="workspace-info-button" onClick={openChannelEditPanel} />
        </div>
      )}
      <div className="workspace-header__block">
        <div className="workspace-header__subtitle">{getWatcherText(watcher_count)}</div>
      </div>
    </div>
  )
}
