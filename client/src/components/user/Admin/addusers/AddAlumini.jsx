import React from "react";
import { AluminiCreateForm } from '../../../shared/CreateUser/forms/AluminiCreateForm';
import { Typography } from "@mui/material";

export const AddAlumini = () => {
    return (
        <>
            <Typography variant='PageTitle'> Add Alumni Details</Typography>
            <AluminiCreateForm>

            </AluminiCreateForm>
        </>
    )
}