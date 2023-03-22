import { TextField, Button, Typography, Grid} from "@mui/material"
import React from "react"
import { Tile } from '../../../card/Tile'
import { Formik } from "formik"
import * as yup from "yup"
import { FormControl, Select, MenuItem } from '@mui/material'


const User = {
    adminName : '',
    adminEmail : '',
    adminContactNo : '',
    adminStaffId : '',
    adminPassword : '',
    adminRole : ''
}

export const AdminCreateForm = () => {
   
    const handleFormSubmit = (values) => {
        console.log(values);
    };

    const validation = yup.object().shape({
        // adminName : yup.string(),
        adminName : yup.string().required('required Field'),
        adminEmail : yup.string().email("Invalid Email").required("required Field"),
        adminContactNo : yup.string().length(10,"must contain 10 digits").required("Required Field"),
        // adminStaffId : yup.string().required('required Field'),
        adminPassword : yup.string().required("Required Field"),
        adminRole : yup.string().required('required Field'),
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
                                        value={values.adminName}
                                        name="adminName"
                                        error={!!touched.adminName && !!errors.adminName}
                                        helperText={touched.adminName && errors.adminName}
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
                                        value={values.adminEmail}
                                        name="adminEmail"
                                        error={!!touched.adminEmail && !!errors.adminEmail}
                                        helperText={touched.adminEmail && errors.adminEmail}
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
                                        values={values.adminContactNo}
                                        name="adminContactNo"
                                        error={!!touched.adminContactNo && !!errors.adminContactNo}
                                        helperText={touched.adminContactNo && errors.adminContactNo}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item md={12}>
                                <Grid container>
                                    <Grid item md={4}>
                                        <Typography>Staff Id</Typography>
                                    </Grid>
                                    <Grid item md={8}>
                                        <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="text"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.adminStaffId}
                                        name="adminStaffId"
                                        error={!!touched.adminStaffId && !!errors.adminStaffId}
                                        helperText={touched.adminStaffId && errors.adminStaffId}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item md={12}>
                                <Grid container>
                                    <Grid item md={4}>
                                        <Typography>Admin Role</Typography>
                                    </Grid>
                                    <Grid item md={8}>
                                        <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="adminRole"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.adminRole}
                                        name="adminRole"
                                        error={!!touched.adminRole && !!errors.adminRole}
                                        helperText={touched.adminRole && errors.adminRole}
                                        />

                                        {/* <FormControl fullWidth>
                                            <Select
                                            fullWidth
                                            variant="outlined"
                                            type="adminRole"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            values={values.adminRole}
                                            name="adminRole"
                                            error={!!touched.adminRole && !!errors.adminRole}
                                            // helperText={touched.adminRole && errors.adminRole}
                                            >
                                                <MenuItem value="none"><em>None</em></MenuItem>
                                                <MenuItem value="value1">value 1</MenuItem>
                                                <MenuItem value="value2">value 2</MenuItem>
                                                <MenuItem value="value3">value 3</MenuItem>
                                            </Select>
                                        </FormControl> */}
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
                                        value={values.adminPassword}
                                        name="adminPassword"
                                        error={!!touched.adminPassword && !!errors.adminPassword}
                                        helperText={touched.adminPassword && errors.adminPassword}
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