import { Stack } from "@mui/system";
import React from "react";
import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, Grid, Typography, Divider } from "@mui/material";
import { Tile } from "../../../card/Tile";

export const ViewCompanySupervisor = () => {
    const [Column, setColumn] = useState([])
    const [Records, setRecords] = useState([])
    const [singleUser, setSingleUser] = useState([])

    useEffect(() => {
        fetch('https://dummyjson.com/products')  //url need to changed into json url(this is dummy data from a site)
            .then(result => result.json())
            .then(data => {
                setColumn(Object.keys(data.products[0])) //products(word) need to changed according json 
                setRecords(data.products)
            })
    }, [])

    return (
        <Grid spacing={1} container>
            <Grid item md={12} sm={12} ><Typography variant='subtitle1'> View Company Supervisor Details</Typography> </Grid>
            <Grid item md={8} sm={8} >
                <Tile>
                    <Stack>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    {Column.map((c, i) =>
                                        <TableCell key={i}>
                                            {c}
                                        </TableCell>
                                    )}
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                {Records.map((r, i) =>
                                    <TableRow key={i} onClick={() => setSingleUser(r)}>
                                        <TableCell >   {r.id}  </TableCell>
                                        <TableCell >   {r.title}  </TableCell>
                                        <TableCell >   {r.description} </TableCell>
                                    </TableRow> //id,title,description need to change as json file
                                )}

                            </TableBody>
                        </Table>

                    </Stack>
                </Tile>
            </Grid>

            <Grid item md={4} sm={4} > <Tile>
                <Stack direction={'column'}>
                    <Typography fontWeight={'bold'} paddingTop={'15px'} paddingBottom={'15px'}>Company Supervisor full details</Typography>
                    <Divider orientation="horizontal" />
                    {singleUser && (
                        <Stack direction={'column'}>
                            <Stack direction={'row'}>  <Typography width={'135px'}> Name </Typography><Typography> {singleUser.id} </Typography></Stack>
                            <Stack direction={'row'}> <Typography width={'135px'}> Staff ID </Typography><Typography>{singleUser.title} </Typography></Stack>
                            <Stack direction={'row'}> <Typography width={'135px'}> E-mail</Typography><Typography> {singleUser.title} </Typography></Stack>
                            <Stack direction={'row'}> <Typography width={'135px'}> Contact Number</Typography><Typography>{singleUser.title} </Typography></Stack>
                        </Stack>
                    )}
                </Stack>
            </Tile></Grid>

        </Grid>
    )
} 