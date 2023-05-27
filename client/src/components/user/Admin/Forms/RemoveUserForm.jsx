import { Button, DialogActions, Typography } from "@mui/material"
import React from "react"
import { Tile } from '../../../card/Tile'
import { useState, useEffect } from "react"  //ref attribute -> an element to access it directly in the DOM.
import { Stack } from "@mui/system"
import { Formik } from "formik"
import { StatusSnackBar } from "../../../StatusSnackBar/StatusSnackBar"

const RemoveuserData = {
    userID: '',
}

export const RemoveUserForm = ({ userId }) => {
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

    const getAlumniData = async () => {
        try {
            const res = await axios.delete(`http://localhost:5000/api/v1/admin/delete/${userId}`, { withCredentials: true });
            console.log(res);
            if (res.status === 202) {
                //console.log(res.data);
                // setRecords(res.data.users)
            }
        } catch (error) {
            console.log(error)
        }

        if (res.status === 202) {
            handleSnackBar("success");
        } else {
            handleSnackBar("error");
        }
    }

    useEffect(() => {
        getAlumniData();
    }, [])

    // const handleSnackBar = (key) => {
    //     setSnackbarOpen((prevState) => {
    //         let newState = { ...prevState };
    //         newState[key] = !newState[key];
    //         return newState;
    //     });
    // };

    //const [YesNoValue, setYesNoValue] = useState();
    // const handleYesNo = (text) => {
    //     setYesNoValue({ YesNovalue: text })
    // }
    const handleFormSubmit = (values) => { // send req only if 'yes'
        // alert(JSON.stringify(values));
        console.log(values)
        handleSnackBar("success");
    }
    return (
        <Tile width={'450px'} >
            <Formik
                initialValues={RemoveuserData}>
                {({
                    values,
                    handleSubmit,
                }) => (
                    <form onSubmit={(e) => { e.preventDefault(); handleSubmit; }}>
                        <Typography>
                            Are you sure to remove user {values.userId} ?
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
            <StatusSnackBar
                severity="success"
                trigger={trigger.success}
                setTrigger={() => {
                    handleSnackBar(" Update success");
                }}
                alertMessage={"Remove Succefully"}
            />
            <StatusSnackBar
                severity="error"
                trigger={trigger.error}
                setTrigger={() => {
                    handleSnackBar("error");
                }}
                alertMessage={"Update Fail"}
            />
        </Tile >

    )
} 