import NetworkFn, { Network, NetworkAttributes, Edge } from '../../../models/NetworkModel'
import { translateCXEdgeId , 
        translateEdgeIdToCX } from '../../../models/NetworkModel/impl/CyNetwork'
import { Node as CxNode } from '../../../models/CxModel/Cx2/CoreAspects/Node'
import { Edge as CxEdge } from '../../../models/CxModel/Cx2/CoreAspects/Edge'
import TableFn, { Column,Table } from '../../../models/TableModel'
import ViewModelFn, { NetworkView } from '../../../models/ViewModel'
import VisualStyleFn, { VisualStyle } from '../../../models/VisualStyleModel'
import { AttributeName } from '../../../models/TableModel/AttributeName'
import { ValueType } from '../../../models/TableModel/ValueType'
import { getCachedData } from '../../../utils/cx-utils'
import { v4 as uuidv4 } from 'uuid'
import { Attribute } from '../../../models/CxModel/Cx2/CoreAspects/Attribute'
import {
    putNetworkToDb,
    putTablesToDb,
    putVisualStyleToDb,
    putNetworkViewToDb,
    putNetworkSummaryToDb,
    getNetworkSummaryFromDb
} from '../../../store/persist/db'
export const DEFAULT_ATTRIBUTE = "name";
/**
 * An utility interface to hold all the data needed to build a network view
 */
export interface NetworkModel {
    network: Network
    networkAttributes?: NetworkAttributes
    nodeTable: Table
    edgeTable: Table
    visualStyle: VisualStyle
    networkViews: NetworkView[]
  }

// Function to create an emyty network
export const createEmptyNetworkWithView= async (
    id?: string,
    nodeAttrLst:Column[]=[],
    edgeAttrLst:Column[]=[]
  ): Promise<NetworkModel> => {
    // check if id already exists
    const newNetworkNodeCount = 0;
    const newNetworkEdgeCount = 0;
    const newNetworkName = "Sample Network"
    const newNetworkDescription = "This is a demo of creating a 2-node-1-edge network."

    const uuid: string = id !== undefined ? id : uuidv4()
    const network: Network = NetworkFn.createNetwork(uuid)
    const nodeTable:Table = TableFn.createTable(uuid, nodeAttrLst);
    const edgeTable:Table = TableFn.createTable(uuid, edgeAttrLst);
  
    const visualStyle: VisualStyle = VisualStyleFn.createVisualStyle();// default
    const networkView: NetworkView = ViewModelFn.createEmptyViewModel(uuid)
    const networkAttributes: NetworkAttributes = {
      id: uuid,
      attributes: {},
    }
    
    // save to Database
    await putNetworkSummaryToDb({
        ownerUUID: uuid,
        name: newNetworkName,
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
        properties: [],
        owner: '',
        version: '',
        completed: false,
        visibility: 'PUBLIC',
        nodeCount: newNetworkNodeCount,
        edgeCount: newNetworkEdgeCount,
        description: newNetworkDescription,
        creationTime: new Date(Date.now()),
        externalId: uuid,
        isDeleted: false,
        modificationTime: new Date(Date.now()),
        maxNodeId: 0,
        maxEdgeId: 0
      })
    await putNetworkToDb(network);
    await putTablesToDb(uuid, nodeTable, edgeTable);
    await putVisualStyleToDb(uuid, visualStyle)
    await putNetworkViewToDb(uuid, networkView)

    return {
      network,
      nodeTable,
      edgeTable,
      visualStyle,
      networkViews: [networkView],
      networkAttributes,
    }
}
  
