import { TextField, Button, Typography, Grid} from "@mui/material"
import React from "react"
import { Tile } from '../../../card/Tile'
import { Formik } from "formik"
import * as yup from "yup"
import { FormControl, Select, MenuItem } from '@mui/material'


const User = {
    companyName : '',
    companyEmail : '',
    companyContactNo : '',
    companyAddress : '',
    companyIntenSeats : '',
    companyDescription : '',
    companyRating : '',

    companyContactPersonName : '',
    companyContactPersonContactNo : '',
    companyContactPersonEmail : '',
    companyContactPersonPosition : '',
}

export const CompanyCreateForm = () => {
   
    const handleFormSubmit = (values) => {
        console.log(values);
    };

    const validation = yup.object().shape({
        companyName : yup.string().required('required Field'),
        companyEmail : yup.string().email("Invalid Email").required("required Field"),
        companyContactNo : yup.string().length(10,"must contain 10 digits").required("Required Field"),
        companyAddress : yup.string().required('required Field'),
        companyIntenSeats : yup.number().required('required Field'),
        companyDescription : yup.string().required("Required Field"),
        companyRating : yup.number().required('required Field'),

        companyContactPersonName : yup.string().required('required Field'),
        companyContactPersonContactNo : yup.string().required('required Field'),
        companyContactPersonEmail : yup.string().required('required Field'),
        companyContactPersonPosition : yup.string().required('required Field'),
    })


    return(
    <Tile>

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
            }) => (

                    <form onSubmit={handleSubmit}>

                        <Grid container spacing={1}>

                            <Grid item md={12}>
                                <Grid container>
                                    <Grid item md={4}>
                                        <Typography variant="body1">Company Name</Typography>
                                    </Grid>
                                    <Grid item md={8}>
                                        <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="text"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.companyName}
                                        name="companyName"
                                        error={!!touched.companyName && !!errors.companyName}
                                        helperText={touched.companyName && errors.companyName}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item md={12}>
                                <Grid container>
                                    <Grid item md={4}>
                                        <Typography>Company Email Address</Typography>
                                    </Grid>
                                    <Grid item md={8}>
                                        <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="email"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.companyEmail}
                                        name="companyEmail"
                                        error={!!touched.companyEmail && !!errors.companyEmail}
                                        helperText={touched.companyEmail && errors.companyEmail}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item md={12}>
                                <Grid container>
                                    <Grid item md={4}>
                                        <Typography>Company Contact Number</Typography>
                                    </Grid>
                                    <Grid item md={8}>
                                        <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="text"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        values={values.companyContactNo}
                                        name="companyContactNo"
                                        error={!!touched.companyContactNo && !!errors.companyContactNo}
                                        helperText={touched.companyContactNo && errors.companyContactNo}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item md={12}>
                                <Grid container>
                                    <Grid item md={4}>
                                        <Typography>Company Address</Typography>
                                    </Grid>
                                    <Grid item md={8}>
                                        <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="text"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.companyAddress}
                                        name="companyAddress"
                                        error={!!touched.companyAddress && !!errors.companyAddress}
                                        helperText={touched.companyAddress && errors.companyAddress}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item md={12}>
                                <Grid container>
                                    <Grid item md={4}>
                                        <Typography>Company Inten Seats</Typography>
                                    </Grid>
                                    <Grid item md={8}>
                                        <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="number"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.companyIntenSeats}
                                        name="companyIntenSeats"
                                        error={!!touched.companyIntenSeats && !!errors.companyIntenSeats}
                                        helperText={touched.companyIntenSeats && errors.companyIntenSeats}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item md={12}>
                                <Grid container>
                                    <Grid item md={4}>
                                        <Typography>Company Description</Typography>
                                    </Grid>
                                    <Grid item md={8}>
                                        <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="text"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.companyDescription}
                                        name="companyDescription"
                                        error={!!touched.companyDescription && !!errors.companyDescription}
                                        helperText={touched.companyDescription && errors.companyDescription}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item md={12}>
                                <Grid container>
                                    <Grid item md={4}>
                                        <Typography>Company Rating</Typography>
                                    </Grid>
                                    <Grid item md={8}>
                                        <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="number"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.companyRating}
                                        name="companyRating"
                                        error={!!touched.companyRating && !!errors.companyRating}
                                        helperText={touched.companyRating && errors.companyRating}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>

{/* company contact person details */}
                            <Grid item md={12}>
                                <Typography vatiant='h6' fontWeight={'bold'}>Company Contact Person Details</Typography>
                            </Grid>
                            <Grid item md={12}>
                                <Grid container>
                                    <Grid item md={4}>
                                        <Typography>Contact Person Name</Typography>
                                    </Grid>
                                    <Grid item md={8}>
                                        <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="text"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.companyContactPersonName}
                                        name="companyContactPersonName"
                                        error={!!touched.companyContactPersonName && !!errors.companyContactPersonName}
                                        helperText={touched.companyContactPersonName && errors.companyContactPersonName}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item md={12}>
                                <Grid container justifyContent={"flex-end"}>
                                    <Grid item md={1}>
                                        <Button variant="itms" size='itms=small' type="submit">ADD</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item md={12}>
                                <Grid container>
                                    <Grid item md={4}>
                                        <Typography>Contact Person Contact Number</Typography>
                                    </Grid>
                                    <Grid item md={8}>
                                        <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="text"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.companyContactPersonContactNo}
                                        name="companyContactPersonContactNo"
                                        error={!!touched.companyContactPersonContactNo && !!errors.companyContactPersonContactNo}
                                        helperText={touched.companyContactPersonContactNo && errors.companyContactPersonContactNo}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item md={12}>
                                <Grid container justifyContent={"flex-end"}>
                                    <Grid item md={1}>
                                        <Button variant="itms" size='itms=small' type="submit">ADD</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item md={12}>
                                <Grid container>
                                    <Grid item md={4}>
                                        <Typography>Contact Person Email</Typography>
                                    </Grid>
                                    <Grid item md={8}>
                                        <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="text"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.companyContactPersonEmail}
                                        name="companyContactPersonEmail"
                                        error={!!touched.companyContactPersonEmail && !!errors.companyContactPersonEmail}
                                        helperText={touched.companyContactPersonEmail && errors.companyContactPersonEmail}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item md={12}>
                                <Grid container justifyContent={"flex-end"}>
                                    <Grid item md={1}>
                                        <Button variant="itms" size='itms=small' type="submit">ADD</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item md={12}>
                                <Grid container>
                                    <Grid item md={4}>
                                        <Typography>Contact Person Position</Typography>
                                    </Grid>
                                    <Grid item md={8}>
                                        <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="text"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.companyContactPersonPosition}
                                        name="companyContactPersonPosition"
                                        error={!!touched.companyContactPersonPosition && !!errors.companyContactPersonPosition}
                                        helperText={touched.companyContactPersonPosition && errors.companyContactPersonPosition}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item md={12}>
                                <Grid container justifyContent={"flex-end"}>
                                    <Grid item md={1}>
                                        <Button variant="itms" size='itms=small' type="submit">ADD</Button>
                                    </Grid>
                                </Grid>
                            </Grid>


                        </Grid>
                    </form>
                )}
       </Formik>
    </Tile>    
    
    )
} 