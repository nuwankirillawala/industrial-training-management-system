import React from 'react'
import { useState } from 'react'
import { Tile } from '../../../card/Tile'
import { Grid, Typography, Button, TextField } from '@mui/material'

const Internperiod = {
    companyName : '',
    startDate : '',
    endDate : '',
    jobRoll : '',
    supervisor : ''
}


export const StudentInternPeriod = ({pageNo, setPage}) => {

    const [values,setValues] = useState(Internperiod);

  return (
    <Tile>
        <Grid container spacing={2}>
            <Grid item md={12}>
                <Typography variant='h6' fontWeight={'bold'}>Update Intership Period</Typography>
            </Grid>
            <Grid item md={12}>
                <Grid container spacing={1}>

                    <Grid item md={4}>
                        <Typography variant='body1'>Selected Company</Typography>
                    </Grid>
                    <Grid item md={8}>
                        <TextField
                            variant='outlined'
                            label='Selected Company'
                            size='small'
                            fullWidth
                            type="text"
                            // onBlur={handleBlur}
                            // onChange={handleChange}
                            values={values.companyName}
                            name="companyName"
                            // error={!!touched.companyname && !!errors.companyname}
                            // helperText={touched.companyname && errors.companyname}
                            ></TextField>
                    </Grid>
                    <Grid item md={4}>
                        <Typography variant='body1'>Intership Start Date</Typography>
                    </Grid>
                    <Grid item md={8}>
                        <TextField
                            variant='outlined'
                            label='Intership Start Date'
                            size='small'
                            fullWidth
                            ></TextField>
                    </Grid>
                    <Grid item md={4}>
                        <Typography variant='body1'>Intership End Date</Typography>
                    </Grid>
                    <Grid item md={8}>
                        <TextField
                            variant='outlined'
                            label='Intership End Date'
                            size='small'
                            fullWidth
                            ></TextField>
                    </Grid>
                    <Grid item md={4}>
                        <Typography variant='body1'>Job Roll</Typography>
                    </Grid>
                    <Grid item md={8}>
                        <TextField
                            variant='outlined'
                            label='Job Roll'
                            size='small'
                            fullWidth
                            ></TextField>
                    </Grid>
                    <Grid item md={4}>
                        <Typography variant='body1'>Company Supervisor</Typography>
                    </Grid>
                    <Grid item md={8}>
                        <TextField
                            variant='outlined'
                            label='Company Supervisor'
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
                                    no: 1,
                                }
                            );
                        }}
                    >Cancle</Button>
                    <Button variant='itms' size='itms-small'>Save</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </Tile>
  )
}
