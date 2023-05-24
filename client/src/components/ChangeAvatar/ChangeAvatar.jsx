import React , { useRef, useState } from 'react'
import { Stack, Box, Button, Typography } from '@mui/material'
import { Avatar } from '../shared/Images/Avatar'
import { StatusSnackBar } from '../StatusSnackBar/StatusSnackBar'
import axios from 'axios'

export const ChangeAvatar = ({sumbitProfileImage, getProfileImage}) => {

    //statusSnackBar state
    const [trigger, setTrigger] = useState({
        success: false,
        error : false
      });
      //End of statusSnackBar state
      const handleSnackBar = (key) => {
        setTrigger((prevState) => {
          let newState = { ...prevState };
          newState[key] = !newState[key];
          return newState;
        });
      };

      const fileType = ["image/jpeg","image/png"]

      //hancle onSubmin in the profilepic change button
      const handleOnSubmit = async (e) => {
        e.preventDefault();
        let selectedFile = e.target.files[0];
        console.log(selectedFile.type);

        const headers = {
          "Content-Type": "multipart/form-data",
          withCredentials: true,
        };
    
        const formData = new FormData();
        formData.append("profile-image", selectedFile);
    
        const res = await axios.patch(
          sumbitProfileImage,
          formData,
          headers
        );
        console.log(res);

        if (selectedFile) {
          if (selectedFile && fileType.includes(selectedFile.type)) {
              handleSnackBar("success");
            }else{
              handleSnackBar("error");
            }
          }        
    };
    //End of hancle onSubmin in the profilepic change button

    //useRef for the file input
    const fileInput = useRef(null);
    //End of useRef

    //assign fileInput reference
    const handleFileInputClick = () => {
      console.log('clicked')
      fileInput.current.click();
    };
    //End of assign fileinput reference

    //handle onchange in input
    // const handleFileInputChange = (e) => {
    //   console.log(typeof e.target.files[0]);
    // };
    //End of handle onchange in input

  return (
    
    <Stack direction={'column'} spacing={2}>
        <Stack alignItems={'center'}>
            <Box width={'60%'}>
                <Avatar/>
            </Box>
        </Stack>
        <Stack alignItems={'center'}>
            <Box>
                <input type='file' ref= {fileInput} onChange={handleOnSubmit} hidden/>
                <Button variant='itms' type='file' onClick={handleFileInputClick}>change Avatar</Button>
            </Box>
        </Stack>

{/* success and error messagers */}
        <StatusSnackBar
          severity="success"
          trigger={trigger.success}
          setTrigger={() => {
            handleSnackBar("success");
          }}
          alertMessage={"Avatar Change Success"}
        />            
        <StatusSnackBar
          severity="error"
          trigger={trigger.error}
          setTrigger={() => {
            handleSnackBar("error");
          }}
          alertMessage={"Wrong file type"}
        />            
    </Stack>
  )
}
