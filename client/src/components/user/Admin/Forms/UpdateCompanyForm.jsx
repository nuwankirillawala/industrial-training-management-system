import { TextField, Stack, Button, Typography } from "@mui/material"
import React from "react"
import { useState } from "react"
import { Tile } from "../../../card/Tile"
import { Formik } from "formik"
import * as yup from "yup"

const Company = {
    CompanyName: '',
    CompanyEmail: '',
    CompanyContact: '',
    CompanyAddress: '',
    NoInternshipSeats: '',
    CompanyDescription: '',
    CompanyRating: '',
    CompanyContactpersonname: '',
    CompanyContactPersonContact: '',
    CompanyContactPersonEmail: ''
}


export const UpdateCompanyForm = () => {

    const validation = yup.object().shape({
        CompanyName: yup.string(),
        CompanyEmail: yup.string().email("Invalid Email"),
        CompanyContact: yup.string().length(10, "must contain 10 numbers"), //.matches("/^[0-9] /")
        CompanyAddress: yup.string(),
        NoInternshipSeats: yup.number(),
        CompanyDescription: yup.string(),
        CompanyRating: yup.string(),
        CompanyContactpersonname: yup.string(),
        CompanyContactPersonContact: yup.string().length(10, "must contain 10 numbers"),
        CompanyContactPersonEmail: yup.string().email("Invalid Email")
    })

    const handleFormSubmit = (values) => {
        alert(JSON.stringify(values));//convert object to a json file, this popup may omitt @ the integration
        alert("your data is submitted");
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
                                        value={values.CompanyDescription}
                                        name="CompanyDescription"
                                        error={!!touched.CompanyDescription && !!errors.CompanyDescription}
                                        helperText={touched.CompanyDescription && errors.CompanyDescription}
                                    />
                                </Stack>
                            </Stack>

                            <Stack direction="row" spacing={2}>
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