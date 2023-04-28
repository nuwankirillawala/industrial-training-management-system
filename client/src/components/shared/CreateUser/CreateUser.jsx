import React from "react";
import { Typography, Container, TextField } from "@mui/material";
import { Layout } from "../../Layout/Layout"

export default function CreateUser(){
    return (
        <Container>
            <Layout>
            <Typography>
                Create a new user
            </Typography>
            <form noValidate autoComplete='off'>
                <div>
                    <TextField></TextField>
                </div>
            </form>
            </Layout>
        </Container>
    );
}