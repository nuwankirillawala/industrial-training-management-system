import React, { useState } from 'react'
import { Layout } from '../../../Layout/Layout'
import { Tile } from '../../../card/Tile'
import { Grid, Box, Stack, Typography, TextField } from '@mui/material'

const Choice = {
    company : '', jobRole : ''
}

const CompanyChoice = {
    firstChoice: Choice,
    secondChoice: Choice,
    thirdChoice : Choice

}

export const StdCompnay = () => {

    const[company,setCompany] = useState({CompanyChoice})
    const[choice,setChoice] = useState({Choice})
    const[choice2,setChoice2] = useState({Choice})
    const[choice3,setChoice3] = useState({Choice})


  return (
    <Layout>
        <Box sx={{display:'flex'}} padding={'0px 10px 0px 0px'}>
            <Grid container spacing={1}>
                <Grid item md={7}>
                    <Grid container spacing={1}>
                        <Grid item md={12}>
                            <Tile>
                                <Typography variant='body1' fontWeight={'bold'}>Company Selection</Typography>
                                <Typography variant='body2'>Select 3 companies you wish to apply Internship</Typography><br />
                                <Stack direction={'row'} justifyContent={'space-evenly'}>
                                <Stack direction={'column'} spacing={3.5}>

                                    {['First Choice','Second Choice','Third Choice'].map((text, index)=>(
                                        <Typography variant='body1' fontWeight={'bold'}
                                        >{text}</Typography>
                                    ))}
                                </Stack>
                                <Stack direction={'column'} spacing={1}>

                                    {['firstChoice','secondChoice','thirdChoice'].map((text, index)=>(
                                        <TextField
                                            variant='outlined'
                                            onChange={(e)=>set({...CompanyChoice,[{text}.Company]:e.target.value})}
                                            key={text}
                                            size='small'
                                        ></TextField>
                                    ))}
                                </Stack>
                                <Stack direction={'column'} spacing={1}>

                                    {['firstChoice','secondChoice','thirdChoice'].map((text, index)=>(
                                        <TextField
                                            variant='outlined'
                                            onChange={(e)=>set({...CompanyChoice,[{text}.Company]:e.target.value})}
                                            key={text}
                                            size='small'
                                        ></TextField>
                                    ))}
                                </Stack>
                                </Stack>
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
