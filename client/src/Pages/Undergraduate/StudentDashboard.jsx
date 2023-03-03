import React from 'react'
import { Box,Typography,Stack,Grid,TextField } from '@mui/material'
import { Tile } from '../../../card/Tile'
import { Avatar } from '../../../shared/Images/Avatar'
import { Layout } from '../../../Layout/Layout'
import { TableContainer, Table, TableRow, TableHead, TableCell, TableBody } from '@mui/material'
import { NoticeBoard } from '../../../Notice/NoticeBoard'

export const StudentDashboard = () => {
  return (
    <Layout>
    <Box sx={{display:'flex'}}>
    <Grid container md={12} sm={12} spacing={1}>
      <Grid item md={9} sm={3}>
{/* left half of the grid and it shows user profile and the result */}
        <Grid item md={12}>
          <Tile>

            <Grid container>
              <Grid container>
{/* profile picture and the GPA */}
                <Grid item justifyItems={'center'} md={3}>
                  <Stack alignItems={'center'} justifyContent={'center'}>
                  <Avatar width={'140px'} height={'140px'}/>
                  <Typography variant='h6' fontWeight={'bold'}>GPA : 3.50</Typography>
                  </Stack>
                </Grid>
{/* dispaly fields from student profile */}
                <Grid container md={9}>
                  <Grid item md={4}>
                    <Stack spacing={0}>
                  {['Name : ',
                    'Registration Number : ',
                    'Email : ',
                    'Mobile Number : ',
                    'Linkedin Account : ',
                    'Github Account : ',
                    'Internship Status : '].map((text)=>(
                    <Typography variant='body1' fontWeight={'bold'}>{text}</Typography>
                  ))}
                  </Stack>
                  </Grid>
{/* in here we have to show data fron database. update that and test with backend */}
                  <Grid item md={8}>
                    <Stack spacing={0}>
                    {['Gavesh Madshan Sooriyaarachchi ',
                      'SC/2019/11121 ',
                      'gaveshmadushan96@gmail.com',
                      '0712345678',
                      'http//:Linkedin.com/dash',
                      'http//:Github.com/dash',
                      'Pending'].map((text)=>(
                      <Typography letterSpacing={1}>{text}</Typography>
                    ))}
                    </Stack>
                  </Grid>

                </Grid>
              </Grid>
{/* Skills levels */}
              <Grid container md={12}>
                  <Typography>skills</Typography>
              </Grid>

            </Grid>
          </Tile>
        </Grid>

{/* results */}
        <Grid>
          <Tile>
            <TableContainer>
              <Table>
                <TableHead sx={{bgcolor:'#FFFFFF'}}>
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
        </Grid>
      </Grid>

{/* right half of the grid and it shows notice,note and the calender*/}
      <Grid item md={3}>
        <Grid>
          {/* notice  */}
          <Tile>
            <NoticeBoard></NoticeBoard>
          </Tile>
        </Grid>
        <Grid>
          {/* note  */}
          <Tile>
            <TextField
            label="Your Notes  Here..."
            multiline
            rows={10}
            fullWidth
          />
          </Tile>
        </Grid>
        <Grid>
          {/* calender  */}
          <Tile>
            <Typography>calender</Typography>
          </Tile>
        </Grid>
      </Grid>

    </Grid>
    </Box>
    </Layout>
  )
}