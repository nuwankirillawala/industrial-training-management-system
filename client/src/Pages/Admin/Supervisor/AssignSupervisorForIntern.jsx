import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Tile } from "../../../components/card/Tile";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";

const AssignSupervisorForIntern = () => {
  //State for fetched student list
  const [studentList, setStudentList] = useState([]);

  //State for selected student
  const [selectedStudent, setSelectedStudent] = useState({
    id: "",
    name: "",
  });

  //State for fetched company list
  const [company, setCompany] = useState("");

  //state for the fetched supervisor list
  const [supervisors, setSupervisors] = useState([]);

  //state for the assigned supervisor
  const [selectedSupervisor, setSelectedSupervisor] = useState("");
  //End of state

  //Fetching data
  //function for get intern student list
  const getStudentList = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/v1/undergraduate/view-intern-list",
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        // console.log(res.data.users);
        let rawStudentList = res.data.users;
        // setStudentList(res.data.users);
        setStudentList(
          rawStudentList.filter(
            (item) => typeof item["internship"] !== "undefined"
          )
        );
      } else {
        console.log(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //function for get company and supervisor details
  const getSupervisor = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/v1/undergraduate/assign-supervisor/${selectedStudent.id}`,
        { withCredentials: true }
      );
      if (res.status === 200) {
        // console.log(res.data.company.supervisors);
        setSupervisors(res.data.company.supervisors);
        setCompany(res.data.company.name);
      } else {
        console.log(res.message);
        setCompany("No Company");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStudentList();
  }, []);

  useEffect(() => {
    getSupervisor();
  }, [selectedStudent]);
  //End of fetching data

  //Handle cellclick fuction for the cell button
  const handleCellClick = (key, student) => {
    // console.log(`Cell clicked: ${key}`);
    setSelectedStudent({ id: key, name: student });
    // console.log(selectedStudent);
  };
  //End of handle cellClick function for the cell button

  //handle click for the supervisor select
  const handleSubmit = (key) => {
    // console.log(`supervisor id: ${key}`);            End point here
  };
  //End of handle click for the supervisor select

  //column for data grid select students
  const studentColumn = [
    {
      field: "regNo",
      headerName: "Student Number",
      flex: 1,
      editable: false,
    },
    {
      field: "name",
      headerName: "Student Name",
      flex: 1,
      editable: false,
    },
    {
      field: "select",
      headerName: "Supervisor assign",
      flex: 1,
      editable: false,
      renderCell: (params) => (
        <Button
          variant="itms"
          size="itms-small"
          onClick={() => handleCellClick(params.row._id, params.row.name)}
        >
          select
        </Button>
      ),
    },
  ];
  //End of column for data grid select students

  //column for data grid assign supervisors
  const supervisorColumn = [
    {
      field: "name",
      headerName: "Supervisor Name",
      flex: 1,
      editable: false,
    },
    {
      field: "jobRole",
      headerName: "Position",
      flex: 1,
      editable: false,
    },
    {
      field: "assign",
      headerName: "Supervisor assign",
      flex: 1,
      editable: false,
      renderCell: (params) => (
        <Button
          variant="itms"
          size="itms-small"
          onClick={() => handleSubmit(params.row._id)}
        >
          assign
        </Button>
      ),
    },
  ];
  //End of column for data grid assign supervisors

  return (
    <Box sx={{ height: "88vh" }}>
      <Box sx={{ width: "100%" }}>
        <Typography
          variant="h6"
          color="primary"
          marginBottom={"5px"}
          paddingLeft={"15px"}
        >
          Assign Supervisors For Interns
        </Typography>
      </Box>
      <Box sx={{ height: "100%", width: "100%" }}>
        <Stack direction="row" spacing={1} height={"100%"} width={"100%"}>
          <Tile sx={{ height: "100%", width: "50%" }}>
            <Box height={"100%"}>
              <Stack direction={"column"} height={"100%"} spacing={1}>
                <Box>
                  <Typography align="center" fontWeight={"bold"}>
                    Student Selection
                  </Typography>
                </Box>
                <Box height={530} width={"auto"}>
                  <DataGrid
                    rows={studentList}
                    columns={studentColumn}
                    hideFooter={true}
                    disableColumnMenu={true}
                    getRowId={(row) => row.regNo}
                  />
                </Box>
              </Stack>
            </Box>
          </Tile>
          <Tile sx={{ height: "100%", width: "50%" }}>
            <Box>
              <Typography align="center" fontWeight={"bold"}>
                Assign supervisors
              </Typography>
            </Box>
            {company !== null && (
              <Box>
                <Typography>
                  Selected Student: {selectedStudent.name}
                </Typography>
                <Typography>Company: {company}</Typography>
                <Stack direction={"column"}>
                  <Typography>Select Supervisor : </Typography>
                  <Box mt={1} height={400} width={"auto"}>
                    <DataGrid
                      rows={supervisors}
                      columns={supervisorColumn}
                      hideFooter={true}
                      disableColumnMenu={true}
                      getRowId={(row) => row._id}
                    />
                  </Box>
                </Stack>
              </Box>
            )}
          </Tile>
        </Stack>
      </Box>
    </Box>
  );
};

export default AssignSupervisorForIntern;
