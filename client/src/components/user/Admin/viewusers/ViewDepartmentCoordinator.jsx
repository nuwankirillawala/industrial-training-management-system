import { Stack } from "@mui/system";
import React from "react";
import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, Typography, TableRow, Grid, Divider } from "@mui/material";
import { Tile } from "../../../card/Tile";
import axios from "axios";

export const ViewDepartmentCoordinator = () => {
    const [Records, setRecords] = useState([])
    const [singleUser, setSingleUser] = useState([])

    const getCoordinatorData = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/v1/admin/users/admin', { withCredentials: true });
            console.log(res);
            if (res.status === 200) {
                console.log(res.data.users);
                const filteredRecords = res.data.users.filter(record => record.role === 'department-coordinator');
                setRecords(filteredRecords);
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCoordinatorData();
    }, [])


    const Column = [
        { columnName: 'Coordinator Name' },
        { columnName: '  Email' },
        { columnName: '  ContactNo' },
        { columnName: '  Staff ID' }
    ]

    return (
        <Grid spacing={1} container>
            <Grid item md={12} sm={12} ><Typography variant='PageTitle'> View Department Coordinator Details</Typography> </Grid>
            <Grid item md={12} sm={12} ><Typography variant='body2' paddingLeft={'20px'}> Click the row for get administrator wise details in right side</Typography> </Grid>
            <Grid item md={8} sm={8} style={{ maxHeight: 500, overflowY: 'scroll' }}>
                <Tile >
                    <Table sx={{ border: '1px solid #4665D2' }}>
                        <TableHead>
                            <TableRow>
                                {Column.map((c, i) =>
                                    <TableCell key={i}>
                                        <Typography fontWeight={'bold'}> {c.columnName}</Typography>
                                    </TableCell>
                                )}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Records.map((r, i) =>
                                <TableRow key={i} onClick={() => setSingleUser(r)}>
                                    <TableCell >   {r.name}  </TableCell>
                                    <TableCell>   {r.email}  </TableCell>
                                    <TableCell>   {r.contactNo} </TableCell>
                                    <TableCell >   {r.staffId} </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>


                </Tile></Grid>

            <Grid item md={4} sm={4} > <Tile>
                <Stack direction={'column'}>
                    <Typography fontWeight={'bold'} paddingTop={'15px'} paddingBottom={'15px'}>Department Coordinator full details</Typography>
                    <Divider orientation="horizontal" color="#4665D2" />
                    {singleUser && (
                        <Stack direction={'column'}>
                            <Stack direction={'row'}>  <Typography width={'135px'}> Name </Typography><Typography> {singleUser.name} </Typography></Stack>
                            <Stack direction={'row'}> <Typography width={'135px'}> Staff ID </Typography><Typography>{singleUser.staffId} </Typography></Stack>
                            <Stack direction={'row'}> <Typography width={'135px'}> E-mail</Typography><Typography> {singleUser.email} </Typography></Stack>
                            <Stack direction={'row'}> <Typography width={'135px'}> Contact Number</Typography><Typography>{singleUser.contactNo} </Typography></Stack>
                        </Stack>
                    )}
                </Stack>
            </Tile></Grid>

        </Grid>
    )
} 