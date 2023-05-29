import React, { useEffect, useState } from "react";
import {
  Grid,
  Stack,
  Box,
  Paper,
  Typography,
  Divider,
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@mui/material";
import { Tile } from "../../../components/card/Tile";
import { Report } from "../../../assets/index";
import axios from "axios";

//dummy data
const studentList = [
  { name: "Sanjana Dasanayaka", regNo: "SC/2019/11139" },
  { name: "Saman kumara", regNo: "SC/2019/11102" },
  { name: "Udani Kaluwala", regNo: "SC/2019/11100" },
];
//End of Dummy data

export const ReportPortalSupervisor = () => {
  const [studentIdList, setStudentIdList] = useState();
  const [studetList, setStudentList] = useState();

  //Fetch company list
  const getStudentIdList = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/v1/supervisor/profile"
      );
      console.log(res.data.user.company.interns);
      if (res.status === 200) {
        setStudentIdList(res.data.user.company.interns);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStudentIdList();
    // console.log(companyList);
  }, []);
  //End of fetch company list

  const rawDataColumn = [
    {
      field: "name",
      headerName: "Name",
      editable: false,
      flex: 1,
    },
    {
      field: "regNo",
      headerName: "Student Number",
      editable: false,
      flex: 2,
    },
  ];

  return (
    <Grid container spacing={2}>
      <Grid item md={12}>
        <Typography variant="pageTitle">Report Submission</Typography>
      </Grid>
      <Grid item md={12}>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Stack flex={1}>
            <Tile>
              <Stack direction={"column"} spacing={2}>
                <Stack>
                  <Typography variant="head6">Student List</Typography>
                </Stack>
                <Divider />
                <Stack height={"60vh"}>
                  <Box>
                    <TableContainer style={{ cursor: "pointer" }}>
                      <Table stickyHeader>
                        <TableHead>
                          <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Student ID</TableCell>
                          </TableRow>
                        </TableHead>

                        <TableBody>
                          {/* {studentIdList.map((id, index) => ( */}
                          <TableRow>
                            <TableCell></TableCell>
                          </TableRow>
                          {/* ))} */}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                </Stack>
                <Stack></Stack>
              </Stack>
            </Tile>
          </Stack>
          <Stack flex={2}>
            <Stack alignItems="center">
              <img src={Report} alt="Resume" width={500} />
            </Stack>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
};
