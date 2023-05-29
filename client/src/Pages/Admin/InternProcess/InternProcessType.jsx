import { Button, Card, CardActions, CardContent, CardMedia, Divider, Grid, Paper, Stack, Typography } from '@mui/material'
import React from 'react'
import { Tile } from '../../../components/card/Tile';
import * as assets from '../../../assets';
import TypeSelectionCard from '../../../components/InternProcess/TypeSelectionCard/TypeSelectionCard';
import MiniCard from '../../../components/InternProcess/MiniCard';

const InternProcessType = () => {

  const generateRecommendations = () => {
    // const res = await axios
  }
  return (
    <Grid container direction='column' sx={{ margin: '5px 10px' }}>
      <Typography variant="pageTitle">
        Intern Selection Process
      </Typography>

      <Grid container rowSpacing={2} columnSpacing={2}>
        <Grid item xs={8}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Tile>
                {/* <Typography variant="h6" color="initial">Welcome to Intern Selection Process</Typography> */}
                <Typography variant="body1" color="secondary">To continue with intern selection process please select one of following options.</Typography>
                <br />
                <Button variant="itms"
                  fontWeight="bold"
                  onClick={generateRecommendations}
                >
                  Generate Recommendations
                </Button >
              </Tile>
            </Grid>

            <Grid item xs={12}>
              <Grid container direction='row'>
                <Grid item xs={6}>
                  <TypeSelectionCard
                    image={assets.Company}
                    title='Company vise'
                    content='Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Numquam dolore tempore rem, debitis incidunt tenetur porro
                perferendis exercitationem earum. Quaerat.'
                    goto='/intern-process/company/select'
                  />
                </Grid>

                <Grid item xs={6}>
                  <TypeSelectionCard
                    image={assets.Student}
                    title='Student vise'
                    content='Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Numquam dolore tempore rem, debitis incidunt tenetur porro
                perferendis exercitationem earum. Quaerat.'
                    goto='/intern-process/student/select'
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={4}>
          <Stack direction='column' spacing={2}>
            <MiniCard
              title='Complete Intern Candidate List'
              content='Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Numquam dolore tempore rem'
              goto='/intern-process/intern-list'
            />
            <MiniCard
              title='Remain Intern Candidate List'
              content='Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Numquam dolore tempore rem'
              goto='/intern-process/intern-list/remain'
            />
            <MiniCard
              title='Selected Intern List for Companies'
              content='Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Numquam dolore tempore rem'
              goto='/company/intern-list'
            />
          </Stack>

        </Grid>
      </Grid>
    </Grid>
  )
}

export default InternProcessType