import React from 'react'
import { Grid, TextField, Stack, Typography, Table, TableHead, TableBody, TableCell, TableRow } from "@mui/material"
import { useState, useEffect } from "react"
import { Button } from "@mui/material"
import { Tile } from '../card/Tile'
import { DataGrid } from '@mui/x-data-grid'
import { Divider } from '@mui/material'
import Dialogbox from '../Dialogbox/Dialogbox'


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
    const [problemsEncountered, setProblemsEncountered] = useState('');
    const [weekNo, setWeekNo] = useState('');
    const [DayNo, setDayNo] = useState('');

    const handleMondaySubmit = (event) => {
        event.preventDefault();
        console.log(weekNo, DayNo, mondayvalues);
    }
    const handleTuesdaySubmit = (event) => {
        event.preventDefault();
        console.log(weekNo, DayNo, tuesdayvalues);
    }
    const handleWednesdaySubmit = (event) => {
        event.preventDefault();
        console.log(weekNo, DayNo, wednesdayvalues);
    }
    const handleThursdaySubmit = (event) => {
        event.preventDefault();
        console.log(weekNo, DayNo, thursdayvalues);
    }
    const handleFridaySubmit = (event) => {
        event.preventDefault();
        console.log(weekNo, DayNo, fridayvalues);
    }
    const handleSaturdaySubmit = (event) => {
        event.preventDefault();
        console.log(weekNo, DayNo, saturdayvalues);
    }
    const handleSundaySubmit = (event) => {
        event.preventDefault();
        console.log(weekNo, DayNo, sundayvalues);
    }
    const fullPageSubmit = (event) => {
        event.preventDefault();
        console.log(mondayvalues, tuesdayvalues, wednesdayvalues, thursdayvalues, fridayvalues, saturdayvalues, sundayvalues, problemsEncountered, weekNo);

    }
    //if u save or submit, it need to send data to backend but if u submit deactivate the edit button.

    const getDailyReportData = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/v1/undergraduate/daily-report/${weekNo}`, { withCredentials: true });
            console.log(res);
            if (res.status === 200) {
                console.log(res.data.report);
                setMondayValues(res.data.report);
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Tile width={'1000px'}>

            {/* <form onSubmit={onSubmit}> */}
            <form >
                <Typography align="center" variant="h6" fontWeight="bold" paddingBottom={'20px'} color="#536dfe"> Daily Report</Typography>
                <Divider orientation="horizontal" />
                <Stack direction={'column'} spacing={5} justifyContent={'center'} padding="8px">
                    <Stack direction="row" spacing={10} >  {/* justifyContent={'space-between'} */}
                        <Typography onChange={(event) => setWeekNo(event.target.value)}>Week No :</Typography><TextField type="number" varient="outlined" InputProps={{ inputProps: { min: 1, step: 1 } }}></TextField>
                        <Button size="itms-small" variant='itms' type={'submit'} onClick={getDailyReportData()}>Load Data</Button>
                    </Stack>

                    <Divider orientation="horizontal" />
                    <Typography fontWeight="bold"> Enter Daily report updates here </Typography>
                    {/* <Stack direction={'row'} spacing={2} justifyContent={'space-between'}> */}
                    <Grid container justifyContent={'center'}>
                        <Grid item md={11}>
                            {/* row headers */}
                            <Grid container padding={2}>
                                <Grid item md={1.5}>
                                    <Typography fontWeight={"bold"}>Day</Typography>
                                </Grid>
                                <Grid item md={2.5}>
                                    <Typography fontWeight={"bold"}>Date</Typography>
                                </Grid>
                                <Grid item md={5}>
                                    <Typography fontWeight={"bold"}>Brief Description </Typography>
                                </Grid>
                                <Grid item md={2}><Typography fontWeight={"bold"}>Verification</Typography></Grid>
                                <Grid item md={1}>
                                </Grid>
                            </Grid>

                            {/* row 1 monday*/}<Divider orientation="horizontal" />
                            <Grid container>
                                <Grid item md={1.5}>
                                    <Typography>Monday</Typography>
                                </Grid>
                                <Grid item md={2.5}>
                                    <TextField varient="outlined"  ></TextField>
                                </Grid>
                                <Grid item md={5}>
                                    <Typography style={{ wordWrap: 'break-word' }} >{mondayvalues.mondayReportData}</Typography>
                                </Grid>
                                <Grid item md={2}><Typography>Pending</Typography></Grid>
                                <Grid item md={1}>
                                    <Dialogbox title="Monday report" btn_name="Edit">
                                        {/* <Dialogbox title="Update Administrator" btn_name="update" handleSubmit={handleSubmit} setMondayValues={setMondayValues} mondayvalues={mondayvalues}> */}
                                        <Grid container>
                                            <Grid item md={6}>
                                                <form onSubmit={() => { setDayNo('1'), handleMondaySubmit }}>
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
                                <Grid item md={1.5}>
                                    <Typography>Tuesday</Typography>
                                </Grid>
                                <Grid item md={2.5}>
                                    <TextField varient="outlined" ></TextField>
                                </Grid>
                                <Grid item md={5}>
                                    <Typography style={{ wordWrap: 'break-word' }}>{tuesdayvalues.tuesdayReportData}</Typography>
                                </Grid>
                                <Grid item md={2}><Typography>Pending</Typography></Grid>
                                <Grid item md={1}>
                                    <Dialogbox title="Tuesday report" btn_name="Edit" >
                                        {/* <Dialogbox title="Update Administrator" btn_name="update" handleSubmit={handleSubmit} setMondayValues={setMondayValues} mondayvalues={mondayvalues}> */}
                                        <Grid container>
                                            <Grid item md={6}>
                                                <form onSubmit={() => { setDayNo('2'), handleTuesdaySubmit }}>
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
                                <Grid item md={1.5}>
                                    <Typography>Wednesday</Typography>
                                </Grid>
                                <Grid item md={2.5}>
                                    <TextField varient="outlined"  ></TextField>
                                </Grid>
                                <Grid item md={5}>
                                    <Typography style={{ wordWrap: 'break-word' }}>{wednesdayvalues.wednesdayReportData}</Typography>
                                </Grid>
                                <Grid item md={2}><Typography>Pending</Typography></Grid>
                                <Grid item md={1}>
                                    <Dialogbox title="wednesday report" btn_name="Edit">
                                        {/* <Dialogbox title="Update Administrator" btn_name="update" handleSubmit={handleSubmit} setMondayValues={setMondayValues} mondayvalues={mondayvalues}> */}
                                        <Grid container>
                                            <Grid item md={6}>
                                                <form onSubmit={() => { setDayNo('3'), handleWednesdaySubmit }}>
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
                                <Grid item md={1.5}>
                                    <Typography>Thursday</Typography>
                                </Grid>
                                <Grid item md={2.5}>
                                    <TextField varient="outlined" ></TextField>
                                </Grid>
                                <Grid item md={5}>
                                    <Typography style={{ wordWrap: 'break-word' }} >{thursdayvalues.thursdayReportData}</Typography>
                                </Grid>
                                <Grid item md={2}><Typography>Pending</Typography></Grid>
                                <Grid item md={1}>
                                    <Dialogbox title="Thursday report" btn_name="Edit">
                                        {/* <Dialogbox title="Update Administrator" btn_name="update" handleSubmit={handleSubmit} setMondayValues={setMondayValues} mondayvalues={mondayvalues}> */}
                                        <Grid container>
                                            <Grid item md={6}>
                                                <form onSubmit={() => { setDayNo('4'), handleThursdaySubmit }}>
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
                                <Grid item md={1.5}>
                                    <Typography>Friday</Typography>
                                </Grid>
                                <Grid item md={2.5}>
                                    <TextField varient="outlined" ></TextField>
                                </Grid>
                                <Grid item md={5}>
                                    <Typography style={{ wordWrap: 'break-word' }}>{fridayvalues.fridayReportData}</Typography>
                                </Grid>
                                <Grid item md={2}><Typography>Pending</Typography></Grid>
                                <Grid item md={1}>
                                    <Dialogbox title="Friday report" btn_name="Edit">
                                        {/* <Dialogbox title="Update Administrator" btn_name="update" handleSubmit={handleSubmit} setMondayValues={setMondayValues} mondayvalues={mondayvalues}> */}
                                        <Grid container>
                                            <Grid item md={6}>
                                                <form onSubmit={() => { setDayNo('5'), handleFridaySubmit }}>
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
                                <Grid item md={1.5}>
                                    <Typography>Saturday</Typography>
                                </Grid>
                                <Grid item md={2.5}>
                                    <TextField varient="outlined"  ></TextField>
                                </Grid>
                                <Grid item md={5}>
                                    <Typography style={{ wordWrap: 'break-word' }} >{saturdayvalues.saturdayReportData}</Typography>
                                </Grid>
                                <Grid item md={2}><Typography>Pending</Typography></Grid>
                                <Grid item md={1}>
                                    <Dialogbox title="Saturday report" btn_name="Edit">
                                        {/* <Dialogbox title="Update Administrator" btn_name="update" handleSubmit={handleSubmit} setMondayValues={setMondayValues} mondayvalues={mondayvalues}> */}
                                        <Grid container>
                                            <Grid item md={6}>
                                                <form onSubmit={() => { setDayNo('6'), handleSaturdaySubmit }}>
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
                                <Grid item md={1.5}>
                                    <Typography>Sunday</Typography>
                                </Grid>
                                <Grid item md={2.5}>
                                    <TextField varient="outlined" ></TextField>
                                </Grid>
                                <Grid item md={5}>
                                    <Typography style={{ wordWrap: 'break-word' }}>{sundayvalues.sundayReportData}</Typography>
                                </Grid>
                                <Grid item md={2}><Typography>Pending</Typography></Grid>
                                <Grid item md={1}>
                                    <Dialogbox title="Sunday report" btn_name="Edit">
                                        {/* <Dialogbox title="Update Administrator" btn_name="update" handleSubmit={handleSubmit} setMondayValues={setMondayValues} mondayvalues={mondayvalues}> */}
                                        <Grid container>
                                            <Grid item md={6}>
                                                <form onSubmit={() => { setDayNo('7'), handleSundaySubmit }}>
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
                                onChange={(e) => {
                                    setProblemsEncountered(e.target.value);
                                }}
                            />
                            <Button variant="itms" type="submit" onSubmit={fullPageSubmit} > Submit report</Button>

                        </Stack>
                    </Stack>
                </Stack>
            </form>
        </Tile >

    )
} 
