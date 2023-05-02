import { TextField, Stack, Button, Typography } from "@mui/material"
import React from "react"
import { useState, useEffect, useRef } from "react"
import { Tile } from "../../../card/Tile"
import { Formik } from "formik"
import * as yup from "yup"
import { StatusSnackBar } from "../../../StatusSnackBar/StatusSnackBar"


const Student = {
    studnetName: '',
    studnetEmail: '',
    studnetContactNo: '',
    studnetGpa: '',
    studnetWeightedGpa: '',
    studnetInternStatus: '',
    // studnetPassword : '', we have forgot password
    // studnetRegNo : '',
    // studnetLinkedInURL : '',
    // studnetGithubURL : '',
}

export const UpdateUndergraduateForm = () => {
    //add axios while integrate to get initial values

    const validation = yup.object().shape({
        studnetName: yup.string(),
        studnetEmail: yup.string().email("Invalid Email"),
        studnetContactNo: yup.string().length(10, "must contain 10 digits"),
        studnetGpa: yup.number(),
        studnetWeightedGpa: yup.number(),
        studnetInternStatus: yup.string()
    })

    const [SnackbarOpen, setSnackbarOpen] = useState(false)

    const handleSnackBar = (key) => {
        setSnackbarOpen((prevState) => {
            let newState = { ...prevState };
            newState[key] = !newState[key];
            return newState;
        });
    };

    const handleFormSubmit = (values) => {
        alert(JSON.stringify(values));//convert object to a json file, this popup may omitt @ the integration
        handleSnackBar("success");
    }


    return (
        <Tile>
            <Formik

                initialValues={Student}
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
                                        value={values.studnetName} //if u use User here it will not let change text
                                        name="studnetName"
                                        error={!!touched.studnetName && !!errors.studnetName}
                                        helperText={touched.studnetName && errors.studnetName}
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
                                        value={values.studnetEmail} //if u use User here it will not let change text
                                        name="studnetEmail"
                                        error={!!touched.studnetEmail && !!errors.studnetEmail}
                                        helperText={touched.studnetEmail && errors.studnetEmail}
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
                                        value={values.studnetContactNo} //if u use User here it will not let change text
                                        name="studnetstudnetContactNoName"
                                        error={!!touched.studnetContactNo && !!errors.studnetContactNo}
                                        helperText={touched.studnetContactNo && errors.studnetContactNo}
                                    />
                                </Stack>
                            </Stack>


                            <Stack direction="row" spacing={2}>
                                <Stack width='150px'>
                                    <Typography variant="body1">GPA </Typography>
                                </Stack>
                                <Stack width='300px'>
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
                                </Stack>
                            </Stack>

                            <Stack direction="row" spacing={2}>
                                <Stack width='150px'>
                                    <Typography variant="body1">Weighted GPA</Typography>
                                </Stack>
                                <Stack width='300px'>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="text"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.studnetWeightedGpa}
                                        name="studnetWeightedGpa"
                                        error={!!touched.studnetWeightedGpa && !!errors.studnetWeightedGpa}
                                        helperText={touched.studnetWeightedGpa && errors.studnetWeightedGpa}
                                    />
                                </Stack>
                            </Stack>

                            <Stack direction="row" spacing={2}>
                                <Stack width='150px'>
                                    <Typography variant="body1">Intern Status</Typography>
                                </Stack>
                                <Stack width='300px'>
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