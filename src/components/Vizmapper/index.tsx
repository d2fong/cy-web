import * as React from 'react'
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Divider,
  Tooltip,
  IconButton,
} from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'
import { IdType } from '../../models/IdType'
import VisualStyleFn, {
  EdgeVisualPropertyName,
  NodeVisualPropertyName,
  VisualProperty,
  VisualPropertyValueType,
  VisualStyle,
} from '../../models/VisualStyleModel'

import { useVisualStyleStore } from '../../store/VisualStyleStore'

import { MappingForm } from './Forms/MappingForm'
import { BypassForm } from './Forms/BypassForm'
import { DefaultValueForm } from './Forms/DefaultValueForm'
import { EmptyVisualPropertyViewBox } from './Forms/VisualPropertyViewBox'
import { VisualPropertyGroup } from '../../models/VisualStyleModel/VisualPropertyGroup'
import { useUiStateStore } from '../../store/UiStateStore'
import { getDefaultVisualStyle } from '../../models/VisualStyleModel/impl/DefaultVisualStyle'
import { useState } from 'react'

function VisualPropertyView(props: {
  currentNetworkId: IdType
  visualProperty: VisualProperty<VisualPropertyValueType>
}): React.ReactElement {
  const { visualProperty, currentNetworkId } = props
  const vpName = visualProperty.name
  const edgeLineColorName = getDefaultVisualStyle()['edgeLineColor'].displayName
  const heightName = getDefaultVisualStyle()['nodeHeight'].displayName
  const [outerTooltipOpen, setOuterTooltipOpen] = useState(false)
  const [innerTooltipOpen, setInnerTooltipOpen] = useState(false)

  const handleOuterTooltipToggle = (open: boolean) => {
    if (!innerTooltipOpen) {
      setOuterTooltipOpen(open)
    }
  }

  const handleInnerTooltipToggle = (open: boolean) => {
    setInnerTooltipOpen(open)
    if (open) {
      setOuterTooltipOpen(false)
    }
  }
  const nodeSizeLocked = useUiStateStore(
    (state) =>
      state.ui.visualStyleOptions[currentNetworkId]?.visualEditorProperties
        .nodeSizeLocked,
  )
  const arrowColorMatchesEdge = useUiStateStore(
    (state) =>
      state.ui.visualStyleOptions[currentNetworkId]?.visualEditorProperties
        .arrowColorMatchesEdge,
  )

  const widthDisabled =
    nodeSizeLocked && NodeVisualPropertyName.NodeWidth === vpName
  const arrowColorDisabled =
    arrowColorMatchesEdge &&
    (EdgeVisualPropertyName.EdgeSourceArrowColor === vpName ||
      EdgeVisualPropertyName.EdgeTargetArrowColor === vpName)
  const disabled = widthDisabled || arrowColorDisabled

  let tooltip = ''
  if (widthDisabled)
    tooltip = `Node width and height are locked. Use the \'${heightName}\' property to adjust the node size, or uncheck \“Lock node width and height\” in \'${heightName}\' to enable editing of the Width.`
  if (arrowColorDisabled)
    tooltip = `Edge color to arrows is enabled. Use the \'${edgeLineColorName}\' property to adjust the arrow color, or uncheck \“Edge color to arrows\” in \'${edgeLineColorName}\' to enable editing of the arrow color.`

  return (
    <Tooltip
      open={outerTooltipOpen}
      onMouseEnter={() => handleOuterTooltipToggle(true)}
      onMouseLeave={() => handleOuterTooltipToggle(false)}
      placement="top"
      arrow={true}
      title={visualProperty.tooltip ?? tooltip}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 0.25,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          {disabled ? (
            <EmptyVisualPropertyViewBox sx={{ mr: 1, cursor: 'not-allowed' }} />
          ) : (
            <DefaultValueForm
              sx={{ mr: 1 }}
              visualProperty={visualProperty}
              currentNetworkId={currentNetworkId}
            />
          )}
          {visualProperty.group === VisualPropertyGroup.Network || disabled ? (
            <>
              <Tooltip
                title={
                  disabled ? '' : 'Mapping not available for network properties'
                }
              >
                <EmptyVisualPropertyViewBox
                  sx={{ mr: 1, cursor: 'not-allowed' }}
                />
              </Tooltip>
              <Tooltip
                title={
                  disabled
                    ? ''
                    : 'Bypasses not available for network properties'
                }
              >
                <EmptyVisualPropertyViewBox
                  sx={{ mr: 1, cursor: 'not-allowed' }}
                />
              </Tooltip>
            </>
          ) : (
            <>
              <MappingForm
                sx={{ mr: 1 }}
                currentNetworkId={currentNetworkId}
                visualProperty={visualProperty}
              />
              <BypassForm
                sx={{ mr: 1 }}
                currentNetworkId={currentNetworkId}
                visualProperty={visualProperty}
              />
            </>
          )}

          <Typography
            variant="body2"
            sx={{ ml: 1, color: disabled ? 'gray' : 'black' }}
          >
            {visualProperty.displayName}
          </Typography>
        </Box>

        {disabled && (
          <Tooltip
            open={innerTooltipOpen}
            onMouseEnter={() => handleInnerTooltipToggle(true)}
            onMouseLeave={() => handleInnerTooltipToggle(false)}
            placement="top"
            title={visualProperty.tooltip ?? tooltip}
            arrow={true}
            sx={{
              mr: 1,
            }}
          >
            <IconButton sx={{ padding: 0.5 }}>
              <InfoIcon />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    </Tooltip>
  )
}

export default function VizmapperView(props: {
  networkId: IdType
  height: number
}): React.ReactElement {
  const [currentTabIndex, setCurrentTabIndex] = React.useState(0)
  const visualStyles: Record<IdType, VisualStyle> = useVisualStyleStore(
    (state) => state.visualStyles,
  )

  const visualStyle = visualStyles[props.networkId]

  if (visualStyle == null) {
    return <div></div>
  }

  const nodeVps = VisualStyleFn.nodeVisualProperties(visualStyle).map((vp) => {
    return (
      <VisualPropertyView
        key={vp.name}
        currentNetworkId={props.networkId}
        visualProperty={vp}
      />
    )
  })
  const edgeVps = VisualStyleFn.edgeVisualProperties(visualStyle).map((vp) => {
    return (
      <VisualPropertyView
        key={vp.name}
        currentNetworkId={props.networkId}
        visualProperty={vp}
      />
    )
  })

  const networkVps = VisualStyleFn.networkVisualProperties(visualStyle).map(
    (vp) => {
      return (
        <VisualPropertyView
          key={vp.name}
          currentNetworkId={props.networkId}
          visualProperty={vp}
        />
      )
    },
  )

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
      }}
    >
      <Tabs
        value={currentTabIndex}
        TabIndicatorProps={{ sx: { backgroundColor: 'white' } }}
        sx={{
          display: 'flex',
          alignItems: 'center',
          fontSize: 10,
          pb: 0.5,
          backgroundColor: '#2F80ED',
          '& button.Mui-selected': { color: 'white' },
          '& button': {
            minHeight: 30,
            height: 30,
            width: 30,
          },
          height: 38,
          minHeight: 30,
        }}
        onChange={(e, nextTab) => setCurrentTabIndex(nextTab)}
      >
        <Tab label={<Typography variant="caption">Nodes</Typography>} />
        <Tab label={<Typography variant="caption">Edges</Typography>} />
        <Tab label={<Typography variant="caption">Network</Typography>} />
      </Tabs>
      <Box sx={{ display: 'flex', p: 0.5, ml: 1 }}>
        <Box sx={{ width: 24, textAlign: 'center', mr: 1.5, fontSize: 12 }}>
          Def.
        </Box>
        <Box sx={{ width: 24, textAlign: 'center', mr: 1.5, fontSize: 12 }}>
          Map.
        </Box>
        <Box sx={{ width: 24, textAlign: 'center', fontSize: 12 }}>Byp.</Box>
      </Box>
      <Divider />
      <div hidden={currentTabIndex !== 0}>
        {currentTabIndex === 0 && (
          <Box
            sx={{
              ml: 1,
              pt: 1,
              overflow: 'scroll',
              height: props.height - 162, // we want to only scroll the vp list instead of the whole allotment
              // height has to be computed based on allotment size to allow overflow scroll
              // height is passed as a prop but this could be pulled from a uiState store instead in the future
            }}
          >
            {nodeVps}
          </Box>
        )}
      </div>
      <div hidden={currentTabIndex !== 1}>
        {currentTabIndex === 1 && (
          <Box
            sx={{
              ml: 1,
              pt: 1,
              overflow: 'scroll',
              height: props.height - 162,
            }}
          >
            {edgeVps}
          </Box>
        )}
      </div>
      <div hidden={currentTabIndex !== 2}>
        {currentTabIndex === 2 && (
          <Box
            sx={{
              ml: 1,
              pt: 1,
              overflow: 'scroll',
              height: props.height - 162,
            }}
          >
            {networkVps}
          </Box>
        )}
      </div>
    </Box>
  )
}
