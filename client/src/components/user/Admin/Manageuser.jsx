import { Stack } from '@mui/system';
import React, { useState } from 'react'
import { Tile } from '../../card/Tile';
import { Grid, Typography } from '@mui/material';
import { Button } from '@mui/material';
//import { useState, useEffect } from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import { Layout } from '../../Layout/Layout';

function RedirectAdduser(text) {
    switch (text) {
        case 'Administrator':
            return '/addadmin'   // only created this page.have make the page Dynamic for all
            break;
        case 'Department Supervisor':
            return '/createDeptSup'
            break;
        case 'Undergraduate':
            return '/createUndergraduate'
            break;
        case 'Company Supervisor':
            return '/createCompanySup'
            break;
        case 'Alumini person':
            return '/createAlumini'
            break;
        default:
            break;
    }
}

const Manageuser = () => {

    const navigate = useNavigate()

    return (
        <Layout>
            <Grid container spacing={2}>
                {['Administrator', 'Department Supervisor', 'Undergraduate', 'Company Supervisor', 'Alumini person'].map((text) => (
                    <Grid item md={2.4} sm={6}>
                        <Tile height={'80vh'}>
                            <Typography>Click below buttons for manage the {text}.</Typography>
                            <Stack direction={"column"} sx={{ height: '80%' }} justifyContent={"flex-end"}>
                                <Stack height="60px"> <Button  > View {text} </Button></Stack>
                                <Stack height="60px"> <Button onClick={() => navigate(RedirectAdduser(text))} > Add {text} </Button></Stack>
                                <Stack height="60px"> <Button  > Update {text} </Button></Stack>
                                <Stack height="60px"> <Button > Remove {text} </Button></Stack>
                            </Stack>
                        </Tile>
                    </Grid>
                ))}
            </Grid>
        </Layout>
    )
}

export default Manageuser