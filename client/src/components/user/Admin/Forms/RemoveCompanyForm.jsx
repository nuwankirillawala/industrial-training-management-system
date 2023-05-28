import { Button, Typography } from "@mui/material"
import React from "react"
import { Tile } from '../../../card/Tile'
import { useState } from "react"  //ref attribute -> an element to access it directly in the DOM.
import { Stack } from "@mui/system"
import { StatusSnackBar } from "../../../StatusSnackBar/StatusSnackBar"
import axios from "axios"


export const RemoveCompanyForm = ({ companyId }) => {
    const [trigger, setTrigger] = useState({
        success: false,
        error: false,
    });

    const handleSnackBar = (key) => {
        setTrigger((prevState) => ({
            ...prevState,
            [key]: !prevState[key],
        }));
    };

    // remove company function
    const removeCompany = async () => {
        try {
            const res = await axios.delete(
                `http://localhost:5000/api/v1/company/delete/${companyId}`,
                { withCredentials: true }
            );
            console.log(res.data); // Log the response message

            if (res.status === 202) {
                handleSnackBar("success");
            }
            window.location.reload(false);

        } catch (error) {
            console.log(error);
            handleSnackBar("error");
        }
    };

    return (
        <Tile width={'450px'} >

            <Typography>
                Are you sure to remove this company {companyId} ?
            </Typography>
            <Stack direction={"row"} justifyContent="flex-end" paddingRight={'0px'}>
                <Button variant="itms" type='submit'
                    onClick={removeCompany}>
                    Yes
                </Button>
            </Stack>

            <StatusSnackBar
                severity="success"
                trigger={trigger.success}
                setTrigger={() => {
                    handleSnackBar("success");
                }}
                alertMessage={"Removed Successfully"}
            />
            <StatusSnackBar
                severity="error"
                trigger={trigger.error}
                setTrigger={() => {
                    handleSnackBar("error");
                }}
                alertMessage={"Removal Failed"}
            />
        </Tile >

    )
} 