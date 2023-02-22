import * as React from 'react';
import { Box , List, ListItemButton, Stack } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Unilogo } from '../shared/Images/Unilogo';
import { Grid } from '@mui/material';
import { useState } from 'react';

const drawerWidth = 180;

const buttonStyles = {
  height:35,
  textAlign: 'center',
  '&:hover': {
      bgcolor: '#f4f6fc',
      color: 'black'
  },
  borderRadius:'10px 10px 10px 10px',
};

const users = [
  {
    name: 'Company',
    items: [
      {primaryText: 'Dashboard'},
      {primaryText: 'CV'},
      {primaryText: 'Daily Report'}, 
      {primaryText: 'Company'},
      {primaryText: 'Notice'}
    ]
  },
  {
    name: 'CV',
    items: [
      {primaryText: 'Dashboard'},
      {primaryText: 'CV'},
      {primaryText: 'Company Choice'},
      {primaryText: 'Daily Report'},
      {primaryText: 'Notice'}
    ]
  },
  {
    name: 'Student',
    items: [
      {primaryText: 'Dashboard'},
      {primaryText: 'Intern Application'},
      {primaryText: 'Comapany Choice'},
      {primaryText: 'Daily Report'},
      {primaryText: 'Notice'}
    ]
  }
];

export default function Sidebar() {

  // const menuItems = ['Dashboard', 'CV', 'Daily Report', 'Company', 'Notice'];
  const controlItems = ['Settings', 'Back', 'Logout']

    const [currentUser, setCurrentUser] = useState(users[0]);
  
    const handleUserChange = (user) => {
      setCurrentUser(user);
    };

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
        
        <Stack sx={{position:'relative', top:150}}>
          
          {users.map((user) => (            
            <ListItem key={user.name} disablePadding >
                      {/* <ListItemButton key={user.name} onClick={() => handleUserChange(user)}
                        sx={buttonStyles}>                  
                        <ListItemText primary={user.name} />
                      </ListItemButton> */}
                      {/* {currentUser.items.map((item) => (
                        <ListItemButton key={item.primaryText} sx={buttonStyles}>
                          <ListItemText primary={item.primaryText} />
                        </ListItemButton>
                      ))} */}
            </ListItem>
              
          ))}
          {currentUser.items.map((item) => (
            <ListItemButton key={item.primaryText} sx={buttonStyles}>
              <ListItemText primary={item.primaryText} />
            </ListItemButton>
          ))}

        </Stack>       
        
        <Stack sx={{position:'relative', top:250}}>
          {controlItems.map((text, index) => (
            <ListItem key={text} disablePadding>              
                <ListItemButton
                  sx={buttonStyles}>                 
                  <ListItemText primary={text} />
                </ListItemButton>                
              </ListItem>
            ))}       
        </Stack>        

      </Drawer>
      
    </Box>
  );

}
