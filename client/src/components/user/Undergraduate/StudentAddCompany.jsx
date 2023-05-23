import React from 'react'
import { useState } from 'react'
import { Tile } from '../../card/Tile'
import { Grid, Typography, Button, TextField, Stack, Box } from '@mui/material'
import { Formik } from 'formik'
import * as yup from 'yup'
import { StatusSnackBar } from '../../StatusSnackBar/StatusSnackBar'


const companyDetails = {
    companyName : '',
    companyEmail : '',
    companyAddress : '',
    companyContact : '',
    supervisorName : '',
    supervisorContact : ''
}

const validation = yup.object().shape({
    companyName : yup.string().required("Enter Company Name"),
    companyEmail : yup.string().email("Invalid Email Address").required("Enter Email Address"),
    companyAddress : yup.string().required("Enter Company Address"),
    companyContact : yup.string().length(10,"Invalid Number").required("Enter Mobile Number"),
    supervisorName : yup.string().required("Enter Supervisor Name"),
    supervisorContact : yup.string().length(10,"Invalid Number").required("Enter Mobile Number")
})

export const StudentAddCompany = ({pageNo, setPage}) => {

    const [company,setCompany] = useState(companyDetails);

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

    const handleOnSubmit = async (values) => {
        console.log(values);
        await new Promise((r) => setTimeout(r, 500));
        alert(JSON.stringify(values, null, 2));
    }

  return (
    <Tile>
        <Formik
            initialValues={companyDetails}
            validationSchema={validation}
            onSubmit={handleOnSubmit}
        >
        {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            handleReset,

        }) => (
            <form onSubmit={handleSubmit}>
                <Stack direction={'column'} spacing={2}  maxHeight={'55vh'}>

                    <Stack>
                        <Typography variant='h6' fontWeight={'bold'}>Company Details</Typography>
                    </Stack>

                    <Stack alignItems={'center'}>
                        <Box width={'80%'}>
                            <Stack direction={'column'} spacing={1}>

                                <Stack direction={'row'}>
                                    <Stack flex={2}>
                                        <Typography variant='body1'>Company Name</Typography>
                                    </Stack>
                                    <Stack flex={3}>
                                        <TextField
                                            variant='outlined'
                                            size='small'
                                            fullWidth
                                            type="text"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            values={values.companyName}
                                            name="companyName"
                                            error={!!touched.companyName && !!errors.companyName}
                                            helperText={touched.companyName && errors.companyName}
                                        ></TextField>
                                    </Stack>
                                </Stack>

                                <Stack direction={'row'}>
                                    <Stack flex={2}>
                                        <Typography variant='body1'>Email</Typography>
                                    </Stack>
                                    <Stack flex={3}>
                                        <TextField
                                            variant='outlined'
                                            size='small'
                                            fullWidth
                                            type="text"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            values={values.companyEmail}
                                            name="companyEmail"
                                            error={!!touched.companyEmail && !!errors.companyEmail}
                                            helperText={touched.companyEmail && errors.companyEmail}
                                            ></TextField>
                                    </Stack>
                                </Stack>

                                <Stack direction={'row'}>
                                    <Stack flex={2}>
                                        <Typography variant='body1'>Address</Typography>
                                    </Stack>
                                    <Stack flex={3}>
                                        <TextField
                                            variant='outlined'
                                            size='small'
                                            fullWidth
                                            type="text"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            values={values.companyAddress}
                                            name="companyAddress"
                                            error={!!touched.companyAddress && !!errors.companyAddress}
                                            helperText={touched.companyAddress && errors.companyAddress}
                                            ></TextField>
                                    </Stack>
                                </Stack>

                                <Stack direction={'row'}>
                                    <Stack flex={2}>
                                        <Typography variant='body1'>Contact Number</Typography>
                                    </Stack>
                                    <Stack flex={3}>
                                        <TextField
                                            variant='outlined'
                                            size='small'
                                            fullWidth
                                            type="text"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            values={values.companyContact}
                                            name="companyContact"
                                            error={!!touched.companyContact && !!errors.companyContact}
                                            helperText={touched.companyContact && errors.companyContact}
                                            ></TextField>
                                    </Stack>
                                </Stack>

                                <Stack direction={'row'}>
                                    <Stack flex={2}>
                                        <Typography variant='body1'>Supervisor Name</Typography>
                                    </Stack>
                                    <Stack flex={3}>
                                        <TextField
                                            variant='outlined'
                                            size='small'
                                            fullWidth
                                            type="text"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            values={values.supervisorName}
                                            name="supervisorName"
                                            error={!!touched.supervisorName && !!errors.supervisorName}
                                            helperText={touched.supervisorName && errors.supervisorName}
                                            ></TextField>
                                    </Stack>
                                </Stack>

                                <Stack direction={'row'}>
                                    <Stack flex={2}>
                                        <Typography variant='body1'>Supervisor Contact Number</Typography>
                                    </Stack>
                                    <Stack flex={3}>
                                        <TextField
                                            variant='outlined'
                                            size='small'
                                            fullWidth
                                            type="text"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            values={values.supervisorContact}
                                            name="supervisorContact"
                                            error={!!touched.supervisorContact && !!errors.supervisorContact}
                                            helperText={touched.supervisorContact && errors.supervisorContact}
                                            ></TextField>
                                    </Stack>
                                </Stack>

                            </Stack>
                        </Box>
                    </Stack>

                    <Stack alignItems='flex-end'>
                        <Stack direction={'row'}>
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
                                        >Cancel</Button>
                                <Button
                                    variant='itms'
                                    size='itms-small'
                                    onClick={handleReset}
                                        >reset</Button>
                                <Button
                                    variant='itms'
                                    size='itms-small'
                                    type='submit'
                                    >Add</Button>
                        </Stack>
                    </Stack>

                </Stack>
            </form>
        )}
        </Formik>
        {/* success and error messagers */}
        <StatusSnackBar
          severity="success"
          trigger={trigger.success}
          setTrigger={() => {
            handleSnackBar("success");
          }}
          alertMessage={"Update Successfully"}
        />            
        <StatusSnackBar
          severity="error"
          trigger={trigger.error}
          setTrigger={() => {
            handleSnackBar("error");
          }}
          alertMessage={"Update fail"}
        /> 
    </Tile>
  )
}
