import React, { useState } from 'react'
import { Tile } from '../../../card/Tile'
import { Grid, Box, Typography, TextField, Button } from '@mui/material'
import { Avatar } from '../../../shared/Images/Avatar'
import { Layout } from '../../../Layout/Layout'

// get current values form backend and set that valuse as default values in textfields

const values = {
    firstName : '',
    lastName : '',
    fullName : '',
    regNo : '',
    email : '',
    contactNo : '',
    linkedin : '',
    github : ''
}


// we have to validate the change password settings
const pwd = {
    pwdCurrent : '',
    pwdNew1 : '',
    pwdNewCon : ''
}

export const StudentSettings = () => {

    const[profile,setProfile] = useState(values);

  return (
      <Layout>

        <Grid container spacing={1}>
            <Grid item md={4}>
            <Tile>
                <Grid container spacing={5}>
{/* update profile photo */}
                    <Grid item md={12}>

                        <Grid container justifyContent={'flex-start'} spacing={1}>
                        <Grid item md={5}>
                            <Avatar/>
                        </Grid>
                        <Grid item md={12}>
                            <Button variant='itms'> 
                            <Typography variant='caption'>change Profile Photo</Typography>
                            </Button>
                        </Grid>
                        </Grid>
            
                    </Grid>
{/* change password */}
                    <Grid item md={12}>
                        <Grid container spacing={2}>
                            <Grid item md={12}>
                                <Typography variant='h6' fontWeight={'bold'}>Change Password</Typography>
                            </Grid>

                            <Grid item md={12}>
                                <Grid container spacing={1} justifyContent='center'>
                                    <Grid item md={12}>
                                        {/* <Typography variant='body1'>Current Password</Typography> */}
                                    </Grid>
                                    <Grid item md={10}>
                                        <TextField
                                            variant='outlined'
                                            size='small'
                                            label='Current Password'
                                            type={'text'}
                                            value={pwd.pwdCurrent}
                                            name='pwdCurrent'
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item md={12}>
                                        {/* <Typography variant='body1'>New Password</Typography> */}
                                    </Grid>
                                    <Grid item md={10}>
                                        <TextField
                                            variant='outlined'
                                            size='small'
                                            label='New Password'
                                            type={'text'}
                                            value={pwd.pwdNew1}
                                            name='pwdNew1'
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item md={12}>
                                        {/* <Typography>Confirm Password</Typography> */}
                                    </Grid>
                                    <Grid item md={10}>
                                        <TextField
                                            variant='outlined'
                                            size='small'
                                            label='Confirm Password'
                                            type={'text'}
                                            value={pwd.pwdNewCon}
                                            name='pwdNewCon'
                                            fullWidth
                                        />
                                    </Grid>

                                </Grid>

                            </Grid>

                            
                            <Grid item md={12}>
                                <Grid container justifyContent={'end'}>
                                <Grid item md={2}>
                                    <Button variant='itms' fullWidth>save</Button>
                                </Grid>
                                </Grid>
                            </Grid>    

                        </Grid>
                    </Grid>
                </Grid>
            </Tile>
            </Grid>

{/* update profile details */}
{/* set the current values as default values */}
            <Grid item md={8}>
            <Tile>
                <Grid container spacing={1} justifyContent={'center'}>

                    <Grid item md={10}>
                    <Grid container>
                    <Grid item md={4}>
                        <Typography>First Name</Typography>
                    </Grid>
                    <Grid item md={8}>
                        <TextField
                            variant='outlined'
                            size='small'
                            // label='First Name'
                            defaultValue="Kamal"
                            type='text'
                            // value={values.firstName}
                            name='firstName'
                            fullWidth
                        />
                    </Grid>
                    </Grid>
                    </Grid>

                    <Grid item md={10}>
                    <Grid container>
                    <Grid item md={4}>
                        <Typography>Last Name</Typography>
                    </Grid>
                    <Grid item md={8}>
                        <TextField
                            variant='outlined'
                            size='small'
                            // label='Last Name'
                            type='text'
                            defaultValue={'Perera'}
                            // value={values.lastName}
                            name='lastName'
                            fullWidth
                        />
                    </Grid>
                    </Grid>
                    </Grid>
                    <Grid item md={10}>
                    <Grid container>
                    <Grid item md={4}>
                        <Typography>Name With Initials</Typography>
                    </Grid>
                    <Grid item md={8}>
                        <TextField
                            variant='outlined'
                            size='small'
                            // label='Last Name'
                            type='text'
                            defaultValue={'k.Perera'}
                            // value={values.fullName}
                            name='fullName'
                            fullWidth
                        />
                    </Grid>
                    </Grid>
                    </Grid>

                    <Grid item md={10}>
                    <Grid container>
                    <Grid item md={4}>
                        <Typography>Registration Number</Typography>
                    </Grid>
                    <Grid item md={8}>
                        <TextField
                            variant='outlined'
                            size='small'
                            // label='Registraion Number'
                            type='text'
                            defaultValue={'SC/2019/11100'}
                            // value={values.regNo}
                            name='regNo'
                            fullWidth
                        />
                    </Grid>
                    </Grid>
                    </Grid>

                    <Grid item md={10}>
                    <Grid container justifyContent={'center'}>
                    <Grid item md={4}>
                        <Typography>Email Address</Typography>
                    </Grid>
                    <Grid item md={8}>
                        <TextField
                            variant='outlined'
                            size='small'
                            // label='Email Address'
                            type='text'
                            defaultValue={'kamal@gmail.com'}
                            // value={values.email}
                            name='email'
                            fullWidth
                        />
                    </Grid>
                    </Grid>
                    </Grid>

                    <Grid item md={10}>
                    <Grid container>
                    <Grid item md={4}>
                        <Typography>Contact Number</Typography>
                    </Grid>
                    <Grid item md={8}>
                        <TextField
                            variant='outlined'
                            size='small'
                            // label='Contact Number'
                            type='number'
                            defaultValue={'0123456789'}
                            // value={values.contactNo}
                            name='contactNo'
                            fullWidth
                        />
                    </Grid>
                    </Grid>
                    </Grid>

                    <Grid item md={10}>
                    <Grid container>
                    <Grid item md={4}>
                        <Typography>Linkedin Account Address</Typography>
                    </Grid>
                    <Grid item md={8}>
                        <TextField
                            variant='outlined'
                            size='small'
                            // label='LinkedIn Account'
                            type='url'
                            defaultValue={'www.linkedin.com'}
                            // value={values.linkedin}
                            name='linkedin'
                            fullWidth
                        />
                    </Grid>
                    </Grid>
                    </Grid>

                    <Grid item md={10}>
                    <Grid container justifyContent={'center'}>
                    <Grid item md={4}>
                        <Typography>Github Account Address</Typography>
                    </Grid>
                    <Grid item md={8}>
                        <TextField
                            variant='outlined'
                            size='small'
                            // label='Github Account Address'
                            type='url'
                            defaultValue={'www.github.com'}
                            // value={values.github}
                            name='github'
                            fullWidth
                        />
                    </Grid>
                    </Grid>
                    </Grid>
                
                    <Grid item md={9}>
                    <Grid container justifyContent={'flex-end'}>
                    <Grid item md={1}>
                        <Button variant='itms'>Update</Button>
                    </Grid>
                    </Grid>
                    </Grid>

                </Grid>
            </Tile>
            </Grid>
        </Grid>

  </Layout>
  )
}
