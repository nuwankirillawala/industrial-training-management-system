import { TextField, Stack, Button, Typography } from "@mui/material"
import React from "react"
import { useState, useEffect, useRef } from "react"
import { Tile } from "../../../card/Tile"
import { Formik } from "formik"
import * as yup from "yup"

const CompanySupervisor = {
    supervisorName: '',
    supervisorEmail: '',
    supervisorContactNo: '',
    supervisorCompany: '',
    supervisorJobRole: '',
    // supervisorPassword : ''
}

export const UpdateCompanySupervisorForm = () => {

    const validation = yup.object().shape({
        supervisorName: yup.string(),
        supervisorEmail: yup.string().email("Invalid Email"),
        supervisorContactNo: yup.string().length(10, "must contain 10 digits"),
        supervisorCompany: yup.string(),
        supervisorJobRole: yup.string(),
        //supervisorPassword: yup.string()
    })


    const handleFormSubmit = (values) => {
        alert(JSON.stringify(values));//convert object to a json file, this popup may omitt @ the integration
        alert("your data is submitted");
    }


    return (
        <Tile>
            <Formik
                initialValues={CompanySupervisor}
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
                                        value={values.supervisorName} //if u use User here it will not let change text
                                        name="supervisorName"
                                        error={!!touched.supervisorName && !!errors.supervisorName}
                                        helperText={touched.supervisorName && errors.supervisorName}
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
                                        value={values.supervisorEmail}
                                        name="supervisorEmail"
                                        error={!!touched.supervisorEmail && !!errors.supervisorEmail}
                                        helperText={touched.supervisorEmail && errors.supervisorEmail}
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
                                        value={values.supervisorContactNo}
                                        name="supervisorContactNo"
                                        error={!!touched.supervisorContactNo && !!errors.supervisorContactNo}
                                        helperText={touched.supervisorContactNo && errors.supervisorContactNo}
                                    />
                                </Stack>
                            </Stack>

                            <Stack direction="row" spacing={2}>
                                <Stack width='150px'>
                                    <Typography variant="body1">Company Name</Typography>
                                </Stack>
                                <Stack width='300px'>
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
                                </Stack>
                            </Stack>
                            <Stack direction="row" spacing={2}>
                                <Stack width='150px'>
                                    <Typography variant="body1">Job Role</Typography>
                                </Stack>
                                <Stack width='300px'>
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