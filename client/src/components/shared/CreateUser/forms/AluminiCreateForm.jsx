import { TextField, Button, Typography, Grid} from "@mui/material"
import React from "react"
import { Tile } from '../../../card/Tile'
import { Formik } from "formik"
import * as yup from "yup"
import { FormControl, Select, MenuItem } from '@mui/material'


const User = {
    aluminiName : '',
    aluminiEmail : '',
    aluminiContactNo : '',
    aluminiRegNo : '',
    aluminiGraduatedYear : '',
    aluminiPassword : '',
}

export const AluminiCreateForm = () => {
   
    const handleFormSubmit = (values) => {
        console.log(values);
    };

    const validation = yup.object().shape({
        aluminiName : yup.string().required('required Field'),
        aluminiEmail : yup.string().email("Invalid Email").required("required Field"),
        aluminiContactNo : yup.string().length(10,"must contain 10 digits").required("Required Field"),
        aluminiRegNo : yup.string().required('required Field'),
        aluminiGraduatedYear : yup.string().required("Required Field"),
        aluminiPassword : yup.string().required('required Field'),
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
                                        <Typography variant="body1">Name</Typography>
                                    </Grid>
                                    <Grid item md={8}>
                                        <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="text"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.aluminiName}
                                        name="aluminiName"
                                        error={!!touched.aluminiName && !!errors.aluminiName}
                                        helperText={touched.aluminiName && errors.aluminiName}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item md={12}>
                                <Grid container>
                                    <Grid item md={4}>
                                        <Typography>Email Address</Typography>
                                    </Grid>
                                    <Grid item md={8}>
                                        <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="email"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.aluminiEmail}
                                        name="aluminiEmail"
                                        error={!!touched.aluminiEmail && !!errors.aluminiEmail}
                                        helperText={touched.aluminiEmail && errors.aluminiEmail}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item md={12}>
                                <Grid container>
                                    <Grid item md={4}>
                                        <Typography>Contact Number</Typography>
                                    </Grid>
                                    <Grid item md={8}>
                                        <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="text"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        values={values.aluminiContactNo}
                                        name="aluminiContactNo"
                                        error={!!touched.aluminiContactNo && !!errors.aluminiContactNo}
                                        helperText={touched.aluminiContactNo && errors.aluminiContactNo}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item md={12}>
                                <Grid container>
                                    <Grid item md={4}>
                                        <Typography>Registraion Number</Typography>
                                    </Grid>
                                    <Grid item md={8}>
                                        <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="text"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.aluminiRegNo}
                                        name="aluminiRegNo"
                                        error={!!touched.aluminiRegNo && !!errors.aluminiRegNo}
                                        helperText={touched.aluminiRegNo && errors.aluminiRegNo}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item md={12}>
                                <Grid container>
                                    <Grid item md={4}>
                                        <Typography>Graduated Year</Typography>
                                    </Grid>
                                    <Grid item md={8}>
                                        <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="text"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.aluminiGraduatedYear}
                                        name="aluminiGraduatedYear"
                                        error={!!touched.aluminiGraduatedYear && !!errors.aluminiGraduatedYear}
                                        helperText={touched.aluminiGraduatedYear && errors.aluminiGraduatedYear}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item md={12}>
                                <Grid container>
                                    <Grid item md={4}>
                                        <Typography>Password</Typography>
                                    </Grid>
                                    <Grid item md={8}>
                                        <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="text"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.aluminiPassword}
                                        name="aluminiPassword"
                                        error={!!touched.aluminiPassword && !!errors.aluminiPassword}
                                        helperText={touched.aluminiPassword && errors.aluminiPassword}
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