import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Stack } from "@mui/system";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { useState, useEffect } from "react";



export default function Navbar () {
    const [Page, setPage] = useState('Dashboard');
    const [Name, setName] = useState('Gavesh');
  
    // useEffect(() => {      /*next define usestate to a button and work ahead*/
    //   fetch('G:\test\test\client\src\dummylogin.json')
    //     .then(response => response.json())
    //     .then(data => setPage(data.Page))
    //     .catch(error => console.error(error));
    // }, []);
//sx={{ width: `calc(100% - ${200}px)`}  

  return (
      <AppBar position="fixed" elevation= {0} >
        <Toolbar>
          <Typography variant="body2" component="div" sx={{ flexGrow: 1 }}>
            {/* <li key={products.id}> {Page}</li>  */}
            {Page}
          </Typography>
        <Stack direction="row">
           <IconButton  >
            <NotificationsActiveOutlinedIcon fontSize="large"/>
          </IconButton>       
          <IconButton>
            <AccountCircleIcon fontSize="large"/>
          </IconButton>
          <Typography variant="body2" sx={{padding : "8px"}}>
              {Name}
          </Typography>
        </Stack>

        </Toolbar>
      </AppBar>
  );
}

/*In general, you should use AppBar if you want a standard navigation bar
 with Material-UI styles, and use Toolbar if you want more control over 
 the layout and content of your navigation bar.*/

 /* if u export default => import Name 
 if u export without default => import {Name}   */