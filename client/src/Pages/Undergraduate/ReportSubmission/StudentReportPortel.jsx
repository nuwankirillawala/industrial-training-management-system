import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Stack, Grid, Button, Typography, Divider, Box } from "@mui/material";
import { Tile } from "../../../components/card/Tile";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { StudentInternPeriod } from "../../../components/user/Undergraduate/StudentInternPeriod";
import { StudnetMonthlyReport } from "./StudnetMonthlyReport";

export const StudentReportPortal = () => {
  const [reportType, setReportType] = useState("");
  const [selectReport, setSelectReport] = useState(false);
  const [userData, setUserData] = useState();
  const [intern, setIntern] = useState(true);
  const [reportData, setReportData] = useState();

  //fetch undergraduate data

  const getUserData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/v1/undergraduate/profile",
        { withCredentials: true }
      );
      if (res.status === 200) {
        console.log(res.data);
        setUserData(res.data);
        if (res.data.internshipStart === "") {
          setIntern(false);
        } else {
          setIntern(true);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  //end fetch

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
      flex: 1,
    },
    {
      field: "weekEndDate",
      headerName: "End Date",
      editable: false,
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      editable: false,
      flex: 1,
    },
  ];
  const dailyReportColumns2 = [
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
      flex: 1,
    },
    {
      field: "weekEndDate",
      headerName: "End Date",
      editable: false,
      flex: 1,
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
    {
      field: "reportStatus",
      headerName: "Report Status",
      editable: false,
      flex: 1,
    },
  ];
  const monthlyReportColumns2 = [
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

  const handleOnClick = () => {
    setSelectReport(false);
    setReportData();
  };

  const selectReportData = (params) => {
    try {
      setSelectReport(true);

      if (reportType === "Daily Report") {
        console.log("daily report : ", params.row.report_id);
        setReportData(params.row.report_id);
      } else if (reportType === "Monthly Report") {
        console.log(
          "Monthly report : ",
          userData.monthlyReports[params.row.report_id - 1]
        );
        setReportData(userData.monthlyReports[params.row.report_id - 1]);
      }

      console.log({ selectReport });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack>
      {selectReport === false && (
        <Grid container spacing={1}>
          <Grid item md={12}>
            <Typography variant="head3" marginBottom={"5px"}>
              Report Submision
            </Typography>
          </Grid>

          <Grid item md={5}>
            <Stack direction={"row"} spacing={1}>
              <Stack flex={1}>
                <Tile>
                  <Stack
                    direction={"column"}
                    height={"74vh"}
                    justifyContent={"space-between"}
                  >
                    <Stack spacing={2}>
                      <Stack alignItems={"center"}>
                        <Typography variant="h6" fontWeight={"bold"}>
                          Daily Report
                        </Typography>
                      </Stack>
                      <Divider />
                    </Stack>
                    <Stack>
                      <Typography variant="body">
                        About the Daily Report
                      </Typography>
                    </Stack>
                    <Stack>
                      <Button
                        variant="itms"
                        disabled={intern ? false : true}
                        // disabled
                        onClick={() => {
                          setReportType("Daily Report");
                        }}
                      >
                        View Report
                      </Button>
                    </Stack>
                  </Stack>
                </Tile>
              </Stack>

              <Stack flex={1}>
                <Tile>
                  <Stack
                    direction={"column"}
                    height={"74vh"}
                    justifyContent={"space-between"}
                  >
                    <Stack spacing={2}>
                      <Stack alignItems={"center"}>
                        <Typography variant="h6" fontWeight={"bold"}>
                          Monthly Report
                        </Typography>
                      </Stack>
                      <Divider />
                    </Stack>
                    <Stack>
                      <Typography variant="body">
                        About the Monthly Report
                      </Typography>
                    </Stack>
                    <Stack>
                      <Button
                        variant="itms"
                        disabled={intern ? false : true}
                        onClick={() => {
                          setReportType("Monthly Report");
                        }}
                      >
                        View Report
                      </Button>
                    </Stack>
                  </Stack>
                </Tile>
              </Stack>
            </Stack>
          </Grid>

          {intern === false && (
            <Grid item md={7}>
              <Tile height={"80vh"}>
                <Stack spacing={2} direction={"column"}>
                  <Stack>
                    <Typography color={"#ba000d"}>
                      You cannot view reports , Update your intenship period
                      first
                    </Typography>
                  </Stack>
                  <Divider />
                  <Stack direction={"column"} alignItems={"center"}>
                    <Box height={"60vh"} padding={"30px"}>
                      <StudentInternPeriod />
                    </Box>
                  </Stack>
                </Stack>
              </Tile>
            </Grid>
          )}

          {intern === true && (
            <Grid item md={7}>
              <Tile>
                <Stack spacing={2} height={"74vh"}>
                  <Stack alignItems={"center"}>
                    <Typography variant="h6" fontWeight={"bold"}>
                      Report List
                    </Typography>
                  </Stack>
                  <Divider />

                  {reportType === "" && (
                    <Stack
                      direction={"column"}
                      justifyContent={"center"}
                      height={"50vh"}
                    >
                      <Stack direction={"row"} justifyContent={"center"}>
                        <Typography variant="h6" color={"GrayText"}>
                          Select Report Type
                        </Typography>
                      </Stack>
                    </Stack>
                  )}
                  {reportType === "Daily Report" && (
                    <DataGrid
                      rows={userData.weeklyReports.map((report) => {
                        return {
                          weekNumber: report.weekNumber,
                          weekStartDate: report.weekStartDate.substring(0, 10),
                          weekEndDate: report.weekEndDate.substring(0, 10),
                          report_id: report.weekNumber,
                          status: report.reportStatus,
                        };
                      })}
                      columns={dailyReportColumns}
                      onRowClick={selectReportData}
                      getRowId={(row) => row.weekNumber}
                      hideFooter={true}
                    />
                  )}
                  {reportType === "Monthly Report" && (
                    <DataGrid
                      // rows
                      rows={userData.monthlyReports.map((report) => {
                        return {
                          monthNumber: report.monthNumber,
                          report_id: report.monthNumber,
                          monthEndDate: report.monthEndDate.substring(0, 10),
                          id: report._id,
                          reportStatus: report.reportStatus,
                        };
                      })}
                      columns={monthlyReportColumns}
                      onRowClick={selectReportData}
                      getRowId={(row) => row.id}
                      hideFooter={true}
                    />
                  )}
                </Stack>
              </Tile>
            </Grid>
          )}
        </Grid>
      )}

      {/* save and edit reports in here */}
      {selectReport === true && (
        <>
          {/* Daily report here */}
          {reportType === "Daily Report" && (
            <Grid container spacing={1}>
              <Grid item md={3}>
                <Tile>
                  <Stack spacing={4} height={"83vh"} direction={"column"}>
                    <Stack alignItems={"center"}>
                      <Typography variant="h6" fontWeight={"bold"}>
                        Daily Report List
                      </Typography>
                    </Stack>

                    <Divider />

                    <Stack height={"70vh"}>
                      <DataGrid
                        rows={userData.weeklyReports.map((report) => {
                          return {
                            weekNumber: report.weekNumber,
                            weekStartDate: report.weekStartDate.substring(
                              0,
                              10
                            ),
                            weekEndDate: report.weekEndDate.substring(0, 10),
                            report_id: report.weekNumber,
                            status: report.reportStatus,
                          };
                        })}
                        columns={dailyReportColumns2}
                        onRowClick={selectReportData}
                        getRowId={(row) => row.weekNumber}
                        hideFooter={true}
                      />
                    </Stack>
                    <Stack>
                      <Button variant="itms" onClick={handleOnClick}>
                        Report Type
                      </Button>
                    </Stack>
                  </Stack>
                </Tile>
              </Grid>

              <Grid item md={9}>
                <Tile>
                  {/* <StudnetMonthlyReport reportData={reportData} /> */}
                </Tile>
              </Grid>
            </Grid>
          )}

          {/* monthly report here */}
          {reportType === "Monthly Report" && (
            <Grid container spacing={1}>
              <Grid item md={3}>
                <Tile>
                  <Stack spacing={4} height={"83vh"} direction={"column"}>
                    <Stack alignItems={"center"}>
                      <Typography variant="h6" fontWeight={"bold"}>
                        Monthly Report List
                      </Typography>
                    </Stack>

                    <Divider />

                    <Stack height={"70vh"}>
                      <DataGrid
                        // rows
                        rows={userData.monthlyReports.map((report) => {
                          return {
                            monthNumber: report.monthNumber,
                            report_id: report.monthNumber,
                            monthEndDate: report.monthEndDate.substring(0, 10),
                            id: report._id,
                          };
                        })}
                        columns={monthlyReportColumns2}
                        onRowClick={selectReportData}
                        getRowId={(row) => row.id}
                        hideFooter={true}
                      />
                    </Stack>
                    <Stack>
                      <Button variant="itms" onClick={handleOnClick}>
                        Report Type
                      </Button>
                    </Stack>
                  </Stack>
                </Tile>
              </Grid>

              <Grid item md={9}>
                <Tile>
                  <StudnetMonthlyReport reportData={reportData} />
                </Tile>
              </Grid>
            </Grid>
          )}
        </>
      )}
    </Stack>
  );
};
