import { ChangeEvent, useCallback, useEffect, useState } from 'react'

import _debounce from 'lodash.debounce'
import type { Channel, UserResponse } from 'stream-chat'
import { isChannel, useChatContext } from 'stream-chat-react'

import type { StreamChatType } from '../../../../types'
import { ChannelOrUserType, channelByUser } from '../../../../utils/searchUtils'

import { ResultsDropdown } from './ResultsDropdown/ResultsDropdown'

import './Search.scss'

export const Search = () => {
  const { client, setActiveChannel } = useChatContext<StreamChatType>()
  const [allChannels, setAllChannels] = useState<ConcatArray<ChannelOrUserType> | undefined>()
  const [teamChannels, setTeamChannels] = useState<Channel<StreamChatType>[] | undefined>()
  const [directChannels, setDirectChannels] = useState<UserResponse<StreamChatType>[] | undefined>()
  const [focused, setFocused] = useState<number>()
  const [focusedId, setFocusedId] = useState('')
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState('')

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        setFocused(prevFocused => {
          if (prevFocused === undefined || allChannels === undefined) return 0

          return prevFocused === allChannels.length - 1 ? 0 : prevFocused + 1
        })
      } else if (e.key === 'ArrowUp') {
        setFocused(prevFocused => {
          if (prevFocused === undefined || allChannels === undefined) return 0

          return prevFocused === 0 ? allChannels.length - 1 : prevFocused - 1
        })
      } else if (e.key === 'Enter') {
        e.preventDefault()

        if (allChannels !== undefined && focused !== undefined) {
          const channelToCheck = allChannels[focused]

          if (isChannel(channelToCheck)) {
            setActiveChannel(channelToCheck)
          } else {
            channelByUser({ client, setActiveChannel, user: channelToCheck })
          }
        }

        setFocused(undefined)
        setFocusedId('')
        setQuery('')
      }
    },
    [allChannels, client, focused, setActiveChannel]
  )

  const setChannel = (channel: Channel<StreamChatType>) => {
    setQuery('')
    setActiveChannel(channel)
  }

  const getChannels = async (text: string) => {
    try {
      const channelResponse = client.queryChannels(
        {
          type: 'team',
          name: { $autocomplete: text },
        },
        {},
        { limit: 5 }
      )

      const userResponse = client.queryUsers(
        {
          id: { $ne: client.userID || '' },
          $and: [{ name: { $autocomplete: text } }],
        },
        { id: 1 },
        { limit: 15 }
      )

      const [channels, { users }] = await Promise.all([channelResponse, userResponse])

      if (channels.length) setTeamChannels(channels)
      if (users.length) setDirectChannels(users)
      setAllChannels([...channels, ...users])
    } catch (event) {
      setQuery('')
    }

    setLoading(false)
  }

  const getChannelsDebounce = _debounce(getChannels, 200, { trailing: true })

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    setLoading(true)
    setFocused(undefined)
    setQuery(e.target.value)
    if (!e.target.value) return

    getChannelsDebounce(e.target.value)
  }

  useEffect(() => {
    if (query) {
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown, query])

  useEffect(() => {
    if (!query) {
      setTeamChannels([])
      setDirectChannels([])
    }
  }, [query])

  useEffect(() => {
    if (focused && focused >= 0 && allChannels) {
      setFocusedId(allChannels[focused].id || '')
    }
  }, [allChannels, focused])

  return (
    <div className="channel-search__container">
      <div className="channel-search__input__wrapper">
        <input onChange={handleSearch} placeholder="Search" type="text" value={query} />
      </div>
      {query && (
        <ResultsDropdown
          teamChannels={teamChannels}
          directChannels={directChannels}
          focusedId={focusedId}
          loading={loading}
          setChannel={setChannel}
          setQuery={setQuery}
        />
      )}
    </div>
  )
}
