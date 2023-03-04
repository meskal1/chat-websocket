import { FC } from 'react'

import { Avatar, ChannelPreviewUIComponentProps, useChatContext } from 'stream-chat-react'

import { StreamChatType } from '../../../../../../types'
import './DirectMessagingChannelPreview.scss'

type DirectMessagingChannelPreviewProps = Pick<
  ChannelPreviewUIComponentProps<StreamChatType>,
  'channel'
>

export const DirectMessagingChannelPreview: FC<DirectMessagingChannelPreviewProps> = ({
  channel,
}) => {
  const { client } = useChatContext<StreamChatType>()

  const members = Object.values(channel.state.members).filter(
    ({ user }) => user?.id !== client.userID
  )
  const defaultName = 'John Doe'

  if (!members.length || members.length === 1) {
    const member = members[0]

    return (
      <div className="channel-preview__item single">
        <Avatar image={member.user?.image} name={member.user?.name || member.user?.id} size={36} />
        <p>{member?.user?.name || member?.user?.id || defaultName}</p>
      </div>
    )
  }

  return (
    <div className="channel-preview__item multi">
      <span>
        <Avatar
          image={members[0].user?.image}
          name={members[0].user?.name || members[0].user?.id}
          size={18}
        />
      </span>
      <Avatar
        image={members[1].user?.image}
        name={members[1].user?.name || members[1].user?.id}
        size={18}
      />
      <p>
        {members[0].user?.name || members[0].user?.id || defaultName},{' '}
        {members[1].user?.name || members[1].user?.id || defaultName}
      </p>
    </div>
  )
}
