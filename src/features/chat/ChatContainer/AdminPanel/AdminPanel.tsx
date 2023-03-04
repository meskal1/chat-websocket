import { useCallback } from 'react'

import { useChatContext } from 'stream-chat-react'

import { FormValues, AdminPanelForm } from '../../../../context/AdminPanelFormContext'
import { useWorkspaceController } from '../../../../context/WorkspaceController'
import { StreamChatType } from '../../../../types'

import { CreateChannel } from './CreateChannel/CreateChannel'
import './AdminPanel.scss'

export const AdminPanel = () => {
  const { client } = useChatContext<StreamChatType>()
  const { displayWorkspace, activeWorkspace } = useWorkspaceController()
  const onSubmit = useCallback(() => displayWorkspace('Chat'), [displayWorkspace])

  let defaultFormValues: FormValues = { name: '', members: [] }
  let Form = null

  if (activeWorkspace.match('Channel-Create')) {
    defaultFormValues = { members: client.userID ? [client.userID] : [], name: '' }
    Form = CreateChannel
  }

  return (
    <AdminPanelForm
      workspace={activeWorkspace}
      onSubmit={onSubmit}
      defaultValues={defaultFormValues}
    >
      <div className="channel__container">{Form && <Form />}</div>
    </AdminPanelForm>
  )
}
