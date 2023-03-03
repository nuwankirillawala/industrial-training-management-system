import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';

const message = `Truncation should be conditionally applicable on this long line of text
 as this is a much longer line than what the container can support. `;

export const NoticeBoard = () => {
  return (
    <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3 }}>
    <Typography variant='h6' fontWeight='bold'>Notice</Typography>

    <Paper sx={{padding:'5px 10px 5px 10px'}}>

      <Button>

        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar>W</Avatar>
          </Grid>
          <Grid item zeroMinWidth>
            <Typography noWrap>{message}</Typography>
          </Grid>
        </Grid>

      </Button>
      </Paper>     
    </Box>
  );
}