import { useEffect, useState } from 'react'

import type { UserResponse } from 'stream-chat'
import { useChatContext } from 'stream-chat-react'

import { useAdminPanelFormState } from '../../../../../context/AdminPanelFormContext'
import type { StreamChatType } from '../../../../../types'

import { ListContainer } from './ListContainer/ListContainer'
import { UserItem } from './UserItem/UserItem'
import './UserList.scss'

type UserListLoadState = 'loading' | 'error' | 'empty'

const LOAD_STATE_NOTIFICATION: Record<UserListLoadState, string> = {
  empty: 'No users found.',
  error: 'Error loading, please refresh and try again.',
  loading: 'Loading users...',
}

export const UserList = () => {
  const { client, channel } = useChatContext<StreamChatType>()
  const { createChannelType } = useAdminPanelFormState()
  const [loadState, setLoadState] = useState<UserListLoadState | null>(null)
  const [users, setUsers] = useState<UserResponse<StreamChatType>[] | undefined>()

  const exeptMembers = [
    client.userID,
    'deleted-user-1234237-693e2db320a58b30cadd552e894c0ea8',
    'deleted-user-1237314-fdb61ef2f40d7e9ec6d44c5da18d98a6',
    'freelancer-self-employed',
  ]

  useEffect(() => {
    const getUsers = async () => {
      if (loadState) return
      setLoadState('loading')

      try {
        const response = await client.queryUsers(
          //@ts-ignore
          { id: { $nin: exeptMembers } },
          // $ne	Matches values that are not equal to the given value.
          // $nin	Matches none of the values specified in an array.
          { id: 1 },
          { limit: 30 }
        )

        if (response.users.length) {
          setUsers(response.users)
        } else {
          setLoadState('empty')
        }
      } catch (event) {
        setLoadState('error')
      }

      setLoadState(null)
    }

    if (client) getUsers()
  }, [client, createChannelType])

  return (
    <ListContainer>
      {loadState ? (
        <div className="user-list__message">{LOAD_STATE_NOTIFICATION[loadState]}</div>
      ) : (
        users?.length && users.map((user, i) => <UserItem key={user.id} index={i} user={user} />)
      )}
    </ListContainer>
  )
}
