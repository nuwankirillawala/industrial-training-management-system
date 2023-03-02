import React, { useState, useEffect } from 'react'
import { Button, Grid, Stack, Typography } from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';
import { Tile } from '../../components/card/Tile';
import { Layout } from '../../components/Layout/Layout';

function RedirectAdduser(text) {
    switch (text) {
        case 'Administrator':
            return '/addadmin'   // only created this page.have make the page Dynamic for all
            break;
        // case 'Department Supervisor':
        //     return '/createDeptSup'
        //     break;
        // case 'Undergraduate':
        //     return '/createUndergraduate'
        //     break;
        // case 'Company Supervisor':
        //     return '/createCompanySup'
        //     break;
        // case 'Alumini person':
        //     return '/createAlumini'
        //     break;
        default:
            break;
    }
}

function RedirectViewuser(text) {
    switch (text) {
        case 'Administrator':
            return '/view-admin-details'   // only created this page.have make the page Dynamic for all
            break;
        // case 'Department Supervisor':
        //     return '/createDeptSup'
        //     break;
        // case 'Undergraduate':
        //     return '/createUndergraduate'
        //     break;
        // case 'Company Supervisor':
        //     return '/createCompanySup'
        //     break;
        // case 'Alumini person':
        //     return '/createAlumini'
        //     break;
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
                                <Stack height="60px"> <Button onClick={() => navigate(RedirectViewuser(text))}> View {text} </Button></Stack>
                                <Stack height="60px"> <Button onClick={() => navigate(RedirectAdduser(text))} > Add {text} </Button></Stack>
                                <Stack height="60px"> <Button > Update {text} </Button></Stack>
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