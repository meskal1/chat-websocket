import { useCallback } from 'react'

import { logChatPromiseExecution, MessageResponse } from 'stream-chat'
import {
  defaultPinPermissions,
  MessageInput,
  MessageList,
  MessageToSend,
  PinEnabledUserRoles,
  Thread,
  useChannelActionContext,
  Window,
} from 'stream-chat-react'

import { useGiphyInMessageContext } from '../../../../context/GiphyInMessageFlagContext'
import type { StreamChatType } from '../../../../types'

import { ChannelHeader } from './ChannelHeader/ChannelHeader'

export const ChatInner = () => {
  const { inputHasGiphyMessage, clearGiphyFlag } = useGiphyInMessageContext()
  const { sendMessage } = useChannelActionContext<StreamChatType>()
  const teamPermissions: PinEnabledUserRoles = { ...defaultPinPermissions.team, user: true }
  const messagingPermissions: PinEnabledUserRoles = {
    ...defaultPinPermissions.messaging,
    user: true,
  }

  const pinnedPermissions = {
    ...defaultPinPermissions,
    team: teamPermissions,
    messaging: messagingPermissions,
  }

  const overrideSubmitHandler = useCallback(
    (message: MessageToSend) => {
      let updatedMessage = {
        attachments: message.attachments,
        mentioned_users: message.mentioned_users,
        parent_id: message.parent?.id,
        parent: message.parent as MessageResponse,
        text: message.text,
      }

      const isReply = !!updatedMessage.parent_id

      if (inputHasGiphyMessage(isReply)) {
        const updatedText = `/giphy ${message.text}`

        updatedMessage = { ...updatedMessage, text: updatedText }
      }

      if (sendMessage) {
        const sendMessagePromise = sendMessage(updatedMessage)

        logChatPromiseExecution(sendMessagePromise, 'send message')
        clearGiphyFlag(isReply)
      }
    },
    [inputHasGiphyMessage, sendMessage, clearGiphyFlag]
  )

  return (
    <>
      <Window>
        <ChannelHeader />
        <MessageList
          pinPermissions={pinnedPermissions}
          hideDeletedMessages
          hideNewMessageSeparator
        />
        <MessageInput grow overrideSubmitHandler={overrideSubmitHandler} />
      </Window>
      <Thread
        additionalMessageInputProps={{
          grow: true,
          overrideSubmitHandler,
        }}
      />
    </>
  )
}
