import React from "react";
import { Stack, Box, Divider, Grid, Paper, Typography } from "@mui/material";
import { StudentInternPeriod } from "../../../components/user/Undergraduate/StudentInternPeriod";
import { Tile } from "../../../components/card/Tile";

export const Internship = () => {
  return (
    <Grid container spacing={1}>
      <Grid item md={12}>
        <Typography variant="pageTitle">Internship</Typography>
      </Grid>
      <Grid item md={12}>
        <Tile>
          <StudentInternPeriod />
        </Tile>
      </Grid>
    </Grid>
  );
};
