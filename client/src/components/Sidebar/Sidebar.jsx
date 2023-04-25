import * as React from 'react';
import { Box, Hidden, IconButton, List, ListItemButton, ListItemIcon, Stack, Toolbar, useTheme } from '@mui/material';
// import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Unilogo } from '../shared/Images/Unilogo';
import { Grid } from '@mui/material';
import { useState } from 'react';
import { Apartment, ArrowBack, Article, Assessment, Ballot, ChevronLeft, Dashboard, LocationCity, Logout, Margin, Menu, Notifications, NotificationsNone, Settings } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import MuiDrawer from '@mui/material/Drawer';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(6)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== 'open',
// })(({ theme, open }) => ({
//   transition: theme.transitions.create(['margin', 'width'], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen
//   }),
//   ...(open && {
//     width: `calc(100% - ${drawerWidth}px)`,
//     marginLeft: `${drawerWidth}px`,
//     transition: theme.transitions.create(['margin', 'width'], {
//       easing: theme.transitions.easing.easeOut,
//       duration: theme.transitions.duration.enteringScreen
//     })
//   })
// }));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const buttonStyles = {
  height:40,
  textAlign: 'flex-start',
  '&:hover': {
      bgcolor: '#f4f6fc',
      color: 'black'
  },
};

const buttonIconStyles ={
  '&:hover': {
    bgcolor: 'white',
    color: 'black'
  }
}

const users = [
  {
    name: 'Company',
    items: [
      {
        id: 1,
        primaryText: 'Dashboard',
        icon: <Dashboard /*fontSize='large'*/ />,
        element: '/admin-dashboard'
      },
      {
        id: 2,
        primaryText: 'CV',
        icon: <Article /*fontSize='large'*/ />,
        element: '/student-cvupdate'
      },
      {
        id: 3,
        primaryText: 'Daily Report',
        icon: <Assessment /*fontSize='large'*/ />,
        element: '/daily-report'
      },
      {
        id: 4,
        primaryText: 'Company',
        icon: <Apartment /*fontSize='large'*/ />,
        element: '/add-company'
      },
      {
        id: 5,
        primaryText: 'Notice',
        icon: <Notifications /*fontSize='large'*/ />,
        element: '/notice'
      }
    ]
  },
  {
    name: 'CV',
    items: [
      {
        id: 1,
        primaryText: 'Dashboard',
        icon: <Dashboard /*fontSize='large'*/ />,
        element: 'admin-dashboard'
      },
      {
        id: 2,
        primaryText: 'CV',
        icon: <Article /*fontSize='large'*/ />,
        element: '/student-cvupdate'
      },
      {
        id: 3,
        primaryText: 'Company',
        icon: <LocationCity /*fontSize='large'*/ />,
        element: '/add-company'
      },
      {
        id: 4,
        primaryText: 'Daily Report',
        icon: <Assessment /*fontSize='large'*/ />,
        element: '/daily-report'
      },
      {
        id: 5,
        primaryText: 'Notice',
        icon: <Notifications /*fontSize='large'*/ />,
        element: '/notice'
      }
    ]
  },
  {
    name: 'Student',
    items: [
      {
        id: 1,
        primaryText: 'Dashboard',
        icon: <Dashboard /*fontSize='large'*/ />,
        element: '/student-dashboard'
      },
      {
        id: 2,
        primaryText: 'Intern Application',
        icon: <Ballot /*fontSize='large'*/ />,
        element: '/intern-process-student'
      },
      {
        id: 3,
        primaryText: 'Comapany',
        icon: <LocationCity /*fontSize='large'*/ />,
        element: '/student-company'
      },
      {
        id: 4,
        primaryText: 'Daily Report',
        icon: <Assessment /*fontSize='small'*/ />,
        element: '/daily-report-list'
      },
      {
        id: 5,
        primaryText: 'Notice',
        icon: <Notifications /*fontSize='samll'*/ />,
        element: '/notice'
      }
    ]
  }
];

const controlItems = [
  {
    id: 1,
    label: 'Settings',
    icon: <Settings /*fontSize='samll'*//>,
    page : "/student-settings"
  },
  {
    id: 2,
    label: 'Back',
    icon: < ArrowBack /*fontSize='small'*//>,
    page : 'back'
  },
  {
    id: 3,
    label: 'Log out',
    icon: <Logout /*fontSize='small'*//>,
    page : '/login'
  }
];

