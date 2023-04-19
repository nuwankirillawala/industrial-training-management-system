import React from "react";
import { Typography } from "@mui/material";
import { CompanyCreateForm } from "../../../shared/CreateUser/forms/CompanyCreateForm";

export const AddCompany = () => {
    return (
        <>
            <Typography variant="h6" color="primary" marginBottom={'5px'} paddingLeft={'15px'}>Add company Details</Typography>
            <CompanyCreateForm />
        </>
    )
}