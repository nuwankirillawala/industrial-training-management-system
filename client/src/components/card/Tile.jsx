import React from 'react'
import { Box } from '@mui/material'

export const Tile = ({width,height,children,sx}) => {
  return (
    <Box backgroundColor={'#EAF0FF'} width={width} height={height} borderRadius={2} sx={{overflow: 'auto'}} padding={'10px 20px 10px 20px'}>
      {children}
      {/* {console.log(sx)} */}
    </Box>
  )
}