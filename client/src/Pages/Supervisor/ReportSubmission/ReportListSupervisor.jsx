import React, { useState, useEffect } from "react";
import { Stack, Grid, Button, Typography, Box, Divider } from "@mui/material";
import { Tile } from "../../../components/card/Tile";
import { DataGrid } from "@mui/x-data-grid";
// import { DailyReport } from "./DailyReport";
// import { MonthlyReport } from "./MonthlyReport";
// import { FinalFeedback } from "./FinalFeedback";
import axios from "axios";

export const ReportListSupervisor = ({
  reportType,
  setSelectReportType,
  selectReportType,
}) => {
  const [studentId, setStudentId] = useState();
  const [reportId, setReportId] = useState();
  const [reportData, setReportData] = useState();
  const [selectStudent, setSelectStudent] = useState(false);
  const [selectReport, setSelectReport] = useState(false);
  const [reportList, setReportList] = useState([
    {
      dailyReports: [],
      problemSection: "",
      reportStatus: "",
      weekEndDate: "",
      weekNumber: "",
      weekStartDate: "",
      _id: "",
    },
  ]);
  const [studentList, setStudentList] = useState([
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
    },
  ]);

  //fetch undergraduate data

  const getStudentList = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/v1/admin/users/undergraduate",
        { withCredentials: true }
      );
      if (res.status === 200) {
        console.log(res.data.users);
        setStudentList(res.data.users);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getStudentList();
  }, []);

  //end fetch

  // fetch all type of report
  const selectRowData = (params) => {
    try {
      const userid = params.row.id;
      setSelectStudent(true);
      setStudentId(userid);
      console.log(userid);

      const getReportList = async () => {
        try {
          // get daily report list
          if (reportType === "Daily Report") {
            const res = await axios.get(
              `http://localhost:5000/api/v1/undergraduate/daily-report/all/${userid}`,
              { withCredentials: true }
            );
            console.log("responce : ", res.data.dailyReports);
            if (res.status === 200) {
              setReportList(res.data.dailyReports);
            }
          }

          // get monthly report list
          else if (reportType === "Monthly Report") {
            const res = await axios.get(
              `http://localhost:5000/api/v1/undergraduate/monthly-report/all/${userid}`,
              { withCredentials: true }
            );
            console.log("responce : ", res.data.monthlyReports);
            if (res.status === 200) {
              setReportList(res.data.monthlyReports);
            }
          }

          // get progress report list
          else if (reportType === "Progress Report") {
            const res = await axios.get(
              `http://localhost:5000/api/v1/undergraduate/progress-report/${userid}`,
              { withCredentials: true }
            );
            console.log("responce : ", res);
            if (res.status === 200) {
              setReportList(res);
            }
          }

          // get final feedback report list
          else if (reportType === "Final Feedback Report") {
            const res = await axios.get(
              `http://localhost:5000/api/v1/undergraduate/final-feedback/${userid}`,
              { withCredentials: true }
            );
            console.log("responce : ", res.data.monthlyReports);
            if (res.status === 200) {
              setReportList(res.data.monthlyReports);
            }
          }
        } catch (err) {
          console.log(err);
        }
      };
      getReportList();
    } catch (error) {
      console.log(error);
    }
  };

  // end report fetch

  const selectReportData = (params) => {
    try {
      setSelectReport(true);
      setReportId(params.row.report_id);

      if (reportType === "Daily Report") {
        console.log(
          "weekly report : ",
          reportList[params.row.report_id - 1].dailyReports
        );
        setReportData(reportList[params.row.report_id - 1].dailyReports);
      } else if (reportType === "Monthly Report") {
        console.log(
          "Monthly report : ",
          reportList[params.row.report_id - 1].weeklyReports
        );
        setReportData(reportList[params.row.report_id - 1].weeklyReports);
      }

      // console.log({ selectReport });
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnClick = () => {
    setSelectReport(false);
    setSelectStudent(false);
    setReportList([]);
    setReportData([]);
  };

  const studentColumns = [
    {
      field: "name",
      headerName: "Full Name",
      width: 150,
      editable: false,
    },
    {
      field: "regNo",
      headerName: "Student ID",
      width: 120,
      editable: false,
    },
  ];

  const dailyReportColumns = [
    {
      field: "weekNumber",
      headerName: "Week",
      editable: false,
      flex: 1,
    },
    {
      field: "weekStartDate",
      headerName: "Start Date",
      editable: false,
      flex: 3,
    },
    {
      field: "weekEndDate",
      headerName: "End Date",
      editable: false,
      flex: 3,
    },
  ];

  const monthlyReportColumns = [
    {
      field: "monthNumber",
      headerName: "Month",
      editable: false,
      flex: 1,
    },
    {
      field: "monthEndDate",
      headerName: "End Date",
      editable: false,
      flex: 1,
    },
  ];

  return (
    <Stack>
      {selectReportType === false && (
        <Grid container spacing={2}>
          <Grid item md={12}>
            <Typography variant="pageTitle" marginBottom={"5px"}>
              {reportType}
            </Typography>
          </Grid>

          <Grid item md={12}>
            <Stack spacing={1} direction={"row"}>
              {/* student list in here */}
              <Stack flex={1} maxWidth={"330px"}>
                <Tile>
                  <Stack direction={"column"} spacing={4} height={"75vh"}>
                    <Stack alignItems={"center"}>
                      {selectStudent === false && (
                        <Stack width={"100%"}>
                          <Typography variant="head6">Student List</Typography>
                          <Divider />
                        </Stack>
                      )}
                      {selectStudent === true && (
                        <Stack width={"100%"}>
                          <Typography variant="head6">Report List</Typography>
                          <Divider />
                        </Stack>
                      )}
                    </Stack>

                    <Stack>
                      <Box
                        sx={{
                          height: "55vh",
                          width: "100%",
                          justifyContent: "center",
                          textAlign: "center",
                        }}
                      >
                        {selectStudent === false && (
                          <DataGrid
                            rows={studentList.map((student) => {
                              return {
                                name: student.name,
                                regNo: student.regNo,
                                id: student._id,
                              };
                            })}
                            // rows
                            columns={studentColumns}
                            onRowClick={selectRowData}
                            getRowId={(row) => row.id}
                            disableSelectionOnClick
                            experimentalFeatures={{ newEditingApi: true }}
                            hideFooter={true}
                            style={{ cursor: "pointer" }}
                          />
                        )}
                        {selectStudent === true && (
                          <>
                            {reportType === "Daily Report" && (
                              <DataGrid
                                rows={reportList.map((report) => {
                                  return {
                                    weekNumber: report.weekNumber,
                                    weekStartDate:
                                      report.weekStartDate.substring(0, 10),
                                    weekEndDate: report.weekEndDate.substring(
                                      0,
                                      10
                                    ),
                                    report_id: report.weekNumber,
                                  };
                                })}
                                columns={dailyReportColumns}
                                onRowClick={selectReportData}
                                getRowId={(row) => row.weekNumber}
                                hideFooter={true}
                                style={{ cursor: "pointer" }}
                              />
                            )}
                            {reportType === "Monthly Report" && (
                              <DataGrid
                                // rows
                                rows={reportList.map((report) => {
                                  return {
                                    monthNumber: report.monthNumber,
                                    report_id: report.monthNumber,
                                    monthEndDate: report.monthEndDate,
                                    id: report._id,
                                  };
                                })}
                                columns={monthlyReportColumns}
                                onRowClick={selectReportData}
                                getRowId={(row) => row.id}
                                hideFooter={true}
                              />
                            )}
                          </>
                        )}
                      </Box>
                    </Stack>

                    {selectStudent === false && (
                      <Stack>
                        <Button
                          variant="outlined"
                          onClick={() => {
                            setSelectReport(false);
                            setSelectStudent(false);
                            setSelectReportType(true);
                          }}
                        >
                          report type
                        </Button>
                      </Stack>
                    )}
                    {selectStudent === true && (
                      <Stack>
                        <Button variant="outlined" onClick={handleOnClick}>
                          student list
                        </Button>
                      </Stack>
                    )}
                  </Stack>
                </Tile>
              </Stack>

              {/* show report in here */}
              {selectStudent === true && selectReport === true && (
                <Stack flex={10}>
                  {reportType === "Daily Report" && (
                    <DailyReport reportData={reportData} />
                  )}
                  {reportType === "Monthly Report" && (
                    <MonthlyReport reportData={reportData} />
                  )}
                  {reportType === "Progress Report" && (
                    <DailyReport reportData={reportData} />
                  )}
                  {reportType === "Final Feedback Report" && (
                    <FinalFeedback reportData={reportData} />
                  )}
                </Stack>
              )}
            </Stack>
          </Grid>
        </Grid>
      )}
    </Stack>
  );
};
