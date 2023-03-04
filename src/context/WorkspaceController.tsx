import { useCallback, useContext, useState, createContext } from 'react'

const noop = () => Promise.resolve()

export type Workspace =
  | 'Chat'
  | 'Admin-Channel-Edit'
  | 'Admin-Channel-Create__team'
  | 'Admin-Channel-Create__messaging'

type WorkspaceContext = {
  activeWorkspace: Workspace
  closeAdminPanel: () => void
  displayWorkspace: (w: Workspace) => void
}

const WorkspaceControllerContext = createContext<WorkspaceContext>({
  activeWorkspace: 'Chat',
  closeAdminPanel: noop,
  displayWorkspace: noop,
})

export const WorkspaceController = ({ children }: { children: React.ReactNode }) => {
  const [activeWorkspace, setActiveWorkspace] = useState<Workspace>('Chat')

  const displayWorkspace: WorkspaceContext['displayWorkspace'] = useCallback(
    workspace => {
      setActiveWorkspace(workspace)
    },
    [setActiveWorkspace]
  )

  const closeAdminPanel = useCallback(() => {
    displayWorkspace('Chat')
  }, [displayWorkspace])

  return (
    <WorkspaceControllerContext.Provider
      value={{
        activeWorkspace,
        closeAdminPanel,
        displayWorkspace,
      }}
    >
      {children}
    </WorkspaceControllerContext.Provider>
  )
}

export const useWorkspaceController = () => useContext(WorkspaceControllerContext)
