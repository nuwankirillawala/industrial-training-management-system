import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Tile } from "../../../components/card/Tile";
import axios from "axios";

const AssignSupervisorForIntern = () => {
  //State for fetched data
  const [studentList, setStudentList] = useState([]);
  //End of state

  //Fetching data
  const getStudentList = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/v1/undergraduate/view-intern-list"
      );
      if (res.status === 200) {
        console.log(res.data.users);
        setStudentList(res.data.users);
      } else {
        console.log(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStudentList();
  }, []);
  //End of fetching data

  //column for data grid
  const studentColumn = [
    {
      field: "regNo",
      headerName: "Student Number",
      width: 150,
      editable: false,
    },
    {
      field: "name",
      headerName: "Student Name",
      width: 150,
      editable: false,
    },
    {
      field: "company",
      headerName: "Company assigned",
      width: 150,
      editable: false,
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
      <Box sx={{ height: "100%" }}>
        <Stack spacing={1} height={"100%"}>
          <Tile sx={{ height: "100%" }}>
            <Box sx={{ height: 400, width: "80vw" }}>hello</Box>
          </Tile>
        </Stack>
      </Box>
    </Box>
  );
};

export default AssignSupervisorForIntern;
