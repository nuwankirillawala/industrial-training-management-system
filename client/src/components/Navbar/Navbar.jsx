import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Typography, Badge, Box, Paper } from "@mui/material";
import Button from "@mui/material/Button";
import { Stack } from "@mui/system";
import Popover from '@mui/material/Popover';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
//import { Tile } from '../card/Tile'
import IconButton from '@mui/material/IconButton';
import { useState, useEffect } from "react";
import { Avatar } from "@mui/material";


const drawerWidth = 240;


export default function Navbar() {
  const [Name, setName] = useState('Gavesh');
  const [Image, setImage] = useState('');
  const [isNotifications, setisNotifications] = useState(true); //Notification available yes or no

  const [Notification, setNotification] = React.useState(null); //notification popover 
  const handleNotificationOpen = (event) => {
    setNotification(event.currentTarget);
  };
  const handleNotificationClose = () => {
    setNotification(null);
  };
  const open = Boolean(Notification);
  const notification = open ? 'simple-popover' : undefined;


  const [UserData, setUserData] = React.useState(null);  //UserData popover on image
  const handleUserDataOpen = (event) => {
    setUserData(event.currentTarget);
  };
  const handleUserDataClose = () => {
    setUserData(null);
  };
  const useropen = Boolean(UserData);
  const userPhoto = useropen ? 'simple-popover' : undefined;

  useEffect(() => {      /*next define usestate to a button and work ahead*/
    fetch('G:\test\test\client\src\dummylogin.json')
      .then(response => response.json())
      .then(data => {
        setName(data.Name)//setName(data.Name),
        setisNotifications(data.notification)
      })   //setImage
      .catch(error => console.error(error));
  }, []);
  //sx={{ width: `calc(100% - ${200}px)`}  


  return (

    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        bgcolor: "#90a4ae",
        width: {
          sm: `calc(100% - ${drawerWidth}px)`
        },
        ml: { sm: `${drawerWidth}px` },
      }}>
      <Toolbar >

        {/* {isNotifications ? <NotificationsNoneIcon fontSize="large" /> : <NotificationsNoneIcon fontSize="large" />}
            color={isNotifications ? 'secondary' : 'new'}
            */}

        <Stack direction="row" paddingLeft='850px' spacing='5px'>
          {isNotifications ? (
            <Box>
              <IconButton onClick={handleNotificationOpen} style={{ color: 'white' }} >
                <Badge color="red" variant="dot" sx={{ top: '50%' }} // red defined in rootlayout
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}          >
                  <NotificationsNoneIcon fontSize="large" />
                </Badge>
              </IconButton>
              <Popover
                id={notification}
                open={open}
                anchorEl={Notification}
                onClose={handleNotificationClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
              >
                <Paper sx={{ p: 2, borderColor: '#4665D2', borderWidth: 3, borderStyle: 'solid' }}>
                  <Typography sx={{ p: 2 }} fontWeight={'bold'}>Hi {Name}, You have new notifications</Typography>
                </Paper>
              </Popover>
            </Box>

          ) : (
            <IconButton>
              <NotificationsNoneIcon fontSize="large" color='secondary' />
            </IconButton>
          )}
          <Box>
            <IconButton onClick={handleUserDataOpen}>
              <Avatar sx={{ height: '40px', marginRight: '10px' }} />  {/* <img src={Image} image is defined above */}
            </IconButton>
            <Popover
              id={userPhoto}
              open={useropen}
              anchorEl={UserData}
              onClose={handleUserDataClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              <Paper sx={{ p: 2, borderColor: '#4665D2', borderWidth: 3, borderStyle: 'solid', width: '250px' }}>
                <Typography fontWeight={'bold'}>Hi, {Name} </Typography>
                <Typography fontWeight={'bold'}> Intern Status  : {Name}</Typography>
                <Typography fontWeight={'bold'}> GPA            :{Name}</Typography>
              </Paper>
            </Popover>
          </Box>
          <Stack justifyContent={'center'}>
            <Typography variant="body1" sx={{ padding: "8px" }} >
              {Name}
            </Typography>
          </Stack>
        </Stack>

      </Toolbar>
    </AppBar >


  );
}

/*In general, you should use AppBar if you want a standard navigation bar
 with Material-UI styles, and use Toolbar if you want more control over 
 the layout and content of your navigation bar.*/

/* if u export default => import Name
if u export without default => import {Name}   */