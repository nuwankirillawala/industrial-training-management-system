import { TextField, Stack, Button, Typography } from "@mui/material"
import React from "react"
import { useState, useEffect } from "react"
import { Tile } from "../../../card/Tile"
import { Formik } from "formik"
import * as yup from "yup"
import { StatusSnackBar } from "../../../StatusSnackBar/StatusSnackBar"
import axios from 'axios';

export const UpdateAdminForm = ({ userId }) => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        contactNo: '',
        staffId: '',
        adminRole: ''
    });

    const getUserData = async () => {
        try {
            console.log(userId)
            const res = await axios.get(`http://localhost:5000/api/v1/admin/user/${userId}`,
                { withCredentials: true });
            // console.log(res.data)
            if (res.status === 200) {
                setUserData({
                    name: res.data.user.name,
                    email: res.data.user.email,
                    contactNo: res.data.user.contactNo,
                    staffId: res.data.user.staffId,
                    adminRole: res.data.user.role
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

    const Admin = {
        adminName: '',
        adminEmail: '',
        adminContactNo: '',
        adminStaffId: '',
        adminRole: ''
    }

    const validation = yup.object().shape({
        adminName: yup.string(),
        adminEmail: yup.string().email("Invalid Email"),
        adminContactNo: yup.string().length(10, "must contain 10 digits"),
        adminStaffId: yup.string(),
        adminRole: yup.string()
    })



    const handleFormSubmit = async (values) => {
        console.log(values);  // working
        console.log(userId)
        try {
            const res = await axios.patch(`http://localhost:5000/api/v1/admin/user/${userId}`,
                {
                    id: userId,
                    name: values.adminName === "" ? userData.name : values.adminName,
                    role: values.adminRole === "" ? userData.role : values.adminRole,
                    email: values.adminEmail === "" ? userData.email : values.adminEmail,
                    contactNo: values.adminContactNo === "" ? userData.contactNo : values.adminContactNo,
                    staffId: values.adminStaffId === "" ? userData.staffId : values.adminStaffId
                },
                { withCredentials: true }
            );
            window.location.reload(false); // refresh page
            console.log(res.status);

            if (res.status === 200) {
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
                                        placeholder={userData.name}
                                        name="adminName"
                                        value={values.adminName}
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
                                        placeholder={userData.email}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.adminEmail}
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
                                        placeholder={userData.contactNo}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.adminContactNo}
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
                                        placeholder={userData.staffId}
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
                                        placeholder={userData.adminRole}
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