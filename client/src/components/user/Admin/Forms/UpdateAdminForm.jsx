import { TextField, Stack, Button, Typography } from "@mui/material"
import React from "react"
import { useState } from "react"
import { Tile } from "../../../card/Tile"
import { Formik } from "formik"
import * as yup from "yup"


const Admin = {
    adminName: '',
    adminEmail: '',
    adminContactNo: '',
    adminStaffId: '',
    //  adminPassword: '', 
    adminRole: ''
}

export const UpdateAdminForm = () => {
    //add axios while integrate to get initial values

    const validation = yup.object().shape({
        adminName: yup.string(),
        adminEmail: yup.string().email("Invalid Email"),
        adminContactNo: yup.string().length(10, "must contain 10 digits"),
        adminStaffId: yup.string(),
        adminRole: yup.string()
    })


    const handleFormSubmit = (values) => {
        alert(JSON.stringify(values));//convert object to a json file, this popup may omitt @ the integration
        alert("your data is submitted");
    }


    return (
        <Tile>
            <Formik

                initialValues={Admin}
                validationSchema={validation}>
                {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    handleReset  //this gives initialvalues not clear fields
                }) => (
                    <form onReset={handleReset}
                        onSubmit={(e) => { e.preventDefault(); handleSubmit; handleFormSubmit(values); }} >
                        <>
                            <Stack direction="row" spacing={2}>
                                <Stack width='150px'>
                                    <Typography variant="body1">Name</Typography>
                                </Stack>
                                <Stack width='300px'>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="text"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.adminName} //if u use User here it will not let change text
                                        name="adminName"
                                        error={!!touched.adminName && !!errors.adminName}
                                        helperText={touched.adminName && errors.adminName}
                                    />
                                </Stack>
                            </Stack>

                            <Stack direction="row" spacing={2}>
                                <Stack width='150px'>
                                    <Typography variant="body1">E-mail</Typography>
                                </Stack>
                                <Stack width='300px'>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="text"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.adminEmail} //if u use User here it will not let change text
                                        name="adminEmail"
                                        error={!!touched.adminEmail && !!errors.adminEmail}
                                        helperText={touched.adminEmail && errors.adminEmail}
                                    />
                                </Stack>
                            </Stack>

                            <Stack direction="row" spacing={2}>
                                <Stack width='150px'>
                                    <Typography variant="body1">Contact Number</Typography>
                                </Stack>
                                <Stack width='300px'>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="text"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.adminContactNo} //if u use User here it will not let change text
                                        name="adminContactNo"
                                        error={!!touched.adminContactNo && !!errors.adminContactNo}
                                        helperText={touched.adminContactNo && errors.adminContactNo}
                                    />
                                </Stack>
                            </Stack>


                            <Stack direction="row" spacing={2}>
                                <Stack width='150px'>
                                    <Typography variant="body1">Staff ID </Typography>
                                </Stack>
                                <Stack width='300px'>
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
                                </Stack>
                            </Stack>

                            <Stack direction="row" spacing={2}>
                                <Stack width='150px'>
                                    <Typography variant="body1">Administrator role</Typography>
                                </Stack>
                                <Stack width='300px'>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="text"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.adminRole}
                                        name="adminRole"
                                        error={!!touched.adminRole && !!errors.adminRole}
                                        helperText={touched.adminRole && errors.adminRole}
                                    />
                                </Stack>
                            </Stack>

                            <Stack direction="row" display={'flex'} justifyContent="flex-end" paddingRight={'0px'}>
                                <Button variant="itms" type="submit"  >Submit</Button>
                                <Button variant="itms" type="reset"  >Reset</Button>
                            </Stack>
                        </>
                    </form>
                )}
            </Formik>
        </Tile>

    )
}  