export default function Sidebar() {

  const theme = useTheme();
  const navigate = useNavigate();

  const handleControlItem = (page) => {
    if(page==='back'){
      window.history.back()
    }
    else{
      navigate(page);
    }
  }

  // const handleControlItems = (path) => {
  //   history.push(path);
  // }

  // const theme = createTheme({
  //   palette: {
  //     secondary: {
  //       main: '#ff3d00',  //#b80000
  //     },
  //     new: {
  //       main: '#eeeeee',  //#b80000
  //     },
  //   },
  // });

  const [open, setOpen] = useState(true);

  // const handleDrawerOpen = () => {
  //   setOpen(true);
  // };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [currentUser, setCurrentUser] = useState(users[0]);
  
  const handleCurrentUserItem = (user, element) => {
    setCurrentUser(user);
    navigate(element);
  };

  return (
    <Box sx={{ display: 'flex'}}>
      <CssBaseline />

      {/* <ThemeProvider theme={theme}>
        <AppBar
          position="fixed"
          elevation={0}
          sx={{
            bgcolor: '#4665d2',
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
          open={open}
          >
          <Toolbar >
            <IconButton
              onClick={ handleDrawerOpen }
              edge='start'
              sx={{ ...(open && { display: 'none' }) }}
            >
              <Menu />
            </IconButton>
            <Typography variant="body1" component="div" sx={{ flexGrow: 1, paddingLeft: '35px' }}>
              <li key={products.id}> {Page}</li> 
              {Page}
            </Typography>
            <Stack direction="row">
              <IconButton color={isNotifications ? 'secondary' : 'new'} >
                {isNotifications ? <NotificationsNone fontSize="large" /> : <NotificationsNone fontSize="large" />}
              </IconButton>
              <IconButton>
                <img src={Image} style={{ height: '40px', marginRight: '10px' }} />
              </IconButton>
              <Stack justifyContent={'center'}>
                <Typography variant="body1" sx={{ padding: "8px" }} >
                  {Name}
                </Typography>
              </Stack>
            </Stack>

          </Toolbar>
        </AppBar>
      </ThemeProvider> */}

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
        
        variant="permanent"
        anchor="left"
        open={open}
      >
        <Box>
          {open ? (
              <Box display={'flex'} justifyContent={open ? 'flex-end' : 'space-between'}>
                <DrawerHeader>
                  <IconButton onClick={ toggleDrawer }>
                    <ChevronLeft />
                  </IconButton>
                </DrawerHeader>
              </Box>
            ) : (
              <Box display={'flex'} justifyContent={'center'}>
                <DrawerHeader>
                  <IconButton onClick={ toggleDrawer }>
                    <Menu />
                  </IconButton>
                </DrawerHeader>
              </Box>
            )
          }
        </Box>
        
        <Stack position={'relative'} top={0}>
          <Grid container justifyContent="center">
            <Unilogo width='50px' height='100px'/>
          </Grid>

          <Typography
            variant={'h6'}
            fontWeight={'bold'}
            letterSpacing={5}
            sx={{
              position:'relative',
              top:5,
              lineHeight:1.2
            }}>
            ITMS
          </Typography>
        </Stack>
        
        <Stack sx={{position:'relative', top:50}}>
          {users.map((user) => (            
            <ListItem key={user.name} disablePadding >
            </ListItem>              
          ))}
          {currentUser.items.map((item) => (
            <ListItemButton key={item.id} sx={buttonStyles} onClick={() => handleCurrentUserItem(currentUser, item.element)}>
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.primaryText} />              
            </ListItemButton>
          ))}
        </Stack>
        
        <Stack sx={{position:'relative', top:100}}>
          {controlItems.map((controlItem) => (
            // <ListItem key={text} disablePadding>              
                <ListItemButton
                  key={controlItem.id}
                  sx={buttonStyles}
                  onClick={() => handleControlItem(controlItem.page)}
                  >
                    <ListItemIcon>
                      {controlItem.icon}
                    </ListItemIcon>
                  <ListItemText primary={controlItem.label} />
                </ListItemButton>                
              // </ListItem>
            ))}
        </Stack>        

      </Drawer>

      {/* <Main open={open} /> */}
      
    </Box>
  );

}

/*In general, you should use AppBar if you want a standard navigation bar
 with Material-UI styles, and use Toolbar if you want more control over 
 the layout and content of your navigation bar.*/

/* if u export default => import Name
if u export without default => import {Name}   */