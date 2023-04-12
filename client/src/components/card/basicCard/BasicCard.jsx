import React from 'react'
import { Box } from '@mui/material'
import Navbar from '../../Navbar/Navbar'
import Sidebar from '../../Sidebar & Navbar/Sidebar & Navbar'
// import { Tile } from '../Tile'

export const BasicCard = ({children}) => {
  return (
    <Box sx={{display: 'flex', gap: '10px', width: '100%'}}>
      <Box sx={{flex: 'initial'}}>
        <Sidebar/>
      </Box>
      <Box sx={{display: 'flex', gap: '10px', flexDirection: 'column', flex: 'auto'}}>
        <Navbar/>
        {/* componets here */}
      </Box>
    </Box>    
  )
}
