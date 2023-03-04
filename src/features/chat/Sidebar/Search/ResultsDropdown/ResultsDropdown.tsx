import { FC, useEffect } from 'react'

import type { Channel, UserResponse } from 'stream-chat'

import type { StreamChatType } from '../../../../../types'

import { SearchResult } from './SearchResult/SearchResult'
import '../Search.scss'
import './ResultsDropdown.scss'

export type ResultsDropdownProps = {
  teamChannels?: Channel<StreamChatType>[]
  directChannels?: UserResponse<StreamChatType>[]
  focusedId: string
  loading: boolean
  setChannel: (channel: Channel<StreamChatType>) => void
  setQuery: React.Dispatch<React.SetStateAction<string>>
}

export const ResultsDropdown: FC<ResultsDropdownProps> = ({
  directChannels,
  focusedId,
  loading,
  setChannel,
  setQuery,
}) => {
  useEffect(() => {
    document.addEventListener('click', () => setQuery(''))

    return () => {
      document.removeEventListener('click', () => setQuery(''))
    }
  }, [])

  return (
    <div className="channel-search__results">
      <p className="channel-search__results-header">Users</p>
      {loading && !directChannels?.length && (
        <p className="channel-search__results-header">
          <i>Loading...</i>
        </p>
      )}
      {!loading && !directChannels?.length ? (
        <p className="channel-search__results-header">
          <i>No direct messages found</i>
        </p>
      ) : (
        directChannels?.map((user: UserResponse<StreamChatType>, i) => (
          <SearchResult result={user} focusedId={focusedId} key={i} setChannel={setChannel} />
        ))
      )}
    </div>
  )
}
