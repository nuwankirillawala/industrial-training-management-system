import axios from 'axios';
import { Box, Typography, Stack, Grid, TextField, Paper, LinearProgress, Divider } from '@mui/material'
// import { Avatar } from '../../components/shared/Images/Avatar'
// import { NoticeBoard } from '../../components/Notice/NoticeBoard'
// import useAuth from '../../Hooks/useAuth'
// import useFetch from '../../Hooks/useFetch';
// import ProfileFormLine from '../../components/Dashboard/ProfileFormLine';
// import SkillLevel from '../../components/Dashboard/SkillLevel';
// import FeaturedCard from '../../components/Dashboard/FeaturedCard';
// import PrivateNotePanel from './PrivateNotePanel';

import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import DescriptionIcon from '@mui/icons-material/Description';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import useFetch from '../../Hooks/useFetch';
import FeaturedCard from '../../components/Dashboard/FeaturedCard';
import ImageDisplay from '../../components/ImageDisplay/ImageDisplay';
import { Avatar } from '../../components/shared/Images/Avatar';
import ProfileFormLine from '../../components/Dashboard/ProfileFormLine';
import { Tile } from '../../components/card/Tile';
// import ImageDisplay from '../../components/ImageDisplay/ImageDisplay';

export const SupervisorDashboard = () => {
  const { user } = useAuth();
  const { data } = useFetch('GET', 'http://localhost:5000/api/v1/supervisor/profile', null);
  console.log(data);

  const basicInfo = data && {
    name: data.user.name,
    email: data.user.email,
    contactNo: data.user.contactNo,
    company: data.user.company.name,
    jobRole: data.user.jobRole,
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
            <FeaturedCard title='Internship' color='blueColor' icon={LeaderboardIcon} link='/student-company'/>
            <FeaturedCard title='Interns' color='red' icon={DescriptionIcon} link='/intern-application'/>
            <FeaturedCard title='Reports' color='green' icon={UploadFileIcon} link='/report-portal'/>
            <FeaturedCard title='Company Profile' color='yellow' icon={ContactPageIcon} link='/portfolio'/>
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
                    <Typography variant="head6">Profile</Typography>
                    <Divider sx={{ m: 1 }} />
                    <Stack direction={'row'} spacing={4}>
                      <Stack justifyItems={'center'} alignItems={'center'} flex={3} >
                      {!data.user
                          ? <Avatar width={"140px"} height={"140px"} />
                          : <ImageDisplay 
                          imagePath={`http://localhost:5000/${data.user.profileImage}`} 
                          width={140}
                          height={140}
                          />
                        }
                        <Typography variant='h6' fontWeight={'bold'}>Supervisor</Typography>
                      </Stack>

                      <Stack spacing={0.8} flex={12} direction={'column'}>
                        <ProfileFormLine title='Name' content={basicInfo.name} />
                        <ProfileFormLine title='Email' content={basicInfo.email} />
                        <ProfileFormLine title='Mobile' content={basicInfo.contactNo} />
                        <ProfileFormLine title='Company' content={basicInfo.company} />
                        <ProfileFormLine title='Job Role' content={basicInfo.jobRole} />
                      </Stack>
                    </Stack>
                  </Tile>
                </Grid>
                <Grid item xs={12}>
                  <Tile height={'100%'}>
                    
                  </Tile>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
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
              {/* <PrivateNotePanel /> */}
            </Stack>
          </Stack>
        </Grid>

      </Grid>
    </Box>

  )
}