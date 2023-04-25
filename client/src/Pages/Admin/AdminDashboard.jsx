import React from 'react'
import { useState, useEffect } from 'react';
import { Typography, Grid, Stack } from '@mui/material'
import { Tile } from '../../components/card/Tile';
import ProfileFormLine from '../../components/Dashboard/ProfileFormLine';

//sidebar options- manage users, manage company, add undg results, Notice

export const AdminDashboard = () => {
    const [Data, setData] = useState([])

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             axios.get('https://dummyjson.com/products')
    //                 .then(data => {
    //                     setData(data.products[1]);
    //                 })
    //         }
    //         catch (error) {
    //             console.log(error);
    //         }
    //     }
    //     fetchData();
    // }, []);


    useEffect(() => {
        fetch('https://dummyjson.com/products')  //url need to changed into json url(this is dummy data from a site)
            .then(result => result.json())
            .then(data => {
                setData(data.products[1])
            })
    }, [])



    return (

        <Grid container spacing={.5}>
            <Grid item md={12} xs={12} > <Typography variant="h6" color="primary" marginBottom={'5px'} paddingLeft={'15px'}> Administrator Dashboard</Typography></Grid>
            <Grid item md={8} xs={8}>
                <Tile height={'82vh'}>
                    <Stack direction={'row'} spacing={3}>
                        <Stack alignItems={'center'} display={'flex'}>
                            <Typography fontWeight={'bold'} variant='body1' > Admin Name </Typography>
                            <Stack>
                                <img src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJVSkk9RpoHe2r2kYU3n-LVUcPTh1vb0a32A&usqp=CAU'} style={{ width: '170px', height: '170px' }} />
                            </Stack>
                        </Stack>
                        <Stack flex={12} direction={'column'}>
                            <ProfileFormLine title='Name' content={Data.id} ></ProfileFormLine>
                            <ProfileFormLine title='Staff ID' content={Data.title}></ProfileFormLine>
                            <ProfileFormLine title='E-mail' content={Data.description}></ProfileFormLine>
                            <ProfileFormLine title='Contact' content=''></ProfileFormLine>
                            <ProfileFormLine title='Role' content=''></ProfileFormLine>
                        </Stack>
                    </Stack>
                </Tile>
            </Grid >
            <Grid item md={4} xs={4} container direction={'column'} >
                <Stack spacing={.5}>
                    <Tile height={'41vh'}>
                        <Typography fontWeight={'bold'} variant='body1'>Notice</Typography>
                    </Tile>
                    <Tile height={'41vh'}></Tile>
                </Stack>
            </Grid >
        </Grid>


    )
}