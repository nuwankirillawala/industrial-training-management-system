import * as React from 'react';
import { Box , ListItemButton, Stack } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Unilogo } from '../shared/Images/Unilogo';
import { Grid } from '@mui/material';
// import { Padding } from '@mui/icons-material';
// import { styled } from '@mui/system';
// import { alignProperty } from '@mui/material/styles/cssUtils';

const drawerWidth = 180;
// const listItemButtonWidth = 145;

// const listItemButtonWidth = styled(ListItemButton)({
//   width: 150,
// });

export default function Sidebar() {

  const menuItems = ['Dashboard', 'CV', 'Daily Report', 'Company', 'Notice'];

   return (
    <Box sx={{ display: 'flex'}}>
      <CssBaseline />
      
      <Drawer
        sx={{
          textAlign: 'center',        
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: '#4665d2',
            borderRadius: '0px 20px 20px 0px',
            color: '#f4f6fc',            
          },
          // alignContent:'center',
          // alignItems:'center',
          // justifyContent:'center',
          // justifyItems:'center'
        }}
        
        variant="permanent"
        anchor="left">
        
        <Grid container /*direction={'row'}*/ justifyContent="center">
          <Stack sx={{ position:'relative', top:20 }}>
            <Unilogo width='50px' height='100px'/>
          </Stack>
        </Grid>
        

        <Stack>
          <Typography
            variant={'h6'}
            fontWeight={'bold'}
            letterSpacing={5}
            sx={{
              position:'relative',
              top:30,
              lineHeight:1.2
            }}>
            ITMS
          </Typography>
        </Stack>
        
        <Stack sx={{position:'relative', top:150, alignItems:'center' ,justifyContent:'center'}} style={{ alignContent:'center', justifyContent:'center'}}>
          {menuItems.map((text, index) => (
            <ListItem key={text} disablePadding >
            <Grid /*container*/ justifyContent="center"  />
              <Box sx={{ width:10, alignItems:'center' ,justifyContent:'center' }}/>
                <ListItemButton
                  sx={{
                    height: 35,
                    // width: 10,
                    textAlign:'center',                  
                    '&:hover': {
                        bgcolor: '#f4f6fc',
                        color: 'black'
                      },
                    borderRadius:'10px 10px 10px 10px',
                    // Padding:'0px 10px 0px 10px'
                    // width:10                    
                  }}>                  
                  <ListItemText primary={text} />
                </ListItemButton>
            </ListItem>
          ))}
        </Stack>       
        
        <Stack sx={{position:'relative', top:250}}>
          {['Settings', 'Back', 'Logout'].map((text, index) => (
            <ListItem key={text} disablePadding>                
                <ListItemButton
                  sx={{
                    height: 35,
                    textAlign:'center',                    
                    '&:hover': {
                      bgcolor: '#f4f6fc',
                      color: 'black'
                    },
                    borderRadius:'0px 10px 10px 0px'
                  }}>                 
                  <ListItemText primary={text} />
                </ListItemButton>                
              </ListItem>
            ))}        
        </Stack>        

      </Drawer>
      
    </Box>
  );
}