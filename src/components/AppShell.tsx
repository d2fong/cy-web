import { Box } from '@mui/material'
import { ReactElement, useEffect, useRef } from 'react'
import { Location, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useWorkspaceStore } from '../store/WorkspaceStore'
import { getWorkspaceFromDb } from '../store/persist/db'

import { ToolBar } from './ToolBar'

/**
 *
 * Empty application shell only with a toolbar
 *
 *  - Actual contents will be rendered by the router
 *
 */
const AppShell = (): ReactElement => {
  // This is necessary to prevent creating a new workspace on every render
  const initializedRef = useRef(false)
  const navigate = useNavigate()
  const setWorkspace = useWorkspaceStore((state) => state.set)
  const workspace = useWorkspaceStore((state) => state.workspace)
  const location: Location = useLocation()

  const addNetworkIds = useWorkspaceStore((state) => state.addNetworkIds)
  const setCurrentNetworkId = useWorkspaceStore(
    (state) => state.setCurrentNetworkId,
  )

  const { id, currentNetworkId, networkIds } = workspace

  const extractNetworkId = (location: Location): string => {
    const path = location.pathname
    const parts = path.split('/')
    if (parts.length > 3) {
      return parts[3]
    }
    return ''
  }

  useEffect(() => {
    if (!initializedRef.current) {
      initializedRef.current = true
      // TODO: Is this the best way to check the initial state?
      if (id === '') {
        void getWorkspaceFromDb().then((workspace) => {
          // This sets current network ID, too
          setWorkspace(workspace)
        })
      }
    }
  }, [])

  const handleExistingWorkspace = (): void => {
    if (currentNetworkId === '' || currentNetworkId === undefined) {
      // Case 1: Current network is not available
      if (networkIds.length > 0) {
        // Pick the first one if network is in the workspace
        navigate(`/${id}/networks/${networkIds[0]}`)
      } else {
        // Otherwise, display empty page
        navigate(`/${id}/networks`)
      }
    } else {
      // This is the network ID in the URL, not yet set as the current network ID
      const networkId = extractNetworkId(location)
      // No network ID in the URL --> redirect to the current network
      if (networkId === '' || networkId === undefined) {
        navigate(`/${id}/networks/${currentNetworkId}`)
      } else if (networkId === currentNetworkId) {
        navigate(`/${id}/networks/${currentNetworkId}`)
      } else {
        // URL has different network ID
        const idSet = new Set(networkIds)
        if (idSet.has(networkId)) {
          // the ID in the URL is in the workspace
          navigate(`/${id}/networks/${networkId}`)
        } else {
          // Add to the workspace
          addNetworkIds(networkId)
          setCurrentNetworkId(networkId)
          navigate(`/${id}/networks/${networkId}`)
        }
      }
    }
  }
  useEffect(() => {
    console.log('!workspace', workspace, location)
    if (id !== '') {
      // (Last) Workspace ID exists in the store
      handleExistingWorkspace()
    }
  }, [workspace])

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <ToolBar />
      <Outlet />
    </Box>
  )
}

export default AppShell
