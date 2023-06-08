import * as React from 'react'
import {
  Button,
  Box,
  Typography,
  Paper,
  Popover,
  TextField,
  IconButton,
  Tooltip,
} from '@mui/material'
import { scaleLinear } from '@visx/scale'
import { extent } from 'd3-array'

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import Delete from '@mui/icons-material/DisabledByDefault'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import Palette from '@mui/icons-material/Palette'
import EditIcon from '@mui/icons-material/Edit'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import RdBu from '../../../../../assets/RdBu.png'
import PuOr from '../../../../../assets/PuOr.png'
import PRGn from '../../../../../assets/PRGn.png'
import Spectral from '../../../../../assets/Spectral.png'
import BrBG from '../../../../../assets/BrBG.png'
import RdYlGn from '../../../../../assets/RdYlGn.png'
import PiYG from '../../../../../assets/PiYG.png'
import RdGy from '../../../../../assets/RdGy.png'
import RdYlBu from '../../../../../assets/RdYlBu.png'

import { color } from 'd3-color'
import Draggable from 'react-draggable'
import { debounce } from 'lodash'

import { IdType } from '../../../../../models/IdType'
import {
  VisualProperty,
  VisualPropertyValueType,
} from '../../../../../models/VisualStyleModel'
import { ContinuousMappingFunction } from '../../../../../models/VisualStyleModel/VisualMappingFunction'
import { ContinuousFunctionControlPoint } from '../../../../../models/VisualStyleModel/VisualMappingFunction/ContinuousMappingFunction'

import { VisualPropertyValueForm } from '../../VisualPropertyValueForm'
import { useVisualStyleStore } from '../../../../../store/VisualStyleStore'

import { ColorGradient } from './ColorGradient'
import { Handle, addHandle, editHandle, removeHandle } from './Handle'

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

