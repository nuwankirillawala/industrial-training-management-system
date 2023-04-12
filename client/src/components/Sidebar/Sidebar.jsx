import * as React from 'react';
import { AppBar, Box, IconButton, ListItemButton, ListItemIcon, Stack, Toolbar } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Unilogo } from '../shared/Images/Unilogo';
import { Grid } from '@mui/material';
import { useState } from 'react';
import { Apartment, ArrowBack, Article, Assessment, Ballot, ChevronLeft, Dashboard, LocationCity, Logout, Menu, Notifications, Settings } from '@mui/icons-material';
import styled from '@emotion/styled';

const drawerWidth = 223;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

// const DrawerHeader = styled('div')(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   padding: theme.spacing(0, 1),
//   ...theme.mixins.toolbar,
//   justifyContent: 'flex-end',
// }));

const buttonStyles = {
  height:35,
  textAlign: 'flex-start',
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
      {
        id: 1,
        primaryText: 'Dashboard',
        icon: <Dashboard fontSize='large' />
      },
      {
        id: 2,
        primaryText: 'CV',
        icon: <Article fontSize='large' />
      },
      {
        id: 3,
        primaryText: 'Daily Report',
        icon: <Assessment fontSize='large' />,
      },
      {
        id: 4,
        primaryText: 'Company',
        icon: <Apartment fontSize='large' />
      },
      {
        id: 5,
        primaryText: 'Notice',
        icon: <Notifications fontSize='large' />
      }
    ]
  },
  {
    name: 'CV',
    items: [
      {
        id: 1,
        primaryText: 'Dashboard',
        icon: <Dashboard fontSize='large' />
      },
      {
        id: 2,
        primaryText: 'CV',
        icon: <Article fontSize='large' />
      },
      {
        id: 3,
        primaryText: 'Company Choice',
        icon: <LocationCity fontSize='large' />
      },
      {
        id: 4,
        primaryText: 'Daily Report',
        icon: <Assessment fontSize='large' />
      },
      {
        id: 5,
        primaryText: 'Notice',
        icon: <Notifications fontSize='large' />
      }
    ]
  },
  {
    name: 'Student',
    items: [
      {
        id: 1,
        primaryText: 'Dashboard',
        icon: <Dashboard fontSize='large' />
      },
      {
        id: 2,
        primaryText: 'Intern Application',
        icon: <Ballot fontSize='large' />
      },
      {
        id: 3,
        primaryText: 'Comapany Choice',
        icon: <LocationCity fontSize='large' />
      },
      {
        id: 4,
        primaryText: 'Daily Report',
        icon: <Assessment fontSize='large' />
      },
      {
        id: 5,
        primaryText: 'Notice',
        icon: <Notifications fontSize='large' />
      }
    ]
  }
];

const controlItems = [
  {
    id: 1,
    label: 'Settings',
    icon: <Settings fontSize='large'/>
  },
  {
    id: 2,
    label: 'Back',
    icon: < ArrowBack fontSize='large'/>
  },
  {
    id: 3,
    label: 'Log out',
    icon: <Logout fontSize='large'/>
  }
];

export default function Sidebar() {

  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [currentUser, setCurrentUser] = useState(users[2]);
  
  const handleUserChange = (user) => {
    setCurrentUser(user);
  };

  return (
    <Box sx={{ display: 'flex'}}>
      <CssBaseline />

      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            onClick={ handleDrawerOpen }
            edge='start'
            // sx={{ mr: 0, ...(open && { display: 'none' }) }}
          >
            <Menu />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          textAlign: 'center',        
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: '#4665d2',
            color: '#f4f6fc',            
          },
        }}
        
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={ handleDrawerClose }>
            <ChevronLeft />
          </IconButton>
        </DrawerHeader>
        <Grid container justifyContent="center">
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
        
        <Stack sx={{position:'relative', top:100}}>
          
          {users.map((user) => (            
            <ListItem key={user.name} disablePadding >
            </ListItem>              
          ))}
          {currentUser.items.map((item) => (
            <ListItemButton key={item.id} sx={buttonStyles}>
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.primaryText} />              
            </ListItemButton>
          ))}

        </Stack>       
        
        <Stack sx={{position:'relative', top:200}}>
          {controlItems.map((controlItem) => (
            // <ListItem key={text} disablePadding>              
                <ListItemButton
                  key={controlItem.id}
                  sx={buttonStyles}>
                    <ListItemIcon>
                      {controlItem.icon}
                    </ListItemIcon>
                  <ListItemText primary={controlItem.label} />
                </ListItemButton>                
              // </ListItem>
            ))}       
        </Stack>        

      </Drawer>

      <Main open={open}>
        <DrawerHeader />
          <Typography >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien faucibus et molestie ac.
          </Typography>
      </Main>
      
    </Box>
  );

}