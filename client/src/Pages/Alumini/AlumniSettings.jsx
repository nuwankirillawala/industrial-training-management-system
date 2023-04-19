import React, { useState } from 'react'
import { Tile } from '../../components/card/Tile'
import { Grid, Stack, Box, Typography, TextField, Button } from '@mui/material'
import { Avatar } from '../../components/shared/Images/Avatar'
import {Formik } from 'formik'
import * as Yup from 'yup'
import { ChangePassword } from '../../components/ChangePassword/ChangePassword'

// get current values form backend and set that valuse as default values in textfields

const alumniValues = {
    firstName : '',
    lastName : '',
    fullName : '',
    studentNumber : '',
    universityBatch : '',
    email : '',
    contactNo : '',
    currentCompany : '',
    currentJobRole : '',
    currentCompanyRating : '',
    linkedIn : '',
    github : '',
    AboutMe : ''
}

export const AlumniSettings = () => {

    // const[profile,setProfile] = useState(alumniValues);

    const handleOnSubmitForm = async(values) => {
        console.log(values);
        await new Promise((r) => setTimeout(r, 500));
        alert(JSON.stringify(values, null, 2));
    }

    const validationForm = Yup.object().shape({
        firstName : Yup.string(),
        lastName : Yup.string(),
        fullName : Yup.string(),
        studentNumber : Yup.string(),
        universityBatch : Yup.number(),
        email : Yup.string().email("Invalid Email Address"),
        contactNo : Yup.string().length(10,"Invalid Number"),
        currentCompany : Yup.string(),
        currentJobRole : Yup.string(),
        currentCompanyRating : Yup.number(),
        linkedin : Yup.string().url("invalid URL"),
        github : Yup.string().url("Invalid URL"),
        AboutMe : Yup.string(),
    })

  return (

        <Grid container spacing={1}>

            <Grid item md={3}>
            <Tile>
            <Box padding={'20px'}>
                <Stack direction='column' spacing={5}>
{/* update profile photo */}
                    <Stack direction={'column'} spacing={2}>
                        <Stack alignItems={'center'}>
                            <Box width={'60%'}>
                                <Avatar/>
                            </Box>
                        </Stack>
                        <Stack alignItems={'center'}>
                            <Box>
                                <Button variant='itms'>change Profile Photo</Button>
                            </Box>
                        </Stack>            
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
                <Box padding={'20px'} height={'83vh'}>
                <Stack spacing={2} direction='column'>
                    <Stack>
                        <Typography variant='h6' fontWeight={'bold'}>Update Your Profile</Typography>
                    </Stack>
                    <Stack alignItems={'center'}>
                        <Box width={'70%'}>
                            <Formik
                                initialValues={alumniValues}
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
                                        <Stack direction={'row'} minWidth={'200px'}>
                                            <Stack flex={1} minWidth={'200px'}>
                                                <Typography>Student Number</Typography>
                                            </Stack>
                                            <Stack flex={3}>
                                                <TextField
                                                    variant='outlined'
                                                    size='small'
                                                    type='text'
                                                    defaultValue={values.studentNumber}
                                                    name='studentNumber'
                                                    fullWidth
                                                    value={values.studentNumber}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    error={!!touched.studentNumber && !!errors.studentNumber}
                                                    helperText={touched.studentNumber && errors.studentNumber}
                                                    />
                                            </Stack>
                                        </Stack>
                                        <Stack direction={'row'} minWidth={'200px'}>
                                            <Stack flex={1} minWidth={'200px'}>
                                                <Typography>University Batch</Typography>
                                            </Stack>
                                            <Stack flex={3}>
                                                <TextField
                                                    variant='outlined'
                                                    size='small'
                                                    type='text'
                                                    defaultValue={values.universityBatch}
                                                    name='universityBatch'
                                                    fullWidth
                                                    value={values.universityBatch}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    error={!!touched.universityBatch && !!errors.universityBatch}
                                                    helperText={touched.universityBatch && errors.universityBatch}
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
                                        <Stack direction={'row'}>
                                            <Stack flex={1} minWidth={'200px'}>
                                                <Typography>Current Company</Typography>
                                            </Stack>
                                            <Stack flex={3}>
                                                <TextField
                                                    variant='outlined'
                                                    size='small'
                                                    type='text'
                                                    defaultValue={values.currentCompany}
                                                    name='currentCompany'
                                                    fullWidth
                                                    value={values.currentCompany}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    error={!!touched.currentCompany && !!errors.currentCompany}
                                                    helperText={touched.currentCompany && errors.currentCompany}
                                                />
                                            </Stack>
                                        </Stack>
                                        <Stack direction={'row'}>
                                            <Stack flex={1} minWidth={'200px'}>
                                                <Typography>Current Job Role</Typography>
                                            </Stack>
                                            <Stack flex={3}>
                                                <TextField
                                                    variant='outlined'
                                                    size='small'
                                                    type='text'
                                                    defaultValue={values.currentJobRole}
                                                    name='currentJobRole'
                                                    fullWidth
                                                    value={values.currentJobRole}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    error={!!touched.currentJobRole && !!errors.currentJobRole}
                                                    helperText={touched.currentJobRole && errors.currentJobRole}
                                                />
                                            </Stack>
                                        </Stack>
                                        <Stack direction={'row'}>
                                            <Stack flex={1} minWidth={'200px'}>
                                                <Typography>Current Company Rating</Typography>
                                            </Stack>
                                            <Stack flex={3}>
                                                <TextField
                                                    variant='outlined'
                                                    size='small'
                                                    type='text'
                                                    defaultValue={values.currentCompanyRating}
                                                    name='currentCompanyRating'
                                                    fullWidth
                                                    value={values.currentCompanyRating}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    error={!!touched.currentCompanyRating && !!errors.currentCompanyRating}
                                                    helperText={touched.currentCompanyRating && errors.currentCompanyRating}
                                                />
                                            </Stack>
                                        </Stack>
                                        <Stack direction={'row'}>
                                            <Stack flex={1} minWidth={'200px'}>
                                                <Typography>LinkedIn</Typography>
                                            </Stack>
                                            <Stack flex={3}>
                                                <TextField
                                                    variant='outlined'
                                                    size='small'
                                                    type='text'
                                                    defaultValue={values.linkedIn}
                                                    name='linkedIn'
                                                    fullWidth
                                                    value={values.linkedIn}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    error={!!touched.linkedIn && !!errors.linkedIn}
                                                    helperText={touched.linkedIn && errors.linkedIn}
                                                />
                                            </Stack>
                                        </Stack>
                                        <Stack direction={'row'}>
                                            <Stack flex={1} minWidth={'200px'}>
                                                <Typography>GitHub</Typography>
                                            </Stack>
                                            <Stack flex={3}>
                                                <TextField
                                                    variant='outlined'
                                                    size='small'
                                                    type='text'
                                                    defaultValue={values.github}
                                                    name='github'
                                                    fullWidth
                                                    value={values.github}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    error={!!touched.github && !!errors.github}
                                                    helperText={touched.github && errors.github}
                                                />
                                            </Stack>
                                        </Stack>
                                        <Stack direction={'row'}>
                                            <Stack flex={1} minWidth={'200px'}>
                                                <Typography>About Me</Typography>
                                            </Stack>
                                            <Stack flex={3}>
                                                <TextField
                                                    variant='outlined'
                                                    size='small'
                                                    type='text'
                                                    defaultValue={values.AboutMe}
                                                    name='AboutMe'
                                                    fullWidth
                                                    multiline
                                                    value={values.AboutMe}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    error={!!touched.AboutMe && !!errors.AboutMe}
                                                    helperText={touched.AboutMe && errors.AboutMe}
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
                        </Box>
                    </Stack>

                </Stack>
                </Box>
            </Tile>
            </Grid>

        </Grid>
  )
}