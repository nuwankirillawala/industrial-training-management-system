import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Stack } from "@mui/system";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
//import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';  //its more red 
import IconButton from '@mui/material/IconButton';
import { useState, useEffect } from "react";
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';


const drawerWidth = 190;


export default function Navbar() {
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

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: '#4665d2',
          borderTopLeftRadius: '20px',
          borderBottomLeftRadius: '20px',
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}>
        <Toolbar >
          <Typography variant="body1" component="div" sx={{ flexGrow: 1, paddingLeft: '35px' }}>
            {/* <li key={products.id}> {Page}</li>  */}
            {Page}
          </Typography>
          <Stack direction="row">
            <IconButton color={isNotifications ? 'secondary' : 'new'} >
              {isNotifications ? <NotificationsNoneIcon fontSize="large" /> : <NotificationsNoneIcon fontSize="large" />}
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

  );
}

/*In general, you should use AppBar if you want a standard navigation bar
 with Material-UI styles, and use Toolbar if you want more control over 
 the layout and content of your navigation bar.*/

/* if u export default => import Name
if u export without default => import {Name}   */