import { fontSize, Stack } from '@mui/system';
import React, { useState } from 'react'
import { Tile } from '../../components/card/Tile';
import { Grid, Typography } from '@mui/material';
import { Button } from '@mui/material';
//import { useState, useEffect } from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import { Layout } from '../../components/Layout/Layout';

import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import GroupsIcon from '@mui/icons-material/Groups';
import BusinessIcon from '@mui/icons-material/Business';
import EngineeringIcon from '@mui/icons-material/Engineering';

import { Icon } from '@mui/material';

function RedirectAdduser(text) {
    switch (text) {
        case 'Administrator':
            return '/addadmin'
            break;
        case 'Department CoOrdinator':
            return '/add-superv-details'
            break;
        case 'Undergraduate':
            return '/add-undg-details'
            break;
        case 'Company Supervisor':
            return '/add-comp-details'
            break;
        case 'Alumni person':
            return '/add-alumini-details'
            break;
        default:
            break;
    }
}

function RedirectViewuser(text) {
    switch (text) {
        case 'Administrator':
            return '/view-admin-details'
            break;
        case 'Department CoOrdinator':
            return '/view-superv-details'
            break;
        case 'Undergraduate':
            return '/view-undg-details'
            break;
        case 'Company Supervisor':
            return '/view-comp-details'
            break;
        case 'Alumni person':
            return '/view-alumini-details'
            break;
        default:
            break;
    }
}

function RedirectUpdateuser(text) {
    switch (text) {
        case 'Administrator':
            return '/update-admin-details'
            break;
        // case 'Department CoOrdinator':
        //     return '/createDeptSup'
        //     break;
        // case 'Undergraduate':
        //     return '/createUndergraduate'
        //     break;
        // case 'Company Supervisor':
        //     return '/createCompanySup'
        //     break;
        // case 'Alumni person':
        //     return '/createAlumini'
        //     break;
        default:
            break;
    }
}

function RedirectRemoveuser(text) {
    switch (text) {
        case 'Administrator':
            return '/remove-admin'
            break;
        // case 'Department CoOrdinator':
        //     return '/createDeptSup'
        //     break;
        // case 'Undergraduate':
        //     return '/createUndergraduate'
        //     break;
        // case 'Company Supervisor':
        //     return '/createCompanySup'
        //     break;
        // case 'Alumni person':
        //     return '/createAlumini'
        //     break;
        default:
            break;
    }
}



export const Manageuser = () => {

    const navigate = useNavigate()

    const userList = [
        { name: 'Administrator', icon: ManageAccountsIcon, description: "Administrator responsible for manages all users in the system by adding,  updating and removing users." },
        { name: 'Department CoOrdinator', icon: AdminPanelSettingsIcon, description: "Department Co-ordinator supervise the internship process." },
        { name: 'Undergraduate', icon: GroupsIcon, description: "Undergraduates use the platform for keep track of internship and give their updates.  Also use the platform for internship report purposes." },
        { name: 'Company Supervisor', icon: BusinessIcon, description: "Company supervisors Co-operate to the internship process by guiding Internship applicants and confirming their details." },
        { name: 'Alumni person', icon: EngineeringIcon, description: "Alumni persons share IT field experiences and technical details to new internship applicants." }
    ];


    return (
        <Layout>
            <Grid container spacing={2}>
                {userList.map((user, index) => (
                    <Grid item md={2.4} sm={6} key={index}>
                        <Tile height={'88vh'}>
                            <Stack ><Icon color='primary' fontSize='large'><user.icon /> </Icon></Stack>
                            {/* sx={{ display: 'flex-end', alignItems: 'center' }} If want icons in center*/}
                            <Stack height={'80px'}> <Typography variant="h6" fontWeight={'bold'}>{user.name}</Typography> </Stack>
                            <Stack height={'120px'} padding="10px">  <Typography variant="body1" > {user.description} </Typography>  </Stack>
                            <Stack direction={"column"} sx={{ height: '58%' }} justifyContent={"flex-end"} spacing={2}>
                                <Button variant="itms" onClick={() => navigate(RedirectViewuser(user.name))}> View  </Button>
                                <Button variant="itms" onClick={() => navigate(RedirectAdduser(user.name))} > Add  </Button>
                                <Button variant="itms" onClick={() => navigate(RedirectUpdateuser(user.name))}> Update </Button>
                                <Button variant="itms" onClick={() => navigate(RedirectRemoveuser(user.name))}> Remove  </Button>
                            </Stack>
                        </Tile>
                    </Grid>
                ))}
            </Grid>
        </Layout >
    )




}



