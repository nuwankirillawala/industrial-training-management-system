import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Stack, Grid, Button, Typography, Divider } from "@mui/material";
import { Tile } from "../../components/card/Tile";
import { ReportList } from "../Admin/ReportSubmission/ReportList";

export const ReportPortalSupervisor = () => {
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
                      <Typography variant="body">
                        About the Progress Report
                      </Typography>
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
              </Stack>

              <Stack flex={1}>
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
                      <Typography variant="body">
                        About the Final Feedback Report
                      </Typography>
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
