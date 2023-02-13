import { useWorkspaceController } from '../../context/WorkspaceController'

import { AdminPanelFooter } from './AdminPanelFooter'
import { AdminPanelHeader } from './AdminPanelHeader'
import { ChannelNameInputField } from './ChannelNameInputField'
import { useAdminPanelFormState } from './context/AdminPanelFormContext'
import { UserList } from './UserList'

export const CreateChannel = () => {
  const { closeAdminPanel } = useWorkspaceController()
  const { createChannelType, name, handleInputChange, handleSubmit, errors } =
    useAdminPanelFormState()

  return (
    <div className="admin-panel__form">
      <AdminPanelHeader
        onClose={closeAdminPanel}
        title={createChannelType === 'team' ? 'Create a New Channel' : 'Send a Direct Message'}
      />
      {createChannelType === 'team' && (
        <ChannelNameInputField
          error={errors.name}
          name={name}
          onChange={handleInputChange}
          placeholder="channel-name (no spaces)"
        />
      )}
      <UserList />
      <AdminPanelFooter
        onButtonClick={handleSubmit}
        buttonText={createChannelType === 'team' ? 'Create Channel' : 'Create Message Group'}
      />
    </div>
  )
}
