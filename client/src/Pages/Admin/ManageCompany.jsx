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
    const [Records, setRecords] = useState([])
    const [singleCompany, setSingleCompany] = useState([])

    const navigate = useNavigate()

    const getAllCompanyData = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/v1/');
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
        getAllCompanyData();
    }, [])

    const Column = [
        { columnName: 'Company Name' },
        { columnName: 'Email' },
        { columnName: 'ContactNo' },
        { columnName: 'Address' },
        { columnName: 'No of Intern seats' },
        { columnName: 'Company Description' },
        { columnName: 'Rating' },
        { columnName: 'Contact Person Name' },
        { columnName: 'Contact Person Email' },
        { columnName: 'Contact person Contact' },
        { columnName: 'Contact person post' }
    ]


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
            <Grid item md={12} sm={12} ><Typography variant='body2' paddingLeft={'20px'}> Click the row for get company wise details in right side</Typography> </Grid>

            <Grid item sm={12} md={12} >
                <Grid container spacing={2}>
                    <Grid item sm={8} md={8}>
                        <Tile>
                            <Stack>
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
                                    {/* <TableBody>

                                        {Records.map((r, i) =>
                                            <TableRow key={i} onClick={() => setSingleCompany(r)}>
                                                 <TableCell >   {r.id}  </TableCell>
                                                <TableCell >   {r.title}  </TableCell>
                                                <TableCell >   {r.description} </TableCell>
                                                <TableCell> <Dialogbox title="Update Company" btn_name="update"><UpdateCompanyForm /></Dialogbox></TableCell>
                                                <TableCell> <Dialogbox title="Remove Company" btn_name="remove"><RemoveCompanyForm /></Dialogbox></TableCell>
                                            </TableRow> //id,title,description need to change as json file
                                        )}
                                    </TableBody> */}
                                </Table>

                            </Stack>
                        </Tile>
                    </Grid>

                    <Grid item sm={4} md={4}>
                        <Tile>
                            <Stack direction={'column'}>
                                <Typography fontWeight={'bold'} paddingTop={'15px'} paddingBottom={'15px'}>Company full details</Typography>
                                <Divider orientation="horizontal" color="#4665D2" />
                                {singleCompany && (
                                    <Stack direction={'column'} spacing={2}>
                                        <Stack direction={'row'}>  <Typography width={'135px'}> CompanyName </Typography><Typography> {singleCompany.id} </Typography></Stack>
                                        <Stack direction={'row'}> <Typography width={'135px'}> E-mail </Typography><Typography>{singleCompany.title} </Typography></Stack>
                                        <Stack direction={'row'}> <Typography width={'135px'}> EContact Number</Typography><Typography> {singleCompany.title} </Typography></Stack>
                                        <Stack direction={'row'}> <Typography width={'135px'}> Address</Typography><Typography>{singleCompany.title} </Typography></Stack>
                                        <Stack direction={'row'}> <Typography width={'135px'}> No of Intern Seats</Typography><Typography>{singleCompany.title} </Typography></Stack>
                                        <Stack direction={'row'}> <Typography width={'135px'}> Description</Typography><Typography>{singleCompany.title} </Typography></Stack>
                                        <Stack direction={'row'}> <Typography width={'135px'}>Rating</Typography><Typography>{singleCompany.title} </Typography></Stack>
                                        <Stack direction={'row'}> <Typography width={'135px'}>Contact Person Name</Typography><Typography>{singleCompany.title} </Typography></Stack>
                                        <Stack direction={'row'}> <Typography width={'135px'}>Contact Person Email</Typography><Typography>{singleCompany.title} </Typography></Stack>
                                        <Stack direction={'row'}> <Typography width={'135px'}>Contact Person Contact</Typography><Typography>{singleCompany.title} </Typography></Stack>
                                        <Stack direction={'row'}> <Typography width={'135px'}>Contact person post</Typography><Typography>{singleCompany.title} </Typography></Stack>
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