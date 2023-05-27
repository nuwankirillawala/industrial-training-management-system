import React, { useState, useEffect } from "react";
import { Stack, Box, Divider, Paper, Grid, Typography } from "@mui/material";
import { Tile } from "../../../components/card/Tile";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { ShowStudentResults } from "../../../components/user/Department/ShowStudentResults";
import { DepartmentShowStudentProfile } from "../../../components/user/Department/DepartmentShowStudentProfile";

const StudentProfile = () => {
  const [selecteduser, setSelectedUser] = useState();
  const [select, setSelect] = useState(false);
  const [records, setRecords] = useState([
    {
      role: "",
      _id: "",
      name: "",
      regNo: "",
      email: "",
      password: "",
      __v: 0,
      weightedGPA: "",
      notes: [],
      internStatus: [],
      weeklyReports: [],
      monthlyReports: [],
      gpa: "",
      contactNo: "",
    },
  ]);

  const getUndergraduateData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/v1/undergraduate/user/all"
      );
      console.log(res);
      if (res.status === 200) {
        console.log(res.data.users);
        setRecords(res.data.users);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUndergraduateData();
  }, []);

  const selectRowData = (params) => {
    try {
      // const userid = params.row.id;
      setSelect(true);
      // setStudentId(userid);
      console.log(params);
    } catch (error) {
      console.log(error);
    }
  };

  const undergraduateColumns = [
    {
      field: "name",
      headerName: "Name",
      editable: false,
      flex: 1,
    },
    {
      field: "regNo",
      headerName: "reg No",
      editable: false,
      flex: 1,
    },
    {
      field: "gpa",
      headerName: "GPA",
      editable: false,
      flex: 1,
    },
    {
      field: "wgpa",
      headerName: "Weighted GPA",
      editable: false,
      flex: 1,
    },
    {
      field: "contact",
      headerName: "Contact Number",
      editable: false,
      flex: 1,
    },
  ];
  const undergraduateListColumns = [
    {
      field: "name",
      headerName: "Name",
      editable: false,
      flex: 1,
    },
    {
      field: "regNo",
      headerName: "reg No",
      editable: false,
      flex: 1,
    },
  ];

  return (
    <Grid container spacing={1}>
      <Grid item md={12} spacing={1}>
        <Typography variant="pageTitle">Undergraduate Profile</Typography>
      </Grid>
      {select === false && (
        <Grid item md={12}>
          <Tile>
            <Stack direction={"column"} spacing={2}>
              <Stack>
                <Typography>Select Undergraduate to show profile</Typography>
              </Stack>

              <Divider />

              <Stack>
                <Box
                  sx={{
                    height: "65vh",
                    width: "100%",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
                  <DataGrid
                    rows={records.map((student) => {
                      return {
                        name: student.name,
                        regNo: student.regNo,
                        gpa: student.gpa,
                        wgpa: student.weightedGPA,
                        contact: student.contactNo,
                      };
                    })}
                    // rows
                    columns={undergraduateColumns}
                    onRowClick={selectRowData}
                    getRowId={(row) => row.regNo}
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                    // hideFooter={true}
                    style={{ cursor: "pointer" }}
                  />
                </Box>
              </Stack>
            </Stack>
          </Tile>
        </Grid>
      )}
      {select === true && (
        <>
          {/* <Grid container spacing={1}> */}
          <Grid item md={3}>
            <Tile>
              <Stack spacing={2}>
                <Stack>
                  <Typography variant="head6">Undergraduate List</Typography>
                </Stack>
                <Divider />
                <Stack>
                  <Box
                    sx={{
                      height: "65vh",
                      width: "100%",
                      justifyContent: "center",
                      textAlign: "center",
                    }}
                  >
                    <DataGrid
                      rows={records.map((student) => {
                        return {
                          name: student.name,
                          regNo: student.regNo,
                          gpa: student.gpa,
                          wgpa: student.weightedGPA,
                          contact: student.contactNo,
                        };
                      })}
                      // rows
                      columns={undergraduateListColumns}
                      onRowClick={selectRowData}
                      getRowId={(row) => row.regNo}
                      disableSelectionOnClick
                      experimentalFeatures={{ newEditingApi: true }}
                      hideFooter={true}
                      style={{ cursor: "pointer" }}
                    />
                  </Box>
                </Stack>
              </Stack>
            </Tile>
          </Grid>
          <Grid item md={9}>
            <Tile>
              <Stack direction={"row"} spacing={2} justifyContent={"center"}>
                <Stack>
                  <DepartmentShowStudentProfile />
                </Stack>
                <Stack>
                  <ShowStudentResults />
                </Stack>
              </Stack>
            </Tile>
          </Grid>
          {/* </Grid> */}
        </>
      )}
    </Grid>
  );
};

export default StudentProfile;
