import axios from 'axios';
import { Box, Typography, Stack, Grid, TextField } from '@mui/material'
import { Tile } from '../../components/card/Tile'
import { Avatar } from '../../components/shared/Images/Avatar'
import { TableContainer, Table, TableRow, TableHead, TableCell, TableBody } from '@mui/material'
import { NoticeBoard } from '../../components/Notice/NoticeBoard'
import useAuth from '../../Hooks/useAuth'
import { useEffect } from 'react';

export const StudentDashboard = () => {

  const { user } = useAuth();
  console.log("user-", user);

  // axios.get('http://localhost:5000/api/v1/undergraduate/undergraduate-dashboard', { withCredentials: true })
  //   .then(response => {
  //     // Handle the response data
  //     console.log(response.data);
  //   })
  //   .catch(error => {
  //     // Handle the error
  //     console.log(error);
  //   });


  return (

    <Box sx={{ display: 'flex' }} padding={'0px 10px 0px 0px'}>
      <Grid container spacing={1}>

        {/* left half of the grid and it shows user profile and the result */}
        <Grid item md={9} sm={3}>
          <Stack spacing={1}>
            <Stack>
              <Tile>
                <Stack direction={'column'}>
                  <Stack direction={'row'}>

                    <Stack justifyItems={'center'} alignItems={'center'} flex={3}>
                      <Avatar width={'140px'} height={'140px'} />
                      <Typography variant='h6' fontWeight={'bold'}>GPA : 3.50</Typography>
                    </Stack>

                    <Stack spacing={0} flex={4}>
                      {['Name : ',
                        'Registration Number : ',
                        'Email : ',
                        'Mobile Number : ',
                        'Linkedin Account : ',
                        'Github Account : ',
                        'Internship Status : '].map((text) => (
                          <Typography variant='body1' fontWeight={'bold'}>{text}</Typography>
                        ))}
                    </Stack>
                    {/* in here we have to show data fron database. update that and test with backend */}
                    <Stack spacing={0} flex={8}>
                      {['Gavesh Madshan Sooriyaarachchi ',
                        'SC/2019/11121 ',
                        'gaveshmadushan96@gmail.com',
                        '0712345678',
                        'http//:Linkedin.com/dash',
                        'http//:Github.com/dash',
                        'Pending'].map((text) => (
                          <Typography letterSpacing={1}>{text}</Typography>
                        ))}
                    </Stack>
                  </Stack>

                  {/* Skills levels */}
                  <Stack direction={'row'}>
                    <Typography>skills</Typography>
                  </Stack>

                </Stack>
              </Tile>
            </Stack>

            {/* results */}
            <Stack>
              <Tile>
                <TableContainer>
                  <Table>
                    <TableHead sx={{ bgcolor: '#FFFFFF' }}>
                      <TableRow>
                        <TableCell>Subject Name</TableCell>
                        <TableCell>Subject Code</TableCell>
                        <TableCell>Result</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody sx={{}}>
                      <TableRow>
                        <TableCell align='left'>object orianted system developmet</TableCell>
                        <TableCell>CSC2134</TableCell>
                        <TableCell>A</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align='left'>object orianted system developmet</TableCell>
                        <TableCell>CSC2134</TableCell>
                        <TableCell>A</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Tile>
            </Stack>
          </Stack>
        </Grid>

        {/* right half of the grid and it shows notice,note and the calender*/}
        <Grid item md={3}>
          <Stack spacing={1}>
            <Stack>
              <Tile>
                {/* notice  */}
                {/* <NoticeBoard></NoticeBoard> */}
              </Tile>
            </Stack>
            <Stack>
              {/* note  */}
              <Tile>
                <TextField
                  label="Your Notes  Here..."
                  multiline
                  rows={10}
                  fullWidth
                />
              </Tile>
            </Stack>
            <Stack>
              {/* calender  */}
              <Tile>
                <Typography>calender</Typography>
              </Tile>
            </Stack>
          </Stack>
        </Grid>

      </Grid>
    </Box>

  )
}