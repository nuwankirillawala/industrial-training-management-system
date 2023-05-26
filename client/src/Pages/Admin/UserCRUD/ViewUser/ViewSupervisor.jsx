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

const ViewSupervisor = () => {
  const [Records, setRecords] = useState([]);
  const [singleUser, setSingleUser] = useState([]);

  const getCompanySupervisorData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/v1/admin/users/supervisor",
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
    getCompanySupervisorData();
  }, []);

  const Column = [
    { columnName: "Supervisor Name" },
    { columnName: "  Email" },
    { columnName: "  Job Role" },
  ];

  return (
    <Grid spacing={1} container>
      <Grid item md={12} sm={12}>
        <Typography variant="pageTitle">
          View Company Supervisor Details
        </Typography>
      </Grid>
      <Grid item md={12} sm={12}>
        <Typography variant="body2" paddingLeft={"20px"}>
          Click the row for get company supervisor wise details in right side
        </Typography>
      </Grid>
      <Grid item md={8} sm={12}>
        <Tile>
          <Box>
            <Stack>
              <TableContainer
                sx={{ maxHeight: "70vh", minHeight: "65vh" }}
                style={{ cursor: "pointer" }}
              >
                <Table sx={{ border: "1px solid #4665D2" }}>
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
                        <TableCell> {r.name} </TableCell>
                        <TableCell> {r.email} </TableCell>
                        <TableCell> {r.jobRole} </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Stack>
          </Box>
        </Tile>
      </Grid>

      <Grid item md={4} sm={12}>
        <Tile>
          <Stack direction={"column"} spacing={2}>
            <Stack>
              <Typography variant="head6">
                Company Supervisor full details
              </Typography>
            </Stack>
            <Divider orientation="horizontal" color="#4665D2" />
            <Stack>
              <Paper
                variant={"outlined"}
                sx={{ bgcolor: "#fff", padding: 2, height: "35vh" }}
              >
                {singleUser && (
                  <Stack direction={"column"} spacing={3}>
                    <Stack direction={"row"}>
                      <Stack flex={1} minWidth={"100px"}>
                        <Typography> Name </Typography>
                      </Stack>
                      <Stack flex={4}>
                        <Typography> {singleUser.name} </Typography>
                      </Stack>
                    </Stack>
                    <Stack direction={"row"}>
                      <Stack flex={1} minWidth={"100px"}>
                        <Typography> E-mail</Typography>
                      </Stack>
                      <Stack flex={4}>
                        <Typography> {singleUser.email} </Typography>
                      </Stack>
                    </Stack>
                    <Stack direction={"row"}>
                      <Stack flex={1} minWidth={"100px"}>
                        <Typography> Job Role</Typography>
                      </Stack>
                      <Stack flex={4}>
                        <Typography>{singleUser.jobRole} </Typography>
                      </Stack>
                    </Stack>
                  </Stack>
                )}
              </Paper>
            </Stack>
          </Stack>
        </Tile>
      </Grid>
    </Grid>
  );
};

export default ViewSupervisor;
