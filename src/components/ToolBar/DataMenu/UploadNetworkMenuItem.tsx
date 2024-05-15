import { MenuItem } from '@mui/material'
import { ReactElement } from 'react'
import { BaseMenuProps } from '../BaseMenuProps'
import { Cx2 } from '../../../models/CxModel/Cx2'
import NetworkFn, { Network } from '../../../models/NetworkModel'
import VisualStyleFn, { VisualStyle } from '../../../models/VisualStyleModel'
import ViewModelFn, { NetworkView } from '../../../models/ViewModel'
import { v4 as uuidv4 } from 'uuid'
import TableFn, {
  Table,
  ValueType,
  ValueTypeName,
} from '../../../models/TableModel'
import { useTableStore } from '../../../store/TableStore'
import { useWorkspaceStore } from '../../../store/WorkspaceStore'

import { useVisualStyleStore } from '../../../store/VisualStyleStore'
import { useNetworkStore } from '../../../store/NetworkStore'
import { useViewModelStore } from '../../../store/ViewModelStore'
import { putNetworkSummaryToDb } from '../../../store/persist/db'
import { NdexNetworkProperty } from '../../../models/NetworkSummaryModel'
import {
  getAttributeDeclarations,
  getNetworkAttributes,
} from '../../../models/CxModel/cx2-util'

export const UploadNetworkMenuItem = (props: BaseMenuProps): ReactElement => {
  interface FullNetworkData {
    network: Network
    nodeTable: Table
    edgeTable: Table
    visualStyle: VisualStyle
    networkView: NetworkView
  }
  const setCurrentNetworkId = useWorkspaceStore(
    (state) => state.setCurrentNetworkId,
  )

  const addNewNetwork = useNetworkStore((state) => state.add)

  const setVisualStyle = useVisualStyleStore((state) => state.add)

  const setViewModel = useViewModelStore((state) => state.add)

  const setTables = useTableStore((state) => state.add)

  const addNetworkToWorkspace = useWorkspaceStore(
    (state) => state.addNetworkIds,
  )
  const createDataFromLocalCx2 = async (
    LocalNetworkId: string,
    cxData: Cx2,
  ): Promise<FullNetworkData> => {
    const network: Network = NetworkFn.createNetworkFromCx(
      LocalNetworkId,
      cxData,
    )

    const [nodeTable, edgeTable]: [Table, Table] = TableFn.createTablesFromCx(
      LocalNetworkId,
      cxData,
    )

    const visualStyle: VisualStyle =
      VisualStyleFn.createVisualStyleFromCx(cxData)

    const networkView: NetworkView = ViewModelFn.createViewModelFromCX(
      LocalNetworkId,
      cxData,
    )

    return { network, nodeTable, edgeTable, visualStyle, networkView }
  }

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const file = event.target.files?.[0]
    if (file == null) return
    const reader = new FileReader()
    reader.onload = async (event) => {
      try {
        const json = JSON.parse(event.target?.result as string)
        let localName: string = ''
        for (const item of json) {
          if (
            Boolean(item.networkAttributes) &&
            typeof item.networkAttributes[0].name === 'string'
          ) {
            localName = item.networkAttributes[0].name
            break
          }
        }
        let localDescription: string = ''
        for (const item of json) {
          if (
            Boolean(item.networkAttributes) &&
            typeof item.networkAttributes[0].name === 'string'
          ) {
            localDescription = item.networkAttributes[0].description
            break
          }
        }
        const networkAttributeDeclarations =
          getAttributeDeclarations(json).attributeDeclarations[0]
            .networkAttributes
        const networkAttributes = getNetworkAttributes(json)[0]

        const localProperties: NdexNetworkProperty[] = Object.entries(
          networkAttributes,
        ).map(([key, value]) => {
          return {
            predicateString: key,
            value: value as ValueType,
            dataType:
              networkAttributeDeclarations[key].d ?? ValueTypeName.String,
            subNetworkId: null,
          }
        })

        const localUuid = uuidv4()
        const localNodeCount = json[1].metaData[2].elementCount
        const localEdgeCount = json[1].metaData[3].elementCount
        await putNetworkSummaryToDb({
          isNdex: false,
          ownerUUID: localUuid,
          name: localName,
          isReadOnly: false,
          subnetworkIds: [],
          isValid: false,
          warnings: [],
          isShowcase: false,
          isCertified: false,
          indexLevel: '',
          hasLayout: false,
          hasSample: false,
          cxFileSize: 0,
          cx2FileSize: 0,
          properties: localProperties,
          owner: '',
          version: '',
          completed: false,
          visibility: 'PUBLIC',
          nodeCount: localNodeCount,
          edgeCount: localEdgeCount,
          description: localDescription,
          creationTime: new Date(Date.now()),
          externalId: localUuid,
          isDeleted: false,
          modificationTime: new Date(Date.now()),
        })
        const res = await createDataFromLocalCx2(localUuid, json)
        const { network, nodeTable, edgeTable, visualStyle, networkView } = res

        // TODO the db syncing logic in various stores assumes the updated network is the current network
        // therefore, as a temporary fix, the first operation that should be done is to set the
        // current network to be the new network id
        addNetworkToWorkspace(localUuid)
        setCurrentNetworkId(localUuid)
        addNewNetwork(network)
        setVisualStyle(localUuid, visualStyle)
        setTables(localUuid, nodeTable, edgeTable)
        setViewModel(localUuid, networkView)
        props.handleClose()
      } catch (error) {
        console.error(error)
      }
    }
    reader.readAsText(file)
  }

  const menuItem = (
    <MenuItem component="label">
      Upload network from file
      <input
        type="file"
        accept=".cx2"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </MenuItem>
  )
  return <>{menuItem}</>
}
