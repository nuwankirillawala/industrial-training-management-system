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

export const FinalFeedback = () => {
  const [varification, setVarification] = useState();

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
