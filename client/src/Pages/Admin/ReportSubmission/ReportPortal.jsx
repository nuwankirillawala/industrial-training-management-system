import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Stack, Grid, Button, Typography, Divider } from "@mui/material";
import { Tile } from "../../../components/card/Tile";
import { ReportList } from "./ReportList";
import {
  dailyReport,
  monthlyReport,
  progressReport,
  finalFeedback,
} from "../../../assets/index";

export const ReportPortal = () => {
  const [reportType, setReportType] = useState("");
  const [selectReportType, setSelectReportType] = useState(true);

  const navigate = useNavigate();

  return (
    <Stack>
      {selectReportType === true && (
        <Grid container spacing={2}>
          <Grid item md={12}>
            <Typography variant="pageTitle">Student Report</Typography>
          </Grid>

          <Grid item md={12}>
            <Stack direction={"row"} spacing={2} padding={3}>
              <Stack flex={1}>
                {/* <Grid item md={3}> */}
                <Tile>
                  <Stack
                    direction={"column"}
                    spacing={5}
                    height={"50vh"}
                    justifyContent={"space-between"}
                  >
                    <Stack spacing={2}>
                      <Stack alignItems={"center"}>
                        <Typography variant="head6">Daily Report</Typography>
                      </Stack>
                      <Divider />
                    </Stack>
                    <Stack>
                      <Stack alignItems="center">
                        <img src={dailyReport} alt="dailyReport" width={200} />
                      </Stack>
                    </Stack>
                    <Stack>
                      <Button
                        variant="outlined"
                        onClick={() => {
                          setReportType("Daily Report");
                          setSelectReportType(false);
                        }}
                      >
                        View Reports
                      </Button>
                    </Stack>
                  </Stack>
                </Tile>
                {/* </Grid> */}
              </Stack>

              <Stack flex={1}>
                {/* <Grid item md={3}> */}
                <Tile>
                  <Stack
                    direction={"column"}
                    spacing={5}
                    height={"50vh"}
                    justifyContent={"space-between"}
                  >
                    <Stack spacing={2}>
                      <Stack alignItems={"center"}>
                        <Typography variant="head6">Monthly Report</Typography>
                      </Stack>
                      <Divider />
                    </Stack>
                    <Stack>
                      <Stack alignItems="center">
                        <img
                          src={monthlyReport}
                          alt="monthlyReport"
                          width={200}
                        />
                      </Stack>
                    </Stack>
                    <Stack>
                      <Button
                        variant="outlined"
                        onClick={() => {
                          setReportType("Monthly Report");
                          setSelectReportType(false);
                        }}
                      >
                        View Reports
                      </Button>
                    </Stack>
                  </Stack>
                </Tile>
                {/* </Grid> */}
              </Stack>

              <Stack flex={1}>
                {/* <Grid item md={3}> */}
                <Tile>
                  <Stack
                    direction={"column"}
                    spacing={5}
                    height={"50vh"}
                    justifyContent={"space-between"}
                  >
                    <Stack spacing={2}>
                      <Stack alignItems={"center"}>
                        <Typography variant="head6">
                          Progress Reports
                        </Typography>
                      </Stack>
                      <Divider />
                    </Stack>
                    <Stack>
                      <Stack alignItems="center">
                        <img
                          src={progressReport}
                          alt="progressReport"
                          width={200}
                        />
                      </Stack>
                    </Stack>
                    <Stack>
                      <Button
                        variant="outlined"
                        onClick={() => {
                          setReportType("Progress Report");
                          setSelectReportType(false);
                        }}
                      >
                        View Reports
                      </Button>
                    </Stack>
                  </Stack>
                </Tile>
                {/* </Grid> */}
              </Stack>

              <Stack flex={1}>
                {/* <Grid item md={3}> */}
                <Tile>
                  <Stack
                    direction={"column"}
                    spacing={5}
                    height={"50vh"}
                    justifyContent={"space-between"}
                  >
                    <Stack spacing={2}>
                      <Stack alignItems={"center"}>
                        <Typography variant="head6">
                          Final Feedback Report
                        </Typography>
                      </Stack>
                      <Divider />
                    </Stack>
                    <Stack>
                      <Stack alignItems="center">
                        <img
                          src={finalFeedback}
                          alt="finalFeedback"
                          width={300}
                        />
                      </Stack>
                    </Stack>
                    <Stack>
                      <Button
                        variant="outlined"
                        onClick={() => {
                          setReportType("Final Feedback Report");
                          setSelectReportType(false);
                        }}
                      >
                        View Reports
                      </Button>
                    </Stack>
                  </Stack>
                </Tile>
                {/* </Grid> */}
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      )}

      {selectReportType === false && (
        <ReportList
          reportType={reportType}
          setSelectReportType={setSelectReportType}
          selectReportType={selectReportType}
        />
      )}
    </Stack>
  );
};
