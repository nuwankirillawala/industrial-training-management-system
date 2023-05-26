import * as React from 'react';
import { useState, useEffect } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Hidden, IconButton, List, ListItemButton, ListItemIcon, Stack, Toolbar, useTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Unilogo } from '../shared/Images/Unilogo';
import { Grid } from '@mui/material';
import { AddBusiness, Apartment, ArrowBack, ArrowUpward, Article, Assessment, Ballot, Business, ChevronLeft, Create, Dashboard, Delete, LocationCity, Logout, Margin, Menu, Note, Notifications, NotificationsNone, Settings } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import MuiDrawer from '@mui/material/Drawer';
import useAuth from '../../Hooks/useAuth';

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
  display: 'flex',
  alignItems: 'center',
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
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

const ListItemIconWrapper = styled(ListItemIcon)({
  display: 'flex',
  justifyContent: 'center',
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const buttonStyles = {
  height: 40,
  '&:hover': {
    bgcolor: '#f4f6fc',
    color: 'black'
  }
};

const users = [
  {
    name: 'Student/Undergraduate',
    items: [
      {
        id: 1,
        primaryText: 'Dashboard',
        icon: <Dashboard />,
        element: '/student-dashboard'
      },
      {
        id: 2,
        primaryText: 'Intern Application',
        icon: <Article />,
        element: '/intern-application/menu'
      },
      {
        id: 3,
        primaryText: 'Intern Status',
        icon: <Assessment />,
        element: '/student-company'
      },
      {
        id: 4,
        primaryText: 'Internship',
        icon: <AddBusiness />,
        element: '/student-company'
      },
      {
        id: 5,
        primaryText: 'Company',
        icon: <Business />,
        element: '/company/all'
      },
      {
        id: 6,
        primaryText: 'Report Submision',
        icon: <ArrowUpward />,
        element: '/student-report'
      },
      {
        id: 7,
        primaryText: 'Private Notes',
        icon: <Note />,
        element: '/notice'
      },
      {
        id: 8,
        primaryText: 'Notices',
        icon: <Notifications />,
        element: '/notice'
      }
    ]
  },
  {
    name: 'Admin',
    items: [
      {
        id: 1,
        primaryText: 'Dashboard',
        icon: <Dashboard />,
        element: 'admin-dashboard'
      },
      {
        id: 2,
        primaryText: 'User Management',
        icon: <Article />,
        element: '/manage-user'
      },
      {
        id: 3,
        primaryText: 'Companies',
        icon: <LocationCity />,
        element: '/manage-company'
      },
      {
        id: 4,
        primaryText: 'Results',
        icon: <Assessment />,
        element: '/result-sheet/view'
      },
      {
        id: 5,
        primaryText: 'Intern Process',
        icon: <Notifications />,
        element: '/intern-process/type'
      },
      {
        id: 6,
        primaryText: 'Intern Reports',
        icon: <Create />,
        element: '/report-portal'
      },
      {
        id: 7,
        primaryText: 'Private Notes',
        icon: <Delete />,
        element: '/deletenotices'
      },
      {
        id: 7,
        primaryText: 'Notices',
        icon: <Delete />,
        element: '/deletenotices'
      }
    ]
  },
  {
    name: 'Supervisor',
    items: [
      {
        id: 1,
        primaryText: 'Dashboard',
        icon: <Dashboard />,
        element: '/student-dashboard'
      },
      {
        id: 2,
        primaryText: 'Intern Members',
        icon: <Ballot />,
        element: '/intern-process-student'
      },
      {
        id: 3,
        primaryText: 'Report Submission',
        icon: <LocationCity />,
        element: '/student-company'
      },
      {
        id: 4,
        primaryText: 'Private Notes',
        icon: <Assessment />,
        element: '/daily-report-list'
      }
    ]
  },
  {
    name: 'Alumni',
    items: [
      {
        id: 1,
        primaryText: 'Dashboard',
        icon: <Dashboard />,
        element: '/student-dashboard'
      },
      {
        id: 2,
        primaryText: 'Company Ratings',
        icon: <Ballot />,
        element: '/intern-process-student'
      },
      {
        id: 3,
        primaryText: 'Update Workline',
        icon: <LocationCity />,
        element: '/student-company'
      },
    ]
  }
];

const controlItems = [
  {
    id: 1,
    label: 'Settings',
    icon: <Settings />,
    page: "/student-settings"
  },
  {
    id: 2,
    label: 'Back',
    icon: <ArrowBack />,
    page: 'back'
  },
  {
    id: 3,
    label: 'Log out',
    icon: <Logout />,
    page: '/logout'
  }
];

export default function Sidebar() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { logout, user, isAuthenticated } = useAuth();

  const handleControlItem = (page) => {
    if (page === 'back') {
      window.history.back()
    } else {
      navigate(page);
    }
  };

  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };


  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {  
      if(user && user.role){
        if(user.role === 'undergraduate'){
          setCurrentUser(users[0])
        }
        else if(user.role === 'department-coordinator' || user.role === 'system-admin'){
          setCurrentUser(users[1]);
        }
        else if(user.role === 'supervisor'){
          setCurrentUser(users[2]);
        }
        else if(user.role === 'alumni'){
          setCurrentUser(users[3]);
        }
      }
  
    }, [user]);


  const handleCurrentUserItem = (user, element) => {
    setCurrentUser(user);
    navigate(element);
  };

  const [openLogoutDialogBox, setOpenLogoutDialogBox] = useState(false);
  const handleLogout = (e) => {
    e.preventDefault();
    setOpenLogoutDialogBox(true);
  };

  const handleLogoutSubmit = async (e) => {
    e.preventDefault();
    await logout();
    navigate('/login');
  };

  const handleClose = () => {
    setOpenLogoutDialogBox(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Dialog
        open={openLogoutDialogBox}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Logout?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to log out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleLogoutSubmit} autoFocus>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
      <Drawer
        sx={{
          textAlign: 'center',
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            bgcolor: '#4665d2',
            color: '#f4f6fc',
          },
          overflowX: 'hidden'
        }}
        variant="permanent"
        anchor="left"
        open={open}
      >
        <Box>
          {open ? (
            <Box display={'flex'} justifyContent={open ? 'flex-end' : 'space-between'}>
              <DrawerHeader>
                <IconButton onClick={toggleDrawer} sx={{ color: 'inherit' }}>
                  <ChevronLeft />
                </IconButton>
              </DrawerHeader>
            </Box>
          ) : (
            <Box display={'flex'} justifyContent={'center'}>
              <DrawerHeader>
                <IconButton onClick={toggleDrawer} sx={{ color: 'inherit' }}>
                  <Menu />
                </IconButton>
              </DrawerHeader>
            </Box>
          )}
        </Box>
        <Stack>
        <Toolbar sx={{ display: 'flex', justifyContent: 'center' }}>
        {open && (
          <Stack position={'relative'} top={0}>
            <Grid container justifyContent="center">
              <Unilogo width='50px' height='100px' />
            </Grid>
            <Typography
              variant={'h6'}
              fontWeight={'bold'}
              letterSpacing={5}
              sx={{
                position: 'relative',
                top: 5,
                lineHeight: 1.2,
              }}>
              ITMS
            </Typography>
          </Stack>
        )}
        </Toolbar>
        </Stack>
        <Stack sx={{ position: 'relative', top: 50, justifyContent: 'center' }}>
          {users.map((user) => (
            <ListItem key={user.name} disablePadding>
            </ListItem>
          ))}
          {currentUser && currentUser.items.map((item) => (
            <ListItemButton
              key={item.id}
              sx={buttonStyles}
              onClick={() => handleCurrentUserItem(currentUser, item.element)}
            >
              {!open ? (
                <ListItemIconWrapper sx={{ color: 'inherit' }}>
                  {item.icon}
                </ListItemIconWrapper>
              ) : null}
              {!open ? null : (
                <React.Fragment>
                  <ListItemIcon sx={{ color: 'inherit', justifyContent: 'center' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.primaryText} />
                </React.Fragment>
              )}
            </ListItemButton>
          ))}
        </Stack>
        <Stack sx={{ position: 'relative', top: 100 }}>
          {controlItems.map((controlItem) => (
            <ListItemButton
              key={controlItem.id}
              sx={buttonStyles}
              onClick={(e) => controlItem.id === 3 ? handleLogout(e) : handleControlItem(controlItem.page)}
            >
              {!open ? (
                <ListItemIconWrapper sx={{ color: 'inherit' }}>
                  {controlItem.icon}
                </ListItemIconWrapper>
              ) : null}
              {!open ? null : (
                <React.Fragment>
                  <ListItemIcon sx={{ color: 'inherit', justifyContent: 'center' }}>
                    {controlItem.icon}
                  </ListItemIcon>
                  <ListItemText primary={controlItem.label} />
                </React.Fragment>
              )}
            </ListItemButton>
          ))}
        </Stack>
      </Drawer>
    </Box>
  );
}
