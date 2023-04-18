import * as React from 'react';
import { Box, IconButton, ListItemButton, ListItemIcon, Stack, Toolbar } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Unilogo } from '../shared/Images/Unilogo';
import { Grid } from '@mui/material';
import { useState } from 'react';
import { Apartment, ArrowBack, Article, Assessment, Ballot, ChevronLeft, Dashboard, LocationCity, Logout, Menu, Notifications, NotificationsNone, Settings } from '@mui/icons-material';
//import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';  //its more red
import styled from '@emotion/styled';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import { grey } from '@mui/material/colors';
import Notice from '../shared/Notice/Notice';
import { StudentDashboard } from '../../Pages/Undergraduate/StudentDashboard';
// import { useHistory } from 'react-router-dom';
import { Login } from '../Login/Login';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
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

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

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

const users = [
  {
    name: 'Company',
    items: [
      {
        id: 1,
        primaryText: 'Dashboard',
        icon: <Dashboard /*fontSize='large'*/ />,
        onClick: () => {
          //grger
        }
      },
      {
        id: 2,
        primaryText: 'CV',
        icon: <Article /*fontSize='large'*/ />,
        onClick: () => {
          //
        }
      },
      {
        id: 3,
        primaryText: 'Daily Report',
        icon: <Assessment /*fontSize='large'*/ />,
        onClick: () => {
          //
        }
      },
      {
        id: 4,
        primaryText: 'Company',
        icon: <Apartment /*fontSize='large'*/ />,
        onClick: () => {
          //
        }
      },
      {
        id: 5,
        primaryText: 'Notice',
        icon: <Notifications /*fontSize='large'*/ />,
        onClick: () => {
          <Notice />
        }
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
        onClick: () => {
          //
        }
      },
      {
        id: 2,
        primaryText: 'CV',
        icon: <Article /*fontSize='large'*/ />,
        onClick: () => {
          //
        }
      },
      {
        id: 3,
        primaryText: 'Company',
        icon: <LocationCity /*fontSize='large'*/ />,
        onClick: () => {
          //
        }
      },
      {
        id: 4,
        primaryText: 'Daily Report',
        icon: <Assessment /*fontSize='large'*/ />,
        onClick: () => {
          //
        }
      },
      {
        id: 5,
        primaryText: 'Notice',
        icon: <Notifications /*fontSize='large'*/ />,
        onClick: () => {
          <Notice />
        }
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
        onClick: () => {
          //
        }
      },
      {
        id: 2,
        primaryText: 'Intern Application',
        icon: <Ballot /*fontSize='large'*/ />,
        onClick: () => {
          //
        }
      },
      {
        id: 3,
        primaryText: 'Comapany',
        icon: <LocationCity /*fontSize='large'*/ />,
        onClick: () => {
          //
        }
      },
      {
        id: 4,
        primaryText: 'Daily Report',
        icon: <Assessment /*fontSize='small'*/ />,
        onClick: () => {
          //
        }
      },
      {
        id: 5,
        primaryText: 'Notice',
        icon: <Notifications /*fontSize='samll'*/ />,
        onClick: () => {
          <Notice />
        }
      }
    ]
  }
];

const controlItems = [
  {
    id: 1,
    label: 'Settings',
    icon: <Settings /*fontSize='samll'*//>,
    // path: 
  },
  {
    id: 2,
    label: 'Back',
    icon: < ArrowBack /*fontSize='small'*//>,
  },
  {
    id: 3,
    label: 'Log out',
    icon: <Logout /*fontSize='small'*//>,
    path: './Pages/Shared/Login/Login'
  }
];

export default function Sidebar() {

  const [Page, setPage] = useState('Dashboard');
  const [Name, setName] = useState('Gavesh');
  const [Image, setImage] = useState('');
  const [isNotifications, setisNotifications] = useState(true);

  // useEffect(() => {      /*next define usestate to a button and work ahead*/
  //   fetch('G:\test\test\client\src\dummylogin.json')
  //     .then(response => response.json())
  //     .then(data => setPage(data.Page))   //setName, setImage
  //     .catch(error => console.error(error));
  // }, []);
  //sx={{ width: `calc(100% - ${200}px)`}
  
  // const history = useHistory();

  // const handleControlItems = (path) => {
  //   history.push(path);
  // }

  const theme = createTheme({
    palette: {
      secondary: {
        main: '#ff3d00',  //#b80000
      },
      new: {
        main: '#eeeeee',  //#b80000
      },
    },
  });

  const [open, setOpen] = useState(true);

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

      <ThemeProvider theme={theme}>
        <AppBar
          position="fixed"
          // elevation={0}
          sx={{
            bgcolor: '#4665d2',
            // width: { sm: `calc(100% - ${drawerWidth}px)` },
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
              {/* <li key={products.id}> {Page}</li>  */}
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
      </ThemeProvider>

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
        
        <Stack position={'relative'} bottom={20}>
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
        
        <Stack sx={{position:'relative', top:20}}>
          {users.map((user) => (            
            <ListItem key={user.name} disablePadding >
            </ListItem>              
          ))}
          {currentUser.items.map((item) => (
            <ListItemButton key={item.id} sx={buttonStyles} onClick={item.onClick}>
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
                  sx={buttonStyles} /*onClick={() => handleControlItems(item.path)}*/>
                    <ListItemIcon>
                      {controlItem.icon}
                    </ListItemIcon>
                  <ListItemText primary={controlItem.label} />
                </ListItemButton>                
              // </ListItem>
            ))}       
        </Stack>        

      </Drawer>

      <Main open={open} />
      
    </Box>
  );

}

/*In general, you should use AppBar if you want a standard navigation bar
 with Material-UI styles, and use Toolbar if you want more control over 
 the layout and content of your navigation bar.*/

/* if u export default => import Name
if u export without default => import {Name}   */