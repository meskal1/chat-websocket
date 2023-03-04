import { useAdminPanelFormState } from '../../../../../context/AdminPanelFormContext'
import { useWorkspaceController } from '../../../../../context/WorkspaceController'
import { Footer } from '../Footer/Footer'
import { Header } from '../Header/Header'
import { InputBlock } from '../InputBlock/InputBlock'
import { UserList } from '../UserList/UserList'

export const CreateChannel = () => {
  const { closeAdminPanel } = useWorkspaceController()
  const { createChannelType, name, handleInputChange, handleSubmit, errors } =
    useAdminPanelFormState()

  return (
    <div className="admin-panel__form">
      <Header
        onClose={closeAdminPanel}
        title={createChannelType === 'team' ? 'Create new channel' : 'Send direct message'}
      />
      {createChannelType === 'team' && (
        <InputBlock
          error={errors.name}
          name={name}
          onChange={handleInputChange}
          placeholder="channel-name (no spaces)"
        />
      )}
      <UserList />
      <Footer
        onButtonClick={handleSubmit}
        buttonText={createChannelType === 'team' ? 'Create channel' : 'Create message group'}
      />
    </div>
  )
}
