import { FC } from 'react'

import type { Channel } from 'stream-chat'
import { ChannelList } from 'stream-chat-react'

import { ChannelPreview } from '../../ChannelPreview/ChannelPreview'
import { TeamChannelList } from '../../TeamChannelList/TeamChannelList'

type ChannelsListType = {
  filters: any
  options: any
  sort: any
}

export const ChannelsList: FC<ChannelsListType> = ({ filters, options, sort }) => {
  const customChannelTeamFilter = (channels: Channel[]) => {
    return channels.filter(channel => channel.type === 'team')
  }

  return (
    <ChannelList
      channelRenderFilterFn={customChannelTeamFilter}
      filters={filters[0]}
      options={options}
      sort={sort}
      List={listProps => <TeamChannelList {...listProps} type="team" />}
      Preview={previewProps => <ChannelPreview {...previewProps} type="team" />}
    />
  )
}
