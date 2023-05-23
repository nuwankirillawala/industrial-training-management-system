import { TextField, Stack, Button, Typography } from "@mui/material"
import React from "react"
import { useState, useEffect, useRef } from "react"
import { Tile } from "../../../card/Tile"
import { Formik } from "formik"
import * as yup from "yup"
import { StatusSnackBar } from "../../../StatusSnackBar/StatusSnackBar"
import axios from "axios"




export const UpdateAlumniForm = ({ userId }) => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        contactNo: '',
        regNo: '',
        graduatedYear: ''
    });
    //statusSnackBar state
    const [trigger, setTrigger] = useState({
        success: false,
        error: false,
    });


    const getUserData = async () => {
        try {
            console.log(userId)
            const res = await axios.get(`http://localhost:5000/api/v1/alumni/user/${userId}`,
                { withCredentials: true });

            if (res.status === 200) {
                setUserData({
                    name: res.data.name,
                    email: res.data.email,
                    contactNo: res.data.contactNo,
                    regNo: res.data.regNo,
                    graduatedYear: res.data.graduatedYear
                });

            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getUserData();
    }, [])


    //End of statusSnackBar state
    const handleSnackBar = (key) => {
        setTrigger((prevState) => {
            let newState = { ...prevState };
            newState[key] = !newState[key];
            return newState;
        });
    };

    const User = {
        alumniName: '',
        alumniEmail: '',
        alumniContactNo: '',
        // alumniRegNo: '',
        alumniGraduatedYear: ''
    }

    const validation = yup.object().shape({
        alumniName: yup.string(),
        alumniEmail: yup.string().email("Invalid Email"),
        alumniContactNo: yup.string().length(10, "must contain 10 digits"),
        alumniGraduatedYear: yup.string()
    })


    const handleFormSubmit = async (values) => {
        console.log(values)
        try {
            const res = await axios.patch(`http://localhost:5000/api/v1/alumni/user/${userId}`,
                {
                    id: userId,
                    regNo: userData.regNo,
                    name: values.alumniName === "" ? userData.name : values.alumniName,
                    email: values.alumniEmail === "" ? userData.email : values.alumniEmail,
                    contactNo: values.alumniContactNo === "" ? userData.contactNo : values.alumniContactNo,
                    graduatedYear: values.alumniGraduatedYear === "" ? userData.graduatedYear : values.alumniGraduatedYear

                },
                { withCredentials: true }

            );
            console.log(res.status);

            if (res.status === 201) {
                handleSnackBar("success");
            } else {
                handleSnackBar("error");
            }
        }
        catch (error) {
            console.log(error);
            handleSnackBar("error");
        }
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
                                        placeholder={userData.name}
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
                                        placeholder={userData.email}
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
                                        placeholder={userData.contactNo}
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
                                        placeholder={userData.graduatedYear}
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
                severity="success"
                trigger={trigger.success}
                setTrigger={() => {
                    handleSnackBar(" Update success");
                }}
                alertMessage={"Update Succefully"}
            />
            <StatusSnackBar
                severity="error"
                trigger={trigger.error}
                setTrigger={() => {
                    handleSnackBar("error");
                }}
                alertMessage={"Update Fail"}
            />
        </Tile>

    )
}  