// Function to add a Node in an exsisting network
export const addNodeToNetwork = async ({
    networkId,
    nodeId,
    v,
    x,
    y,
    z
}: {
    networkId: string,
    nodeId?: number,
    v?: Attribute,
    x?: number,
    y?: number,
    z?: number
}): Promise<[NetworkModel,string] | undefined> => {
    const {network, nodeTable, edgeTable, visualStyle, networkViews} = await getCachedData(networkId);
    const networkSummary = await getNetworkSummaryFromDb(networkId);
    if (network !== undefined && networkSummary!== undefined && nodeTable!== undefined
        && edgeTable!== undefined && networkViews!== undefined && visualStyle!== undefined){
        let newNodeId: string;
        let maxNodeId: number = 0;
        if (nodeId !== undefined && isUInt(nodeId)){
            const nodeIdStr = nodeId.toString();
            maxNodeId = nodeId;
            for (const existNode of network.nodes){
                if(existNode.id === nodeIdStr){
                    console.log('Failed to add a node to the network! The nodeID has been used.')
                    return 
                } 
                if (isUInt(Number(existNode.id)) && Number(existNode.id) > maxNodeId) {
                    maxNodeId = Number(existNode.id)
                }
            }
            newNodeId = nodeIdStr;
        }else if(networkSummary.maxNodeId!== undefined){
            newNodeId = (networkSummary.maxNodeId + 1).toString();
            maxNodeId = networkSummary.maxNodeId + 1
        }else{
            console.log('Failed to add a node to the network! Cannot assign a proper NodeId.')
            return;
        }
        const newNode: CxNode = {
            id: Number(newNodeId), v, x, y, z
        }
        const newNetwork = NetworkFn.addNode(network, newNodeId);
        let nodeAttrLst:Array<Record<AttributeName, ValueType>>;
        if (v!==undefined){
            nodeAttrLst = Object.entries(v).map(([key, value]): Record<AttributeName, ValueType> => {
                return { [key]: value as ValueType }; 
            });
        }else{
            nodeAttrLst = [{[DEFAULT_ATTRIBUTE]: 'node' + newNodeId}];
        }
        const newNodeTable = TableFn.insertRows(nodeTable,nodeAttrLst.map(att=>[newNodeId,att]));
        const newNetworkView = ViewModelFn.addNodeViewToModel(networkViews[0],newNode);
        await putNetworkToDb(newNetwork);
        await putNetworkSummaryToDb({
            ...networkSummary,
            nodeCount: networkSummary.nodeCount + 1,
            maxNodeId,
            modificationTime: new Date(Date.now())
        })
        await putTablesToDb(networkId, newNodeTable, edgeTable);
        await putNetworkViewToDb(networkId, newNetworkView)
        return [{
            network:newNetwork,
            nodeTable:newNodeTable,
            edgeTable,
            visualStyle,
            networkViews: [newNetworkView],        
            },
            newNodeId
        ];

    }else{
        console.log('Failed to add a node to the network! The network does not exist.')
    }     
}

// Function to add an Edge in an exsisting network
export const addEdgeToNetwork = async (
    networkId: string,
    sourceNodeId: string,
    targetNodeId: string,
    edgeId?: number,
    edgeAttrLst?:Array<Record<AttributeName, ValueType>>
  ): Promise<[NetworkModel,string] | undefined> => {
    const {network, nodeTable, edgeTable, visualStyle, networkViews} = await getCachedData(networkId);
    const networkSummary = await getNetworkSummaryFromDb(networkId);
    if (network !== undefined && networkSummary!== undefined && nodeTable!== undefined
        && edgeTable!== undefined && networkViews!== undefined && visualStyle!== undefined
        && isUInt(Number(sourceNodeId)) && isUInt(Number(targetNodeId))){
        let newEdgeId: string;
        let maxEdgeId: number = 0;
        if (edgeId !== undefined && isUInt(edgeId)){
            const edgeIdStr = translateCXEdgeId(edgeId.toString());
            maxEdgeId = edgeId;
            for (const existEdge of network.edges){
                if(existEdge.id === edgeIdStr){
                    console.log('Failed to add an edge to the network! The edgeID has been used.')
                    return 
                } 
                const existEdgeId = Number(translateEdgeIdToCX(existEdge.id.slice(1)))
                if (isUInt(existEdgeId) && existEdgeId > maxEdgeId) {
                    maxEdgeId = existEdgeId
                }
            }
            newEdgeId = edgeIdStr;
        }else if(networkSummary.maxEdgeId!== undefined){
            newEdgeId = translateCXEdgeId((networkSummary.maxEdgeId + 1).toString());
            maxEdgeId = networkSummary.maxEdgeId + 1
        }else{
            console.log('Failed to add an Edge to the network! Cannot assign a proper edgeId.')
            return;
        }
        
        const newEdge: Edge  = {
            id:newEdgeId, 
            s:sourceNodeId,
            t:targetNodeId
        };
        const newCxEdge: CxEdge = {
            id: Number(translateEdgeIdToCX(newEdgeId)),
            s: Number(sourceNodeId),
            t: Number(targetNodeId)
        }
        const newNetwork = NetworkFn.addEdge(network, newEdge);
        if (edgeAttrLst === undefined){
            edgeAttrLst = [{[DEFAULT_ATTRIBUTE]:newEdgeId}];
        }
        const newEdgeTable = TableFn.insertRows(edgeTable,edgeAttrLst.map(att=>[newEdgeId,att]));
        const newNetworkView = ViewModelFn.addEdgeViewToModel(networkViews[0], newCxEdge);
        await putNetworkToDb(newNetwork);
        await putNetworkSummaryToDb({
            ...networkSummary,
            edgeCount: networkSummary.edgeCount + 1,
            maxEdgeId,
            modificationTime: new Date(Date.now())
        })
        await putTablesToDb(networkId, nodeTable, newEdgeTable);
        await putNetworkViewToDb(networkId, newNetworkView)
        return [{
            network:newNetwork,
            nodeTable,
            edgeTable:newEdgeTable,
            visualStyle,
            networkViews: [newNetworkView],        
            },
            newEdgeId
        ];
    }
    console.log('Failed to add an edge to the network! The network does not exist.');
}

function isUInt(num:number):boolean{
    return (Number.isInteger(num) && num >= 0)
}