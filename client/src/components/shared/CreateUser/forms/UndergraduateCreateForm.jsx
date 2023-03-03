import { TextField, Button, Typography, Grid} from "@mui/material"
import React from "react"
import { Tile } from '../../../card/Tile'
import { Formik } from "formik"
import * as yup from "yup"
import { FormControl, Select, MenuItem } from '@mui/material'


const User = {
    studnetName : '',
    studnetRegNo : '',
    studnetEmail : '',
    studnetContactNo : '',
    studnetPassword : '',
    studnetGpa : '',
    studnetWeigthedGpa : '',
    studnetInternStatus : '',
    studnetLinkedInURL : '',
    studnetGithubURL : '',
}

export const UndergraduateCreateForm = () => {
   
    const handleFormSubmit = (values) => {
        console.log(values);
    };

    const validation = yup.object().shape({
        studnetName : yup.string().required('required Field'),
        studnetRegNo : yup.string().required('required Field'),
        studnetEmail : yup.string().email("Invalid Email").required("required Field"),
        studnetContactNo : yup.string().length(10,"must contain 10 digits").required("Required Field"),
        studnetPassword : yup.string().required("Required Field"),
        studnetGpa : yup.string().required('required Field'),
        studnetWeigthedGpa : yup.string().required('required Field'),
        studnetInternStatus : yup.string(),
        studnetLinkedInURL : yup.string().url("Invalid URL"),
        studnetGithubURL : yup.string().url("Invalid URL"),
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
                                        value={values.studnetName}
                                        name="studnetName"
                                        error={!!touched.studnetName && !!errors.studnetName}
                                        helperText={touched.studnetName && errors.studnetName}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item md={12}>
                                <Grid container>
                                    <Grid item md={4}>
                                        <Typography>Studnet Registration Number</Typography>
                                    </Grid>
                                    <Grid item md={8}>
                                        <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="text"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.studnetRegNo}
                                        name="studnetRegNo"
                                        error={!!touched.studnetRegNo && !!errors.studnetRegNo}
                                        helperText={touched.studnetRegNo && errors.studnetRegNo}
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
                                        value={values.studnetEmail}
                                        name="studnetEmail"
                                        error={!!touched.studnetEmail && !!errors.studnetEmail}
                                        helperText={touched.studnetEmail && errors.studnetEmail}
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
                                        values={values.studnetContactNo}
                                        name="studnetContactNo"
                                        error={!!touched.studnetContactNo && !!errors.studnetContactNo}
                                        helperText={touched.studnetContactNo && errors.studnetContactNo}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item md={12}>
                                <Grid container>
                                    <Grid item md={4}>
                                        <Typography>Studnet Gpa</Typography>
                                    </Grid>
                                    <Grid item md={8}>
                                        <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="text"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.studnetGpa}
                                        name="studnetGpa"
                                        error={!!touched.studnetGpa && !!errors.studnetGpa}
                                        helperText={touched.studnetGpa && errors.studnetGpa}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item md={12}>
                                <Grid container>
                                    <Grid item md={4}>
                                        <Typography>Studnet Weigthed Gpa</Typography>
                                    </Grid>
                                    <Grid item md={8}>
                                        <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="text"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.studnetWeigthedGpa}
                                        name="studnetWeigthedGpa"
                                        error={!!touched.studnetWeigthedGpa && !!errors.studnetWeigthedGpa}
                                        helperText={touched.studnetWeigthedGpa && errors.studnetWeigthedGpa}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item md={12}>
                                <Grid container>
                                    <Grid item md={4}>
                                        <Typography>Intern Status</Typography>
                                    </Grid>
                                    <Grid item md={8}>
                                        <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="text"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.studnetInternStatus}
                                        name="studnetInternStatus"
                                        error={!!touched.studnetInternStatus && !!errors.studnetInternStatus}
                                        helperText={touched.studnetInternStatus && errors.studnetInternStatus}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item md={12}>
                                <Grid container>
                                    <Grid item md={4}>
                                        <Typography>LinkedIn URL</Typography>
                                    </Grid>
                                    <Grid item md={8}>
                                        <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="url"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.studnetLinkedInURL}
                                        name="studnetLinkedInURL"
                                        error={!!touched.studnetLinkedInURL && !!errors.studnetLinkedInURL}
                                        helperText={touched.studnetLinkedInURL && errors.studnetLinkedInURL}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item md={12}>
                                <Grid container>
                                    <Grid item md={4}>
                                        <Typography>Github URL</Typography>
                                    </Grid>
                                    <Grid item md={8}>
                                        <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="text"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.studnetGithubURL}
                                        name="studnetGithubURL"
                                        error={!!touched.studnetGithubURL && !!errors.studnetGithubURL}
                                        helperText={touched.studnetGithubURL && errors.studnetGithubURL}
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