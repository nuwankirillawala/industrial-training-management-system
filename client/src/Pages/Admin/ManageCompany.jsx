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
import axios from "axios";

export const ManageCompany = () => {
    const [Records, setRecords] = useState([])
    const [singleCompany, setSingleCompany] = useState([])

    const navigate = useNavigate()

    const getAllCompanyData = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/v1/company/all', { withCredentials: true });
            console.log(res);
            if (res.status === 201) {
                console.log(res.data);
                setRecords(res.data.companyList)
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
        /*  { columnName: 'No of Intern seats' },
         { columnName: 'Company Description' },
         { columnName: 'Rating' },
         { columnName: 'Contact Person Name' },
         { columnName: 'Contact Person Email' },
         { columnName: 'Contact person Contact' },
         { columnName: 'Contact person post' } */
    ]


    return (
        <Grid container spacing={2}>
            <Grid item sm={12} md={12}>
                <Typography variant="pageTitle">Company Management</Typography>
            </Grid>

            <Grid item sm={12} md={12}>
                <Grid container spacing={2}>
                    <Grid item sm={5} md={5}>
                        <Tile>
                            <Typography variant="head6">Add New Company</Typography>
                            <Divider sx={{ m: 1 }} />
                            <Typography margin={2}> Click here for add a new company to the system</Typography>
                            <Button
                                variant="itms-add"
                                fontWeight="bold"
                                onClick={() => navigate('/add-company')}
                            >
                                Add New Company
                            </Button >
                        </Tile>
                    </Grid>
                    <Grid item sm={5} md={5}>
                        <Tile>
                            <Typography variant="head6">View Intern Lists of Companies</Typography>
                            <Divider sx={{ m: 1 }} />
                            <Typography margin={2}> Click here for View selected intern lists of companies</Typography>
                            <Button
                                variant="itms"
                                fontWeight="bold"
                                onClick={() => navigate('/add-company')}
                            >
                                View List
                            </Button >
                        </Tile>
                    </Grid>
                </Grid>
            </Grid>

            {/* <Grid item sm={12} md={12} paddingTop={'10px'}>
                <Typography variant="head6">View Available Companies</Typography>
            </Grid> */}
            {/* <Grid item md={12} sm={12} ><Typography variant='body2' paddingLeft={'20px'}> Click the row for get company wise details in right side</Typography> </Grid> */}

            <Grid item sm={12} md={12} >
                <Grid container spacing={2}>
                    <Grid item sm={12} md={12} lg={8}>
                        <Tile>
                            <Typography variant="head6">View Available Companies</Typography>
                            <Divider sx={{ m: 1 }} />
                            <Typography variant='body2' paddingLeft={'20px'}> Click the row for get company wise details in right side</Typography><br />
                            <Stack>
                                <Table sx={{ border: '1px solid #4665D2', cursor: 'pointer' }}>
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
                                            <TableRow key={i} onClick={() => setSingleCompany(r)}>
                                                <TableCell >   {r.name}  </TableCell>
                                                <TableCell >   {r.email}  </TableCell>
                                                <TableCell >   {r.contactNo} </TableCell>
                                                <TableCell >   {r.address}  </TableCell>
                                                {/* <TableCell >   {r.internSeats}  </TableCell>
                                                <TableCell >   {r.description} </TableCell>
                                                <TableCell >   {r.rating}  </TableCell>
                                                {r.contactPerson.map((Person, j) => (
                                                    <React.Fragment key={j}>
                                                        <TableCell>{Person.contactPersonName}</TableCell>
                                                        <TableCell>{Person.contactPersonEmail}</TableCell>
                                                        <TableCell>{Person.contactPersonContactNo}</TableCell>
                                                        <TableCell>{Person.contactPersonPosition}</TableCell>
                                                    </React.Fragment>
                                                ))} */}
                                                <TableCell> <Dialogbox title="Update Company" btn_name="update"><UpdateCompanyForm companyId={r._id} /></Dialogbox></TableCell>
                                                <TableCell> <Dialogbox title="Remove Company" btn_name="remove"><RemoveCompanyForm /></Dialogbox></TableCell>
                                            </TableRow> //id,title,description need to change as json file
                                        )}
                                    </TableBody>
                                </Table>

                            </Stack>
                        </Tile>
                    </Grid>

                    <Grid item sm={12} md={12} lg={4}>
                        <Tile>
                            <Stack direction={'column'}>
                                <Typography variant="head6">Company Details</Typography>
                                <Divider sx={{ m: 1 }} />
                                {/* <Typography fontWeight={'bold'} paddingTop={'15px'} paddingBottom={'15px'}>Company full details</Typography> */}
                                {/* <Divider orientation="horizontal" color="#4665D2" /> */}
                                {singleCompany && (
                                    <Stack direction={'column'} spacing={2}>
                                        <Stack direction={'row'}> <Stack flex={1} minWidth={'160px'}> <Typography > CompanyName </Typography></Stack><Stack flex={1}><Typography> : {singleCompany.name} </Typography></Stack></Stack>
                                        <Stack direction={'row'}> <Stack flex={1} minWidth={'160px'}><Typography> E-mail </Typography></Stack><Stack flex={1}><Typography>: {singleCompany.email} </Typography></Stack></Stack>
                                        <Stack direction={'row'}> <Stack flex={1} minWidth={'160px'}><Typography> EContact Number</Typography></Stack><Stack flex={1}><Typography> : {singleCompany.contactNo} </Typography></Stack></Stack>
                                        <Stack direction={'row'}> <Stack flex={1} minWidth={'160px'}><Typography > Address</Typography></Stack><Stack flex={1}><Typography>: {singleCompany.address} </Typography></Stack></Stack>
                                        <Stack direction={'row'}> <Stack flex={1} minWidth={'160px'}><Typography > No of Intern Seats</Typography></Stack><Stack flex={1}><Typography>: {singleCompany.internSeats} </Typography></Stack></Stack>
                                        <Stack direction={'row'}> <Stack flex={1} minWidth={'160px'}><Typography > Description</Typography></Stack><Stack flex={1}><Typography>: {singleCompany.description} </Typography></Stack></Stack>
                                        <Stack direction={'row'}> <Stack flex={1} minWidth={'160px'}><Typography >Rating</Typography></Stack><Stack flex={1}><Typography>: {singleCompany.rating} </Typography></Stack></Stack>
                                        {singleCompany.contactPerson && singleCompany.contactPerson.map((Person, j) => (
                                            <React.Fragment key={j}>
                                                <Stack direction={'row'}> <Stack flex={1} minWidth={'160px'}><Typography >Contact Person Name</Typography></Stack><Stack flex={1}><Typography>: {Person.contactPersonName} </Typography></Stack></Stack>
                                                <Stack direction={'row'}> <Stack flex={1} minWidth={'160px'}><Typography >Contact Person Email</Typography></Stack><Stack flex={1}><Typography>: {Person.contactPersonEmail} </Typography></Stack></Stack>
                                                <Stack direction={'row'}> <Stack flex={1} minWidth={'160px'}><Typography >Contact Person Contact</Typography></Stack><Stack flex={1}><Typography>: {Person.contactPersonContactNo}</Typography></Stack></Stack>
                                                <Stack direction={'row'}> <Stack flex={1} minWidth={'160px'}><Typography >Contact person post</Typography></Stack><Stack flex={1}><Typography>: {Person.contactPersonPosition} </Typography></Stack></Stack>
                                            </React.Fragment>))}
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