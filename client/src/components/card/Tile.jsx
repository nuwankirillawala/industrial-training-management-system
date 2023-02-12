import React from 'react'
import { Box } from '@mui/material'

export const Tile = ({width,height,children,sx}) => {
  return (
    <Box backgroundColor={'#EAF0FF'} width={width} heigth={height} borderRadius={2} sx={sx}>
      {children}
    </Box>
  )
}