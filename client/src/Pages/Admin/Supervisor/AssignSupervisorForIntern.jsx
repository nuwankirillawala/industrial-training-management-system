import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Tile } from "../../../components/card/Tile";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";

const AssignSupervisorForIntern = () => {
  //State for fetched student list
  const [studentList, setStudentList] = useState([]);

  //State for selected student
  const [selectedStudent, setSelectedStudent] = useState("");

  //State for fetched company list
  const [companyList, setCompanyList] = useState([]);
  //End of state

  //Fetching data
  const getStudentList = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/v1/undergraduate/view-intern-list"
      );
      if (res.status === 200) {
        // console.log(res.data.users);
        setStudentList(res.data.users);
      } else {
        console.log(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCompanyList = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/v1/company/intern-process-company-list"
      );
      if (res.status === 200) {
        // console.log(res.data.data);
        setCompanyList(res.data.data);
      } else console.log(res.message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStudentList();
    getCompanyList();
  }, []);
  //End of fetching data

  //Handle cellclick fuction
  const handleCellClick = (key) => {
    console.log(`Cell clicked: ${key}`);
    setSelectedStudent(key);
    // console.log(selectedStudent);
  };
  //End of handle cellClick function

  //column for data grid
  const studentColumn = [
    {
      field: "regNo",
      headerName: "Student Number",
      editable: false,
    },
    {
      field: "name",
      headerName: "Student Name",
      editable: false,
    },
    {
      field: "company",
      headerName: "Company assigned",
      editable: false,
    },
    {
      field: "assign",
      headerName: "Supervisor assign",
      editable: false,
      renderCell: (params) => (
        <Button
          variant="itms"
          size="itms-small"
          disabled={params.row.company === null ? true : false}
          onClick={() => handleCellClick(params.row.company)}
        >
          assign
        </Button>
      ),
    },
  ];
  //End of column for data grid

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
                    Company Selections
                  </Typography>
                </Box>
                <Box width={"auto"}>
                  <DataGrid
                    rows={studentList.map((field) => {
                      return {
                        regNo: field.regNo,
                        name: field.name,
                        // company: field.name,
                      };
                    })}
                    columns={studentColumn}
                    hideFooter={true}
                    disableColumnMenu={true}
                    autoHeight={true}
                    getRowId={(row) => row.regNo}
                  />
                </Box>
              </Stack>
            </Box>
          </Tile>
          <Tile sx={{ height: "100%", width: "50%" }}></Tile>
        </Stack>
      </Box>
    </Box>
  );
};

export default AssignSupervisorForIntern;
