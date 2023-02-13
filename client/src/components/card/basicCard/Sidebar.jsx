import * as React from 'react';
import { Box,Button,Toolbar } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Unilogo } from '../../Unilogo'


const drawerWidth = 200;

export const Sidebar = () => {
  return (
    <Box sx={{ display: 'flex'}}>
      <Drawer
        sx={{
          width: drawerWidth,
          
          backgroundColor:'#4665D2',
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"

      >
        <Unilogo width={'50px'} height={'100px'}/>
        <Typography variant='h6' fontWeight={'bold'} color={'#4665D2'} fontStyle={'inter'}>I T M S</Typography>
        <Toolbar/>
        <Divider></Divider>
        <Toolbar/>

        <Button variant={'contained'}>Create USer</Button>
      </Drawer>

    </Box>
  );
}