// color mapping form for now
export function ContinuousColorMappingForm(props: {
  currentNetworkId: IdType
  visualProperty: VisualProperty<VisualPropertyValueType>
}): React.ReactElement {
  const m: ContinuousMappingFunction | null = props.visualProperty
    ?.mapping as ContinuousMappingFunction

  if (m == null) {
    return <Box></Box>
  }
  const { min, max, controlPoints } = m

  const [minState, setMinState] = React.useState(min)
  const [maxState, setMaxState] = React.useState(max)
  const [handles, setHandles] = React.useState(() => {
    return [...controlPoints]
      .sort((a, b) => (a.value as number) - (b.value as number))
      .map((pt, index) => {
        return {
          ...pt,
          id: index,
        }
      })
  })

  const [addHandleFormValue, setAddHandleFormValue] = React.useState(0)
  const [addHandleFormVpValue, setAddHandleFormVpValue] = React.useState(
    props.visualProperty.defaultValue,
  )
  const [lastDraggedHandleId, setlastDraggedHandleId] = React.useState<
    number | null
  >(null)

  const [editMinMaxAnchorEl, setEditMinMaxAnchorEl] =
    React.useState<HTMLButtonElement | null>(null)
  const [createHandleAnchorEl, setCreateHandleAnchorEl] =
    React.useState<HTMLButtonElement | null>(null)
  const [createColorPickerAnchorEl, setColorPickerAnchorEl] =
    React.useState<HTMLButtonElement | null>(null)

  const showMinMaxMenu = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setEditMinMaxAnchorEl(event.currentTarget)
  }

  const hideMinMaxMenu = (): void => {
    setEditMinMaxAnchorEl(null)
  }

  const showColorPickerMenu = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setColorPickerAnchorEl(event.currentTarget)
  }

  const hideColorPickerMenu = (): void => {
    setColorPickerAnchorEl(null)
  }


  const showCreateHandleMenu = (
    event: React.MouseEvent<HTMLButtonElement>,
  ): void => {
    setCreateHandleAnchorEl(event.currentTarget)
  }

  const hideCreateHandleMenu = (): void => {
    setCreateHandleAnchorEl(null)
  }
  
  const [isColorBlindChecked, setIsColorBlindChecked] = React.useState(false);

  const handleColorBlindCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setIsColorBlindChecked(event.target.checked);
  };

  const [isReverseColorChecked, setIsReverseColorChecked] = React.useState(false);

  const handleReverseColorCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setIsReverseColorChecked(event.target.checked);
  };


  let minPalette = min.vpValue;
  let middlePalette = controlPoints[1].vpValue;
  let maxPalette = max.vpValue;
  let textPalette = 'None';
 
  const [buttonText, setButtonText] = React.useState(textPalette); 
  const changeButtonText = (text: string) :void => setButtonText(text);

  const handleColorPicker = (): void => {
    if(!isReverseColorChecked){
      console.log("unchecked");
    setMinState({
      ...minState,
      vpValue: minPalette,
    })
    setMaxState({
      ...maxState,
      vpValue: maxPalette,
    })
    setHandle(0, min.value as number, minPalette as string);
    setHandle(1, controlPoints[1].value as number, middlePalette as string);
    setHandle(2, max.value as number, maxPalette as string);
    changeButtonText(textPalette);
    hideColorPickerMenu();
  } else {
    console.log("checked");
    setMinState({
      ...minState,
      vpValue: maxPalette,
    })
    setMaxState({
      ...maxState,
      vpValue: minPalette,
    })
    setHandle(0, min.value as number, maxPalette as string);
    setHandle(1, controlPoints[1].value as number, middlePalette as string);
    setHandle(2, max.value as number, minPalette as string);
    changeButtonText(textPalette);
    hideColorPickerMenu();
  }
  }

  const NUM_GRADIENT_STEPS = 140
  const GRADIENT_STEP_WIDTH = 4
  const GRADIENT_HEIGHT = 100
  const GRADIENT_AXIS_HORIZONTAL_PADDING = 30 // needed to make sure the axis labels are not cut off
  const GRADIENT_AXIS_VERTICAL_PADDING = 100 // needed to display the axis at the bottom of the color gradient
  const GRADIENT_AXIS_OFFSET_LEFT = 10 // needed to make sure the axis labels are not cut off
  const setContinuousMappingValues = useVisualStyleStore(
    (state) => state.setContinuousMappingValues,
  )

  const valueDomain = [
    minState.value as number,
    ...handles.map((h) => h.value as number),
    maxState.value as number,
  ]

  const vpValueDomain = [
    minState.vpValue as string,
    ...handles.map((h) => h.vpValue as string),
    maxState.vpValue as string,
  ]

  // map values to pixels
  const valuePixelScale = scaleLinear({
    range: [0, NUM_GRADIENT_STEPS * GRADIENT_STEP_WIDTH],
    domain: extent(valueDomain) as [number, number],
  })
  

  // map values to colors
  const colorScale = scaleLinear({
    domain: valueDomain,
    range: vpValueDomain,
  })

  const updateContinuousMapping = React.useMemo(
    () =>
      debounce(
        (
          min: ContinuousFunctionControlPoint,
          max: ContinuousFunctionControlPoint,
          handles: Handle[],
        ) => {
          setContinuousMappingValues(
            props.currentNetworkId,
            props.visualProperty.name,
            min,
            max,
            handles.map((h) => {
              return {
                value: h.value,
                vpValue: h.vpValue,
              }
            }),
          )
        },
        200,
        { trailing: true },
      ),
      
    [],
  )

  React.useEffect(() => {
    // if the mapping attribute changegs, recompute the continuous mapping
    // min, max and handles
    const nextMapping = props.visualProperty
      .mapping as ContinuousMappingFunction
    const nextMin = nextMapping.min ?? minState
    const nextMax = nextMapping.max ?? maxState
    const nextControlPoints =
      nextMapping.controlPoints ?? ([] as ContinuousFunctionControlPoint[])

    setMinState(nextMin)
    setMaxState(nextMax)
    setHandles(
      [...nextControlPoints]
        .sort((a, b) => (a.value as number) - (b.value as number))
        .map((pt, index) => {
          return {
            ...pt,
            id: index,
          }
        }),
    )
  }, [props.visualProperty.mapping?.attribute])

  const createHandle = (value: number, vpValue: string): void => {
    const newHandles = addHandle(handles, value, vpValue)
    setHandles(newHandles)
    updateContinuousMapping(min, max, newHandles)
  }

  const deleteHandle = (id: number): void => {
    const newHandles = removeHandle(handles, id)
    setHandles(newHandles)
    updateContinuousMapping(minState, maxState, newHandles)
  }


  const setHandle = (id: number, value: number, vpValue: string): void => {
    const newHandles = editHandle(handles, id, value, vpValue)
    setHandles(newHandles)
    updateContinuousMapping(minState, maxState, newHandles)
  }

  const [colorPalette, setColorPalette] = React.useState("");


  const handleColorPalette = (
    event: React.MouseEvent<HTMLElement>,
    newColorPalette: string | null
  ) : void => {
    if (newColorPalette !== null) {
      setColorPalette(newColorPalette);
    }
  };

  // when someone changes a handle, the new handle values may contain a new min/max value
  // update the min and max accordingly
  React.useEffect(() => {
    const [min, max] = extent(handles.map((h) => h.value as number))
    if (min != null && min < minState.value) {
      setMinState({
        ...minState,
        value: min,
      })
    }

    if (max != null && max > maxState.value) {
      setMaxState({
        ...maxState,
        value: max,
      })
    }
  }, [handles])

  // anytime someone changes the min value, make sure all handle values are greater than the min
  React.useEffect(() => {
    const newHandles = [...handles].map((h) => {
      return {
        ...h,
        value: Math.max(h.value as number, minState.value as number),
      }
    })
    setHandles(newHandles)

    updateContinuousMapping(minState, maxState, handles)
  }, [minState])

  // anytime someone changes the max value, make sure all handle values are less than the max
  React.useEffect(() => {
    const newHandles = [...handles].map((h) => {
      return {
        ...h,
        value: Math.min(h.value as number, maxState.value as number),
      }
    })
    setHandles(newHandles)

    updateContinuousMapping(minState, maxState, handles)
  }, [maxState])

  return (
    
    <Paper sx={{ backgroundColor: '#D9D9D9', pb: 2 }}>
         <Paper
        sx={{
          display: 'flex',
          p: 1,
          m: 1,
          ml: 3,
          mr: 3,
          justifyContent: 'center',
          backgroundColor: '#fcfffc',
          color: '#595858',
        }}
        >
          Current Palette:&ensp;
        <Button
          onClick={showColorPickerMenu}
          variant="outlined"
          sx={{ color: '#63a5e8' }}
          size="small"
          startIcon={<Palette />}
        >
          {buttonText}
        </Button>
        <Popover
          open={createColorPickerAnchorEl != null}
          anchorEl={createColorPickerAnchorEl}
          onClose={hideColorPickerMenu}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
            <Typography align={'center'} sx={{ p: 1 }}>Set Palette</Typography>
        <ToggleButtonGroup
          value={colorPalette}
          onChange={handleColorPalette}
          orientation="horizontal"
          exclusive
          fullWidth={true}
      >
        <ToggleButton value="rdbu" aria-label="RdBu"  onClick={() => {minPalette="#b2182b";middlePalette="#f7f7f7";maxPalette="#2166ac";textPalette='Red-Blue'}}> 
        <Tooltip title="Red-Blue" placement="right">
        <img src={RdBu} width="15" height="150"/>
        </Tooltip>
        </ToggleButton>

        <ToggleButton value="puor" aria-label="PuOr"  onClick={() => {minPalette="#542788";middlePalette="#f7f7f7";maxPalette="#b35806";textPalette='Purple-Orange'}}>
        <Tooltip title="Purple-Orange" placement="right">
        <img src={PuOr} width="15" height="150"/>
        </Tooltip>
        </ToggleButton>

        <ToggleButton value="prgn" aria-label="PRGn" onClick={() => {minPalette="#762a83";middlePalette="#f7f7f7";maxPalette="#1b7837";textPalette='Purple-Red-Green'}}>
        <Tooltip title="Purple-Red-Green" placement="right">
        <img src={PRGn} width="15" height="150"/>
        </Tooltip>
        </ToggleButton>

        {!isColorBlindChecked && (
        <ToggleButton value="spectral" aria-label="Spectral" onClick={() => {minPalette="#d53e4f";middlePalette="#ffffbf";maxPalette="#3288bd";textPalette='Spectral Colors'}} >
        <Tooltip title="Spectral Colors" placement="right">
        <img src={Spectral} width="15" height="150"/>
        </Tooltip>
        </ToggleButton>
        )}

        <ToggleButton value="brbg" aria-label="BrBG" onClick={() => {minPalette="#8c510a";middlePalette="#f5f5f5";maxPalette="#01665e";textPalette='Brown-Blue-Green'}}>
        <Tooltip title="Brown-Blue-Green" placement="right">
        <img src={BrBG} width="15" height="150"/>
        </Tooltip>
        </ToggleButton>
        
        {!isColorBlindChecked && (
        <ToggleButton value="rdylgn" aria-label="RdYlGn" onClick={() => {minPalette="#d73027";middlePalette="#ffffbf";maxPalette="#1a9850";textPalette='Red-Yellow-Green'}}>
        <Tooltip title="Red-Yellow-Green" placement="right">
        <img src={RdYlGn} width="15" height="150"/>
        </Tooltip>
        </ToggleButton>
        )}


        <ToggleButton value="piyg" aria-label="PiYG" onClick={() => {minPalette="#c51b7d";middlePalette="#f7f7f7";maxPalette="#4d9221";textPalette='Magenta-Yellow-Green'}}>
        <Tooltip title="Magenta-Yellow-Green" placement="right">
        <img src={PiYG} width="15" height="150"/>
        </Tooltip>
        </ToggleButton>

        {!isColorBlindChecked && (
        <ToggleButton value="rdgy" aria-label="RdGy" onClick={() => {minPalette="#b2182b";middlePalette="#ffffff";maxPalette="#4d4d4d";textPalette='Red-Grey'}}>
        <Tooltip title="Red-Grey" placement="right">
        <img src={RdGy} width="15" height="150"/>
        </Tooltip>
        </ToggleButton>
        )}


        <ToggleButton value="rdylbu" aria-label="RdYlBu"  onClick={() => {minPalette="#d73027";middlePalette="#ffffbf";maxPalette="#4575b4";textPalette='Red-Yellow-Blue'}}>
        <Tooltip title="Red-Yellow-Blue" placement="right">
        <img src={RdYlBu} width="15" height="150"/>
        </Tooltip>
        </ToggleButton>
      </ToggleButtonGroup>

      <Paper
        sx={{
          display: 'flex',
          p: 1,
          m: 1,
          ml: 3,
          mr: 3,
          justifyContent: 'space-evenly',
          backgroundColor: '#fcfffc',
          color: '#595858',
        }}
      >
    <FormGroup>
      <FormControlLabel control={<Checkbox checked={isReverseColorChecked} onChange={handleReverseColorCheckboxChange}/>} label="reverse colors" />
    </FormGroup>
    <FormGroup>
      <FormControlLabel control={<Checkbox checked={isColorBlindChecked} onChange={handleColorBlindCheckboxChange}/>} label="colorblind-friendly" />
    </FormGroup>
    </Paper>
            <Paper
        sx={{
          display: 'flex',
          p: 1,
          m: 1,
          ml: 3,
          mr: 3,
          justifyContent: 'space-evenly',
          backgroundColor: '#fcfffc',
          color: '#595858',
        }}
      >
           <Button
              variant="outlined"
              onClick={() => {
                handleColorPicker()
              }}
              size="small"
            >
             Ok
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                hideColorPickerMenu()
              }}
              size="small"
            >
             Cancel
            </Button>
                </Paper>

        </Popover>
        </Paper>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          pt: 11.5,
          mb: 3,
          justifyContent: 'center',
        }}
      >
        <Paper
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
            userSelect: 'none',
            pb: 6,
          }}
          elevation={4}
        >
          <Box sx={{ p: 1.5 }}>
            <Tooltip
              title="Click to add new handle"
              placement="top"
              followCursor
            >
              <Paper
                sx={{
                  display: 'flex',
                  position: 'relative',
                  '&:hover': { cursor: 'copy' },
                }}
                onClickCapture={(e) => {
                  const gradientPositionX =
                    e.clientX - e.currentTarget.getBoundingClientRect().x

                  const newHandleValue =
                    valuePixelScale.invert(gradientPositionX)
                  const newHandleVpValue =
                    color(colorScale(newHandleValue))?.formatHex() ?? '#000000'

                  createHandle(newHandleValue, newHandleVpValue)
                }}
              >
                <ColorGradient
                  numSteps={NUM_GRADIENT_STEPS}
                  stepWidth={GRADIENT_STEP_WIDTH}
                  height={GRADIENT_HEIGHT}
                  domainLabel={m.attribute}
                  axisOffsetLeft={GRADIENT_AXIS_OFFSET_LEFT}
                  horizontalPadding={GRADIENT_AXIS_HORIZONTAL_PADDING}
                  verticalPadding={GRADIENT_AXIS_VERTICAL_PADDING}
                  valuePixelScale={valuePixelScale}
                  colorScale={colorScale}
                />
              </Paper>
            </Tooltip>
            {handles.map((h) => {
              return (
                <Draggable
                  key={h.id}
                  bounds="parent"
                  axis="x"
                  handle=".handle"
                  onStart={(e) => {
                    setlastDraggedHandleId(h.id)
                  }}
                  onStop={(e) => {
                    setlastDraggedHandleId(h.id)
                  }}
                  onDrag={(e, data) => {
                    const newValue = valuePixelScale.invert(data.x)
                    setHandle(h.id, newValue, h.vpValue as string)
                  }}
                  position={{
                    x: valuePixelScale(h.value as number),
                    y: 0,
                  }}
                >
                  <Box
                    sx={{
                      width: 2,
                      height: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      position: 'absolute',
                      zIndex: lastDraggedHandleId === h.id ? 3 : 1,
                    }}
                  >
                    <Paper
                      elevation={4}
                      sx={{
                        p: 0.5,
                        position: 'relative',
                        top: -195,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        border: '0.5px solid #03082d',
                        zIndex: lastDraggedHandleId === h.id ? 3 : 1,
                      }}
                    >
                      <IconButton
                        sx={{ position: 'absolute', top: -20, right: -16 }}
                        onClick={() => {
                          deleteHandle(h.id)
                        }}
                      >
                        <Delete sx={{ color: '#03082d' }} />
                      </IconButton>

                      <VisualPropertyValueForm
                        currentValue={h.vpValue ?? null}
                        visualProperty={props.visualProperty}
                        onValueChange={(newValue) => {
                          setHandle(h.id, h.value as number, newValue as string)
                        }}
                      />
                      <TextField
                        sx={{ width: 50, mt: 1 }}
                        inputProps={{
                          sx: { p: 0.5, fontSize: 14, width: 50 },
                          inputMode: 'numeric',
                          pattern: '[0-9]*',
                          step: 0.1,
                        }}
                        onChange={(e) => {
                          const newVal = Number(e.target.value)

                          if (!isNaN(newVal)) {
                            setHandle(h.id, newVal, h.vpValue as string)
                          }
                        }}
                        value={h.value as number}
                      />
                    </Paper>
                    <IconButton
                      className="handle"
                      size="large"
                      sx={{
                        position: 'relative',
                        top: -220,
                        '&:hover': { cursor: 'col-resize' },
                      }}
                    >
                      <ArrowDropDownIcon
                        sx={{ fontSize: '40px', color: '#03082d', zIndex: 3 }}
                      />
                    </IconButton>
                  </Box>
                </Draggable>
              )
            })}
          </Box>
        </Paper>
      </Box>
   
      <Paper
        sx={{
          display: 'flex',
          p: 1,
          m: 1,
          ml: 3,
          mr: 3,
          justifyContent: 'space-evenly',
          backgroundColor: '#fcfffc',
          color: '#595858',
        }}
      >
 

        <Button
          onClick={showCreateHandleMenu}
          variant="outlined"
          sx={{ color: '#63a5e8' }}
          size="small"
          startIcon={<AddCircleIcon />}
        >
          New Handle
        </Button>
        <Popover
          open={createHandleAnchorEl != null}
          anchorEl={createHandleAnchorEl}
          onClose={hideCreateHandleMenu}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <Box
            sx={{
              p: 1,
              display: 'flex',
              flexDirection: 'column',
              width: 180,
            }}
          >
            <Box sx={{ p: 1, display: 'flex', flexDirection: 'column' }}>
              <TextField
                sx={{ mb: 1 }}
                variant="outlined"
                size="small"
                label={m.attribute}
                inputProps={{
                  inputMode: 'numeric',
                  pattern: '[0-9]*',
                  step: 0.1,
                }}
                onChange={(e) => {
                  const newValue = Number(e.target.value)
                  if (!isNaN(newValue)) {
                    setAddHandleFormValue(newValue)
                  }
                }}
                value={addHandleFormValue}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">
                  {props.visualProperty.displayName}
                </Typography>
              </Box>
              <VisualPropertyValueForm
                currentValue={addHandleFormVpValue}
                visualProperty={props.visualProperty}
                onValueChange={(newValue) => {
                  setAddHandleFormVpValue(newValue as string)
                }}
              />
            </Box>
            <Button
              variant="outlined"
              onClick={() => {
                createHandle(addHandleFormValue, addHandleFormVpValue as string)
                hideCreateHandleMenu()
              }}
              size="small"
            >
              Add Handle
            </Button>
          </Box>
        </Popover>
        <Button
          onClick={showMinMaxMenu}
          sx={{ color: '#63a5e8' }}
          variant="outlined"
          size="small"
          startIcon={<EditIcon />}
        >
          Set Min and Max
        </Button>
        <Popover
          open={editMinMaxAnchorEl != null}
          onClose={hideMinMaxMenu}
          anchorEl={editMinMaxAnchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <Box sx={{ p: 1 }}>
            <Box>
              <Typography variant="body1">{m.attribute}</Typography>

              <Box sx={{ p: 1, display: 'flex', flexDirection: 'column' }}>
                <TextField
                  sx={{ mb: 1 }}
                  variant="outlined"
                  size="small"
                  label="Min"
                  inputProps={{
                    inputMode: 'numeric',
                    pattern: '[0-9]*',
                    step: 0.1,
                  }}
                  onChange={(e) => {
                    const newValue = Number(e.target.value)
                    if (!isNaN(newValue)) {
                      setMinState({
                        ...minState,
                        value: newValue,
                      })
                    }
                  }}
                  value={minState.value}
                />
                <TextField
                  value={maxState.value}
                  variant="outlined"
                  size="small"
                  label="Max"
                  inputProps={{
                    inputMode: 'numeric',
                    pattern: '[0-9]*',
                    step: 0.1,
                  }}
                  onChange={(e) => {
                    const newValue = Number(e.target.value)
                    if (!isNaN(newValue)) {
                      setMaxState({
                        ...maxState,
                        value: newValue,
                      })
                    }
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Popover>
      </Paper>
    </Paper>
  )
}
