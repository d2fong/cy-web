import { LayoutAlgorithm } from '../../..'
import { ValueTypeName } from '../../../../TableModel'

export const grid: LayoutAlgorithm = {
  name: 'grid',
  engineName: 'Cytoscape.js',
  description: 'Grid Layout: A simple grid layout',
  parameters: {
    name: 'grid',
    boundingBox: { x1: 0, y1: 0, w: 1000, h: 1000 },
    padding: 30,
    condense: false,
  },
  editables: {
    padding: {
      name: 'padding',
      description: 'Padding around the nodes',
      type: ValueTypeName.Integer,
      value: 30,
      defaultValue: 30,
    },
    condense: {
      name: 'condense',
      description: 'uses minimal space on true',
      type: ValueTypeName.Boolean,
      value: false,
      defaultValue: false,
    },
  },
}
