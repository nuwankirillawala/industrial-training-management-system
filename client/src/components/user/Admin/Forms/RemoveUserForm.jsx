
import React, { useState } from "react";
import axios from "axios";
import { Button, Typography } from "@mui/material";
import { Tile } from "../../../card/Tile";
import { Stack } from "@mui/system";
import { StatusSnackBar } from "../../../StatusSnackBar/StatusSnackBar";

export const RemoveUserForm = ({ userId, userRole }) => {

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


    function RedirectRemoveuser(userRole) {
        switch (userRole) {
            case 'system-admin':
                removeAdminNCoordinator();
                break;
            case 'undergraduate':
                removeUndergraduate();
                break;
            case 'department-coordinator':
                removeAdminNCoordinator();
                break;
            case 'supervisor':

                break;
            case 'alumni':
                removeAlumni();
                break;

        }
    }
    //remove Admin, remove coordinator function
    const removeAdminNCoordinator = async () => {
        try {
            const res = await axios.delete(
                `http://localhost:5000/api/v1/admin/delete/${userId}`,
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

    // remove undergraduate function
    const removeUndergraduate = async () => {
        try {
            const res = await axios.delete(
                `http://localhost:5000/api/v1/undergraduate/delete/${userId}`,
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

    // remove supervisor function
    // const removeSupervisor = async () => {
    //     try {
    //         const res = await axios.delete(
    //             `http://localhost:5000/api/v1/undergraduate/delete/${userId}`,
    //             { withCredentials: true }
    //         );
    //         console.log(res.data); // Log the response message

    //         if (res.status === 202) {
    //             handleSnackBar("success");
    //         }
    //         window.location.reload(false);

    //     } catch (error) {
    //         console.log(error);
    //         handleSnackBar("error");
    //     }
    // };

    // remove Alumni function
    const removeAlumni = async () => {
        try {
            const res = await axios.delete(
                `http://localhost:5000/api/v1/alumni/delete/${userId}`,
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
        <Tile width={"450px"}>

            <Typography>
                Are you sure you want to remove user {userId}?
            </Typography>
            <Stack direction="row" justifyContent="flex-end" paddingRight={'0px'}>
                <Button variant="itms" type="submit" onClick={() => (RedirectRemoveuser(userRole))}>
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
    );
};