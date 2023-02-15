import React from "react";
import { Container, Avatar, Paper, Card, Grid, Box, Typography, Button } from "@mui/material";
import { Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { blue } from "@mui/material/colors";

export default function UserProfile() {

    const basicData = {
        name: "Saman Kumara",
        email: "samankumara@email.com",
        contactNo: "071223432",
        adminRole: "System Admin",
        staffID: "DCS023"
    };

    return (
        <Container sx={{width: 'calc(70%)px'}}>
            <Box sx={{padding: 3}}>
            <Button variant="contained" startIcon={<EditIcon />}>Edit Profile</Button>
            </Box>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item>
                        <Paper sx={{ padding: 6, textAlign: "center" }}>
                            <Avatar
                                src="/images/avatar-temp.png"
                                alt="Profile Image"
                                sx={{ width: 100, height: 100, display: "block", margin: "0 auto" }}
                            />
                            <Typography variant="h6" color="initial">{basicData.name}</Typography>
                            <Typography variant="h7" color="initial">{basicData.adminRole}</Typography><br />
                            <Typography variant="h7" color="initial">{basicData.email}</Typography><br />
                            <Typography variant="h7" color="initial"></Typography>
                        </Paper>
                    </Grid>
                    <Grid item>
                        <Card>
                            <TableContainer>
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>Name</TableCell>
                                            <TableCell>:</TableCell>
                                            <TableCell>{basicData.name}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Admin Type</TableCell>
                                            <TableCell>:</TableCell>
                                            <TableCell>{basicData.adminRole}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Email</TableCell>
                                            <TableCell>:</TableCell>
                                            <TableCell>{basicData.email}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Contact No.</TableCell>
                                            <TableCell>:</TableCell>
                                            <TableCell>{basicData.contactNo}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Staff ID</TableCell>
                                            <TableCell>:</TableCell>
                                            <TableCell>{basicData.staffID}</TableCell>
                                        </TableRow>
                                        
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}