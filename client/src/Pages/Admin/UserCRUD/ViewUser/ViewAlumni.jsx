import { Stack } from "@mui/system";
import React from "react";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Grid,
  Divider,
  Box,
  Paper,
} from "@mui/material";
import { Tile } from "../../../../components/card/Tile";
import axios from "axios";
import TableContainer from "@mui/material/TableContainer";

const ViewAlumni = () => {
  const [Records, setRecords] = useState([]);
  const [singleUser, setSingleUser] = useState([]);

  const getAlumniData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/v1/admin/users/alumni",
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
    getAlumniData();
  }, []);

  const Column = [
    { columnName: "Reg No" },
    { columnName: "Alumni Name" },
    { columnName: "E-mail" },
    { columnName: "Graduated Year" },
    { columnName: "Contact No" },
  ];

  return (
    <Grid spacing={1} container>
      <Grid item md={12} sm={12}>
        <Typography variant="pageTitle"> View Alumni Details</Typography>{" "}
      </Grid>
      <Grid item md={12} sm={12}>
        <Typography variant="body2" paddingLeft={"20px"}>
          Click the row for get admin wise details in your right side
        </Typography>
      </Grid>
      <Grid item md={8} sm={12}>
        <Tile>
          <Box>
            <TableContainer
              sx={{ maxHeight: "70vh", minHeight: "65vh" }}
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
                  {Records.map(
                    (r, i) => (
                      <TableRow key={i} onClick={() => setSingleUser(r)}>
                        <TableCell> {r.regNo} </TableCell>
                        <TableCell> {r.name} </TableCell>
                        <TableCell> {r.email} </TableCell>
                        <TableCell> {r.graduatedYear} </TableCell>
                        <TableCell> {r.contactNo} </TableCell>
                      </TableRow>
                    ) //id,title,description need to change as json file
                  )}
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
              <Typography variant="head6">Alumni full details</Typography>
            </Stack>
            <Divider orientation="horizontal" color="#4665D2" />
            <Stack>
              {singleUser && (
                <Stack direction={"column"} spacing={2}>
                  <Stack direction={"row"}>
                    <Stack flex={1} minWidth={"160px"}>
                      <Typography> Reg No </Typography>
                    </Stack>
                    <Stack flex={4}>
                      <Typography>{singleUser.regNo} </Typography>
                    </Stack>
                  </Stack>
                  <Stack direction={"row"}>
                    <Stack flex={1} minWidth={"160px"}>
                      <Typography> Name </Typography>
                    </Stack>
                    <Stack flex={4}>
                      <Typography> {singleUser.name} </Typography>
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
                      <Typography> Graduated Year</Typography>
                    </Stack>
                    <Stack flex={4}>
                      <Typography>{singleUser.graduatedYear} </Typography>
                    </Stack>
                  </Stack>
                  <Stack direction={"row"}>
                    <Stack flex={1} minWidth={"160px"}>
                      <Typography> Contact No</Typography>
                    </Stack>
                    <Stack flex={4}>
                      <Typography>{singleUser.contactNo} </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              )}
            </Stack>
          </Stack>
        </Tile>
      </Grid>
    </Grid>
  );
};

export default ViewAlumni;
