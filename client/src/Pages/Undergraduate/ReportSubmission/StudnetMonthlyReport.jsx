import React, { useState } from "react";
import {
  Stack,
  Box,
  Typography,
  Divider,
  Paper,
  Button,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import axios from "axios";
import { StatusSnackBar } from "../../../components/StatusSnackBar/StatusSnackBar";

const reportValues = {
  weekNo: "",
  monthNo: "",
  reportContent: "",
};
export const StudnetMonthlyReport = ({ reportData }) => {
  const [dailyReportData, setDailyReportData] = useState(reportData);
  const [reportUpdateValues, setReportUpdateValues] = useState(reportValues);
  const [edit, setEdit] = useState(false);
  const [weekNumber, setWeekNumber] = useState(null);
  //statusSnackBar state
  const [trigger, setTrigger] = useState({
    success: false,
    error: false,
  });

  //End of statusSnackBar state
  const handleSnackBar = (key) => {
    setTrigger((prevState) => {
      let newState = { ...prevState };
      newState[key] = !newState[key];
      return newState;
    });
  };

  const handleSave = async (values) => {
    console.log(values);
    try {
      const res = await axios.patch(
        " http://localhost:5000/api/v1/undergraduate/monthly-report/week",
        {
          weekNo: weekNumber,
          monthNo: dailyReportData.monthNumber,
          reportContent: values.reportContent,
        },
        { withCredentials: true }
      );
      console.log(res.status);

      if (res.status === 200) {
        // handleSnackBar("update_success");
      } else {
        // handleSnackBar("update_error");
      }
    } catch (error) {
      console.log(error);
    }

    setEdit(false);
    setWeekNumber(null);
  };

  return (
    <Box height={"83vh"} overflow={"auto"}>
      <Stack direction={"column"} spacing={3}>
        <Stack alignItems={"center"}>
          <Typography variant="h6" fontWeight={"bold"}>
            Monthly Report
          </Typography>
        </Stack>
        <Divider />

        {/* report data */}
        <Stack direction={"column"} spacing={3}>
          {/* middle data */}
          <Paper variant="outlined" sx={{ bgcolor: "#fff" }}>
            <Stack padding={2} spacing={2}>
              {/* heading */}
              <Stack direction={"row"}>
                <Stack flex={1} alignItems={"center"}>
                  <Typography fontWeight={"bold"}>Week Number</Typography>
                </Stack>
                <Stack flex={5} alignItems={"center"}>
                  <Typography fontWeight={"bold"}>
                    Brief Description of Work Carried Out
                  </Typography>
                </Stack>
                <Stack flex={0.5}></Stack>
              </Stack>
              <Divider />

              {/* Data */}

              <Formik initialValues={reportUpdateValues} onSubmit={handleSave}>
                {({
                  values,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  handleReset, //this gives initialvalues not clear fields
                }) => (
                  <form onSubmit={handleSubmit}>
                    <Stack>
                      {dailyReportData.weeklyReports.map((report, index) => (
                        <Stack
                          direction={"column"}
                          key={index}
                          minHeight={"8vh"}
                        >
                          <Stack direction={"row"}>
                            <Stack flex={1} alignItems={"center"}>
                              <Typography>{report.weekNumber}</Typography>
                            </Stack>
                            <Stack flex={4}>
                              {edit === false && (
                                <Typography>{report.content}</Typography>
                              )}
                              {edit === true &&
                                weekNumber === report.weekNumber && (
                                  <TextField
                                    variant="outlined"
                                    multiline
                                    fullWidth
                                    type="text"
                                    // placeholder={userData.adminRole}
                                    value={values.reportContent}
                                    defaultValue={report.content}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    name="reportContent"
                                  ></TextField>
                                )}
                            </Stack>
                            <Stack flex={0.5} alignItems={"flex-end"}>
                              {edit === false && (
                                <Button
                                  variant="contained"
                                  size="small"
                                  onClick={() => {
                                    setEdit(true);
                                    setWeekNumber(report.weekNumber);
                                  }}
                                >
                                  Edit
                                </Button>
                              )}
                              {edit === true &&
                                weekNumber === report.weekNumber && (
                                  <Stack direction={"column"} spacing={1}>
                                    <Button
                                      variant="contained"
                                      size="small"
                                      color="warning"
                                      onClick={
                                        // setEdit(false); // handleSnackBar("error"); // {() => {
                                        handleReset
                                      }
                                      // }}
                                    >
                                      cancel
                                    </Button>
                                    <Button
                                      variant="contained"
                                      size="small"
                                      onClick={handleSave}
                                    >
                                      save
                                    </Button>
                                  </Stack>
                                )}
                            </Stack>
                          </Stack>
                          <Divider />
                        </Stack>
                      ))}
                    </Stack>
                  </form>
                )}
              </Formik>
            </Stack>
            <Divider />
            <Stack></Stack>
          </Paper>

          {/* Problems Encounted and Solution Found        */}
          <Stack>
            <Stack>
              <Paper variant="outlined" sx={{ bgcolor: "white" }}>
                <Box padding={"10px"}>
                  <Stack direction={"column"}>
                    <Stack alignItems={"center"}>
                      <Typography fontWeight={"bold"}>
                        Problems Encounted and Solution Found
                      </Typography>
                    </Stack>
                    <Divider />
                    <Stack minHeight={"10vh"}>
                      <Typography></Typography>
                    </Stack>
                  </Stack>
                </Box>
              </Paper>
            </Stack>
          </Stack>
          <Divider />

          {/* absent Records */}
          <Stack>
            <Stack>
              <Box padding={"10px"}>
                <Stack direction={"column"} spacing={1}>
                  <Stack alignItems={"flex-start"}>
                    <Typography fontWeight={"bold"}>Leave Records</Typography>
                  </Stack>
                  {/* <Divider /> */}
                  <Stack
                    // minHeight={"10vh"}
                    direction={"row"}
                    justifyContent={"space-around"}
                  >
                    <Stack>
                      <Typography fontWeight={"bold"}>
                        No of days absent in this month :
                      </Typography>
                    </Stack>
                    <Stack>
                      <TextField
                        variant="outlined"
                        type="number"
                        size="small"
                      ></TextField>
                    </Stack>
                    <Stack>
                      <Button variant="contained">save</Button>
                    </Stack>
                  </Stack>
                </Stack>
              </Box>
            </Stack>
          </Stack>
        </Stack>

        <Stack alignItems={"center"}>
          <Box width={"75%"}>
            <Button variant="contained" type="submit" fullWidth>
              Submit Report
            </Button>
          </Box>
        </Stack>
      </Stack>
      {/* <StatusSnackBar
        severity="update_success"
        trigger={trigger.success}
        setTrigger={() => {
          handleSnackBar(" Update success");
        }}
        alertMessage={"Update Succefully"}
      />
      <StatusSnackBar
        severity="update_error"
        trigger={trigger.error}
        setTrigger={() => {
          handleSnackBar("error");
        }}
        alertMessage={"Update Fail"}
      />
      <StatusSnackBar
        severity="submit_success"
        trigger={trigger.success}
        setTrigger={() => {
          handleSnackBar(" Update success");
        }}
        alertMessage={"Submit Succefully"}
      />
      <StatusSnackBar
        severity="submit_error"
        trigger={trigger.error}
        setTrigger={() => {
          handleSnackBar("error");
        }}
        alertMessage={"Submit Fail"}
      />
      <StatusSnackBar
        severity="notSave_error"
        trigger={trigger.error}
        setTrigger={() => {
          handleSnackBar("error");
        }}
        alertMessage={"Not save Content"}
      />
      <StatusSnackBar
        severity="error"
        trigger={trigger.error}
        setTrigger={() => {
          handleSnackBar("error");
        }}
        alertMessage={"Not save Content"}
      /> */}
    </Box>
  );
};
