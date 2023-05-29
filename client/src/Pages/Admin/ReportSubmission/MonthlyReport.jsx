import React from "react";
import { Stack, Box, Typography, Divider, Paper } from "@mui/material";
import { Tile } from "../../../components/card/Tile";

export const MonthlyReport = ({ reportData }) => {
  return (
    <Tile>
      <Box height={"75vh"} overflow={"auto"}>
        <Stack minHeight={"90vh"} direction={"column"} spacing={1}>
          <Stack direction={"column"} spacing={2}>
            <Stack alignItems={"center"}>
              <Typography variant="head6">Monthly Report</Typography>
            </Stack>

            <Stack>
              <Paper
                variant="outlined"
                sx={{ bgcolor: "white", borderColor: "#4665D2", padding: 1 }}
              >
                <Stack spacing={1}>
                  {/* <Divider variant="middle" /> */}
                  <Stack direction={"row"} justifyContent={"space-evenly"}>
                    <Stack alignItems={"center"} flex={1}>
                      <Typography variant="h6" fontWeight={"bold"}>
                        Week
                      </Typography>
                    </Stack>

                    <Divider orientation="vertical" />

                    <Stack alignItems={"center"} flex={4}>
                      <Typography variant="h6" fontWeight={"bold"}>
                        Brief Description of Work Carried Out
                      </Typography>
                    </Stack>

                    <Divider orientation="vertical" />

                    <Stack alignItems={"center"} flex={1}>
                      <Typography variant="h6" fontWeight={"bold"}>
                        Varification
                      </Typography>
                    </Stack>
                  </Stack>

                  <Divider variant="middle" />

                  {/* report data show here */}
                  <Stack>
                    {reportData.map((report) => (
                      <Paper
                        variant="outlined"
                        sx={{ bgcolor: "#fff", padding: 1 }}
                        square
                      >
                        <Stack minHeight={"7vh"}>
                          <Stack
                            direction={"row"}
                            justifyContent={"space-around"}
                          >
                            {/* <Divider orientation="vertical" /> */}

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
                                  {report.weekNumber}
                                </Typography>
                              </Stack>
                            </Stack>

                            {/* <Divider orientation="vertical" /> */}

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

                            {/* <Divider orientation="vertical" /> */}

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
                                  <Typography
                                    fontWeight={"bold"}
                                    color={"green"}
                                  >
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

                            {/* <Divider orientation="vertical" /> */}
                          </Stack>
                          {/* <Divider orientation="horizontal" /> */}
                        </Stack>
                      </Paper>
                    ))}
                  </Stack>
                </Stack>
              </Paper>
            </Stack>

            <Stack>
              <Paper
                variant="outlined"
                sx={{ bgcolor: "white", borderColor: "#4665D2", padding: 1 }}
              >
                <Box padding={"10px"}>
                  <Stack direction={"column"}>
                    <Stack alignItems={"center"}>
                      <Typography variant="h6" fontWeight={"bold"}>
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

            <Stack spacing={2} direction={"column"}>
              <Stack>
                <Typography variant="h6" fontWeight={"bold"}>
                  Leave Record
                </Typography>
              </Stack>
              <Stack direction={"row"} spacing={5}>
                <Stack>
                  <Typography>No of days absent in this month : </Typography>
                </Stack>
                <Stack>
                  <Typography>5</Typography>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Tile>
  );
};
