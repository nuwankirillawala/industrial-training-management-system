import React from "react";
import { Stack, Typography, Box, Button, Paper } from "@mui/material";
import { Avatar } from "../../shared/Images/Avatar";
import { Tile } from "../../card/Tile";
import { ShowStudentResults } from "./ShowStudentResults";

export const DepartmentShowStudentProfile = () => {
  return (
    // {/* student profile details */}
    <Paper variant="outlined" sx={{ padding: 1, bgcolor: "#ffff" }}>
      <Stack direction={"column"} spacing={3}>
        <Stack alignItems={"center"} spacing={2} direction={"column"} flex={1}>
          <Avatar width={"140px"} height={"140px"} />
          <Stack direction={"column"} alignItems={"center"}>
            <Typography variant="body" fontWeight={"bold"}>
              Gavesh Madushan Sooriyaarachchi
            </Typography>
            <Box>
              <Button variant="outlined" size="small">
                show resume
              </Button>
            </Box>
          </Stack>
        </Stack>

        <Stack direction={"row"} justifyContent={"center"} spacing={2} flex={2}>
          <Stack spacing={0.5} minWidth={"100px"}>
            {[
              "Name ",
              "Reg. No ",
              "Email ",
              "Mobile ",
              "Linkedin ",
              "Github  ",
              "Intern Status ",
              "GPA ",
            ].map((text) => (
              <Typography variant="body1" fontWeight={"bold"} key={text}>
                {text}
              </Typography>
            ))}
          </Stack>
          {/* in here we have to show data fron database. update that and test with backend */}
          <Stack spacing={0.5} minWidth={"300px"}>
            {[
              "Gavesh Madshan Sooriyaarachchi ",
              "SC/2019/11121 ",
              "gaveshmadushan96@gmail.com",
              "0712345678",
              "http//:Linkedin.com/dash",
              "http//:Github.com/dash",
              "Pending",
              "3.25",
            ].map((text) => (
              <Typography letterSpacing={1} k>
                {text}
              </Typography>
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};
