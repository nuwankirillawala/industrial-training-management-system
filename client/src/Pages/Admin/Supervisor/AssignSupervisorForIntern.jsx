import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { Tile } from "../../../components/card/Tile";

const AssignSupervisorForIntern = () => {
  //column for data grid

  //End of column for data grid

  return (
    <Box sx={{ height: "88vh" }}>
      <Box sx={{ width: "100%" }}>
        <Typography
          variant="h6"
          color="primary"
          marginBottom={"5px"}
          paddingLeft={"15px"}
        >
          Assign Supervisors For Interns
        </Typography>
      </Box>
      <Box sx={{ height: "100%" }}>
        <Stack spacing={1} height={"100%"}>
          <Tile sx={{ height: "100%" }}>
            <Box sx={{ height: 400, width: "80vw" }}>hello</Box>
          </Tile>
        </Stack>
      </Box>
    </Box>
  );
};

export default AssignSupervisorForIntern;
