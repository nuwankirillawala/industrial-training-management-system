import axios from 'axios';
import { Box, Typography, Stack, Grid, TextField, Paper, LinearProgress, Divider } from '@mui/material'
import { Tile } from '../../components/card/Tile'
import { Avatar } from '../../components/shared/Images/Avatar'
import { NoticeBoard } from '../../components/Notice/NoticeBoard'
import useAuth from '../../Hooks/useAuth'
import useFetch from '../../Hooks/useFetch';
import ProfileFormLine from '../../components/Dashboard/ProfileFormLine';
import SkillLevel from '../../components/Dashboard/SkillLevel';
import FeaturedCard from '../../components/Dashboard/FeaturedCard';
import PrivateNotePanel from './PrivateNotePanel';

import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import DescriptionIcon from '@mui/icons-material/Description';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import { useNavigate } from 'react-router-dom';

export const StudentDashboard = () => {
  const { user } = useAuth();
  const { data } = useFetch('GET', 'http://localhost:5000/api/v1/undergraduate/dashboard', null);
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

  const navigate = useNavigate()

  return (

    <Box sx={{ display: 'flex' }} padding={'0px 10px 0px 0px'} margin={'0px 10px'}>
      <Grid container spacing={1}>
        <Grid item md={12}>
          <Typography variant="pageTitle">Dashboard</Typography>
        </Grid>
        <Grid item xs={12}>
          <Stack direction={'row'} spacing={2}>
            <FeaturedCard title='Exam Results' color='#fff' icon={LeaderboardIcon} link='/student-company'/>
            <FeaturedCard title='Intern Application' color='#2ECC40' icon={DescriptionIcon} link='/intern-application'/>
            <FeaturedCard title='Report Submission' color='#0074D9' icon={UploadFileIcon} link='/report-portal'/>
            <FeaturedCard title='Your Portfolio' color='#FFDC00' icon={ContactPageIcon} link='/portfolio'/>
          </Stack>
        </Grid>
        {/* left half of the grid and it shows user profile and the result */}
        <Grid item md={9} sm={3}>
          {/* <Typography variant="head3" marginBottom={'5px'}>Dashboard</Typography> */}
          <Grid container direction="row" spacing={1}>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Tile flex={7}>
                    <Typography variant="h6" color="initial">Profile</Typography>
                    <Divider sx={{ m: 1 }} />
                    <Stack direction={'row'} spacing={4}>
                      <Stack justifyItems={'center'} alignItems={'center'} flex={3} >
                        <Avatar width={'140px'} height={'140px'} />
                        <Typography variant='h6' fontWeight={'bold'}>Undergraduate</Typography>
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
                </Grid>
                <Grid item xs={12}>
                  <Tile height={'100%'}>
                    <Stack spacing={0.8} flex={12} direction={'column'}>
                      <Typography variant="h6" color="initial">Skills</Typography>
                      <Divider sx={{ m: 1 }} />
                      <SkillLevel skill={'Programming'} value={80} />
                      <SkillLevel skill={'Database'} value={60} />
                      <SkillLevel skill={'Project Management'} value={50} />
                      <SkillLevel skill={'Database'} value={90} />
                      <SkillLevel skill={'Database'} value={40} />
                    </Stack>
                  </Tile>
                </Grid>
              </Grid>
            </Grid>
            {/* <Grid item xs={3}>
            <Stack direction={'column'} spacing={1}>
                <FeaturedCard title='Exam Results' color='#fff'/>
                <FeaturedCard title='Intern Application' color='#2ECC40'/>
                <FeaturedCard title='Report Submission' color='#0074D9'/>
                <FeaturedCard title='Your Portfolio' color='#FFDC00'/>
              </Stack>
            </Grid> */}
          </Grid>
        </Grid>

        {/* right half of the grid and it shows notice,note and the calender*/}
        <Grid item md={3}>
          <Stack spacing={1}>
            <Stack>
              <Tile>
                {/* notice  */}
                <NoticeBoard></NoticeBoard>
              </Tile>
            </Stack>
            <Stack>
              {/* note  */}
              <PrivateNotePanel />
            </Stack>
          </Stack>
        </Grid>

      </Grid>
    </Box>

  )
}