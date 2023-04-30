import React from "react";
import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, Grid, Typography, Stack, Divider } from "@mui/material";
import { Tile } from "../../../card/Tile";

export const ViewAdmin = () => {
    const [Records, setRecords] = useState([])
    const [singleAdmin, setSingleAdmin] = useState([])

    // useEffect(() => {
    //     fetch('https://dummyjson.com/products')  //url need to changed into json url(this is dummy data from a site)
    //         .then(result => result.json())
    //         .then(data => {
    //           setRecords(data.products)
    //         })
    // }, [])

    const getAdminData = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/v1/view-all-users/admin');
            if (res.data.status === 'success') {
                console.log(res.data.data);
                setRecords(res.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAdminData();
    }, [])


    const Column = [
        { columnName: 'Admin Name' },
        { columnName: 'Admin Email' },
        { columnName: 'Admin ContactNo' },
        { columnName: 'Admin Staff ID' }
    ]
    return (
        <Grid spacing={1} container>
            <Grid item md={12} sm={12} ><Typography variant='PageTitle'> View Administrator Details</Typography> </Grid>
            <Grid item md={8} sm={8} > <Tile >

                <Table>
                    <TableHead>
                        <TableRow >
                            {Column.map((c, i) =>
                                <TableCell key={i} >
                                    <Typography fontWeight={'bold'}> {c.columnName}</Typography>
                                </TableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Records.map((r, i) =>
                            <TableRow clickable key={i} onClick={() => setSingleAdmin(r)}>
                                <TableCell >   {r.name}  </TableCell>
                                <TableCell >   {r.email}  </TableCell>
                                <TableCell >   {r.contactNo} </TableCell>
                                <TableCell >   {r.staffId} </TableCell>
                            </TableRow> //id,title,description need to change as json file
                        )}
                    </TableBody>
                </Table>


            </Tile></Grid>

            <Grid item md={4} sm={4} > <Tile>
                <Stack direction={'column'}>
                    <Typography fontWeight={'bold'} paddingTop={'15px'} paddingBottom={'15px'}>Administrator full details</Typography>
                    <Divider orientation="horizontal" />
                    {singleAdmin && (
                        <Stack direction={'column'}>
                            <Stack direction={'row'}>  <Typography width={'135px'}> Name </Typography><Typography> {singleAdmin.name} </Typography></Stack>
                            <Stack direction={'row'}> <Typography width={'135px'}> Staff ID </Typography><Typography>{singleAdmin.staffId} </Typography></Stack>
                            <Stack direction={'row'}> <Typography width={'135px'}> E-mail</Typography><Typography> {singleAdmin.email} </Typography></Stack>
                            <Stack direction={'row'}> <Typography width={'135px'}> Contact Number</Typography><Typography>{singleAdmin.contactNo} </Typography></Stack>
                        </Stack>
                    )}
                </Stack>
            </Tile></Grid>

        </Grid>
    )
} 