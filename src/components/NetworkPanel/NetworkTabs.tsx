import { Box, Container, Tab, Tabs } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { NetworkView } from '../../models/ViewModel'
import { Renderer } from '../../models/RendererModel/Renderer'
import { NetworkTab } from './NetworkTab'
import { Network } from '../../models/NetworkModel'

interface NetworkTabsProps {
  network: Network
  views: NetworkView[]
  renderers: Record<string, Renderer>
  isActive: boolean
  bgColor?: string
  handleClick?: () => void
}

export const NetworkTabs = ({
  network,
  renderers,
  isActive,
  bgColor,
  handleClick,
}: NetworkTabsProps) => {
  const [selected, setSelected] = useState<number>(0)

  const boxRef = useRef<HTMLDivElement>(null)
  const [boxSize, setBoxSize] = useState<{ w: number; h: number }>({
    w: 0,
    h: 0,
  })

  useEffect(() => {
    const boxElement = boxRef.current
    if (boxElement) {
      window.requestAnimationFrame(() => {
        const rect = boxElement.getBoundingClientRect()
        // console.log(`box Width: ${rect.width}, box Height: ${rect.height}`)
        if (rect.width !== 0 && rect.height !== 0) {
          setBoxSize({ w: rect.width, h: rect.height })
        }
      })
    }
  }, [])

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelected(newValue)
  }

  console.log('##########box size:::', boxSize)

  const rendererList = Object.values(renderers)
  return (
    <Container
      disableGutters={true}
      sx={{
        width: '100%',
        height: '100%',
        bgcolor: 'background.paper',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Tabs value={selected} onChange={handleChange}>
        {rendererList.map((renderer: Renderer, index: number) => {
          return <Tab key={index} label={renderer.name} />
        })}
      </Tabs>

      <Box ref={boxRef} sx={{ flexGrow: 1, width: '100%' }}>
        {rendererList.map((renderer: Renderer, index: number) => {
          return (
            <NetworkTab
              key={index}
              network={network}
              renderer={renderer}
              isActive={isActive}
              bgColor={bgColor}
              handleClick={handleClick}
              selected={index === selected}
              boxSize={boxSize}
            />
          )
        })}
      </Box>

      {/* <Box sx={{ flexGrow: 1, width: '100%' }}>
        {rendererList.map((renderer: Renderer, index: number) => {
          return (
            index === selected && (
              <NetworkTab
                key={index}
                network={network}
                renderer={renderer}
                isActive={isActive}
                bgColor={bgColor}
                handleClick={handleClick}
              />
            )
          )
        })}
      </Box> */}
    </Container>
  )
}
