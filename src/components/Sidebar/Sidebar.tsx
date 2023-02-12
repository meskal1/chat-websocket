import { ChannelSort } from 'stream-chat'
import type { ChannelFilters } from 'stream-chat'

import { StreamChatType } from '../../types'

import { ChannelSearch } from './ChannelSearch/ChannelSearch'
import { ChannelsList } from './ChannelsList/ChannelsList'
import { PrivateDialogsList } from './PrivateDialogsList/PrivateDialogsList'

const filters: ChannelFilters[] = [
  { type: 'team', demo: 'team' },
  { type: 'messaging', demo: 'team' },
]

const options = { state: true, watch: true, presence: true, limit: 3 }
const sort: ChannelSort<StreamChatType> = { last_message_at: -1, updated_at: -1 }

export const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="channel-list-bar">
        <ChannelSearch />
        <ChannelsList options={options} filters={filters} sort={sort} />
        <PrivateDialogsList options={options} filters={filters} sort={sort} />
      </div>
    </div>
  )
}
