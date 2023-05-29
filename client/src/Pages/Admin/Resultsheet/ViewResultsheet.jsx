import { Box, Button, Divider, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Tile } from "../../../components/card/Tile";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CustomBackdrop } from "../../../components/backdrop/CustomBackdrop";

const ViewResultsheet = () => {
  //State for the results
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [studentColumns, setStudentColumns] = useState([
    {
      field: "name",
      headerName: "Full Name",
      editable: false,
      width: 120,
    },
    {
      field: "regNo",
      headerName: "Student ID",
      editable: false,
      width: 120,
    },
  ]);

  //State for Backdrop
  const [openBackdrop, setOpenBackdrop] = useState(false);
  //End of States

  //Fetching data from backend
  const getResults = async () => {
    setOpenBackdrop(true);
    try {
      const res = await axios.get("http://localhost:5000/api/v1/result/all", {
        withCredentials: true,
      });
      if (res.status === 200) {
        console.log(res.data);
        setResults(res.data);
      } else {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
    setOpenBackdrop(false);
  };

  useEffect(() => {
    getResults();
  }, []);

  useEffect(() => {
    setOpenBackdrop(true);
    if (results.length > 0) {
      const courses = results[0].courses;
      const dynamicColumns = courses.map((course) => ({
        field: course.courseId,
        headerName: course.courseId,
        editable: false,
      }));

      setStudentColumns((prevColumns) => [...prevColumns, ...dynamicColumns]);

      const transformedRows = results.map((result) => {
        const row = {
          id: result._id,
          name: result.name,
          regNo: result.regNo,
        };

        result.courses.forEach((course) => {
          row[course.courseId] = course.grade;
        });

        return row;
      });

      setRows(transformedRows);
    }
    setOpenBackdrop(false);
  }, [results]);
  //End of fetching data from backend

  //columns for the data grid

  //End of columns

  const drawerWidth = 240;

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Typography variant="pageTitle">Student Results</Typography>
      </Grid>

      <Grid item sm={12} md={12}>
        <Grid container spacing={2}>
          <Grid item sm={5} md={5}>
            <Tile>
              <Typography variant="head6">Upload Result Sheet</Typography>
              <Divider sx={{ m: 1 }} />
              <Typography margin={2}>
                {" "}
                Click here to upload the new result sheet.
              </Typography>
              <Button
                variant="itms-add"
                fontWeight="bold"
                onClick={() => navigate("/result-sheet/upload")}
              >
                Upload
              </Button>
            </Tile>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} style={{ height: "100%" }}>
        <Tile>
          <Typography variant="head6">View Student Results</Typography>
          <Grid container spacing={1} style={{ height: "100%" }}>
            <Grid item xs={12}>
              <Box style={{ height: 400 }}>
                <DataGrid
                  rows={rows}
                  columns={studentColumns}
                  disableRowSelectionOnClick
                  hideFooter={true}
                  getRowId={(row) => row.id}
                />
              </Box>
              {openBackdrop && <CustomBackdrop />}
            </Grid>
          </Grid>
        </Tile>
      </Grid>
    </Grid>
  );
};

export default ViewResultsheet;
