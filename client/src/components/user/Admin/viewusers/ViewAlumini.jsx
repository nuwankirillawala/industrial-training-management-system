import { Stack } from "@mui/system";
import React from "react";
import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, Typography, Grid, Divider } from "@mui/material";
import { Tile } from "../../../card/Tile";
import axios from "axios";

export const ViewAlumini = () => {
    const [Records, setRecords] = useState([])
    const [singleUser, setSingleUser] = useState([])

    const getAlumniData = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/v1/admin/users/alumni', { withCredentials: true });
            console.log(res);
            if (res.status === 200) {
                console.log(res.data.users);
                setRecords(res.data.users)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAlumniData();
    }, [])

    const Column = [
        { columnName: 'Registration No' },
        { columnName: 'Alumni Name' },
        { columnName: 'E-mail' },
        { columnName: 'Graduated Year' },
        { columnName: 'Contact No' }
    ]

    return (
        <Grid spacing={1} container>
            <Grid item md={12} sm={12} ><Typography variant='PageTitle'> View Alumni Details</Typography> </Grid>
            <Grid item md={12} sm={12} > <Typography variant='body2' paddingLeft={'20px'}> Click the row for get admin wise details in your right side</Typography> </Grid>
            <Grid item md={8} sm={8} style={{ maxHeight: 500, overflowY: 'scroll' }}>
                <Tile onHeightChange={'800px'}>
                    <Stack>
                        <Table sx={{ border: '1px solid #4665D2' }} >
                            <TableHead>
                                <TableRow>
                                    {Column.map((c, i) =>
                                        <TableCell key={i} >
                                            <Typography fontWeight={'bold'}>  {c.columnName}</Typography>
                                        </TableCell>
                                    )}
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                {Records.map((r, i) =>
                                    <TableRow key={i} onClick={() => setSingleUser(r)}>
                                        <TableCell >   {r.regNo}  </TableCell>
                                        <TableCell >   {r.name}  </TableCell>
                                        <TableCell >   {r.email} </TableCell>
                                        <TableCell >   {r.graduatedYear} </TableCell>
                                        <TableCell >   {r.contactNo} </TableCell>
                                    </TableRow> //id,title,description need to change as json file
                                )}

                            </TableBody>
                        </Table>

                    </Stack>
                </Tile>
            </Grid>

            <Grid item md={4} sm={4} > <Tile>
                <Stack direction={'column'}>
                    <Typography fontWeight={'bold'} paddingTop={'15px'} paddingBottom={'15px'}>Alumni full details</Typography>
                    <Divider orientation="horizontal" color="#4665D2" />
                    {singleUser && (
                        <Stack direction={'column'} spacing={2}>
                            <Stack direction={'row'}> <Typography width={'135px'}>  Registration No </Typography><Typography>{singleUser.regNo} </Typography></Stack>
                            <Stack direction={'row'}>  <Typography width={'135px'}> Name </Typography><Typography> {singleUser.name} </Typography></Stack>
                            <Stack direction={'row'}> <Typography width={'135px'}> E-mail</Typography><Typography> {singleUser.email} </Typography></Stack>
                            <Stack direction={'row'}> <Typography width={'135px'}>  Graduated Year</Typography><Typography>{singleUser.graduatedYear} </Typography></Stack>
                            <Stack direction={'row'}> <Typography width={'135px'}>  Contact No</Typography><Typography>{singleUser.contactNo} </Typography></Stack>
                        </Stack>
                    )}
                </Stack>
            </Tile></Grid>

        </Grid >
    )
} 