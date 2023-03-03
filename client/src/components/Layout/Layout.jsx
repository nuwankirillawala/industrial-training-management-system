import React from 'react'
import { Box } from '@mui/material'
import Navbar from '../Navbar/Navbar'
import Sidebar from '../Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'

export const Layout = () => {
  return (
    <Box sx={{display: 'flex', gap: '10px', width: '100%'}}>
      <Box sx={{flex: 'initial'}}>
        <Sidebar/>
      </Box>
      <Box sx={{display: 'flex', gap: '10px', flexDirection: 'column', flex: 'auto'}}>
        <Navbar/>
        <Outlet/>
      </Box>
    </Box>    
  )
}