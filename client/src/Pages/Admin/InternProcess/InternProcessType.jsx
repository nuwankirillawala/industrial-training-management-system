import { Alert, Button, Card, CardActions, CardContent, CardMedia, Divider, Grid, LinearProgress, Paper, Snackbar, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Tile } from '../../../components/card/Tile';
import * as assets from '../../../assets';
import TypeSelectionCard from '../../../components/InternProcess/TypeSelectionCard/TypeSelectionCard';
import MiniCard from '../../../components/InternProcess/MiniCard';
import axios from 'axios';

const InternProcessType = () => {
  const [showProgress, setShowProgress] = useState(false); // State to control the visibility of the progress bar
  const [showSnackbar, setShowSnackbar] = useState(false); // State to control the visibility of the snackbar
  const [snackbarMessage, setSnackbarMessage] = useState(''); // State to store the snackbar message

  const generateRecommendations = async () => {
    setShowProgress(true); // Show the progress bar when the button is clicked
    try {
      const res = await axios.patch('http://localhost:5000/api/v1/company/intern-process/recommendations', { withCredentials: true });
      // Process the response from the backend

      setShowProgress(false); // Hide the progress bar when the response is received
      setShowSnackbar(true); // Show the snackbar
      setSnackbarMessage('Recommendations generated successfully'); // Set the success message
    } catch (error) {
      // Handle any error that occurred during the API call

      setShowProgress(false); // Hide the progress bar in case of an error
      setShowSnackbar(true); // Show the snackbar
      setSnackbarMessage('Failed to generate recommendations. Please try again.'); // Set the error message
    }
  }

  const handleCloseSnackbar = () => {
    setShowSnackbar(false); // Hide the snackbar
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
                <Typography variant="body1" color="secondary">To continue with intern selection process please select one of the following options.</Typography>
                <br />
                <Button variant="itms" fontWeight="bold" onClick={generateRecommendations}>
                  Generate Recommendations
                </Button >
                {showProgress && <LinearProgress />} {/* Render the progress bar if showProgress is true */}
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
      <Snackbar open={showSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal:'right' }}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarMessage.includes('successfully') ? 'success' : 'error'} variant='filled' elevation={6}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Grid>
  )
}

export default InternProcessType