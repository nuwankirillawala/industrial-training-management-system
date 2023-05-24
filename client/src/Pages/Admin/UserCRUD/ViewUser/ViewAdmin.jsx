import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, Grid, Typography, Stack, Divider } from "@mui/material";
import { Tile } from "../../../../components/card/Tile";
import axios from "axios";

const ViewAdmin = () => {
  const [Records, setRecords] = useState([])
  const [singleAdmin, setSingleAdmin] = useState([])

  const getAdminData = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/v1/admin/users/admin', { withCredentials: true });
      console.log(res);
      if (res.status === 200) {
        console.log(res.data.users);
        const filteredRecords = res.data.users.filter(record => record.role === 'system-admin');
        setRecords(filteredRecords);
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAdminData();
  }, [])

  const fetchUser = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/v1/admin/view-all-users/admin')
      if (res.status) {
        setSingleUser(JSON.stringify(res.data))
      }
      console.log(res)
    }
    catch (err) {

    }
  }

  useEffect(() => fetchUser, []);
  const Column = [
    { columnName: 'Admin Name' },
    { columnName: '  Email' },
    { columnName: '  ContactNo' },
    { columnName: '  Staff ID' }
  ]

  return (
    <Grid spacing={1} container>
      <Grid item md={12} sm={12} ><Typography variant='pageTitle'> View Administrator Details</Typography> </Grid>
      <Grid item md={12} sm={12} ><Typography variant='body2' paddingLeft={'20px'}> Click the row for get administrator wise details in right side</Typography> </Grid>
      <Grid item md={8} sm={12} style={{ maxHeight: 500, overflowY: 'scroll' }}>

        <Tile >
          <Table sx={{ border: '1px solid #4665D2' }}>
            <TableHead >
              <TableRow >
                {Column.map((c, i) =>
                  <TableCell key={i}>
                    <Typography fontWeight={'bold'}> {c.columnName}</Typography>
                  </TableCell>
                )}
              </TableRow>
            </TableHead>

            <TableBody>
              {Records.map((r, i) =>
                <TableRow key={i} onClick={() => setSingleAdmin(r)}>
                  <TableCell >   {r.name}  </TableCell>
                  <TableCell>   {r.email}  </TableCell>
                  <TableCell>   {r.contactNo} </TableCell>
                  <TableCell >   {r.staffId} </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>


        </Tile></Grid>

      <Grid item md={4} sm={12} > <Tile>
        <Stack direction={'column'}>
          <Typography fontWeight={'bold'} paddingTop={'15px'} paddingBottom={'15px'}>Administrator full details</Typography>
          <Divider orientation="horizontal" color="#4665D2" />
          {singleAdmin && (
            <Stack direction={'column'} spacing={2}>
              <Stack direction={'row'}>  <Stack flex={1} minWidth={'160px'}><Typography > Name </Typography></Stack><Stack flex={1}><Typography> {singleAdmin.name} </Typography></Stack></Stack>
              <Stack direction={'row'}> <Stack flex={1} minWidth={'160px'}><Typography > Staff ID </Typography></Stack><Stack flex={1}><Typography>{singleAdmin.staffId} </Typography></Stack></Stack>
              <Stack direction={'row'}> <Stack flex={1} minWidth={'160px'}><Typography > E-mail</Typography></Stack><Stack flex={1}><Typography> {singleAdmin.email} </Typography></Stack></Stack>
              <Stack direction={'row'}> <Stack flex={1} minWidth={'160px'}><Typography > Contact Number</Typography></Stack><Stack flex={1}><Typography>{singleAdmin.contactNo} </Typography></Stack></Stack>
            </Stack>
          )}
        </Stack>
      </Tile></Grid>

    </Grid>
  )
}

export default ViewAdmin