import React from "react";
import { AdminCreateForm } from "../../../shared/CreateUser/forms/AdminCreateForm";
import { BasicCard } from "../../../card/basicCard/BasicCard";
import { Layout } from "../../../Layout/Layout";
import { Typography } from "@mui/material";

export const AddAdmin = () => {
    return (<>
        <Typography variant='PageTitle'> Add Administrator Details</Typography>
        <AdminCreateForm />
    </>
    )
}