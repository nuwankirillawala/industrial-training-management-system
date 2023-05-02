import { TextField, Stack, Button, Typography } from "@mui/material"
import React from "react"
import { useState, useEffect, useRef } from "react"
import { Tile } from "../../../card/Tile"
import { Formik } from "formik"
import * as yup from "yup"
import { StatusSnackBar } from "../../../StatusSnackBar/StatusSnackBar"


const User = {
    alumniName: 'ajith',
    alumniEmail: '',
    alumniContactNo: '',
    alumniRegNo: '', //not allowed to change
    alumniGraduatedYear: ''
}

export const UpdateAlumniForm = () => {
    const [SnackbarOpen, setSnackbarOpen] = useState(false)

    const handleSnackBar = (key) => {
        setSnackbarOpen((prevState) => {
            let newState = { ...prevState };
            newState[key] = !newState[key];
            return newState;
        });
    };

    const validation = yup.object().shape({
        alumniName: yup.string(),
        alumniEmail: yup.string().email("Invalid Email"),
        alumniContactNo: yup.string().length(10, "must contain 10 digits"),
        alumniGraduatedYear: yup.string()
    })


    const handleFormSubmit = (values) => {
        alert(JSON.stringify(values));//convert object to a json file, this popup may omitt @ the integration
        handleSnackBar("success");
    }


    return (
        <Tile>
            <Formik

                initialValues={User}
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
                                        value={values.alumniName} //if u use User here it will not let change text
                                        name="alumniName"
                                        error={!!touched.alumniName && !!errors.alumniName}
                                        helperText={touched.alumniName && errors.alumniName}
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
                                        value={values.alumniEmail}
                                        name="alumniEmail"
                                        error={!!touched.alumniEmail && !!errors.alumniEmail}
                                        helperText={touched.alumniEmail && errors.alumniEmail}
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
                                        value={values.alumniContactNo}
                                        name="alumniContactNo"
                                        error={!!touched.alumniContactNo && !!errors.alumniContactNo}
                                        helperText={touched.alumniContactNo && errors.alumniContactNo}
                                    />
                                </Stack>
                            </Stack>

                            <Stack direction="row" spacing={2}>
                                <Stack width='150px'>
                                    <Typography variant="body1">Graduated Year</Typography>
                                </Stack>
                                <Stack width='300px'>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="text"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.alumniGraduatedYear}
                                        name="alumniGraduatedYear"
                                        error={!!touched.alumniGraduatedYear && !!errors.alumniGraduatedYear}
                                        helperText={touched.alumniGraduatedYear && errors.alumniGraduatedYear}
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
            <StatusSnackBar
                trigger={SnackbarOpen.success}
                setTrigger={() => {
                    handleSnackBar("success");
                }}
                severity='success'
                alertMessage={' submitted '}></StatusSnackBar>
        </Tile>

    )
}  