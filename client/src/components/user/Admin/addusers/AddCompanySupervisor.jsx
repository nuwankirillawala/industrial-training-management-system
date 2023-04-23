import React from "react";
import { SupervisorCreateForm } from "../../../shared/CreateUser/forms/SupervisorCreateForm";
import { Typography } from "@mui/material";

export const AddCompanySupervisor = () => {
    return (
        <>
            <Typography variant='subtitle1'> Add Company Supervisor Details</Typography>
            <SupervisorCreateForm>

            </SupervisorCreateForm>
        </>
    )
}