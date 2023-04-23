import axios from 'axios';
import { Box, Typography, Stack, Grid, TextField, Paper, LinearProgress, Divider } from '@mui/material'
import { Tile } from '../../components/card/Tile'
import { Avatar } from '../../components/shared/Images/Avatar'
import { TableContainer, Table, TableRow, TableHead, TableCell, TableBody } from '@mui/material'
import { MiniNoticeBoard } from '../../components/MiniNoticeBoard/MiniNoticeBoard'
import useAuth from '../../Hooks/useAuth'
import { useEffect, useState } from 'react';
import useFetch from '../../Hooks/useFetch';
import ProfileFormLine from '../../components/Dashboard/ProfileFormLine';
import SkillLevel from '../../components/Dashboard/SkillLevel';
import FeaturedCard from '../../components/Dashboard/FeaturedCard';
import PrivateNotePanel from './PrivateNotePanel';

export const StudentDashboard = () => {
  const { user } = useAuth();
  const { data } = useFetch('GET', 'http://localhost:5000/api/v1/undergraduate/undergraduate-dashboard', null);
  console.log(data);

  const basicInfo = data && {
    name: data.user.name,
    regNo: data.user.regNo,
    email: data.user.email,
    contactNo: data.user.contactNo,
    gpa: data.user.gpa,
    linkdinURL: data.user.linkdinURL,
    githubURL: data.user.githubURL,
  }


  return (

    <Box sx={{ display: 'flex' }} padding={'0px 10px 0px 0px'} margin={'0px 10px'}>
      <Grid container spacing={2}>

        {/* left half of the grid and it shows user profile and the result */}
        <Grid item md={9} sm={3}>
          <Stack spacing={1}>
            <Stack spacing={1}>
              <Typography variant="h6" color="primary" marginBottom={'5px'}>Dashboard</Typography>
              <Stack spacing={1} direction={'row'}>
                <Tile flex={7}>
                  <Stack direction={'row'} spacing={4}>
                    <Stack justifyItems={'center'} alignItems={'center'} flex={3} >
                      <Avatar width={'140px'} height={'140px'} />
                      <Typography variant='h6' fontWeight={'bold'}>Undergraduate</Typography>
                      {/* <Paper sx={{p:1, backgroundColor: '#fff'}}>
                        <Typography variant='h6' fontWeight={'bold'}>Undergraduate</Typography>
                      </Paper> */}
                    </Stack>

                    <Stack spacing={0.8} flex={12} direction={'column'}>
                      <ProfileFormLine title='Name' content={basicInfo.name} />
                      <ProfileFormLine title='Reg. No' content={basicInfo.regNo} />
                      <ProfileFormLine title='Email' content={basicInfo.email} />
                      <ProfileFormLine title='Mobile' content={basicInfo.contactNo} />
                      <ProfileFormLine title='Linkdin' content={basicInfo.linkdinURL} />
                      <ProfileFormLine title='GitHub' content={basicInfo.githubURL} />
                      <ProfileFormLine title='GPA' content={basicInfo.gpa} />
                    </Stack>
                  </Stack>
                </Tile>
                <Stack flex={5} spacing={1}>
                  <Tile height={'100%'}>
                    <Typography variant="h6" color="initial">Skills</Typography>
                    <Divider sx={{ m: 1 }} />
                    <SkillLevel skill={'Programming'} value={80} />
                    <SkillLevel skill={'Database'} value={60} />
                    <SkillLevel skill={'Project Management'} value={50} />
                    <SkillLevel skill={'Database'} value={90} />
                    <SkillLevel skill={'Database'} value={40} />

                  </Tile>
                </Stack>
              </Stack>
              {/* <Typography variant="h5" color="initial">Featured</Typography> */}
              <Stack direction={'row'} spacing={1}>
                <FeaturedCard title='Exam Results' color='#fff'/>
                <FeaturedCard title='Intern Application' color='#2ECC40'/>
                <FeaturedCard title='Report Submission' color='#0074D9'/>
                <FeaturedCard title='Your Portfolio' color='#FFDC00'/>
              </Stack>


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
                <MiniNoticeBoard></MiniNoticeBoard>
              </Tile>
            </Stack>
            <PrivateNotePanel />
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