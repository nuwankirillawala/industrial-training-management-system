import { TextField, Button, Typography, Divider, Grid, Stack, Box, InputAdornment, IconButton} from "@mui/material"
import React, {useState} from "react"
import { Tile } from '../../../card/Tile'
import { Formik } from "formik"
import * as yup from "yup"
import { StatusSnackBar } from "../../../StatusSnackBar/StatusSnackBar"
import axios from 'axios';

const User = {
    companyName : '',
    companyEmail : '',
    companyContactNo : '',
    companyAddress : '',
    companyIntenSeats : '',
    companyDescription : '',
    companyRating : '',
    companyConnectedForInterns : '',
// contact person details
    companyContactPersonName : '',
    companyContactPersonContactNo : '',
    companyContactPersonEmail : '',
    companyContactPersonPosition : '',
}

export const CompanyCreateForm = () => {

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
   
      const handleFormSubmit = async (values) => {
        console.log(values);    
        const res = await axios.post(
          "http://localhost:5000/api/v1/company/create-company", 
          { name: values.companyName,
            email : values.companyEmail,
            contactNo : values.companyContactNo,
            address : values.companyAddress, 
            internSeats: values.companyInternSeats,
            description : values.companyDescription,
            connectedForIntern : values.companyConnectedForInterns,
            password: values.companyPassword,


         },
          {withCredentials: true}
          );

          console.log(res.data);
          handleSnackBar("success");
    };
    

    const validation = yup.object().shape({
        companyName : yup.string().required('required Field'),
        companyEmail : yup.string().email("Invalid Email").required("required Field"),
        companyContactNo : yup.string().length(10,"must contain 10 digits").required("Required Field"),
        companyAddress : yup.string().required('required Field'),
        companyIntenSeats : yup.number().required('required Field'),
        companyDescription : yup.string().required("Required Field"),
        companyRating : yup.number().required('required Field'),
        companyConnectedForInterns : yup.number().required('required Field'),

        companyContactPersonName : yup.string(),
        companyContactPersonContactNo :yup.string().length(10,"must contain 10 digits"),
        companyContactPersonEmail :yup.string().email("Invalid Email"),
        companyContactPersonPosition : yup.string(),
    })


    return(
    <Tile>
    <Box padding={'30px'}>
    <Grid container>
        <Grid item md={12}>

        <Formik
            onSubmit={handleFormSubmit}
            initialValues={User}
            validationSchema={validation}>

            {({
                  values,
                  errors,
                  touched,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  handleReset
            }) => (

                    <form onSubmit={handleSubmit}>

                        <Stack alignItems={'center'}>
                            <Stack direction={'column'} spacing={1} width={'60%'}>
                            
                                <Stack direction={'row'}>
                                    <Stack flex={2}>
                                        <Typography variant="body1">Company Name</Typography>
                                    </Stack>
                                    <Stack flex={3}>
                                        <TextField
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                        type="text"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.companyName}
                                        name="companyName"
                                        error={!!touched.companyName && !!errors.companyName}
                                        helperText={touched.companyName && errors.companyName}
                                        />
                                    </Stack>
                                </Stack>

                                <Stack direction={'row'}>
                                    <Stack flex={2}>
                                        <Typography>Company Email Address</Typography>
                                    </Stack>
                                    <Stack flex={3}>
                                        <TextField
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                        type="email"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.companyEmail}
                                        name="companyEmail"
                                        error={!!touched.companyEmail && !!errors.companyEmail}
                                        helperText={touched.companyEmail && errors.companyEmail}
                                        />
                                    </Stack>
                                </Stack>

                                <Stack direction={'row'}>
                                    <Stack minWidth={'200px'} flex={2}>
                                        <Typography>Contact Number</Typography>
                                    </Stack>
                                    <Stack flex={3}>
                                        <TextField
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                        type="text"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.companyContactNo}
                                        name="companyContactNo"
                                        error={!!touched.companyContactNo && !!errors.companyContactNo}
                                        helperText={touched.companyContactNo && errors.companyContactNo}
                                        />
                                    </Stack>
                                </Stack>

                                <Stack direction={'row'}>
                                    <Stack flex={2}>
                                        <Typography>Company Address</Typography>
                                    </Stack>
                                    <Stack flex={3}>
                                        <TextField
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                        type="text"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.companyAddress}
                                        name="companyAddress"
                                        error={!!touched.companyAddress && !!errors.companyAddress}
                                        helperText={touched.companyAddress && errors.companyAddress}
                                        />
                                    </Stack>
                                </Stack>

                                <Stack direction={'row'}>
                                    <Stack flex={2}>
                                        <Typography>Company Inten Seats</Typography>
                                    </Stack>
                                    <Stack flex={3}>
                                        <TextField
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                        type="number"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.companyIntenSeats}
                                        name="companyIntenSeats"
                                        error={!!touched.companyIntenSeats && !!errors.companyIntenSeats}
                                        helperText={touched.companyIntenSeats && errors.companyIntenSeats}
                                        />
                                    </Stack>
                                </Stack>

                                <Stack direction={'row'}>
                                    <Stack flex={2}>
                                        <Typography>Connected for Intern Seats</Typography>
                                    </Stack>
                                    <Stack flex={3}>
                                        <TextField
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                        type="number"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.companyConnectedForInterns}
                                        name="companyConnectedForInterns"
                                        error={!!touched.companyConnectedForInterns && !!errors.companyConnectedForInterns}
                                        helperText={touched.companyConnectedForInterns && errors.companyConnectedForInterns}
                                        />
                                    </Stack>
                                </Stack>

                                <Stack direction={'row'}>
                                    <Stack flex={2}>
                                        <Typography>Company Description</Typography>
                                    </Stack>
                                    <Stack flex={3}>
                                        <TextField
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                        type="text"
                                        multiline
                                        maxRows={5}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.companyDescription}
                                        name="companyDescription"
                                        error={!!touched.companyDescription && !!errors.companyDescription}
                                        helperText={touched.companyDescription && errors.companyDescription}
                                        />
                                    </Stack>
                                </Stack>

                                <Stack direction={'row'}>
                                    <Stack flex={2}>
                                        <Typography>Company Rating</Typography>
                                    </Stack>
                                    <Stack flex={3}>
                                        <TextField
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                        type="number"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.companyRating}
                                        name="companyRating"
                                        error={!!touched.companyRating && !!errors.companyRating}
                                        helperText={touched.companyRating && errors.companyRating}
                                        />
                                    </Stack>
                                </Stack>

