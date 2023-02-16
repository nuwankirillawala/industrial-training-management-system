import React from 'react'
import { Stack,Box,Toolbar } from '@mui/material'
import Navbar from '../../Navbar/Navbar'
import Sidebar from '../../Sidebar/Sidebar'

export const BasicCard = ({children}) => {
  return (
    <Stack direction={'row'}>
        <Stack>
            <Sidebar/>
        </Stack>
        <Stack padding={'2px'}>
                <Navbar/>
                <Toolbar/>
                <Box component="main" sx={{ flexGrow: 1 }}>
                    {children}
                </Box>
        </Stack>
    </Stack>
  )
}
