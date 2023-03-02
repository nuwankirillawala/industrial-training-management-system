import React, { useState, useEffect } from 'react'
import { Button, Grid, Stack, Typography } from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';
import { Tile } from '../../components/card/Tile';
import { Layout } from '../../components/Layout/Layout';

function RedirectAdduser(text) {
    switch (text) {
        case 'Administrator':
            return '/addadmin'
            break;
        case 'Department Supervisor':
            return '/add-superv-details'
            break;
        case 'Undergraduate':
            return '/add-undg-details'
            break;
        case 'Company Supervisor':
            return '/add-comp-details'
            break;
        case 'Alumini person':
            return '/add-alumini-details'
            break;
        default:
            break;
    }
}

function RedirectViewuser(text) {
    switch (text) {
        case 'Administrator':
            return '/view-admin-details'   // only created this page.have make the page Dynamic for all
            break;
        case 'Department Supervisor':
            return '/view-superv-details'
            break;
        case 'Undergraduate':
            return '/view-undg-details'
            break;
        case 'Company Supervisor':
            return '/view-comp-details'
            break;
        case 'Alumini person':
            return '/view-alumini-details'
            break;
        default:
            break;
    }
}

function RedirectUpdateuser(text) {
    switch (text) {
        case 'Administrator':
            return '/update-admin-details'   // only created this page.have make the page Dynamic for all
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
                        <Tile height={'88vh'}>
                            <Stack height={'80px'}> <Typography variant="h6" fontWeight={'bold'}>{text}</Typography> </Stack>
                            <Stack>  <Typography variant="body1">Click below buttons for manage the {text}.</Typography>  </Stack>
                            <Stack direction={"column"} sx={{ height: '60%' }} justifyContent={"flex-end"} spacing={2}>
                                <Button variant="itms" onClick={() => navigate(RedirectViewuser(text))}> View  </Button>
                                <Button variant="itms" onClick={() => navigate(RedirectAdduser(text))} > Add  </Button>
                                <Button variant="itms" onClick={() => navigate(RedirectUpdateuser(text))}> Update </Button>
                                <Button variant="itms"> Remove  </Button>
                            </Stack>
                        </Tile>
                    </Grid>
                ))}
            </Grid>
        </Layout>
    )
}

export default Manageuser

