import { useWorkspaceController } from '../../context/WorkspaceController'

import { AdminPanelFooter } from './AdminPanelFooter'
import { AdminPanelHeader } from './AdminPanelHeader'
import { ChannelNameInputField } from './ChannelNameInputField'
import { useAdminPanelFormState } from './context/AdminPanelFormContext'
import { UserList } from './UserList'

export const EditChannel = () => {
  const { closeAdminPanel } = useWorkspaceController()
  const { name, handleInputChange, handleSubmit, errors } = useAdminPanelFormState()

  return (
    <div className="admin-panel__form">
      <AdminPanelHeader onClose={closeAdminPanel} title="Edit Channel" />
      <ChannelNameInputField name={name} error={errors.name} onChange={handleInputChange} />
      <UserList />
      <AdminPanelFooter buttonText="Save Changes" onButtonClick={handleSubmit} />
    </div>
  )
}
