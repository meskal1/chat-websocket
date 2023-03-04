import type { Channel, ChannelFilters, ChannelSort } from 'stream-chat'
import { ChannelList, useChatContext } from 'stream-chat-react'
import Cookies from 'universal-cookie'

import type { StreamChatType } from '../../../../types'

import { ChannelPreview } from './ChannelPreview/ChannelPreview'
import { SidebarChannelList } from './SidebarChannelList/SidebarChannelList'

const cookies = new Cookies()

const options = { state: true, watch: true, presence: true, limit: 10, message_limit: 300 }
const sort: ChannelSort<StreamChatType> = [{ last_message_at: -1 }, { updated_at: -1 }]

export const PrivateDialogsList = () => {
  const filters: ChannelFilters[] = [
    { type: 'messaging', demo: 'team', members: { $in: [cookies.get('userId')] } },
  ]

  const customChannelMessagingFilter = (channels: Channel[]) => {
    return channels.filter(channel => channel.type === 'messaging')
  }

  return (
    <ChannelList
      channelRenderFilterFn={customChannelMessagingFilter}
      filters={filters[0]}
      options={options}
      sort={sort}
      setActiveChannelOnMount={false}
      List={listProps => <SidebarChannelList {...listProps} type="messaging" />}
      Preview={previewProps => <ChannelPreview {...previewProps} type="messaging" />}
    />
  )
}
