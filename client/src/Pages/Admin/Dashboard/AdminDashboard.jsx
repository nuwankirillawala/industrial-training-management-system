import axios from 'axios';
import { Box, Typography, Stack, Grid, TextField, Paper, LinearProgress, Divider, Avatar } from '@mui/material'
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import DescriptionIcon from '@mui/icons-material/Description';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import { useNavigate } from 'react-router-dom';
import { Tile } from '../../../components/card/Tile';
import FeaturedCard from '../../../components/Dashboard/FeaturedCard';
import ProfileFormLine from '../../../components/Dashboard/ProfileFormLine';
import useFetch from '../../../Hooks/useFetch';

export const AdminDashboard = () => {
  const { data } = useFetch('GET', 'http://localhost:5000/api/v1/admin/profile', null);
  console.log(data);

  const basicInfo = data && {
    name: data.user.name,
    regNo: data.user.regNo,
    email: data.user.email,
    contactNo: data.user.contactNo,
  }

  const navigate = useNavigate()

  return (

    <Box sx={{ display: 'flex' }} padding={'0px 10px 0px 0px'} margin={'0px 10px'}>
      <Grid container spacing={1}>
        <Grid item md={12}>
          <Typography variant="head2" marginBottom={'5px'} letterSpacing={3}>Dashboard</Typography>
        </Grid>
        <Grid item xs={12}>
          <Stack direction={'row'} spacing={2}>
            <FeaturedCard title='Intern Status' color='#fff' icon={LeaderboardIcon} link='/student-company'/>
            <FeaturedCard title='Manage Users' color='#2ECC40' icon={DescriptionIcon} link='/intern-application'/>
            <FeaturedCard title='Intern Reports' color='#0074D9' icon={UploadFileIcon} link='/report-portal'/>
            <FeaturedCard title='Company Ratings' color='#FFDC00' icon={ContactPageIcon} link='/portfolio'/>
          </Stack>
        </Grid>
        <Grid item md={9} sm={3}>
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
                        <Typography variant='h6' fontWeight={'bold'}>Administrator</Typography>
                      </Stack>

                      <Stack spacing={0.8} flex={12} direction={'column'}>
                        <ProfileFormLine title='Name' content={basicInfo.name} />
                        <ProfileFormLine title='Reg. No' content={basicInfo.regNo} />
                        <ProfileFormLine title='Email' content={basicInfo.email} />
                        <ProfileFormLine title='Mobile' content={basicInfo.contactNo} />
                      </Stack>
                    </Stack>
                  </Tile>
                </Grid>
                <Grid item xs={12}>
                  <Tile height={'100%'}>
                    <Stack spacing={0.8} flex={12} direction={'column'}>
                      <Typography variant="h6" color="initial">Skills</Typography>
                      <Divider sx={{ m: 1 }} />
                      
                    </Stack>
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