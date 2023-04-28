import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { Stack, Grid, Button, Typography } from '@mui/material'
import { Tile } from '../../../components/card/Tile'

export const ReportPortal = () => {

  const navigate = useNavigate();

  return (
    <Grid container spacing={1}>
        <Grid item md={12}>
            <Tile>
                <Stack alignItems={'center'}>
                    <Typography variant='h6' fontWeight={'bold'}>Student Reports</Typography>
                </Stack>
            </Tile>
        </Grid>
        <Grid item md={6}>
            <Tile>
                <Stack direction={'column'} spacing={5} height={'72vh'} justifyContent={'space-between'}>
                    <Stack alignItems={'center'}>
                        <Typography variant='body' fontWeight={'bold'}>Daily Report</Typography>
                    </Stack>
                    <Stack>
                        <Typography variant='body'>About the Daily Report</Typography>
                    </Stack>
                    <Stack>
                        <Button
                            variant='itms'
                            onClick={() => navigate('/daily-report-list')}
                            >View Report</Button>
                    </Stack>
                </Stack>
            </Tile>
        </Grid>
        <Grid item md={6}>
            <Tile>
            <Stack direction={'column'} spacing={5} height={'72vh'} justifyContent={'space-between'}>
                    <Stack alignItems={'center'}>
                        <Typography variant='body' fontWeight={'bold'}>Final Feedback Report</Typography>
                    </Stack>
                    <Stack>
                        <Typography variant='body'>About the Final Feedback Report</Typography>
                    </Stack>
                    <Stack>
                        <Button
                            variant='itms'
                            onClick={() => navigate('/final-feedback-list')}
                            >View Report</Button>
                    </Stack>
                </Stack>
            </Tile>
        </Grid>
    </Grid>
  )
}
