import React from 'react'
import { useState } from 'react'
import { Tile } from '../../card/Tile'
import { Grid, Typography, Button, TextField } from '@mui/material'


const companyDetails = {
    companyName : '',
    companyEmail : '',
    companyAddress : '',
    companyContact : '',
    supervisorName : '',
    supervisorContact : ''
}


export const StudentAddCompany = ({pageNo, setPage}) => {

    const [company,setCompany] = useState(companyDetails);

  return (
    <Tile>
        <Grid container spacing={2}>

            <Grid item md={12}>
                <Typography variant='h6' fontWeight={'bold'}>Company Details</Typography>
            </Grid>

            <Grid item md={12}>
                <Grid container spacing={1}>

                    <Grid item md={4}>
                        <Typography variant='body1'>Company Name</Typography>
                    </Grid>
                    <Grid item md={8}>
                        <TextField
                            variant='outlined'
                            label='Company Name'
                            size='small'
                            fullWidth
                        ></TextField>
                    </Grid>

                    <Grid item md={4}>
                        <Typography variant='body1'>Email</Typography>
                    </Grid>
                    <Grid item md={8}>
                        <TextField
                            variant='outlined'
                            label='Email'
                            size='small'
                            fullWidth
                            ></TextField>
                    </Grid>

                    <Grid item md={4}>
                        <Typography variant='body1'>Address</Typography>
                    </Grid>
                    <Grid item md={8}>
                        <TextField
                            variant='outlined'
                            label='Address'
                            size='small'
                            fullWidth
                            ></TextField>
                    </Grid>

                    <Grid item md={4}>
                        <Typography variant='body1'>Contact Number</Typography>
                    </Grid>
                    <Grid item md={8}>
                        <TextField
                            variant='outlined'
                            label='Contact Number'
                            size='small'
                            fullWidth
                            ></TextField>
                    </Grid>

                    <Grid item md={4}>
                        <Typography variant='body1'>Supervisor Name</Typography>
                    </Grid>
                    <Grid item md={8}>
                        <TextField
                            variant='outlined'
                            label='Supervisor Name'
                            size='small'
                            fullWidth
                            ></TextField>
                    </Grid>

                    <Grid item md={4}>
                        <Typography variant='body1'>Supervisor Contact Number</Typography>
                    </Grid>
                    <Grid item md={8}>
                        <TextField
                            variant='outlined'
                            label='Supervisor Contact Number'
                            size='small'
                            fullWidth
                            ></TextField>
                    </Grid>

                </Grid>

            </Grid>

            <Grid item md={12}>
                <Grid container justifyContent={'flex-end'}>
                    <Grid item>
                        <Button
                            variant='itms'
                            size='itms-small'
                            onClick={(prev) => {
                                setPage(
                                    {
                                        ...prev,
                                        no:1
                                    }
                                );
                          }}
                        >Cancle</Button>
                        <Button
                            variant='itms'
                            size='itms-small'
                            >Add</Button>
                    </Grid>
                </Grid>
            </Grid>

        </Grid>
    </Tile>
  )
}
