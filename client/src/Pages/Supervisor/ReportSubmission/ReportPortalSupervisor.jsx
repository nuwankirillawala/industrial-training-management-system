import React, { useEffect, useState } from "react";
import { Grid, Stack, Box, Paper, Typography, Divider } from "@mui/material";
import { Tile } from "../../../components/card/Tile";
import { Report } from "../../../assets/index";
import axios from "axios";

export const ReportPortalSupervisor = () => {
  //Fetch company list
  const getCompanyDetails = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/v1/supervisor/profile"
      );
      console.log(res.data.interns);
      if (res.status === 200) {
        // res.data && setCompanyList(res.data.data);
        // setSupervisorList(res.data.data.supervisors);
      } else {
        // setErrorDetails(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCompanyDetails();
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
                  <Box></Box>
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
