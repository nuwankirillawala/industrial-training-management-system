import React, { useState, useEffect } from 'react'
import { Tile } from '../../../components/card/Tile'
import { Grid, Stack, Box, Typography, TextField, Button } from '@mui/material'
import {Formik } from 'formik'
import * as Yup from 'yup'
import { StatusSnackBar } from '../../../components/StatusSnackBar/StatusSnackBar'
import { ChangePassword } from '../../../components/ChangePassword/ChangePassword'
import { ChangeAvatar } from '../../../components/ChangeAvatar/ChangeAvatar'
import axios from 'axios'

// get current values form backend and set that valuse as default values in textfields

const adminValues = {
    name : '',
    staffId : '',
    email : '',
    contactNo : '',
    role : ''
}

export const AdminSettings = () => {

    const[userData, setUserData] = useState(adminValues);
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


    //fetch data
    const getUserData = async() => {
        try {
            const res = await axios.get("http://localhost:5000/api/v1/admin/profile",{withCredentials:true});
            if(res.status === 200){
              console.log("responce :",res.data.user);
            setUserData({
                name : res.data.user.name,
                staffId : res.data.user.staffId,
                email : res.data.user.email,
                contactNo : res.data.user.contactNo,
                role : res.data.user.adminRole
            })
          }
        } catch (error) {
          console.log(error);
        }
      }
    
      useEffect(()=> {
        getUserData();
      }, [])
      //End of fetch data


   
    const handleSubmitForm = async (values) => {
        console.log(values);
        try{     
        const res = await axios.patch(
            "http://localhost:5000/api/v1/admin/profile", 
            {   role : userData.role,
                name : values.name === "" ? userData.name : values.name,
                email :  values.email === "" ? userData.email : values.email,
                contactNo : values.contactNo === "" ? userData.contactNo : values.contactNo,
                staffId : values.staffId === "" ? userData.staffId : values.staffId
           },
            {withCredentials: true}
            );

            if(res.status === 200 ){
                handleSnackBar("success");
            }else{
                handleSnackBar("error");
            }
        }
        catch(err){
            handleSnackBar("error");
            console.log(err);
        }
    };

    const validationForm = Yup.object().shape({
        name : Yup.string(),
        staffId : Yup.string(),
        email : Yup.string().email("Invalid Email Address"),
        contactNo : Yup.string().length(10,"Invalid Number"),
        role : Yup.string(),
    })

  return (

    <Grid container spacing={2}>
        <Grid item md={12}>
            <Typography variant="head3" marginBottom={'5px'}>Settings</Typography>
        </Grid>

        <Grid item md={12}>
            <Grid container spacing={1}>

                <Grid item md={3}>
                <Tile>
                    <Box padding={'20px'} height={'74vh'}>
                        <Stack direction='column' spacing={5}>
                    {/* update profile photo */}
                            <Stack>
                                <ChangeAvatar />            
                            </Stack>
                    {/* change password */}
                            <Stack direction={'column'} spacing={2}>
                                <Stack>
                                    <Typography variant='h6' fontWeight={'bold'}>Change Password</Typography>
                                </Stack>

                    {/* Use change password component */}
                                <Stack>
                                    <ChangePassword />
                                </Stack>                        
                            </Stack>
                            
                        </Stack>
                    </Box>
                </Tile>
                </Grid>

                {/* update profile details */}
                {/* set the current values as default values */}
                <Grid item md={9}>
                <Tile>
                    <Box padding={'20px'} height={'74vh'}>
                        <Stack spacing={2} direction='column'>
                            <Stack>
                                <Typography variant='h6' fontWeight={'bold'}>Update Your Profile</Typography>
                            </Stack>
                            <Stack alignItems={'center'}>
                                <Box width={'70%'}>
                                    <Formik
                                        initialValues={adminValues}
                                        validationSchema={validationForm}
                                        onSubmit={handleSubmitForm}
                                    >
                                        {({
                                            values,
                                            errors,
                                            touched,
                                            handleBlur,
                                            handleChange,
                                            handleSubmit,
                                            handleReset,

                                        })=>(
                                        <form onSubmit={handleSubmit}>
                                            <Stack spacing={1}>
                                                <Stack direction={'row'}>
                                                    <Stack minWidth={'200px'} flex={1}>
                                                        <Typography>Name</Typography>
                                                    </Stack>
                                                    <Stack flex={3}>
                                                        <TextField
                                                            variant='outlined'
                                                            size='small'
                                                            placeholder={userData.name}
                                                            type='text'
                                                            name='name'
                                                            fullWidth
                                                            value={values.name}
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            error={!!touched.name && !!errors.name}
                                                            helperText={touched.name && errors.name}
                                                            />
                                                    </Stack>
                                                </Stack>
                                                <Stack direction={'row'}>
                                                    <Stack flex={1} minWidth={'200px'}>
                                                        <Typography>Staff ID</Typography>
                                                    </Stack>
                                                    <Stack flex={3}>
                                                        <TextField
                                                            variant='outlined'
                                                            size='small'
                                                            placeholder={userData.staffId}
                                                            type='text'
                                                            name='staffId'
                                                            fullWidth
                                                            value={values.staffId}
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            error={!!touched.staffId && !!errors.staffId}
                                                            helperText={touched.staffId && errors.staffId}
                                                            />
                                                    </Stack>
                                                </Stack>
                                                <Stack direction={'row'} minWidth={'200px'}>
                                                    <Stack flex={1} minWidth={'200px'}>
                                                        <Typography>Email Address</Typography>
                                                    </Stack>
                                                    <Stack flex={3}>
                                                        <TextField
                                                            variant='outlined'
                                                            size='small'
                                                            placeholder={userData.email}
                                                            type='text'
                                                            name='email'
                                                            fullWidth
                                                            value={values.email}
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            error={!!touched.email && !!errors.email}
                                                            helperText={touched.email && errors.email}
                                                            />
                                                    </Stack>
                                                </Stack>
                                                <Stack direction={'row'}>
                                                    <Stack flex={1} minWidth={'200px'}>
                                                        <Typography>Contact Number</Typography>
                                                    </Stack>
                                                    <Stack flex={3}>
                                                        <TextField
                                                            variant='outlined'
                                                            size='small'
                                                            placeholder={userData.contactNo}
                                                            type='text'
                                                            name='contactNo'
                                                            fullWidth
                                                            value={values.contactNo}
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            error={!!touched.contactNo && !!errors.contactNo}
                                                            helperText={touched.contactNo && errors.contactNo}
                                                        />
                                                    </Stack>
                                                </Stack>
                                                <Stack alignItems={'flex-end'}>
                                                    <Box>
                                                        <Button variant='itms' onClick={handleReset}>reset</Button>
                                                        <Button variant='itms' type='submit'>Update</Button>
                                                    </Box>
                                                </Stack>
                                            </Stack>
                                        </form>
                                        )}
                                    </Formik> 
                                    <StatusSnackBar
                                    severity="success"
                                    trigger={trigger.success}
                                    setTrigger={() => {
                                        handleSnackBar("success");
                                    }}
                                    alertMessage={"Success"}
                                    />
                                </Box>
                            </Stack>
                                
                        </Stack>
                    </Box>
                </Tile>
                </Grid> 
                          
            </Grid>
        </Grid>
    </Grid>
  )
}