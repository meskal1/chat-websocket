import { FC } from 'react'

import { clsx } from 'clsx'
import { UserResponse } from 'stream-chat'
import { useChatContext, Avatar } from 'stream-chat-react'

import { StreamChatType } from '../../../../../../types'
import { ChannelOrUserType, channelByUser } from '../../../../../../utils/searchUtils'
import { ResultsDropdownProps } from '../ResultsDropdown'
import './SearchResult.scss'

type SearchResultProps = Pick<ResultsDropdownProps, 'focusedId' | 'setChannel'> & {
  result: ChannelOrUserType
}

export const SearchResult: FC<SearchResultProps> = ({ focusedId, result }) => {
  const { client, setActiveChannel } = useChatContext<StreamChatType>()

  const user = result as UserResponse<StreamChatType>

  return (
    <div
      onClick={() => {
        channelByUser({ client, setActiveChannel, user })
      }}
      className={clsx('channel-search__result-container', { highlighted: focusedId === user.id })}
    >
      <Avatar image={user.image} name={user.name || user.id} size={24} />
      <p className="channel-search__result-text">{user.name || user.id || 'Johnny Blaze'}</p>
    </div>
  )
}