{/* company contact person details */}
<Divider/>
<Divider/>
                                <Stack>
                                    <Typography vatiant='h6' fontWeight={'bold'}>Company Contact Person Details</Typography>
                                </Stack>

                                <Stack direction={'row'}>
                                    <Stack flex={2}>
                                        <Typography>Contact Person Name</Typography>
                                    </Stack>
                                    <Stack flex={3}>
                                        <TextField
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                        type="text"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.companyContactPersonName}
                                        name="companyContactPersonName"
                                        error={!!touched.companyContactPersonName && !!errors.companyContactPersonName}
                                        helperText={touched.companyContactPersonName && errors.companyContactPersonName}
                                        />
                                    </Stack>
                                </Stack>

                                <Stack direction={'row'}>
                                    <Stack flex={2}>
                                        <Typography>Contact Person Contact Number</Typography>
                                    </Stack>
                                    <Stack flex={3}>
                                        <TextField
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                        type="text"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.companyContactPersonContactNo}
                                        name="companyContactPersonContactNo"
                                        error={!!touched.companyContactPersonContactNo && !!errors.companyContactPersonContactNo}
                                        helperText={touched.companyContactPersonContactNo && errors.companyContactPersonContactNo}
                                        />
                                    </Stack>
                                </Stack>

                                <Stack direction={'row'}>
                                    <Stack flex={2}>
                                        <Typography>Contact Person Email</Typography>
                                    </Stack>
                                    <Stack flex={3}>
                                        <TextField
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                        type="text"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.companyContactPersonEmail}
                                        name="companyContactPersonEmail"
                                        error={!!touched.companyContactPersonEmail && !!errors.companyContactPersonEmail}
                                        helperText={touched.companyContactPersonEmail && errors.companyContactPersonEmail}
                                        />
                                    </Stack>
                                </Stack>

                                <Stack direction={'row'}>
                                    <Stack flex={2}>
                                        <Typography>Contact Person Position</Typography>
                                    </Stack>
                                    <Stack flex={3}>
                                        <TextField
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                        type="text"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.companyContactPersonPosition}
                                        name="companyContactPersonPosition"
                                        error={!!touched.companyContactPersonPosition && !!errors.companyContactPersonPosition}
                                        helperText={touched.companyContactPersonPosition && errors.companyContactPersonPosition}
                                        />
                                    </Stack>
                                </Stack>

                                <Stack alignItems={'flex-end'}>
                                    <Stack direction={'row'}>
                                        <Button variant="itms" size='itms-small' onClick={handleReset}>clear</Button>
                                        <Button variant="itms" size='itms-small' type="submit">ADD</Button>
                                    </Stack>
                                </Stack>

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
       </Grid>
       </Grid>
       </Box>
    </Tile>    
    
    )
} 