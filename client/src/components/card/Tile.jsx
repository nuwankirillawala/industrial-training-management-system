import React from 'react'
import {Stack,Box} from '@mui/material'


export const Tile = (width,hieght) => {
  return (
    <Stack>
        <Box borderRadius={2} backgroundColor={'#EAF0FF'} width={width} height={hieght}>

        </Box>
    </Stack>
  )
}
