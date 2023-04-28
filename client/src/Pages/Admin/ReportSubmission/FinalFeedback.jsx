import React from 'react'
import { Stack, Grid, Box, Typography, Divider, Button } from '@mui/material'
import { Tile } from '../../../components/card/Tile'
import { useState } from 'react'

const weekdays = [
  {day : 'First Week', varification :'approved'},
  {day : 'Second Week', varification :'approved'},
  {day : 'Third Week', varification :'notApproved'},
  {day : 'Fouth Week', varification :'notApproved'}
]

export const FinalFeedback = () => {

  const [varification , setVarification ] = useState();

  return (
        <Tile>
          <Stack direction={'column'} height={'84vh'} spacing={1}>

            <Stack alignItems={'center'}>
              <Typography variant='h6' fontWeight={'bold'}>Final Feedback Report</Typography>
            </Stack>

            <Divider variant='middle' />

            <Stack direction={'row'} justifyContent={'space-evenly'}>
              <Stack alignItems={'center'} flex={1}>
                <Typography fontWeight={'bold'}>
                  Week
                </Typography>
              </Stack>

              <Divider orientation='vertical' />

              <Stack alignItems={'center'} flex={2}>
                <Typography fontWeight={'bold'}>
                  Brief Description of Work Carried Out
                </Typography>
              </Stack>

              <Divider orientation='vertical' />

              <Stack alignItems={'center'} flex={1}>
                <Typography fontWeight={'bold'}>
                  Varification
                </Typography>
              </Stack>

            </Stack>

            <Divider variant='middle' />

            <Stack direction={'column'} justifyContent={'space-around'} height={'70vh'}>

              {weekdays.map((report)=>(  
                <Stack>
                  <Stack direction={'row'} justifyContent={'space-around'}>
                    <Divider orientation='vertical' />
                    <Stack flex={1} alignItems={'center'}>
                      <Typography fontWeight={'bold'}>{report.day}</Typography>
                    </Stack>
                    <Divider orientation='vertical' />
                    <Stack flex={2} direction={'row'} maxHeight={'10vh'}>
                      <Box width={'24vw'} height={'100%'}>
                      <Box
                        flex={5}
                        sx={{
                            padding:'10px',
                            alignItems:'center',
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                            height : '100%',
                            // border : 'solid 0.1px'
                          }}  
                        >
                        <Typography>In terms of a rhetoric any act of communication, a text serves as the vehicle for communication</Typography>
                      </Box>
                      </Box>
                      <Stack flex={1}>
                        <Button size='small'>full view</Button>
                      </Stack>
                    </Stack>
                    <Divider orientation='vertical' />
                    <Stack flex={1}alignItems={'center'}>
                      {report.varification === 'approved' && (
                        <Typography fontWeight={'bold'} color={'green'}>Approved</Typography>
                      )}
                      {report.varification === 'notApproved' && (
                        <Typography fontWeight={'bold'} color={'red'}>Not Approved</Typography>
                      )}
                      </Stack>
                    <Divider orientation='vertical' />
                  </Stack>
                  <Divider orientation='horizontal' />
                </Stack>
              ))}
            </Stack>

          </Stack>
        </Tile>
  )
}
