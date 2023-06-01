import { useState, useEffect } from "react";
import {
  Table, TableBody, TableCell, TableHead, TableRow, Grid, Typography, Stack, Divider, Box, Paper,
} from "@mui/material";
import { Tile } from "../../../../components/card/Tile";
import TableContainer from "@mui/material/TableContainer";
import axios from "axios";

const ViewAdmin = () => {
  const [Records, setRecords] = useState([]);
  const [singleAdmin, setSingleAdmin] = useState([]);
  const getAdminData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/v1/admin/users/admin", { withCredentials: true });
      if (res.status === 200) {
        const filteredRecords = res.data.users.filter(
          (record) => record.role === "system-admin"
        );
        setRecords(filteredRecords);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAdminData();
  }, []);
  const Column = [
    { columnName: " Admin Name" },
    { columnName: " Email" },
    { columnName: " ContactNo" },
    { columnName: " Staff ID" },
  ];

  return (
    < Grid spacing={1} container >
      <Grid item md={12} sm={12}> <Typography variant="pageTitle"> View Administrator Details</Typography> </Grid>
      <Grid item md={12} sm={12}> <Typography variant="body2" paddingLeft={"20px"}>
        Click the row for get administrator wise details in right side
      </Typography>   </Grid>
      <Grid item sm={12} md={8}>
        <Tile>
          <Box>
            <TableContainer sx={{ maxHeight: "70vh", minHeight: "65vh" }} style={{ cursor: "pointer" }}  >
              <Table stickyHeader sx={{ border: "1px solid #4665D2" }}>
                <TableHead>
                  <TableRow>
                    {Column.map((c, i) => (
                      <TableCell key={i}> <Typography fontWeight={"bold"}>{c.columnName} </Typography>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {Records.map((r, i) => (
                    <TableRow key={i} onClick={() => setSingleAdmin(r)}>
                      <>
                        <TableCell> {r.name} </TableCell>
                        <TableCell> {r.email} </TableCell>
                        <TableCell> {r.contactNo} </TableCell>
                        <TableCell> {r.staffId} </TableCell>
                      </>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Tile>
      </Grid>

      <Grid item md={4} sm={12}>
        <Tile>
          <Stack direction={"column"} spacing={2}>
            <Stack>
              <Typography variant="head6">
                Administrator full details
              </Typography>
            </Stack>
            <Divider orientation="horizontal" color="#4665D2" />
            <Stack>
              <Paper
                variant={"outlined"}
                sx={{ bgcolor: "#fff", padding: 2, height: "35vh" }}
              >
                {singleAdmin && (
                  <Stack direction={"column"} spacing={3}>
                    <Stack direction={"row"}>
                      <Stack flex={1} minWidth={"160px"}>
                        <Typography> Name </Typography>
                      </Stack>
                      <Stack flex={4}>
                        <Typography> {singleAdmin.name} </Typography>
                      </Stack>
                    </Stack>
                    <Stack direction={"row"}>
                      <Stack flex={1} minWidth={"160px"}>
                        <Typography> Staff ID </Typography>
                      </Stack>
                      <Stack flex={4}>
                        <Typography>{singleAdmin.staffId} </Typography>
                      </Stack>
                    </Stack>
                    <Stack direction={"row"}>
                      <Stack flex={1} minWidth={"160px"}>
                        <Typography> E-mail</Typography>
                      </Stack>
                      <Stack flex={4}>
                        <Typography> {singleAdmin.email} </Typography>
                      </Stack>
                    </Stack>
                    <Stack direction={"row"}>
                      <Stack flex={1} minWidth={"160px"}>
                        <Typography> Contact Number</Typography>
                      </Stack>
                      <Stack flex={4}>
                        <Typography>{singleAdmin.contactNo} </Typography>
                      </Stack>
                    </Stack>
                  </Stack>
                )}
              </Paper>
            </Stack>
          </Stack>
        </Tile>
      </Grid>
    </Grid >
  );
};

export default ViewAdmin;
