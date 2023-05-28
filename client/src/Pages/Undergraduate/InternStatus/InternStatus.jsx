import React from "react";
import { Stack, Box, Divider, Grid, Paper, Typography } from "@mui/material";
import { StudentCompanyStatus } from "../../../components/user/Undergraduate/StudentCompanyStatus";
import { Tile } from "../../../components/card/Tile";

export const InternStatus = () => {
  return (
    <Grid container spacing={1}>
      <Grid item md={12}>
        <Typography variant="pageTitle">Internship Status</Typography>
      </Grid>
      <Grid item md={12}>
        <Tile>
          <StudentCompanyStatus />
        </Tile>
      </Grid>
    </Grid>
  );
};
