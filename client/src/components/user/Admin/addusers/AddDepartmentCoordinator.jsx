import React from "react";
import { DepartmentCoordinatorCreateForm } from '../../../shared/CreateUser/forms/DepartmentCoordinatorCreateForm'
import { Typography } from "@mui/material";

export const AddDepartmentCoordinator = () => {
    return (
        <>
            <Typography variant='PageTitle'> Add Alumni Details</Typography>
            <DepartmentCoordinatorCreateForm>

            </DepartmentCoordinatorCreateForm>
        </>
    )
}