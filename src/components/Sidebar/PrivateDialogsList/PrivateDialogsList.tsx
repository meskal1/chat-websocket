import { FC } from 'react'

import type { Channel } from 'stream-chat'
import { ChannelList } from 'stream-chat-react'

import { ChannelPreview } from '../../ChannelPreview/ChannelPreview'
import { TeamChannelList } from '../../TeamChannelList/TeamChannelList'

type PrivateDialogsListType = {
  filters: any
  options: any
  sort: any
}

export const PrivateDialogsList: FC<PrivateDialogsListType> = ({ filters, options, sort }) => {
  const customChannelMessagingFilter = (channels: Channel[]) => {
    return channels.filter(channel => channel.type === 'messaging')
  }

  return (
    <ChannelList
      channelRenderFilterFn={customChannelMessagingFilter}
      filters={filters[1]}
      options={options}
      sort={sort}
      setActiveChannelOnMount={false}
      List={listProps => <TeamChannelList {...listProps} type="messaging" />}
      Preview={previewProps => <ChannelPreview {...previewProps} type="messaging" />}
    />
  )
}
