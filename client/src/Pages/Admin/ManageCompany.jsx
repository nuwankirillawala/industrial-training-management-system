import React from "react"
import { UpdateCompanyForm } from "../../components/user/Admin/Forms/UpdateCompanyForm";
import { CompanyCreateForm } from "../../components/shared/CreateUser/forms/CompanyCreateForm";
import { Stack } from "@mui/system";
import { useState, useEffect } from "react";
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Typography, Grid, Divider } from "@mui/material";
import { Tile } from "../../components/card/Tile";
import Dialogbox from "../../components/Dialogbox/Dialogbox";
import { RemoveCompanyForm } from "../../components/user/Admin/Forms/RemoveCompanyForm";
import { Navigate, useNavigate } from 'react-router-dom';

export const ManageCompany = () => {

    const [Column, setColumn] = useState([])
    const [Records, setRecords] = useState([])
    const [singleCompany, setSingleCompany] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        fetch('https://dummyjson.com/products')  //url need to changed into json url(this is dummy data from a site)
            .then(result => result.json())
            .then(data => {
                setColumn(Object.keys(data.products[0])) //products(word) need to changed according json 
                setRecords(data.products)
            })
    }, [])


    return (
        <Grid container>
            <Grid item sm={12} md={12}>
                <Typography variant="PageTitle">Add new Company</Typography>
            </Grid>

            <Grid item sm={12} md={12}>
                <Tile>
                    <Stack direction={'row'} spacing={29}>
                        <Typography> Click here for add a new company to the system</Typography>
                        <Button variant="itms" fontWeight="bold" onClick={() => navigate('/add-company')}>+  </Button >
                    </Stack>
                </Tile>
            </Grid>

            <Grid item sm={12} md={12} paddingTop={'10px'}>
                <Typography variant="PageTitle">Manage Company</Typography>
            </Grid>

            <Grid item sm={12} md={12} >
                <Grid container spacing={2}>
                    <Grid item sm={8} md={8}>
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
                                            <TableRow key={i} onClick={() => setSingleCompany(r)}>
                                                <TableCell >   {r.id}  </TableCell>
                                                <TableCell >   {r.title}  </TableCell>
                                                <TableCell >   {r.description} </TableCell>
                                                <TableCell> <Dialogbox title="Update Company" btn_name="update"><UpdateCompanyForm /></Dialogbox></TableCell>
                                                <TableCell> <Dialogbox title="Remove Company" btn_name="remove"><RemoveCompanyForm /></Dialogbox></TableCell>
                                            </TableRow> //id,title,description need to change as json file
                                        )}
                                    </TableBody>
                                </Table>

                            </Stack>
                        </Tile>
                    </Grid>

                    <Grid item sm={4} md={4}>
                        <Tile>
                            <Stack direction={'column'}>
                                <Typography fontWeight={'bold'} paddingTop={'15px'} paddingBottom={'15px'}>Company full details</Typography>
                                <Divider orientation="horizontal" />
                                {singleCompany && (
                                    <Stack direction={'column'}>
                                        <Stack direction={'row'}>  <Typography width={'135px'}> CompanyName </Typography><Typography> {singleCompany.id} </Typography></Stack>
                                        <Stack direction={'row'}> <Typography width={'135px'}> E-mail </Typography><Typography>{singleCompany.title} </Typography></Stack>
                                        <Stack direction={'row'}> <Typography width={'135px'}> EContact Number</Typography><Typography> {singleCompany.title} </Typography></Stack>
                                        <Stack direction={'row'}> <Typography width={'135px'}> Company Address</Typography><Typography>{singleCompany.title} </Typography></Stack>
                                        <Stack direction={'row'}> <Typography width={'135px'}> Company Description</Typography><Typography>{singleCompany.title} </Typography></Stack>
                                        <Stack direction={'row'}> <Typography width={'135px'}> Comapny Rating</Typography><Typography>{singleCompany.title} </Typography></Stack>
                                    </Stack>
                                )}
                            </Stack>
                        </Tile>
                    </Grid>

                </Grid>
            </Grid>
        </Grid>



    )
}  