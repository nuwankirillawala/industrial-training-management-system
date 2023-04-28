import React , { useState } from 'react'
import { Stack, Box, Button, Typography } from '@mui/material'
import { Avatar } from '../shared/Images/Avatar'
import { StatusSnackBar } from '../StatusSnackBar/StatusSnackBar'

export const ChangeAvatar = () => {

    //statusSnackBar state
    const [trigger, setTrigger] = useState({
        success: false,
      });
      //End of statusSnackBar state
      const handleSnackBar = (key) => {
        setTrigger((prevState) => {
          let newState = { ...prevState };
          newState[key] = !newState[key];
          return newState;
        });
      };

      const handleOnSubmit = async () => {
        console.log("change avatar");        
        handleSnackBar("success");
    };

  return (
    
    <Stack direction={'column'} spacing={2}>
        <Stack alignItems={'center'}>
            <Box width={'60%'}>
                <Avatar/>
            </Box>
        </Stack>
        <Stack alignItems={'center'}>
            <Box>
                <Button variant='itms' onClick={handleOnSubmit}>change Avatar</Button>
            </Box>
        </Stack>
        <StatusSnackBar
          severity="success"
          trigger={trigger.success}
          setTrigger={() => {
            handleSnackBar("success");
          }}
          alertMessage={"Success"}
        />            
    </Stack>
  )
}
