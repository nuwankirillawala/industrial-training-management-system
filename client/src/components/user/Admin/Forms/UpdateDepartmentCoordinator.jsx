import { TextField, Stack, Button, Typography, Select, MenuItem } from "@mui/material"
import React from "react"
import { useState, useEffect } from "react"
import { Tile } from "../../../card/Tile"
import { Formik } from "formik"
import * as yup from "yup"
import { StatusSnackBar } from "../../../StatusSnackBar/StatusSnackBar"
import axios from "axios"

export const UpdateDepartmentCoordinator = ({ userId }) => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        contactNo: '',
        staffId: '',
        coordinatorRole: ''
    });

    const getUserData = async () => {
        try {
            console.log(userId)
            const res = await axios.get(`http://localhost:5000/api/v1/admin/user/${userId}`,
                { withCredentials: true });

            if (res.status === 200) {
                setUserData({
                    name: res.data.user.name,
                    email: res.data.user.email,
                    contactNo: res.data.user.contactNo,
                    staffId: res.data.user.staffId,
                    coordinatorRole: res.data.user.role
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

    const departmentCoordinator = {
        departmentCoordinatorName: '',
        departmentCoordinatorEmail: '',
        departmentCoordinatorContactNo: '',
        departmentCoordinatorStaffId: '',
        //departmentCoordinatorPosition: ''
    }
    const validation = yup.object().shape({
        departmentCoordinatorName: yup.string(),
        departmentCoordinatorEmail: yup.string().email("Invalid Email"),
        departmentCoordinatorContactNo: yup.string().length(10, "must contain 10 digits"),
        departmentCoordinatorStaffId: yup.string(),
        // departmentCoordinatorPosition: yup.string()
    })


    const handleFormSubmit = async (values) => {
        console.log(values);
        try {
            const res = await axios.patch(`http://localhost:5000/api/v1/admin/user/${userId}`,
                {
                    id: userId,
                    name: values.departmentCoordinatorName === "" ? userData.name : values.departmentCoordinatorName,
                    role: userData.role, /* values.departmentCoordinatorPosition  === "" ? userData.role : values.adminRole, */
                    email: values.departmentCoordinatorEmail === "" ? userData.email : values.adminEmail,
                    contactNo: values.departmentCoordinatorContactNo === "" ? userData.contactNo : values.adminContactNo,
                    staffId: values.departmentCoordinatorStaffId === "" ? userData.staffId : values.adminStaffId
                },
                { withCredentials: true }
            );
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
                                        placeholder={userData.name}
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
                                        placeholder={userData.email}
                                        value={values.departmentCoordinatorEmail}
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
                                        placeholder={userData.contactNo}
                                        value={values.departmentCoordinatorContactNo}
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
                                        placeholder={userData.staffId}
                                        value={values.departmentCoordinatorStaffId}
                                        name="departmentCoordinatorStaffId"
                                        error={!!touched.departmentCoordinatorStaffId && !!errors.departmentCoordinatorStaffId}
                                        helperText={touched.departmentCoordinatorStaffId && errors.departmentCoordinatorStaffId}
                                    />
                                </Stack>
                            </Stack>

                            {/* <Stack direction="row" spacing={2}>
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
                                        placeholder={userData.coordinatorRole}
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
 */}
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