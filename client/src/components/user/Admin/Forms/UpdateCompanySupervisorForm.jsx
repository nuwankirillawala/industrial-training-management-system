import { TextField, Stack, Button, Typography } from "@mui/material"
import React from "react"
import { useState, useEffect, useRef } from "react"
import { Tile } from "../../../card/Tile"
import { Formik } from "formik"
import * as yup from "yup"
import { StatusSnackBar } from "../../../StatusSnackBar/StatusSnackBar"
import axios from "axios"


export const UpdateCompanySupervisorForm = ({ userId }) => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        contactNo: '',
        company: '',
        jobRole: ''
    });
    //statusSnackBar state
    const [trigger, setTrigger] = useState({
        success: false,
        error: false,
    });



    const getUserData = async () => {
        try {
            console.log(userId)
            const res = await axios.get(`http://localhost:5000/api/v1/supervisor/${userId}`,
                { withCredentials: true });
            console.log(res.data)
            if (res.status === 200) {
                setUserData({
                    name: res.data.name,
                    email: res.data.email,
                    contactNo: res.data.contactNo,
                    company: res.data.company,
                    jobRole: res.data.jobRole
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


    const CompanySupervisor = {
        supervisorName: '',
        supervisorEmail: '',
        supervisorContactNo: '',
        supervisorCompany: '',
        supervisorJobRole: '',
        // supervisorPassword : ''
    }

    const validation = yup.object().shape({
        supervisorName: yup.string(),
        supervisorEmail: yup.string().email("Invalid Email"),
        supervisorContactNo: yup.string().length(10, "must contain 10 digits"),
        supervisorCompany: yup.string(),
        supervisorJobRole: yup.string(),
        //supervisorPassword: yup.string()
    })

    const handleFormSubmit = async (values) => {
        console.log(values);  // working
        console.log(userId)
        try {
            const res = await axios.patch(`http://localhost:5000/api/v1/supervisor/${userId}`,
                {
                    id: userId,
                    name: values.supervisorName === "" ? userData.name : values.supervisorName,
                    email: values.supervisorEmail === "" ? userData.email : values.supervisorEmail,
                    contactNo: values.supervisorContactNo === "" ? userData.contactNo : values.supervisorContactNo,
                    jobRole: values.supervisorJobRole === "" ? userData.jobRole : values.supervisorJobRole,
                    company: values.supervisorCompany === "" ? userData.company : values.supervisorCompany
                },
                { withCredentials: true }
            );
            window.location.reload(false);
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
                            <Stack spacing={1}>
                                <Stack direction="row" spacing={2}>
                                    <Stack width='150px'>
                                        <Typography variant="body1">Name</Typography>
                                    </Stack>
                                    <Stack width='300px'>
                                        <TextField
                                            size="small"
                                            fullWidth
                                            variant="outlined"
                                            type="text"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder={userData.name}
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
                                            size="small"
                                            fullWidth
                                            variant="outlined"
                                            type="text"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder={userData.email}
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
                                            size="small"
                                            fullWidth
                                            variant="outlined"
                                            type="text"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder={userData.contactNo}
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
                                            size="small"
                                            fullWidth
                                            variant="outlined"
                                            type="text"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder={userData.company}
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
                                            size="small"
                                            fullWidth
                                            variant="outlined"
                                            type="text"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder={userData.jobRole}
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