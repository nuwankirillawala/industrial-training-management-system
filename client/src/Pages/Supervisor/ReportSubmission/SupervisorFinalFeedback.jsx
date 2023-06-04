import React from "react";
import {
  Stack,
  Grid,
  Box,
  Typography,
  Divider,
  Button,
  Paper,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { Tile } from "../../../components/card/Tile";
import { useState } from "react";
import { StatusSnackBar } from "../../../components/StatusSnackBar/StatusSnackBar";

const reportData = [
  { day: "Attendence and funtualiy" },
  { day: "Communication Skills" },
  {
    day: "The ability to apply what they have lean in univarsity to real world/practical situation",
  },
  { day: "Problem solving skills" },
  { day: "The ability to view issues or problems from diffetent perspectives" },
  { day: "Team work" },
  { day: "Ability to take leadership in assigned activities" },
  { day: "Atitude and bahaior" },
  { day: "Ethical bahaior" },
];

const reportValues = {
  attendanceAndPunctuality: "",
  communicationSkills: "",
  practicalApplication: "",
  problemSolvingSkills: "",
  multiPerspectiveView: "",
  teamWork: "",
  leadership: "",
  attitudeAndBehavior: "",
  ethicalBehavior: "",
  overallPerformance: "",
  feedback: "",
};

export const SupervisorFinalFeedback = () => {
  const [varification, setVarification] = useState();
  const [reportUpdatedData, setReportUpdatedData] = useState(reportValues);

  const handleOnSubmiproblemSection = async (e) => {
    // e.priventDefault();

    try {
      const res = await axios.post(
        " http://localhost:5000/api/v1/supervisor/final-feedback/:internId",
        {
          attendanceAndPunctuality: reportUpdatedData.attendanceAndPunctuality,
          communicationSkills: reportUpdatedData.communicationSkills,
          practicalApplication: reportUpdatedData.practicalApplication,
          problemSolvingSkills: reportUpdatedData.problemSolvingSkills,
          multiPerspectiveView: reportUpdatedData.multiPerspectiveView,
          teamWork: reportUpdatedData.teamWork,
          leadership: reportUpdatedData.leadership,
          attitudeAndBehavior: reportUpdatedData.attitudeAndBehavior,
          ethicalBehavior: reportUpdatedData.ethicalBehavior,
          overallPerformance: reportUpdatedData.overallPerformance,
          feedback: reportUpdatedData.feedback,
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
  };

  return (
    <Tile>
      <Stack direction={"column"} height={"84vh"} spacing={2} padding={5}>
        <Stack alignItems={"center"}>
          <Typography variant="h5" fontWeight={"bold"}>
            Final Feedback Report
          </Typography>
        </Stack>

        <Divider variant="middle" />

        <Stack>
          <Paper variant="outlined" sx={{ padding: 1, bgcolor: "#fff" }}>
            <Stack spacing={1} padding={2}>
              <Typography fontWeight={"bold"}>
                Please tick the appropriate
              </Typography>
              <Divider />

              <Grid container spacing={2}>
                <Grid item md={12}>
                  <Stack direction={"column"}>
                    <Stack direction={"row"}>
                      <Stack flex={4}></Stack>

                      <Stack flex={1} alignItems={"center"}>
                        <Typography fontWeight={"bold"}>Excelent</Typography>
                      </Stack>

                      <Stack flex={1} alignItems={"center"}>
                        <Typography fontWeight={"bold"}>Good</Typography>
                      </Stack>

                      <Stack flex={1} alignItems={"center"}>
                        <Typography fontWeight={"bold"}>Average</Typography>
                      </Stack>

                      <Stack flex={1} alignItems={"center"}>
                        <Typography fontWeight={"bold"}>Poor</Typography>
                      </Stack>
                    </Stack>
                    <Divider />
                  </Stack>
                </Grid>

                <Grid item md={12}>
                  <Stack direction={"column"} spacing={4}>
                    {/* <Divider /> */}
                    {reportData.map((data, index) => (
                      <RadioGroup>
                        <Stack direction={"row"}>
                          <Stack flex={4}>
                            <Typography fontWeight={"bold"}>
                              {data.day}
                            </Typography>
                          </Stack>

                          <Stack flex={1}>
                            <Radio value="a" />
                          </Stack>

                          <Stack flex={1}>
                            <Radio value="b" />
                          </Stack>

                          <Stack flex={1}>
                            <Radio value="c" />
                          </Stack>

                          <Stack flex={1}>
                            <Radio value="d" />
                          </Stack>
                        </Stack>
                      </RadioGroup>
                    ))}
                  </Stack>
                </Grid>
              </Grid>
            </Stack>
          </Paper>
        </Stack>

        <Stack>
          <Paper variant="outlined" sx={{ bgcolor: "#fff", padding: 2 }}>
            <Stack direction={"column"} spacing={2}>
              <Stack>
                <Typography fontWeight={"bold"}>
                  Any other comments or suggestion for improvements
                </Typography>
              </Stack>
              <Stack>
                <TextField multiline rows={5}></TextField>
              </Stack>
              <Stack alignItems={"flex-end"}>
                <Button variant="itms">Save</Button>
              </Stack>
            </Stack>
          </Paper>
        </Stack>

        <Stack>
          <Button variant="itms">submit</Button>
        </Stack>
      </Stack>
    </Tile>
  );
};
