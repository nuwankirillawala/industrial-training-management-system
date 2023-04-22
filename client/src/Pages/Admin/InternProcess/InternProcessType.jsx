import { Button, Card, CardActions, CardContent, CardMedia, Grid, Paper, Stack, Typography } from '@mui/material'
import React from 'react'
import { Tile } from '../../../components/card/Tile';
import * as assets from '../../../assets';
import InternProcessTypeCard from '../../../components/InternProcess/InternProcessTypeCard/InternProcessTypeCard';
import MiniCard from '../../../components/InternProcess/InternProcessTypeCard/MiniCard';

const InternProcessType = () => {
  return (
    <Grid container direction='column' sx={{ margin: '5px 10px' }}>
      <Typography
        variant="h6"
        color="initial"
      >
        Intern Selection Process
      </Typography><br />

      <Grid container rowSpacing={2} columnSpacing={3}>
        <Grid item xs={8}>
          <Tile>
            <Typography variant="h6" color="initial">Welcome to Intern Selection Process</Typography>
            <Typography variant="body1" color="gray">To continue with intern selection process please select one of following options.</Typography>
            <br />

            <Grid container direction='row' justifyContent='center'>
              <Grid item xs={6}>
                <InternProcessTypeCard
                  image={assets.Company}
                  title='Company vise'
                  content='Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Numquam dolore tempore rem, debitis incidunt tenetur porro
                perferendis exercitationem earum. Quaerat.'
                />
              </Grid>

              <Grid item xs={6}>
                <InternProcessTypeCard
                  image={assets.Student}
                  title='Student vise'
                  content='Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Numquam dolore tempore rem, debitis incidunt tenetur porro
                perferendis exercitationem earum. Quaerat.'
                />
              </Grid>
            </Grid>
          </Tile>
        </Grid>

        <Grid item xs={4}>
          <Stack direction='column' spacing={2}>
          <MiniCard 
          title='Complete Intern Candidate List'
          content='Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Numquam dolore tempore rem'
          goto='/view-intern-list'
          />
          <MiniCard 
          title='Remain Intern Candidate List'
          content='Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Numquam dolore tempore rem'
          goto='/view-intern-list-remain'
          />
          <MiniCard 
          title='Selected Intern List for Companies'
          content='Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Numquam dolore tempore rem'
          goto='/company-intern-list'
          />
          </Stack>
          
        </Grid>
      </Grid>
    </Grid>
  )
}

export default InternProcessType