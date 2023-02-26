import React, { useState } from 'react'
import { Layout } from '../../../Layout/Layout'
import { Tile } from '../../../card/Tile'
import { Grid, Box, Stack, Typography, TextField, FormControl, Select, InputLabel, MenuItem, Button } from '@mui/material'


const Choice = {
    company : '', jobRole : ''
}

const CompanyChoice = {
    firstChoice: Choice,
    secondChoice: Choice,
    thirdChoice : Choice

}

export const StdCompnay = () => {

    const[choice,setChoice] = useState(CompanyChoice)
    const[choice1,setChoice1] = useState(Choice)
    const[choice2,setChoice2] = useState(Choice)
    const[choice3,setChoice3] = useState(Choice)


  return (
    <Layout>
        <Box sx={{display:'flex'}} padding={'0px 10px 0px 0px'}>
            <Grid container spacing={1}>
                <Grid item md={7}>
                    <Grid container spacing={1}>
                        <Grid item md={12}>
                            <Tile>
                                <Typography fontSize={'1.25rem'} fontWeight={'bold'}>Company Selection</Typography>
                                <Typography fontSize={'1rem'}>Select 3 companies you wish to apply Internship</Typography><br />

                                <Grid container>
                                    <Grid item md={12}>
                                        <Grid container spacing={1}>

                                        {['First Choice','Second Choice','Third Choice'].map((text, index)=>(
                                        <Grid item md={12}>
                                        <Grid container columnSpacing={2}>
                                            
                                            <Grid item md={2.5}>
                                                <Typography fontSize={'1rem'}>
                                                    {text}
                                                </Typography>
                                            </Grid>

                                            <Grid item md={5}>
                                                <FormControl fullWidth size='small'>
                                                    <InputLabel> Company </InputLabel>
                                                    <Select value={Choice.company}>
                                                        <MenuItem value={'wso2'}>WSO2</MenuItem>
                                                        <MenuItem value={'99x'}>99X</MenuItem>
                                                        <MenuItem value={'creative'}>Ceative</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>

                                            <Grid item md={4}>
                                                <FormControl fullWidth size='small'>
                                                    <InputLabel>Job Role</InputLabel>
                                                    <Select value={Choice.jobRole}>
                                                        <MenuItem value={'se'}>Software eng</MenuItem>
                                                        <MenuItem value={'ba'}>Business Aanlyst</MenuItem>
                                                        <MenuItem value={'qa'}>Quality Achueance</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>

                                        </Grid>
                                        </Grid>
                                        ))}

                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid><Button variant='itms'>Save</Button></Grid>
                            </Tile>
                        </Grid>
                        <Grid item md={12}><Tile></Tile></Grid>
                        <Grid item md={12}><Tile></Tile></Grid>
                    </Grid>
                </Grid>

                <Grid item md={5}>
                    <Grid container>
                        <Grid item md={12}>
                            <Tile height={'90vh'}>
                                <Typography variant='body1' fontWeight={'bold'}>company ranking list</Typography>
                            </Tile>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    </Layout>
    
  )
}
