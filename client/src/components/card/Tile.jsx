import React from 'react'
import { Box } from '@mui/material'

export const Tile = ({ width, height, backgroundColor, children, sx, flex }) => {
  return (
    <Box
      backgroundColor={backgroundColor ? backgroundColor : '#FFF'}
      width={width}
      height={height}
      borderRadius={2}
      sx={{ overflow: 'auto' }}
      padding={'20px'}
      flex={flex}
    >
      {children}
    </Box>
  )
}