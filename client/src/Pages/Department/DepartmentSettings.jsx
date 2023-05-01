import React, { useState } from 'react'
import { Tile } from '../../components/card/Tile'
import { Grid, Stack, Box, Typography, TextField, Button } from '@mui/material'
import { Avatar } from '../../components/shared/Images/Avatar'
import {Formik } from 'formik'
import * as Yup from 'yup'
import { StatusSnackBar } from '../../components/StatusSnackBar/StatusSnackBar'
import { ChangePassword } from '../../components/ChangePassword/ChangePassword'
import { ChangeAvatar } from '../../components/ChangeAvatar/ChangeAvatar'

// get current values form backend and set that valuse as default values in textfields

const departmentValues = {
    firstName : '',
    lastName : '',
    fullName : '',
    staffId : '',
    email : '',
    contactNo : '',
}

export const DepartmentSettings = () => {

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
   
    const handleOnSubmitForm = async (values) => {
        console.log(values);        
        // const res = await axios.post(
        //     "http://localhost:5000/api/v1/admin/create-admin", 
        //     {   role : 'system-admin',
        //         name : values.adminName,
        //         email : values.adminEmail,
        //         contactNo : values.adminContactNo,
        //         staffId : values.adminStaffId,
        //         password : values.adminPassword,
        //    },
        //     {withCredentials: true}
        //     );
        await new Promise((r) => setTimeout(r, 500));
        alert(JSON.stringify(values, null, 2));
        handleSnackBar("success");
    };

    const validationForm = Yup.object().shape({
        firstName : Yup.string(),
        lastName : Yup.string(),
        fullName : Yup.string(),
        staffId : Yup.string(),
        email : Yup.string().email("Invalid Email Address"),
        contactNo : Yup.string().length(10,"Invalid Number")
    })

  return (

        <Grid container spacing={1}>

            <Grid item md={3}>
            <Tile>
            <Box padding={'20px'}>
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
                <Box padding={'20px'}>
                <Stack spacing={2} direction='column'>
                    <Stack>
                        <Typography variant='h6' fontWeight={'bold'}>Update Your Profile</Typography>
                    </Stack>
                    <Stack alignItems={'center'}>
                        <Box width={'70%'}>
                            <Formik
                                initialValues={departmentValues}
                                validationSchema={validationForm}
                                onSubmit={handleOnSubmitForm}
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
                                                <Typography>First Name</Typography>
                                            </Stack>
                                            <Stack flex={3}>
                                                <TextField
                                                    variant='outlined'
                                                    size='small'
                                                    defaultValue="Kamal"
                                                    type='text'
                                                    name='firstName'
                                                    fullWidth
                                                    value={values.firstName}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    error={!!touched.firstName && !!errors.firstName}
                                                    helperText={touched.firstName && errors.firstName}
                                                    />
                                            </Stack>
                                        </Stack>
                                        <Stack direction={'row'}>
                                            <Stack minWidth={'200px'} flex={1}>
                                                <Typography>Last Name</Typography>
                                            </Stack>
                                            <Stack flex={3}>
                                                <TextField
                                                    variant='outlined'
                                                    size='small'
                                                    type='text'
                                                    defaultValue={'Perera'}
                                                    name='lastName'
                                                    fullWidth
                                                    value={values.lastName}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    error={!!touched.lastName && !!errors.lastName}
                                                    helperText={touched.lastName && errors.lastName}
                                                />
                                            </Stack>
                                        </Stack>
                                        <Stack direction={'row'}>
                                            <Stack minWidth={'200px'} flex={1}>
                                                <Typography>Name With Initials</Typography>
                                            </Stack>
                                            <Stack flex={3}>
                                                <TextField
                                                    variant='outlined'
                                                    size='small'
                                                    type='text'
                                                    defaultValue={'k.Perera'}
                                                    name='fullName'
                                                    fullWidth
                                                    value={values.fullName}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    error={!!touched.fullName && !!errors.fullName}
                                                    helperText={touched.fullName && errors.fullName}
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
                                                    type='text'
                                                    defaultValue={'SC/2019/11100'}
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
                                                    type='text'
                                                    defaultValue={values.email}
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
                                                    type='text'
                                                    defaultValue={'0123456789'}
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
  )
}