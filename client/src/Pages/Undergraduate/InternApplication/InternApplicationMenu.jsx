import { Box, Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import MiniCardType2 from '../../../components/InternProcess/MiniCardType2'
import resumeImage from '../../../../public/images/resume.svg';

const InternApplicationMenu = () => {
  return (
    <Box sx={{ display: 'flex' }} padding={'0px 10px 0px 0px'} margin={'0px 10px'}>
      <Grid
        container spacing={1}>
        <Grid item md={12}>
          <Typography variant="head2" marginBottom={'5px'} letterSpacing={3}>Intern Application</Typography>
        </Grid>
        <Grid item xs={6}>
          <Stack direction={'column'} spacing={2}>
            <MiniCardType2
              title='Upload Curriculam Vitae (CV)'
              content='Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Numquam dolore tempore rem'
              goto='/student-cvupdate'
            />
            <MiniCardType2
              title='Additional Information'
              content='Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Numquam dolore tempore rem'
              goto='/student-cvupdate'
            />
            <MiniCardType2
              title='Company Selection'
              content='Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Numquam dolore tempore rem'
              goto='/student-company'
            />


          </Stack>
        </Grid>

        {/* right half of the grid and it shows notice,note and the calender*/}

        <Grid item xs={6}  alignItems="center">
          <Box alignItems="center">
            <img src={resumeImage} alt="Resume" />
          </Box>
        </Grid>



      </Grid>
    </Box>
  )
}

export default InternApplicationMenu