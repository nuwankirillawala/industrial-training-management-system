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
  // weekNo: "",
  // monthNo: "",
  reportContent: "",
};
export const StudnetMonthlyReport = ({ reportData }) => {
  const [dailyReportData, setDailyReportData] = useState(reportData);
  const [reportUpdateValues, setReportUpdateValues] = useState(reportValues);
  const [edit, setEdit] = useState(false);
  const [editField, setEditField] = useState(false);
  const [weekNumber, setWeekNumber] = useState(null);

  //statusSnackBar state
  const [message, setMessage] = useState("");
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

  const handleOnSubmit = async (e) => {
    // e.priventDefault();
    console.log("report data  : ", reportData);
    console.log("run", reportUpdateValues);
    console.log("run1", weekNumber);
    console.log("run2", reportData.monthNumber);
    try {
      const res = await axios.post(
        " http://localhost:5000/api/v1/undergraduate/monthly-report/week",
        {
          weekNo: weekNumber,
          monthNo: reportData.monthNumber,
          reportContent: { reportUpdateValues },
        },
        { withCredentials: true }
      );
      console.log(res);

      if (res.status === 200) {
        handleSnackBar("success");
      } else {
        handleSnackBar("error");
      }
    } catch (error) {
      console.log(error);
    }

    setEdit(false);
    setWeekNumber(null);
  };
  const handleOnSubmiproblemSection = async (e) => {
    // e.priventDefault();

    try {
      const res = await axios.post(
        " http://localhost:5000/api/v1/undergraduate/monthly-problem-section",
        {
          monthNo: reportData.monthNumber,
          problemContent: { reportUpdateValues },
        },
        { withCredentials: true }
      );
      console.log(res);

      if (res.status === 200) {
        handleSnackBar("success");
      } else {
        handleSnackBar("error");
      }
    } catch (error) {
      console.log(error);
    }

    setEdit(false);
    setWeekNumber(null);
  };

  const hanldeOnSubmits = (values) => {};

  return (
    <Box height={"75vh"} overflow={"auto"}>
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
              <Stack>
                <form onSubmit={handleOnSubmit}>
                  <Stack>
                    {reportData.weeklyReports.map((report, index) => (
                      <Stack direction={"column"} key={index} minHeight={"8vh"}>
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
                                  // placeholder={report.content}
                                  // value={values.reportContent}
                                  defaultValue={report.content}
                                  // onBlur={handleBlur}
                                  onChange={(e) => {
                                    setReportUpdateValues(e.target.value);
                                    setWeekNumber(report.weekNumber);
                                  }}
                                  name="reportContent"
                                />
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
                                    onClick={() => {
                                      setEdit(false);
                                    }}
                                  >
                                    cancel
                                  </Button>
                                  <Button
                                    variant="contained"
                                    size="small"
                                    onClick={handleOnSubmit}
                                    // type="submit"
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
              </Stack>
            </Stack>
            <Divider />
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
                      {editField === false && (
                        <Stack>
                          <Stack minHeight={"9vh"}>
                            <Typography>{reportData.problemSection}</Typography>
                          </Stack>
                          <Stack alignItems={"flex-end"}>
                            <Box>
                              <Button
                                variant="itms"
                                size="itms-small"
                                onClick={() => {
                                  setEditField(true);
                                }}
                              >
                                Edit
                              </Button>
                            </Box>
                          </Stack>
                        </Stack>
                      )}
                      {editField === true && (
                        <Stack>
                          <Stack minHeight={"9vh"}>
                            <TextField
                              variant="outlined"
                              multiline
                              fullWidth
                              type="text"
                              // placeholder={report.content}
                              // value={values.reportContent}
                              defaultValue={reportData.problemSection}
                              // onBlur={handleBlur}
                              onChange={(e) => {
                                setReportUpdateValues(e.target.value);
                              }}
                              name="reportContent"
                            />
                          </Stack>

                          <Stack alignItems={"flex-end"}>
                            <Stack direction={"row"}>
                              <Box>
                                <Button
                                  variant="itms"
                                  size="itms-small"
                                  onClick={() => {
                                    setEditField(true);
                                  }}
                                >
                                  cancel
                                </Button>
                                <Button
                                  variant="itms"
                                  size="itms-small"
                                  onClick={() => {
                                    setEditField(true);
                                    handleOnSubmiproblemSection();
                                  }}
                                >
                                  save
                                </Button>
                              </Box>
                            </Stack>
                          </Stack>
                        </Stack>
                      )}
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
    </Box>
  );
};
