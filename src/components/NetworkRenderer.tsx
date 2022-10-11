import * as React from 'react'
import Box from '@mui/material/Box'
import Cytoscape from 'cytoscape'

import {
  EdgeVisualPropertyName,
  NetworkView,
  NodeVisualPropertyName,
} from '../models/NetworkView'
import { NetworkModel } from '../models/Network'

interface NetworkRendererProps {
  networkView: NetworkView
  network: NetworkModel
}

const visualStyle2CyJsStyle = (
  visualProperty: NodeVisualPropertyName | EdgeVisualPropertyName,
): string => {
  switch (visualProperty) {
    case 'labelColor': {
      return 'color'
    }
    case 'labelSize': {
      return 'font-size'
    }
    case 'labelOpacity': {
      return 'text-opacity'
    }
    case 'lineType': {
      return 'line-style'
    }
    default:
      return visualProperty
  }
}

export default function NetworkRenderer(
  props: NetworkRendererProps,
): React.ReactElement {
  const [cy, setCy] = React.useState(null as any)
  const cyContainer = React.useRef(null)

  const { networkView, network } = props

  if (cy != null) {
    cy.startBatch()
    cy.remove('*')
    network.nodes.forEach((node) => {
      cy.add({
        group: 'nodes',
        data: {
          id: node.id,
        },
      })
    })
    networkView.nodeViews.forEach((nodeView) => {
      const node = cy.getElementById(nodeView.key)

      if (node != null) {
        nodeView.visualProperties.forEach((vp) => {
          const cyJsVpName = visualStyle2CyJsStyle(vp.name)
          if (cyJsVpName !== 'position') {
            node.style({
              [cyJsVpName]: vp.value,
            })
          } else {
            node.position(vp.value)
          }
        })
      }
    })

    // cant have nodes/edges having the same id
    const edgeId2CyId = (id: string): string => `e${id}`

    network.edges.forEach((edge) => {
      cy.add({
        group: 'edges',
        data: {
          id: edgeId2CyId(edge.id),
          source: `${edge.s}`,
          target: `${edge.t}`,
        },
      })
    })

    networkView.edgeViews.forEach((edgeView) => {
      const edge = cy.getElementById(edgeId2CyId(edgeView.key))

      if (edge != null) {
        edgeView.visualProperties.forEach((vp) => {
          const cyJsVpName = visualStyle2CyJsStyle(vp.name)

          edge.style({
            [cyJsVpName]: vp.value,
          })
        })
      }
    })

    cy.endBatch()
  }

  React.useEffect(() => {
    const cy = new Cytoscape({
      container: cyContainer.current,
    })
    cy.resize()
    setCy(cy)
  }, [])

  return (
    <Box
      sx={{ width: '100%', height: '100%' }}
      id="cy-container"
      ref={cyContainer}
    ></Box>
  )
}
