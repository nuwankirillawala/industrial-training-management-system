import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { Stack, Grid, Button, Typography, Divider } from '@mui/material'
import { Tile } from '../../../components/card/Tile'
import { DailyReportList } from './DailyReportList'

export const ReportPortal = () => {

    const [reportType, setReportType] = useState("");
    const [selectReportType, setSelectReportType] = useState(true);

  const navigate = useNavigate();

  return (

    <Stack>
    {selectReportType === true &&
        <Grid container spacing={2}>
            <Grid item md={12}>
                <Typography variant='PageTitle'>Student Report</Typography>
            </Grid>
            
            <Grid item md={3}>
                <Tile>
                    <Stack direction={'column'} spacing={5} height={'72vh'} justifyContent={'space-between'}>
                        <Stack spacing={2}>
                            <Stack alignItems={'center'}>
                                <Typography variant='body' fontWeight={'bold'}>Daily Report</Typography>
                            </Stack>
                            <Divider />
                        </Stack>
                        <Stack>
                            <Typography variant='body'>About the Daily Report</Typography>
                        </Stack>
                        <Stack>
                            <Button
                                variant='itms'
                                onClick={() => {
                                    setReportType("Daily Report");
                                    setSelectReportType(false);
                                }}
                                >View Report</Button>
                        </Stack>
                    </Stack>
                </Tile>
            </Grid>

            <Grid item md={3}>
                <Tile>
                    <Stack direction={'column'} spacing={5} height={'72vh'} justifyContent={'space-between'}>
                        <Stack spacing={2}>
                            <Stack alignItems={'center'}>
                                <Typography variant='body' fontWeight={'bold'}>Monthly Report</Typography>
                            </Stack>
                            <Divider />
                        </Stack>
                        <Stack>
                            <Typography variant='body'>About the Monthly Report</Typography>
                        </Stack>
                        <Stack>
                            <Button
                                variant='itms'
                                onClick={() => {
                                    setReportType("Monthly Report");
                                    setSelectReportType(false);
                                }}
                                >View Report</Button>
                        </Stack>
                    </Stack>
                </Tile>
            </Grid>

            <Grid item md={3}>
                <Tile>
                <Stack direction={'column'} spacing={5} height={'72vh'} justifyContent={'space-between'}>
                        <Stack spacing={2}>
                            <Stack alignItems={'center'}>
                                <Typography variant='body' fontWeight={'bold'}>Progress Report</Typography>
                            </Stack>
                            <Divider />
                        </Stack>
                        <Stack>
                            <Typography variant='body'>About the Progress Report</Typography>
                        </Stack>
                        <Stack>
                            <Button
                                variant='itms'
                                onClick={() => {
                                    setReportType("Progress Report");
                                    setSelectReportType(false);
                                }}
                                >View Report</Button>
                        </Stack>
                    </Stack>
                </Tile>
            </Grid>

            <Grid item md={3}>
                <Tile>
                <Stack direction={'column'} spacing={5} height={'72vh'} justifyContent={'space-between'}>
                        <Stack spacing={2}>
                            <Stack alignItems={'center'}>
                                <Typography variant='body' fontWeight={'bold'}>Final Feedback Report</Typography>
                            </Stack>
                            <Divider />
                        </Stack>
                        <Stack>
                            <Typography variant='body'>About the Final Feedback Report</Typography>
                        </Stack>
                        <Stack>
                            <Button
                                variant='itms'
                                onClick={() => {
                                    setReportType("Final Feedback Report");
                                    setSelectReportType(false);
                                }}
                                >View Report</Button>
                        </Stack>
                    </Stack>
                </Tile>
            </Grid>
        </Grid>}

    {selectReportType === false &&
        <DailyReportList 
            reportType = {reportType}
            setSelectReportType = {setSelectReportType}
            selectReportType = {selectReportType}
        />
    }
    </Stack>
  )
}
