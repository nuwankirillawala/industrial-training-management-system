import { Stack } from "@mui/system";
import React from "react";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Grid,
  Typography,
  Divider,
  Box,
  Paper,
} from "@mui/material";
import { Tile } from "../../../../components/card/Tile";
import axios from "axios";
import TableContainer from "@mui/material/TableContainer";

export const ViewStudent = () => {
  const [Records, setRecords] = useState([]);
  const [singleUser, setSingleUser] = useState([]);

  const getUndergraduateData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/v1/admin/users/undergraduate",
        { withCredentials: true }
      );
      // console.log(res);
      if (res.status === 200) {
        // console.log(res.data.users);
        setRecords(res.data.users);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUndergraduateData();
  }, []);

  const Column = [
    { columnName: "Reg No" },
    { columnName: "Name" },
    { columnName: "  Email" },
    { columnName: " GPA" },
    { columnName: " Weighted GPA" },
    { columnName: " Linkedin URL" },
    { columnName: " Intern Status" },
    { columnName: " Supervisor" },
  ];
  return (
    <Grid spacing={1} container>
      <Grid item md={12} sm={12}>
        <Typography variant="pageTitle"> View Undergraduate Details</Typography>{" "}
      </Grid>
      <Grid item md={12} sm={12}>
        <Typography variant="body2" paddingLeft={"20px"}>
          Click the row for get undergraduate wise details in right side
        </Typography>
      </Grid>
      <Grid item md={8} sm={12}>
        <Tile>
          <Box>
            <TableContainer
              sx={{ maxHeight: "70vh" }}
              style={{ cursor: "pointer" }}
            >
              <Table stickyHeader sx={{ border: "1px solid #4665D2" }}>
                <TableHead>
                  <TableRow>
                    {Column.map((c, i) => (
                      <TableCell key={i}>
                        <Typography fontWeight={"bold"}>
                          {c.columnName}
                        </Typography>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Records.map((r, i) => (
                    <TableRow key={i} onClick={() => setSingleUser(r)}>
                      <TableCell> {r.regNo} </TableCell>
                      <TableCell> {r.name} </TableCell>
                      <TableCell> {r.email} </TableCell>
                      <TableCell> {r.gpa} </TableCell>
                      <TableCell> {r.weightedGPA} </TableCell>
                      <TableCell> {r.linkdinURL} </TableCell>
                      {/* <TableCell >   {r.internStatus}  </TableCell> */}
                      <TableCell> {r.supervisor} </TableCell>
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
                Undergraduate full details
              </Typography>
            </Stack>
            <Divider orientation="horizontal" color="#4665D2" />
            <Stack>
              <Box height="45vh">
                <Paper
                  variant={"outlined"}
                  sx={{ bgcolor: "#fff", padding: 2 }}
                >
                  {singleUser && (
                    <Stack direction={"column"} spacing={2} width={"25vw"}>
                      <Stack direction={"row"}>
                        <Stack flex={1} minWidth={"160px"}>
                          <Typography> Reg No </Typography>
                        </Stack>
                        <Stack flex={4}>
                          <Typography> {singleUser.regNo} </Typography>
                        </Stack>
                      </Stack>
                      <Stack direction={"row"}>
                        <Stack flex={1} minWidth={"160px"}>
                          <Typography> Name </Typography>
                        </Stack>
                        <Stack flex={4}>
                          <Typography>{singleUser.name} </Typography>
                        </Stack>
                      </Stack>
                      <Stack direction={"row"}>
                        <Stack flex={1} minWidth={"160px"}>
                          <Typography> E-mail</Typography>
                        </Stack>
                        <Stack flex={4}>
                          <Typography> {singleUser.email} </Typography>
                        </Stack>
                      </Stack>
                      <Stack direction={"row"}>
                        <Stack flex={1} minWidth={"160px"}>
                          <Typography> GPA</Typography>
                        </Stack>
                        <Stack flex={4}>
                          <Typography>{singleUser.gpa} </Typography>
                        </Stack>
                      </Stack>
                      <Stack direction={"row"}>
                        <Stack flex={1} minWidth={"160px"}>
                          <Typography> Weighted GPA </Typography>
                        </Stack>
                        <Stack flex={4}>
                          <Typography> {singleUser.weightedGPA} </Typography>
                        </Stack>
                      </Stack>
                      <Stack direction={"row"}>
                        <Stack flex={1} minWidth={"160px"}>
                          <Typography> Linkedin URL </Typography>
                        </Stack>
                        <Stack flex={4}>
                          <Typography>{singleUser.linkdinURL} </Typography>
                        </Stack>
                      </Stack>
                      {/* <Stack direction={'row'}> <Typography width={'135px'}> Intern Status</Typography><Typography> {singleUser.internStatus} </Typography></Stack> */}
                      <Stack direction={"row"}>
                        <Stack flex={1} minWidth={"160px"}>
                          <Typography> Supervisor</Typography>
                        </Stack>
                        <Stack flex={4}>
                          <Typography>{singleUser.supervisor} </Typography>
                        </Stack>
                      </Stack>
                    </Stack>
                  )}
                </Paper>
              </Box>
            </Stack>
          </Stack>
        </Tile>
      </Grid>
    </Grid>
  );
};
export default ViewStudent;
