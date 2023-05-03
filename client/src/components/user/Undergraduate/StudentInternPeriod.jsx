import React from 'react'
import { useState, useEffect } from 'react'
import { Tile } from '../../card/Tile'
import { Grid, Typography, Button, TextField, Stack, Select, MenuItem } from '@mui/material'
import { Formik } from 'formik'
import axios from 'axios'
import * as yup from "yup"

const Internperiod = {
    companyName : '',
    startDate : '',
    endDate : '',
    jobRole : '',
    supervisor : ''
}



export const StudentInternPeriod = ({pageNo, setPage}) => {
    
    const [values,setValues] = useState(Internperiod);
    const [companyList , setCompanyList] = useState([]);

    //fetch data
    const getCompanyList = async() => {
        try {
          const res = await axios.get('http://localhost:5000/api/v1/company/intern-process-company-list');
          if(res.data.status === 'success'){
            console.log(res.data.data);
            setCompanyList(res.data.data);
          }
        } catch (error) {
          console.log(error)
        }
      }
    
      useEffect(()=> {
        getCompanyList();
      }, [])
      //End of fetch data

    const validation = yup.object().shape({
        companyName : yup.string().required('required Field'),
        startDate : yup.string().required('required Field'),
        endDate : yup.string().required('required Field'),
        jobRole : yup.string().required('required Field'),
        supervisor : yup.string().required('required Field')
    })

    const handleOnSubmit = async (values) => {
        console.log(values);
        try{
            const res = await axios.patch('http://localhost:5000/api/v1/undergraduate/update-internship-period',
            {
                id : "640ac55788b5c24f7a66706b",
                internshipStart : values.startDate,
                internshipEnd : values.endDate
            });
            console.log(res.status)
        }
        catch (error){
            console.log(error);
        }
    }

  return (
    <Tile>
        <Grid container spacing={2}>
            <Grid item md={12}>
                <Typography variant='h6' fontWeight={'bold'}>Update Intership Period</Typography>
            </Grid>

            <Grid item md={12}>
                <Stack direction={'column'} spacing={1}>
                    <Formik
                    initialValues={Internperiod}
                    onSubmit={handleOnSubmit}
                    validationSchema={validation}
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
                        <Stack direction={'column'} spacing={2}>
                            
                            <Stack direction={'row'} spacing={3}>
                                <Stack flex={2}>
                                    <Typography variant='body1'>Selected Company</Typography>
                                </Stack>

                                <Stack flex={3}>
                                    <Select
                                        variant='outlined'
                                        // label='Intership Start Date'
                                        size='small'
                                        fullWidth
                                        onChange={handleChange}
                                        name='companyName'
                                        value={values.companyName}
                                        labelId="companyName"
                                        id="companyName"
                                        >
                                            <MenuItem value="none"><em>None</em></MenuItem>
                                            {companyList.map((company)=>(
                                                <MenuItem value={company._id}>{company.name}</MenuItem>
                                            ))}
                                    </Select>
                                </Stack>
                            </Stack>


                            <Stack direction={'row'} spacing={3}>
                                <Stack flex={2}>
                                    <Typography variant='body1'>Intership Start Date</Typography>
                                </Stack>
                                <Stack flex={3}>
                                    <TextField
                                        variant='outlined'
                                        // label='Intership Start Date'
                                        size='small'
                                        fullWidth
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        name='startDate'
                                        value={values.startDate}
                                        error={!!touched.startDate && !!errors.startDate}
                                        helperText={touched.startDate && errors.startDate}
                                        type='date'
                                        ></TextField>
                                </Stack>
                            </Stack>

                            <Stack direction={'row'} spacing={3}>
                                <Stack flex={2}>
                                    <Typography variant='body1'>Intership End Date</Typography>
                                </Stack>
                                <Stack flex={3}>
                                    <TextField
                                        variant='outlined'
                                        // label='Intership End Date'
                                        size='small'
                                        fullWidth
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        name='endDate'
                                        value={values.endDate}
                                        error={!!touched.endDate && !!errors.endDate}
                                        helperText={touched.endDate && errors.endDate}
                                        type='date'
                                        ></TextField>
                                </Stack>
                            </Stack>

                            <Stack direction={'row'} spacing={3}>
                                <Stack flex={2}>
                                    <Typography variant='body1'>Job Role</Typography>
                                </Stack>
                                <Stack flex={3}>
                                <Select
                                        variant='outlined'
                                        // label='Intership Start Date'
                                        size='small'
                                        fullWidth
                                        onChange={handleChange}
                                        name='jobRole'
                                        value={values.jobRole}
                                        labelId="jobRole"
                                        id="jobRole"
                                        >
                                            <MenuItem value="none"><em>None</em></MenuItem>
                                            <MenuItem value="se">Software Engineering</MenuItem>
                                            <MenuItem value="ba">Business Anylist</MenuItem>
                                            <MenuItem value="qa">Quality Achurence</MenuItem>
                                    </Select>
                                </Stack>
                            </Stack>

                            <Stack direction={'row'} spacing={3}>
                                <Stack flex={2}>
                                    <Typography variant='body1'>Company Supervisor</Typography>
                                </Stack>
                                <Stack flex={3}>
                                    <TextField
                                        variant='outlined'
                                        // label='Intership End Date'
                                        size='small'
                                        fullWidth
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        name='supervisor'
                                        value={values.supervisor}
                                        error={!!touched.supervisor && !!errors.supervisor}
                                        helperText={touched.supervisor && errors.supervisor}
                                        type='text'
                                        ></TextField>
                                </Stack>
                            </Stack>

                            <Stack alignItems={'flex-end'}>
                                <Stack direction={'row'}>
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

                                    <Button
                                        variant='itms'
                                        size='itms-small'
                                        onClick={handleReset}
                                        >Reset</Button>

                                    <Button
                                        variant='itms'
                                        size='itms-small'
                                        type='submit'>Save</Button>

                                </Stack>
                            </Stack>
                    
                        </Stack>
                        </form>
                    )}
                    </Formik>
                </Stack>
            </Grid>

        </Grid>
    </Tile>
  )
}
