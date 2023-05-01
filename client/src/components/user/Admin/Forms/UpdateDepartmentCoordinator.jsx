import { TextField, Stack, Button, Typography, Select, MenuItem } from "@mui/material"
import React from "react"
import { useState } from "react"
import { Tile } from "../../../card/Tile"
import { Formik } from "formik"
import * as yup from "yup"
import { StatusSnackBar } from "../../../StatusSnackBar/StatusSnackBar"


const departmentCoordinator = {
    departmentCoordinatorName: '',
    departmentCoordinatorEmail: '',
    departmentCoordinatorContactNo: '',
    departmentCoordinatorStaffId: '',
    //departmentCoordinatorPassword : '',
    departmentCoordinatorPosition: ''
}

export const UpdateDepartmentCoordinator = () => {
    //add axios while integrate to get initial values

    const validation = yup.object().shape({
        departmentCoordinatorName: yup.string(),
        departmentCoordinatorEmail: yup.string().email("Invalid Email"),
        departmentCoordinatorContactNo: yup.string().length(10, "must contain 10 digits"),
        departmentCoordinatorStaffId: yup.string(),
        departmentCoordinatorPosition: yup.string()
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

                initialValues={departmentCoordinator}
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
                                        value={values.departmentCoordinatorName} //if u use User here it will not let change text
                                        name="departmentCoordinatorName"
                                        error={!!touched.departmentCoordinatorName && !!errors.departmentCoordinatorName}
                                        helperText={touched.departmentCoordinatorName && errors.departmentCoordinatorName}
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
                                        value={values.departmentCoordinatorEmail} //if u use User here it will not let change text
                                        name="departmentCoordinatorEmail"
                                        error={!!touched.departmentCoordinatorEmail && !!errors.departmentCoordinatorEmail}
                                        helperText={touched.departmentCoordinatorEmail && errors.departmentCoordinatorEmail}
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
                                        value={values.departmentCoordinatorContactNo} //if u use User here it will not let change text
                                        name="departmentCoordinatorContactNo"
                                        error={!!touched.departmentCoordinatorContactNo && !!errors.departmentCoordinatorContactNo}
                                        helperText={touched.departmentCoordinatorContactNo && errors.departmentCoordinatorContactNo}
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
                                        value={values.departmentCoordinatorStaffId}
                                        name="departmentCoordinatorStaffId"
                                        error={!!touched.departmentCoordinatorStaffId && !!errors.departmentCoordinatorStaffId}
                                        helperText={touched.departmentCoordinatorStaffId && errors.departmentCoordinatorStaffId}
                                    />
                                </Stack>
                            </Stack>

                            <Stack direction="row" spacing={2}>
                                <Stack width='150px'>
                                    <Typography variant="body1">Position</Typography>
                                </Stack>
                                <Stack width='300px'>
                                    <Select
                                        fullWidth
                                        variant="outlined"
                                        type="text"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.departmentCoordinatorPosition}
                                        name="departmentCoordinatorPosition"
                                        error={!!touched.departmentCoordinatorPosition && !!errors.departmentCoordinatorPosition}
                                        helperText={touched.departmentCoordinatorPosition && errors.departmentCoordinatorPosition}>
                                        <MenuItem value="Proffer">Proffessor</MenuItem>
                                        <MenuItem value="SeniorLec1">Senior Lecture 1</MenuItem>
                                        <MenuItem value="SeniorLec2">Senior Lecture 2</MenuItem>
                                        <MenuItem value="SeniorLec3">Senior Lecture 3</MenuItem>
                                        <MenuItem value="Lecture">Lecture</MenuItem>
                                        <MenuItem value="Probeshanary">Probeshanary</MenuItem>
                                    </Select>
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