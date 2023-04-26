import { Button, DialogActions, Typography } from "@mui/material"
import React from "react"
import { Tile } from '../../../card/Tile'
import { useState, useEffect } from "react"  //ref attribute -> an element to access it directly in the DOM.
import { Stack } from "@mui/system"
import { Formik } from "formik"


const RemoveCompanydata = {
    CompanyName: '',
}

export const RemoveCompanyForm = () => {

    //const [YesNoValue, setYesNoValue] = useState();
    // const handleYesNo = (text) => {
    //     setYesNoValue({ YesNovalue: text })
    // }
    const handleFormSubmit = (values) => { // send req only if 'yes'
        alert(JSON.stringify(values));
        console.log(values)
    }
    return (
        <Tile width={'450px'} >
            <Formik
                initialValues={RemoveCompanydata}>
                {({
                    values,
                    handleSubmit,
                }) => (
                    <form onSubmit={(e) => { e.preventDefault(); handleSubmit; }}>
                        <Typography>
                            Are you sure to remove this company? {values.CompanyName} ?
                        </Typography>
                        <Stack direction={"row"} justifyContent="flex-end" paddingRight={'0px'}>
                            <Button variant="itms" type='submit'
                                onClick={() => { handleFormSubmit(values); }}>
                                Yes
                            </Button>
                            {/* <Button variant="itms" type='submit'
                              onClick={() => { setYesNoValue({ YesNovalue: "no" }) }} 
                            >
                                No
                            </Button> */}
                        </Stack>
                    </form>)}
            </Formik>
        </Tile >

    )
} 