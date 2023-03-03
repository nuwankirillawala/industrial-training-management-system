import { TextField, Button, Typography, Grid} from "@mui/material"
import React from "react"
import { Tile } from '../../../card/Tile'
import { Formik } from "formik"
import * as yup from "yup"
import { FormControl, Select, MenuItem } from '@mui/material'


const User = {
    supervisorName : '',
    supervisorEmail : '',
    supervisorContactNo : '',
    supervisorCompany : '',
    supervisorJobRole : '',
    supervisorPassword : ''
}

export const SupervisorCreateForm = () => {
   
    const handleFormSubmit = (values) => {
        console.log(values);
    };

    const validation = yup.object().shape({
        supervisorName : yup.string().required('required Field'),
        supervisorEmail : yup.string().email("Invalid Email").required("required Field"),
        supervisorContactNo : yup.string().length(10,"must contain 10 digits").required("Required Field"),
        supervisorCompany : yup.string().required('required Field'),
        supervisorJobRole : yup.string().required("Required Field"),
        supervisorPassword : yup.string().required('required Field'),
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
                                        value={values.supervisorName}
                                        name="supervisorName"
                                        error={!!touched.supervisorName && !!errors.supervisorName}
                                        helperText={touched.supervisorName && errors.supervisorName}
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
                                        value={values.supervisorEmail}
                                        name="supervisorEmail"
                                        error={!!touched.supervisorEmail && !!errors.supervisorEmail}
                                        helperText={touched.supervisorEmail && errors.supervisorEmail}
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
                                        values={values.supervisorContactNo}
                                        name="supervisorContactNo"
                                        error={!!touched.supervisorContactNo && !!errors.supervisorContactNo}
                                        helperText={touched.supervisorContactNo && errors.supervisorContactNo}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item md={12}>
                                <Grid container>
                                    <Grid item md={4}>
                                        <Typography>Supervisor Company</Typography>
                                    </Grid>
                                    <Grid item md={8}>
                                        <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="text"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.supervisorCompany}
                                        name="supervisorCompany"
                                        error={!!touched.supervisorCompany && !!errors.supervisorCompany}
                                        helperText={touched.supervisorCompany && errors.supervisorCompany}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item md={12}>
                                <Grid container>
                                    <Grid item md={4}>
                                        <Typography>Supervisor JobRole</Typography>
                                    </Grid>
                                    <Grid item md={8}>
                                        <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="text"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.supervisorJobRole}
                                        name="supervisorJobRole"
                                        error={!!touched.supervisorJobRole && !!errors.supervisorJobRole}
                                        helperText={touched.supervisorJobRole && errors.supervisorJobRole}
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
                                        value={values.supervisorPassword}
                                        name="supervisorPassword"
                                        error={!!touched.supervisorPassword && !!errors.supervisorPassword}
                                        helperText={touched.supervisorPassword && errors.supervisorPassword}
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