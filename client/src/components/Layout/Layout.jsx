import React from 'react'
import { Box, Toolbar } from '@mui/material'
import Navbar from '../Navbar/Navbar'
import Sidebar from '../Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'

const drawerWidth = 180;

export const Layout = () => {
  return (
    <Box sx={{display: 'flex', gap: '10px', width: '100%'}}>
      <Box sx={{flex: 'initial'}}>
        <Sidebar/>
      </Box>
      <Box sx={{ gap: '10px', flexDirection: 'column', flex: 'auto'}}>
        <Box sx={{mb: '10px'}}>
          <Navbar/>
        </Box>
        <Box
          component='main'
          sx={{overflow: 'hidden'}}
        >
          <Toolbar/>
          <Outlet/>
        </Box>
      </Box>
    </Box>    
  )
}