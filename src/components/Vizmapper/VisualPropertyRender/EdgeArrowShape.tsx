import { EdgeArrowShapeType } from '../../../models/VisualStyleModel/VisualPropertyValue'
import { Box } from '@mui/material'
import {
  CircleArrowIcon,
  DiamondArrowIcon,
  TeeArrowIcon,
  TriangleArrowIcon,
  SquareArrowIcon,
  NoneArrowIcon,
  OpenCircleArrowIcon,
  OpenDiamondArrowIcon,
  OpenSquareArrowIcon,
  OpenTriangleArrowIcon,
  TriangleCrossArrowIcon,
  OpenTriangleCrossArrowIcon,
} from '../VisualStyleIcons'

const edgeArrowShapeMap: Record<
  EdgeArrowShapeType,
  (isSelected: boolean) => React.ReactElement
> = {
  [EdgeArrowShapeType.None]: (isSelected: boolean) => (
    <NoneArrowIcon isSelected={isSelected} />
  ),
  [EdgeArrowShapeType.Circle]: (isSelected: boolean) => (
    <CircleArrowIcon isSelected={isSelected} />
  ),
  [EdgeArrowShapeType.Diamond]: (isSelected: boolean) => (
    <DiamondArrowIcon isSelected={isSelected} />
  ),
  [EdgeArrowShapeType.Square]: (isSelected: boolean) => (
    <SquareArrowIcon isSelected={isSelected} />
  ),
  [EdgeArrowShapeType.Triangle]: (isSelected: boolean) => (
    <TriangleArrowIcon isSelected={isSelected} />
  ),
  [EdgeArrowShapeType.Tee]: (isSelected: boolean) => (
    <TeeArrowIcon isSelected={isSelected} />
  ),
  [EdgeArrowShapeType.TriangleCross]: (isSelected: boolean) => (
    <TriangleCrossArrowIcon isSelected={isSelected} />
  ),
  [EdgeArrowShapeType.Arrow]: (isSelected: boolean) => (
    <TriangleArrowIcon isSelected={isSelected} />
  ),
  [EdgeArrowShapeType.OpenCircle]: (isSelected: boolean) => (
    <OpenCircleArrowIcon isSelected={isSelected} />
  ),
  [EdgeArrowShapeType.OpenDiamond]: (isSelected: boolean) => (
    <OpenDiamondArrowIcon isSelected={isSelected} />
  ),
  [EdgeArrowShapeType.OpenSquare]: (isSelected: boolean) => (
    <OpenSquareArrowIcon isSelected={isSelected} />
  ),
  [EdgeArrowShapeType.OpenDelta]: (isSelected: boolean) => (
    <OpenTriangleArrowIcon isSelected={isSelected} />
  ),
  [EdgeArrowShapeType.OpenCrossDelta]: (isSelected: boolean) => (
    <OpenTriangleCrossArrowIcon isSelected={isSelected} />
  ),
}

export function EdgeArrowShapePicker(props: {
  currentValue: EdgeArrowShapeType | null
  onValueChange: (edgeArrowShape: EdgeArrowShapeType) => void
  closePopover: () => void
}): React.ReactElement {
  const { onValueChange, currentValue } = props
  const sortedEdgeArrowShapes = Object.values(EdgeArrowShapeType).sort()

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        width: 350,
      }}
    >
      {sortedEdgeArrowShapes.map((edgeArrowShape: EdgeArrowShapeType) => (
        <Box
          sx={{
            color: currentValue === edgeArrowShape ? 'blue' : 'black',
            fontWeight: currentValue === edgeArrowShape ? 'bold' : 'normal',
            p: 1,
            '&:hover': { cursor: 'pointer' },
          }}
          onClick={() => onValueChange(edgeArrowShape)}
          key={edgeArrowShape}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignContent: 'center',
              width: 80,
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <EdgeArrowShape
                value={edgeArrowShape}
                isSelected={currentValue === edgeArrowShape}
              />
            </Box>
            <Box sx={{ textAlign: 'center' }}>{edgeArrowShape}</Box>
          </Box>
        </Box>
      ))}
    </Box>
  )
}

export function EdgeArrowShape(props: {
  value: EdgeArrowShapeType
  isSelected: boolean
}): React.ReactElement {
  const { value, isSelected } = props
  return edgeArrowShapeMap[value](isSelected) ?? <Box>{value}</Box>
}
