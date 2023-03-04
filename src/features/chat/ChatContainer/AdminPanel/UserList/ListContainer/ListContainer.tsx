import { FC, ReactNode } from 'react'

import { useAdminPanelFormState } from '../../../../../../context/AdminPanelFormContext'
import { ValidationError } from '../../ValidationError/ValidationError'

import '../UserList.scss'

type ListContainerType = {
  children: ReactNode
}

export const ListContainer: FC<ListContainerType> = ({ children }) => {
  const { errors, createChannelType } = useAdminPanelFormState()
  const showHeading = !createChannelType || createChannelType === 'team'

  return (
    <div className="user-list__container">
      {showHeading && (
        <h2>
          <span>Add Members</span>
          <ValidationError errorMessage={errors.members} />
        </h2>
      )}
      <div className="user-list__header user-list__row">
        <div className="user-list__column-block">
          <p>User</p>
          <p className="user-list__column--last-active">Last Active</p>
        </div>
        <div className="user-list__column--checkbox">
          <p>Invite</p>
        </div>
      </div>
      {children}
    </div>
  )
}
