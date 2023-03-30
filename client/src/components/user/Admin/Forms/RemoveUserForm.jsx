import { Button, DialogActions, Typography } from "@mui/material"
import React from "react"
import { Tile } from '../../../card/Tile'
import { useState, useEffect } from "react"  //ref attribute -> an element to access it directly in the DOM.
import { Stack } from "@mui/system"
import { Formik } from "formik"


const RemoveuserData = {
    userId: '',
}

export const RemoveUserForm = () => {

    const [YesNoValue, setYesNoValue] = useState();
    const handleYesNo = (text) => {
        setYesNoValue(text)
    }
    const handleFormSubmit = (values, YesNoValue) => {
        alert(JSON.stringify(values, YesNoValue));
        console.log(values, YesNoValue)
    }
    return (
        <Tile width={'450px'} >
            <Formik
                initialValues={RemoveuserData}>
                {({
                    values,
                    handleSubmit,
                }) => (
                    <form onSubmit={(e) => { handleSubmit; handleFormSubmit(values); }}>
                        <Typography>
                            Are you sure to remove user {values.userId} ?
                        </Typography>
                        <Stack direction={"row"} justifyContent="flex-end" paddingRight={'0px'}>
                            <Button variant="itms"
                                /* value={values.YesNoValue = "yes"}
                                name="YesNoValue" */
                                onClick={() => { handleYesNo("yes") }}>
                                Yes
                            </Button>
                            <Button variant="itms"
                                /*  value={values.YesNoValue = "no"}
                                 name="YesNoValue" */
                                onClick={() => { handleYesNo("no") }} >
                                No
                            </Button>
                        </Stack>
                    </form>)}
            </Formik>
        </Tile >

    )
} 