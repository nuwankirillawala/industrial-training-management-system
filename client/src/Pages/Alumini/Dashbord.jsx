import React from "react";
import Box from "@mui/material/Box";
import { Stack, Toolbar } from "@mui/material";
import Sidebar from "../../components/Sidebar/Sidebar";

export const Dashboard = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flex: "auto",
        justifyContent: "center",
      }}
    >
      <Box sx={{ maxWidth: "1300px" }}>
        <Stack direction="row" spacing={1} width="80%">
          <Box sx={{ bgcolor: "#111", padding: "20px", flex: 2 }}></Box>
          <Box sx={{ bgcolor: "#994", flex: 1 }}>
            <Stack direction="column">
              <Box sx={{ bgcolor: "#667", flex: 1 }}>Notice</Box>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};
