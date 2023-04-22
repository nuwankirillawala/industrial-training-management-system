import React from 'react'
import { Grid, TextField, Stack, Typography, Table, TableHead, TableBody, TableCell, TableRow } from "@mui/material"
import { useState } from "react"
import { Button } from "@mui/material"
import { Tile } from '../card/Tile'
import { DataGrid } from '@mui/x-data-grid'
import { Divider } from '@mui/material'
import Dialogbox from '../Dialogbox/Dialogbox'

// const dailydetail = {
//     weekStartDate: '',
//     weekEndDate: '',
//     Solutions: ''
// }

const mondayReport = {
    mondayReportData: ''
}

const tuesdayReport = {
    tuesdayReportData: ''
}

const wednesdayReport = {
    wednesdayReportData: ''
}
const thursdayReport = {
    thursdayReportData: ''
}
const fridayReport = {
    fridayReportData: ''
}
const saturdayReport = {
    saturdayReportData: ''
}
const sundayReport = {
    sundayReportData: ''
}

export const DailyReportForm = () => {

    const [mondayvalues, setMondayValues] = useState(mondayReport);
    const [tuesdayvalues, setTuesdayValues] = useState(tuesdayReport);
    const [wednesdayvalues, setWednesdayValues] = useState(wednesdayReport);
    const [thursdayvalues, setThursdayValues] = useState(thursdayReport);
    const [fridayvalues, setFridayValues] = useState(fridayReport);
    const [saturdayvalues, setSaturdayValues] = useState(saturdayReport);
    const [sundayvalues, setSundayValues] = useState(sundayReport);

    const [ReportDate, setReportDate] = useState('');

    const handleMondaySubmit = (event) => {
        event.preventDefault();
        console.log(mondayvalues, ReportDate);
    }
    const handleTuesdaySubmit = (event) => {
        event.preventDefault();
        console.log(tuesdayvalues, ReportDate);
    }
    const handleWednesdaySubmit = (event) => {
        event.preventDefault();
        console.log(wednesdayvalues, ReportDate);
    }
    const handleThursdaySubmit = (event) => {
        event.preventDefault();
        console.log(thursdayvalues, ReportDate);
    }
    const handleFridaySubmit = (event) => {
        event.preventDefault();
        console.log(fridayvalues, ReportDate);
    }
    const handleSaturdaySubmit = (event) => {
        event.preventDefault();
        console.log(saturdayvalues, ReportDate);
    }
    const handleSundaySubmit = (event) => {
        event.preventDefault();
        console.log(sundayvalues, ReportDate);
    }
    //if u save or submit, it need to send data to backend but if u submit deactivate the edit button.

    return (
        <Tile width={'1000px'}>

            {/* <form onSubmit={onSubmit}> */}
            <form>
                <Typography align="center" variant="h6" fontWeight="bold" paddingBottom={'20px'} color="#536dfe"> Daily Report</Typography>
                <Divider orientation="horizontal" />
                <Stack direction={'column'} spacing={5} justifyContent={'center'} padding="8px">
                    <Stack direction="row" spacing={10} justifyContent={'space-between'}>
                        <Stack direction="row" spacing={3}>
                            <Typography >Week start <br />date :</Typography><TextField type="date" varient="outlined" ></TextField>
                        </Stack>
                        <Stack direction="row" spacing={3} >
                            <Typography >Week end <br />date :</Typography><TextField type="date" varient="outlined" ></TextField>
                        </Stack>
                    </Stack>

                    <Divider orientation="horizontal" />
                    <Typography fontWeight="bold"> Enter Daily report updates here </Typography>
                    {/* <Stack direction={'row'} spacing={2} justifyContent={'space-between'}> */}
                    <Grid container justifyContent={'center'}>
                        <Grid item md={11}>
                            {/* row headers */}
                            <Grid container padding={2}>
                                <Grid item md={3}>
                                    <Typography fontWeight={"bold"}>Day</Typography>
                                </Grid>
                                <Grid item md={6}>
                                    <Typography fontWeight={"bold"}>Brief description carried out</Typography>
                                </Grid>
                                <Grid item md={2}><Typography fontWeight={"bold"}>Verification</Typography></Grid>
                                <Grid item md={1}>
                                </Grid>
                            </Grid>

                            {/* row 1 monday*/}<Divider orientation="horizontal" />
                            <Grid container>
                                <Grid item md={3}>
                                    <Typography>Monday</Typography><TextField type="date" varient="outlined" onChange={(event) => setReportDate(event.target.value)} ></TextField>
                                </Grid>
                                <Grid item md={6}>
                                    <Typography style={{ wordWrap: 'break-word' }} >{mondayvalues.mondayReportData}</Typography>
                                </Grid>
                                <Grid item md={2}><Typography>Verification</Typography></Grid>
                                <Grid item md={1}>
                                    <Dialogbox title="Monday report" btn_name="Edit">
                                        {/* <Dialogbox title="Update Administrator" btn_name="update" handleSubmit={handleSubmit} setMondayValues={setMondayValues} mondayvalues={mondayvalues}> */}
                                        <Grid container>
                                            <Grid item md={6}>
                                                <form onSubmit={handleMondaySubmit}>
                                                    <TextField
                                                        multiline
                                                        defaultValue={mondayvalues.mondayReportData}
                                                        onChange={(e) => {
                                                            setMondayValues(
                                                                {
                                                                    ...mondayvalues,
                                                                    mondayReportData: e.target.value
                                                                }
                                                            );
                                                        }}  ></TextField>
                                                    <Button variant="itms" type={'submit'} >save</Button>
                                                </form>
                                            </Grid>
                                        </Grid>
                                    </Dialogbox>
                                </Grid>
                            </Grid>
                            {/* row 2  tuesday*/}<Divider orientation="horizontal" />
                            <Grid container>
                                <Grid item md={3}>
                                    <Typography>Tuesday</Typography><TextField type="date" varient="outlined" onChange={(event) => setReportDate(event.target.value)}></TextField>
                                </Grid>
                                <Grid item md={6}>
                                    <Typography style={{ wordWrap: 'break-word' }}>{tuesdayvalues.tuesdayReportData}</Typography>
                                </Grid>
                                <Grid item md={2}><Typography>Verification</Typography></Grid>
                                <Grid item md={1}>
                                    <Dialogbox title="Tuesday report" btn_name="Edit" >
                                        {/* <Dialogbox title="Update Administrator" btn_name="update" handleSubmit={handleSubmit} setMondayValues={setMondayValues} mondayvalues={mondayvalues}> */}
                                        <Grid container>
                                            <Grid item md={6}>
                                                <form onSubmit={handleTuesdaySubmit}>
                                                    <TextField
                                                        multiline
                                                        defaultValue={tuesdayvalues.tuesdayReportData}
                                                        onChange={(e) => {
                                                            setTuesdayValues(
                                                                {
                                                                    ...tuesdayvalues,
                                                                    tuesdayReportData: e.target.value
                                                                }
                                                            );
                                                        }} ></TextField>
                                                    <Button variant="itms" type={'submit'} >save</Button>
                                                </form>
                                            </Grid>
                                        </Grid>
                                    </Dialogbox>
                                </Grid>
                            </Grid>
                            {/* row 3 wednesday*/}<Divider orientation="horizontal" />
                            <Grid container>
                                <Grid item md={3}>
                                    <Typography>Wednesday</Typography><TextField type="date" varient="outlined" onChange={(event) => setReportDate(event.target.value)} ></TextField>
                                </Grid>
                                <Grid item md={6}>
                                    <Typography style={{ wordWrap: 'break-word' }}>{wednesdayvalues.wednesdayReportData}</Typography>
                                </Grid>
                                <Grid item md={2}><Typography>Verification</Typography></Grid>
                                <Grid item md={1}>
                                    <Dialogbox title="wednesday report" btn_name="Edit">
                                        {/* <Dialogbox title="Update Administrator" btn_name="update" handleSubmit={handleSubmit} setMondayValues={setMondayValues} mondayvalues={mondayvalues}> */}
                                        <Grid container>
                                            <Grid item md={6}>
                                                <form onSubmit={handleWednesdaySubmit}>
                                                    <TextField
                                                        multiline
                                                        defaultValue={wednesdayvalues.wednesdayReportData}
                                                        onChange={(e) => {
                                                            setWednesdayValues(
                                                                {
                                                                    ...wednesdayvalues,
                                                                    wednesdayReportData: e.target.value
                                                                }
                                                            );
                                                        }}></TextField>
                                                    <Button variant="itms" type={'submit'}  >save</Button>
                                                </form>
                                            </Grid>
                                        </Grid>
                                    </Dialogbox>
                                </Grid>
                            </Grid>
                            {/* row 4  thursday*/}<Divider orientation="horizontal" />
                            <Grid container>
                                <Grid item md={3}>
                                    <Typography>Thursday</Typography><TextField type="date" varient="outlined" onChange={(event) => setReportDate(event.target.value)}></TextField>
                                </Grid>
                                <Grid item md={6}>
                                    <Typography style={{ wordWrap: 'break-word' }} >{thursdayvalues.thursdayReportData}</Typography>
                                </Grid>
                                <Grid item md={2}><Typography>Verification</Typography></Grid>
                                <Grid item md={1}>
                                    <Dialogbox title="Thursday report" btn_name="Edit">
                                        {/* <Dialogbox title="Update Administrator" btn_name="update" handleSubmit={handleSubmit} setMondayValues={setMondayValues} mondayvalues={mondayvalues}> */}
                                        <Grid container>
                                            <Grid item md={6}>
                                                <form onSubmit={handleThursdaySubmit}>
                                                    <TextField
                                                        multiline
                                                        defaultValue={thursdayvalues.thursdayReportData}
                                                        onChange={(e) => {
                                                            setThursdayValues(
                                                                {
                                                                    ...thursdayvalues,
                                                                    thursdayReportData: e.target.value
                                                                }
                                                            );
                                                        }} ></TextField>
                                                    <Button variant="itms" type={'submit'} >save</Button>
                                                </form>
                                            </Grid>
                                        </Grid>
                                    </Dialogbox>
                                </Grid>
                            </Grid>
                            {/* row 5 friday */}<Divider orientation="horizontal" />
                            <Grid container>
                                <Grid item md={3}>
                                    <Typography>Friday</Typography><TextField type="date" varient="outlined" onChange={(event) => setReportDate(event.target.value)}></TextField>
                                </Grid>
                                <Grid item md={6}>
                                    <Typography style={{ wordWrap: 'break-word' }}>{fridayvalues.fridayReportData}</Typography>
                                </Grid>
                                <Grid item md={2}><Typography>Verification</Typography></Grid>
                                <Grid item md={1}>
                                    <Dialogbox title="Friday report" btn_name="Edit">
                                        {/* <Dialogbox title="Update Administrator" btn_name="update" handleSubmit={handleSubmit} setMondayValues={setMondayValues} mondayvalues={mondayvalues}> */}
                                        <Grid container>
                                            <Grid item md={6}>
                                                <form onSubmit={handleFridaySubmit}>
                                                    <TextField
                                                        multiline
                                                        defaultValue={fridayvalues.fridayReportData}
                                                        onChange={(e) => {
                                                            setFridayValues(
                                                                {
                                                                    ...fridayvalues,
                                                                    fridayReportData: e.target.value
                                                                }
                                                            );
                                                        }}  ></TextField>
                                                    <Button variant="itms" type={'submit'} >save</Button>
                                                </form>
                                            </Grid>
                                        </Grid>
                                    </Dialogbox>
                                </Grid>
                            </Grid>
                            {/* row 6 saturday*/}<Divider orientation="horizontal" />
                            <Grid container>
                                <Grid item md={3}>
                                    <Typography>Saturday</Typography><TextField type="date" varient="outlined" onChange={(event) => setReportDate(event.target.value)} ></TextField>
                                </Grid>
                                <Grid item md={6}>
                                    <Typography style={{ wordWrap: 'break-word' }} >{saturdayvalues.saturdayReportData}</Typography>
                                </Grid>
                                <Grid item md={2}><Typography>Verification</Typography></Grid>
                                <Grid item md={1}>
                                    <Dialogbox title="Saturday report" btn_name="Edit">
                                        {/* <Dialogbox title="Update Administrator" btn_name="update" handleSubmit={handleSubmit} setMondayValues={setMondayValues} mondayvalues={mondayvalues}> */}
                                        <Grid container>
                                            <Grid item md={6}>
                                                <form onSubmit={handleSaturdaySubmit}>
                                                    <TextField
                                                        multiline
                                                        defaultValue={saturdayvalues.saturdayReportData}
                                                        onChange={(e) => {
                                                            setSaturdayValues(
                                                                {
                                                                    ...saturdayvalues,
                                                                    saturdayReportData: e.target.value
                                                                }
                                                            );
                                                        }}></TextField>
                                                    <Button variant="itms" type={'submit'} >save</Button>
                                                </form>
                                            </Grid>
                                        </Grid>
                                    </Dialogbox>
                                </Grid>
                            </Grid>
                            {/* row 7 sunday */}<Divider orientation="horizontal" />
                            <Grid container>
                                <Grid item md={3}>
                                    <Typography>Sunday</Typography><TextField type="date" varient="outlined" onChange={(event) => setReportDate(event.target.value)}></TextField>
                                </Grid>
                                <Grid item md={6}>
                                    <Typography style={{ wordWrap: 'break-word' }}>{sundayvalues.sundayReportData}</Typography>
                                </Grid>
                                <Grid item md={2}><Typography>Verification</Typography></Grid>
                                <Grid item md={1}>
                                    <Dialogbox title="Sunday report" btn_name="Edit">
                                        {/* <Dialogbox title="Update Administrator" btn_name="update" handleSubmit={handleSubmit} setMondayValues={setMondayValues} mondayvalues={mondayvalues}> */}
                                        <Grid container>
                                            <Grid item md={6}>
                                                <form onSubmit={handleSundaySubmit}>
                                                    <TextField
                                                        multiline
                                                        defaultValue={sundayvalues.sundayReportData}
                                                        onChange={(e) => {
                                                            setSundayValues(
                                                                {
                                                                    ...sundayvalues,
                                                                    sundayReportData: e.target.value
                                                                }
                                                            );
                                                        }} ></TextField>
                                                    <Button variant="itms" type={'submit'} >save</Button>
                                                </form>
                                            </Grid>
                                        </Grid>
                                    </Dialogbox>
                                </Grid>
                            </Grid>
                            <Divider orientation="horizontal" />

                        </Grid>
                    </Grid>
                    {/* </Stack> */}



                    <Divider orientation="horizontal" />
                    <Stack>
                        <Stack direction={'column'} spacing={2}>
                            <Typography fontWeight={'bold'}>Problems encountered and solutions found</Typography>
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Multiline"
                                multiline
                                maxRows={6}
                            />
                            <Button variant="itms" type="submit"  > Submit report</Button>

                        </Stack>
                    </Stack>
                </Stack>
            </form>
        </Tile >

    )
} 
