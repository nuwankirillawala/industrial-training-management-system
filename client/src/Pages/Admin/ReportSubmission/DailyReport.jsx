import React from "react";
import { Stack, Box, Typography, Divider, Paper } from "@mui/material";
import { Tile } from "../../../components/card/Tile";

export const DailyReport = ({ reportData }) => {
  return (
    <Tile>
      <Box height={"75vh"} overflow={"auto"}>
        <Stack direction={"column"} spacing={1}>
          <Stack direction={"column"} spacing={1}>
            <Stack alignItems={"center"}>
              <Typography variant="h6" fontWeight={"bold"}>
                Daily Report
              </Typography>
            </Stack>

            <Paper variant="outlined" sx={{ bgcolor: "white" }}>
              <Stack>
                {/* <Divider variant="middle" /> */}
                <Stack direction={"row"} justifyContent={"space-evenly"}>
                  <Stack alignItems={"center"} flex={1}>
                    <Typography fontWeight={"bold"}>Date</Typography>
                  </Stack>

                  <Divider orientation="vertical" />

                  <Stack alignItems={"center"} flex={4}>
                    <Typography fontWeight={"bold"}>
                      Brief Description of Work Carried Out
                    </Typography>
                  </Stack>

                  <Divider orientation="vertical" />

                  <Stack alignItems={"center"} flex={1}>
                    <Typography fontWeight={"bold"}>Varification</Typography>
                  </Stack>
                </Stack>

                <Divider variant="middle" />

                {/* report data show here */}
                <Box>
                  {reportData.map((report) => (
                    <Stack minHeight={"6vh"}>
                      <Stack direction={"row"} justifyContent={"space-around"}>
                        <Divider orientation="vertical" />

                        {/* report date */}
                        <Stack
                          flex={1}
                          alignItems={"center"}
                          direction={"column"}
                        >
                          <Stack
                            flex={1}
                            alignItems={"center"}
                            direction={"row"}
                          >
                            <Typography fontWeight={"bold"}>
                              {report.date.substring(0, 10)}
                            </Typography>
                          </Stack>
                        </Stack>

                        <Divider orientation="vertical" />

                        {/* report content */}
                        <Stack flex={4} direction={"row"}>
                          <Box>
                            <Box
                              flex={5}
                              sx={{
                                padding: "10px",
                                alignItems: "center",
                              }}
                            >
                              <Typography>{report.content}</Typography>
                            </Box>
                          </Box>
                        </Stack>

                        <Divider orientation="vertical" />

                        {/*report approval sratus */}
                        <Stack
                          flex={1}
                          alignItems={"center"}
                          direction={"column"}
                        >
                          <Stack
                            flex={1}
                            alignItems={"center"}
                            direction={"row"}
                          >
                            {report.approvalStatus === "approved" && (
                              <Typography fontWeight={"bold"} color={"green"}>
                                Approved
                              </Typography>
                            )}
                            {report.approvalStatus === "notApproved" && (
                              <Typography fontWeight={"bold"} color={"red"}>
                                Not Approved
                              </Typography>
                            )}
                            {report.approvalStatus === "empty" && (
                              <Typography
                                fontWeight={"bold"}
                                color={"darkgray"}
                              >
                                Empty
                              </Typography>
                            )}
                          </Stack>
                        </Stack>

                        <Divider orientation="vertical" />
                      </Stack>
                      <Divider orientation="horizontal" />
                    </Stack>
                  ))}
                </Box>
              </Stack>
            </Paper>
          </Stack>
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
      </Box>
    </Tile>
  );
};
