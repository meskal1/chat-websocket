import { FC } from 'react'

import type { UserResponse } from 'stream-chat'
import { Avatar } from 'stream-chat-react'

import { useAdminPanelFormState } from '../../../../../../context/AdminPanelFormContext'
import type { StreamChatType } from '../../../../../../types'
import '../UserList.scss'

type UserItemType = {
  index: number
  user: UserResponse<StreamChatType>
}

const MOCKED_LAST_ACTIVE_STRINGS = ['12 min ago', '27 min ago', '6 hours ago', '14 hours ago']

export const UserItem: FC<UserItemType> = ({ index, user }) => {
  const { handleMemberSelect } = useAdminPanelFormState()

  const lastActive = MOCKED_LAST_ACTIVE_STRINGS[index] || 'Yesterday'
  const title = user.name || user.id

  return (
    <label htmlFor={user.id} title={title} className="user-list__row">
      <div className="user-list__column-block">
        <div className="user-list__column--user-data">
          <Avatar image={user.image} name={title} size={32} />
          <p className="user-item__name">{title}</p>
        </div>
        <p className="user-list__column--last-active">{lastActive}</p>
      </div>
      <div className="user-list__column--checkbox">
        <input
          type="checkbox"
          name="members"
          id={user.id}
          value={user.id}
          onChange={handleMemberSelect}
        />
      </div>
    </label>
  )
}
