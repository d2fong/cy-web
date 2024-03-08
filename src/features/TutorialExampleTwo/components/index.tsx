import { v4 as uuidv4 } from 'uuid';
import { ReactElement } from 'react';
import { MenuItem } from '@mui/material';
import { BaseMenuProps } from '../../../components/ToolBar/BaseMenuProps';
import { useTableStore } from '../../../store/TableStore'
import { Column } from '../../../models/TableModel'
import { IdType } from '../../../models/IdType'
import { LayoutAlgorithm, LayoutEngine } from '../../../models/LayoutModel'
import { useNetworkStore } from '../../../store/NetworkStore';
import { useWorkspaceStore } from '../../../store/WorkspaceStore';
import { useViewModelStore } from '../../../store/ViewModelStore';
import { useLayoutStore } from '../../../store/LayoutStore';
import { useVisualStyleStore } from '../../../store/VisualStyleStore';
import { ValueTypeName } from '../../../models/TableModel/ValueTypeName';
import { AttributeName } from '../../../models/TableModel/AttributeName';
import { ValueType } from '../../../models/TableModel/ValueType';
import { VisualPropertyGroup } from '../../../models/VisualStyleModel/VisualPropertyGroup';
import {
  createEmptyNetworkWithView, DEFAULT_ATTRIBUTE,
  createNodeView, createEdgeView
} from '../utils/networkModelOperations';
import { putNetworkSummaryToDb } from '../../../store/persist/db'
import { useNetworkSummaryStore } from '../../../store/NetworkSummaryStore';

const DEMO_EDGE_TABLE_COLUMN: Column = {
  name: DEFAULT_ATTRIBUTE,
  type: ValueTypeName.String
};
const DEMO_NODE_TABLE_COLUMN: Column = {
  name: DEFAULT_ATTRIBUTE,
  type: ValueTypeName.String
};

export const ExampleTwoMenuItem = ({ handleClose }: BaseMenuProps): ReactElement => {
  const nodeOneId = '1';
  const nodeTwoId = '2';
  const edgeId = 'e1';
  const NODE_TYPE = VisualPropertyGroup.Node
  const EDGE_TYPE = VisualPropertyGroup.Edge
  const newNetworkUuid = uuidv4();
  const addNewNetwork = useNetworkStore((state) => state.add)
  const addNodesToNetwork = useNetworkStore((state) => state.addNodes)
  const addEdgeToNetwork = useNetworkStore((state) => state.addEdge)
  const addNodeViews = useViewModelStore((state) => state.addNodeViews)
  const addEdgeView = useViewModelStore((state) => state.addEdgeView)
  const setVisualStyle = useVisualStyleStore((state) => state.add)
  const setViewModel = useViewModelStore((state) => state.add)
  const setTables = useTableStore((state) => state.add)
  const addRowsToTable = useTableStore((state) => state.addRows)
  const addRowToTable = useTableStore((state) => state.addRow)
  const updateSummary = useNetworkSummaryStore((state) => state.update)
  const addNetworkToWorkspace = useWorkspaceStore(
    (state) => state.addNetworkIds,
  )
  const setCurrentNetworkId = useWorkspaceStore(
    (state) => state.setCurrentNetworkId,
  )

  // Layout setting
  const defaultLayout: LayoutAlgorithm = useLayoutStore(
    (state) => state.preferredLayout,
  )
  const setIsRunning: (isRunning: boolean) => void = useLayoutStore(
    (state) => state.setIsRunning,
  )
  const layoutEngines: LayoutEngine[] = useLayoutStore(
    (state) => state.layoutEngines,
  )
  const engine: LayoutEngine =
    layoutEngines.find((engine) => engine.name === defaultLayout.engineName) ??
    layoutEngines[0]

  const updateNodePositions: (
    networkId: IdType,
    positions: Map<IdType, [number, number, number?]>,
  ) => void = useViewModelStore((state) => state.updateNodePositions)

  const afterLayout = (positionMap: Map<IdType, [number, number]>): void => {
    updateNodePositions(newNetworkUuid, positionMap)
    setIsRunning(false)
  }

  const handleClick = async (): Promise<void> => {
    try {
      // create a new network        
      const [newNetworkWithView, newNetworkSummary] = await createEmptyNetworkWithView([DEMO_NODE_TABLE_COLUMN],
        [DEMO_EDGE_TABLE_COLUMN],
        newNetworkUuid);

      // add new network to stores        
      addNetworkToWorkspace(newNetworkUuid);
      addNewNetwork(newNetworkWithView.network);
      setVisualStyle(newNetworkUuid, newNetworkWithView.visualStyle);
      setTables(newNetworkUuid, newNetworkWithView.nodeTable, newNetworkWithView.edgeTable);
      setViewModel(newNetworkUuid, newNetworkWithView.networkViews[0]);
      setCurrentNetworkId(newNetworkUuid)

      // add 2 nodes and 1 edge to network
      addNodesToNetwork(newNetworkUuid, [nodeOneId, nodeTwoId])
      addEdgeToNetwork(newNetworkUuid, edgeId, nodeOneId, nodeTwoId)

      // layout 
      setIsRunning(true)
      engine.apply(newNetworkWithView.network.nodes,
        newNetworkWithView.network.edges, afterLayout, defaultLayout)

      // update the tables
      const nodeAttr: Array<[IdType, Record<AttributeName, ValueType>]>
        = [[nodeOneId, { [DEFAULT_ATTRIBUTE]: NODE_TYPE + nodeOneId }],
        [nodeTwoId, { [DEFAULT_ATTRIBUTE]: NODE_TYPE + nodeTwoId }]];
      const edgeAttr: [IdType, Record<AttributeName, ValueType>]
        = [edgeId, { [DEFAULT_ATTRIBUTE]: edgeId }];
      addRowsToTable(newNetworkUuid, NODE_TYPE, nodeAttr)
      addRowToTable(newNetworkUuid, EDGE_TYPE, edgeAttr)

      // add nodeView and edgeView
      const nodeViewOne = createNodeView({ nodeId: nodeOneId, x: 1, y: 0 })
      const nodeViewTwo = createNodeView({ nodeId: nodeTwoId, x: 1, y: 0 })
      const edgeView = createEdgeView(edgeId)
      addNodeViews(newNetworkUuid, [nodeViewOne, nodeViewTwo])
      addEdgeView(newNetworkUuid, edgeView)

      // update network summary
      updateSummary(newNetworkUuid, {
        nodeCount: newNetworkWithView.network.nodes.length,
        edgeCount: newNetworkWithView.network.edges.length,
        modificationTime: new Date(Date.now())
      })
      await putNetworkSummaryToDb({
        ...newNetworkSummary,
        nodeCount: 2, edgeCount: 1, hasLayout: true, modificationTime: new Date(Date.now()),
      })
      handleClose();
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <MenuItem onClick={handleClick}>
      Create Example Network
    </MenuItem>
  );
};
