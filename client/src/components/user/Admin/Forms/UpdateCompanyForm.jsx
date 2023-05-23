import { TextField, Stack, Button, Typography } from "@mui/material"
import React from "react"
import { useState, useEffect } from "react"
import { Tile } from "../../../card/Tile"
import { Formik } from "formik"
import * as yup from "yup"
import { StatusSnackBar } from "../../../StatusSnackBar/StatusSnackBar"
import axios from "axios"


export const UpdateCompanyForm = ({ companyId }) => {

    const [companyData, setCompanyData] = useState({
        name: '',
        email: '',
        contactNo: '',
        address: '',
        internSeats: '',
        description: '',
        connectedForIntern: ''
    });

    const getCompanyData = async () => {
        try {
            // console.log(companyId)
            const res = await axios.get(`http://localhost:5000/api/v1/company/${companyId}/profile`,
                { withCredentials: true });
            console.log(res.data)
            if (res.status === 201) {
                setCompanyData({
                    name: res.data.company.name,
                    email: res.data.company.email,
                    contactNo: res.data.company.contactNo,
                    address: res.data.company.address,
                    internSeats: res.data.company.internSeats,
                    description: res.data.company.description,
                    connectedForIntern: res.data.company.connectedForIntern
                });

            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getCompanyData();
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

    const Company = {
        CompanyName: '',
        CompanyEmail: '',
        CompanyContact: '',
        CompanyAddress: '',
        NoInternshipSeats: '',
        CompanyDescription: '',
        ConnectedForIntern: ''
        /* ,
        CompanyRating: '',
        CompanyContactpersonname: '',
        CompanyContactPersonContact: '',
        CompanyContactPersonEmail: '' */
    }

    const validation = yup.object().shape({
        CompanyName: yup.string(),
        CompanyEmail: yup.string().email("Invalid Email"),
        CompanyContact: yup.string().length(10, "must contain 10 numbers"), //.matches("/^[0-9] /")
        CompanyAddress: yup.string(),
        NoInternshipSeats: yup.number(),
        CompanyDescription: yup.string(),
        ConnectedForIntern: yup.string()
        /*  ,
         CompanyRating: yup.string(),
         CompanyContactpersonname: yup.string(),
         CompanyContactPersonContact: yup.string().length(10, "must contain 10 numbers"),
         CompanyContactPersonEmail: yup.string().email("Invalid Email") */
    })



    const handleFormSubmit = async (values) => {
        console.log(values);  // working
        console.log(companyId)
        try {
            const res = await axios.patch(`http://localhost:5000/api/v1/company/${companyId}/profile`,
                {
                    id: companyId,
                    name: values.CompanyName === "" ? companyData.name : values.CompanyName,
                    email: values.CompanyEmail === "" ? companyData.email : values.CompanyEmail,
                    contactNo: values.CompanyContact === "" ? companyData.contactNo : values.CompanyContact,
                    address: values.CompanyAddress === "" ? companyData.address : values.CompanyAddress,
                    internSeats: values.NoInternshipSeats === "" ? companyData.internSeats : values.NoInternshipSeats,
                    description: values.CompanyDescription === "" ? companyData.description : values.CompanyDescription,
                    connectedForIntern: values.ConnectedForIntern === "" ? companyData.connectedForIntern : values.ConnectedForIntern
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

        <Tile width="600px" >
            <Formik

                initialValues={Company}
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
                                <Stack width='200px'>
                                    <Typography variant="body1">Company Name</Typography>
                                </Stack>
                                <Stack width='300px'>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="text"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder={companyData.name}
                                        value={values.CompanyName}
                                        name="CompanyName"
                                        error={!!touched.CompanyName && !!errors.CompanyName}
                                        helperText={touched.CompanyName && errors.CompanyName}
                                    />
                                </Stack>
                            </Stack>

                            <Stack direction="row" spacing={2}>
                                <Stack width='200px'>
                                    <Typography variant="body1">Company E-mail</Typography>
                                </Stack>
                                <Stack width='300px'>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="text"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder={companyData.email}
                                        value={values.CompanyEmail}
                                        name="CompanyEmail"
                                        error={!!touched.CompanyEmail && !!errors.CompanyEmail}
                                        helperText={touched.CompanyEmail && errors.CompanyEmail}
                                    />
                                </Stack>
                            </Stack>

                            <Stack direction="row" spacing={2}>
                                <Stack width='200px'>
                                    <Typography variant="body1">Company Contact</Typography>
                                </Stack>
                                <Stack width='300px'>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="text"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder={companyData.contactNo}
                                        value={values.CompanyContact}
                                        name="CompanyContact"
                                        error={!!touched.CompanyContact && !!errors.CompanyContact}
                                        helperText={touched.CompanyContact && errors.CompanyContact}
                                    />
                                </Stack>
                            </Stack>

                            <Stack direction="row" spacing={2}>
                                <Stack width='200px'>
                                    <Typography variant="body1">Company Address</Typography>
                                </Stack>
                                <Stack width='300px'>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="text"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder={companyData.address}
                                        value={values.CompanyAddress}
                                        name="CompanyAddress"
                                        error={!!touched.CompanyAddress && !!errors.CompanyAddress}
                                        helperText={touched.CompanyAddress && errors.CompanyAddress}
                                    />
                                </Stack>
                            </Stack>

                            <Stack direction="row" spacing={2}>
                                <Stack width='200px'>
                                    <Typography variant="body1">No of Internships</Typography>
                                </Stack>
                                <Stack width='300px'>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="text"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder={companyData.internSeats}
                                        value={values.NoInternshipSeats}
                                        name="NoInternshipSeats"
                                        error={!!touched.NoInternshipSeats && !!errors.NoInternshipSeats}
                                        helperText={touched.NoInternshipSeats && errors.NoInternshipSeats}
                                    />
                                </Stack>
                            </Stack>

                            <Stack direction="row" spacing={2}>
                                <Stack width='200px'>
                                    <Typography variant="body1">Company Description</Typography>
                                </Stack>
                                <Stack width='300px'>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="text"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder={companyData.description}
                                        value={values.CompanyDescription}
                                        name="CompanyDescription"
                                        error={!!touched.CompanyDescription && !!errors.CompanyDescription}
                                        helperText={touched.CompanyDescription && errors.CompanyDescription}
                                    />
                                </Stack>
                            </Stack>

                            <Stack direction="row" spacing={2}>
                                <Stack width='200px'>
                                    <Typography variant="body1">Connected for Intern</Typography>
                                </Stack>
                                <Stack width='300px'>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="text"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder={companyData.connectedForIntern}
                                        value={values.ConnectedForIntern}
                                        name="ConnectedForIntern"
                                        error={!!touched.ConnectedForIntern && !!errors.ConnectedForIntern}
                                        helperText={touched.ConnectedForIntern && errors.ConnectedForIntern}
                                    />
                                </Stack>
                            </Stack>

                            {/* <Stack direction="row" spacing={2}>
                                <Stack width='200px'>
                                    <Typography variant="body1">Company Rating</Typography>
                                </Stack>
                                <Stack width='300px'>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="text"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.CompanyRating}
                                        name="CompanyRating"
                                        error={!!touched.CompanyRating && !!errors.CompanyRating}
                                        helperText={touched.CompanyRating && errors.CompanyRating}
                                    />
                                </Stack>
                            </Stack>

                            <Stack direction="row" spacing={2}>
                                <Stack width='200px'>
                                    <Typography variant="body1">Contact Person Name</Typography>
                                </Stack>
                                <Stack width='300px'>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="text"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.CompanyContactpersonname}
                                        name="CompanyContactpersonname"
                                        error={!!touched.CompanyContactpersonname && !!errors.CompanyContactpersonname}
                                        helperText={touched.CompanyContactpersonname && errors.CompanyContactpersonname}
                                    />
                                </Stack>
                            </Stack>

                            <Stack direction="row" spacing={2}>
                                <Stack width='200px'>
                                    <Typography variant="body1">Contact person's Contact No:</Typography>
                                </Stack>
                                <Stack width='300px'>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="text"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.CompanyContactPersonContact}
                                        name="CompanyContactPersonContact"
                                        error={!!touched.CompanyContactPersonContact && !!errors.CompanyContactPersonContact}
                                        helperText={touched.CompanyContactPersonContact && errors.CompanyContactPersonContact}
                                    />
                                </Stack>
                            </Stack> 

                            <Stack direction="row" spacing={2}>
                                <Stack width='200px'>
                                    <Typography variant="body1">Contact person's E-mail</Typography>
                                </Stack>
                                <Stack width='300px'>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="text"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.CompanyContactPersonEmail}
                                        name="CompanyContactPersonEmail"
                                        error={!!touched.CompanyContactPersonEmail && !!errors.CompanyContactPersonEmail}
                                        helperText={touched.CompanyContactPersonEmail && errors.CompanyContactPersonEmail}
                                    />
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