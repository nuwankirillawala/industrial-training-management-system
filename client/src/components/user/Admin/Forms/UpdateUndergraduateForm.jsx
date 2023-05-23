import { TextField, Stack, Button, Typography } from "@mui/material"
import React from "react"
import { useState, useEffect, useRef } from "react"
import { Tile } from "../../../card/Tile"
import { Formik } from "formik"
import * as yup from "yup"
import { StatusSnackBar } from "../../../StatusSnackBar/StatusSnackBar"
import axios from "axios"

export const UpdateUndergraduateForm = ({ userId }) => {
    const [userData, setUserData] = useState({
        name: '',
        regNo: '',
        email: '',
        contactNo: '',
        internStatus: '',
        linkedInURL: '',
        githubURL: ''
        // studnetGpa: '', //not available for bckend update
        // studnetWeightedGpa: '',
        // studnetPassword : '', 

    })

    const getUserData = async () => {
        try {
            console.log(userId)
            const res = await axios.get(`http://localhost:5000/api/v1/undergraduate/user/${userId}`,
                { withCredentials: true });
            console.log(res.data)
            if (res.status === 200) {
                setUserData({
                    name: res.data.user.name,  //contact, linkedin ,github is not coming from backend,, empty status coming
                    regNo: res.data.user.regNo,
                    email: res.data.user.email,
                    contactNo: res.data.user.contactNo,
                    internStatus: res.data.user.internStatus,
                    linkedInURL: res.data.user.linkdinURL,
                    githubURL: res.data.user.githubURL

                });

            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getUserData();
    }, [])


    //statusSnackBar state
    const [trigger, setTrigger] = useState({
        success: false,
        error: false,
    });

    //End of statusSnackBar state
    const handleSnackBar = (key) => {
        setTrigger((prevState) => {
            let newState = { ...prevState };
            newState[key] = !newState[key];
            return newState;
        });
    };

    const Student = {
        studnetName: '',
        studnetEmail: '',
        studnetContactNo: '',
        studnetInternStatus: '',
        studnetLinkedInURL: '',
        studnetGithubURL: ''
    }

    const validation = yup.object().shape({
        studnetName: yup.string(),
        studnetEmail: yup.string().email("Invalid Email"),
        studnetContactNo: yup.string().length(10, "must contain 10 digits"),
        // studnetGpa: yup.number(),
        // studnetWeightedGpa: yup.number(),
        studnetInternStatus: yup.string(),
        studnetLinkedInURL: yup.string(),
        studnetGithubURL: yup.string()
    })

    const handleFormSubmit = async (values) => {
        console.log(values);
        try {
            const res = await axios.patch(`http://localhost:5000/api/v1/undergraduate/user/${userId}`,
                {

                    id: userId,
                    email: values.studnetEmail === "" ? userData.email : values.studnetEmail,
                    contactNo: values.studnetContactNo === "" ? userData.contactNo : values.studnetContactNo,
                    linkdinURL: values.studnetLinkedInURL === "" ? userData.linkedInURL : values.studnetLinkedInURL,
                    githubURL: values.studnetGithubURL === "" ? userData.githubURL : values.studnetGithubURL,
                    internStatus: values.studnetInternStatus === "" ? userData.internStatus : values.studnetInternStatus,
                    //name & regNo is not in backend to change
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
                            {/* <Stack direction="row" spacing={2}>
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
                                        value={values.studnetName}
                                        name="studnetName"
                                        error={!!touched.studnetName && !!errors.studnetName}
                                        helperText={touched.studnetName && errors.studnetName}
                                    />
                                </Stack>
                            </Stack> */}
                            <Typography fontWeight={'bold'}>SC Number : {userData.regNo}</Typography>
                            <Typography fontWeight={'bold'} paddingBottom={'10px'}>Name : {userData.name}</Typography>

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
                                        value={values.studnetEmail}
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
                                        placeholder={userData.contactNo}
                                        value={values.studnetContactNo}
                                        name="studnetContactNo"
                                        error={!!touched.studnetContactNo && !!errors.studnetContactNo}
                                        helperText={touched.studnetContactNo && errors.studnetContactNo}
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
                                        placeholder={userData.internStatus}
                                        value={values.studnetInternStatus}
                                        name="studnetInternStatus"
                                        error={!!touched.studnetInternStatus && !!errors.studnetInternStatus}
                                        helperText={touched.studnetInternStatus && errors.studnetInternStatus}
                                    />
                                </Stack>
                            </Stack>
                            <Stack direction="row" spacing={2}>
                                <Stack width='150px'>
                                    <Typography variant="body1">LinkedIn URl</Typography>
                                </Stack>
                                <Stack width='300px'>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="text"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder={userData.linkedInURL}
                                        value={values.studnetLinkedInURL}
                                        name="studnetLinkedInURL"
                                        error={!!touched.studnetLinkedInURL && !!errors.studnetLinkedInURL}
                                        helperText={touched.studnetLinkedInURL && errors.studnetLinkedInURL}
                                    />
                                </Stack>
                            </Stack>
                            <Stack direction="row" spacing={2}>
                                <Stack width='150px'>
                                    <Typography variant="body1">Github URL</Typography>
                                </Stack>
                                <Stack width='300px'>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="text"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder={userData.githubURL}
                                        value={values.studnetGithubURL}
                                        name="studnetGithubURL"
                                        error={!!touched.studnetGithubURL && !!errors.studnetGithubURL}
                                        helperText={touched.studnetGithubURL && errors.studnetGithubURL}
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


