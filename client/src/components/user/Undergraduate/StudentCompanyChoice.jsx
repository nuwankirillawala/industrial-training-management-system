import React from 'react'
import { Tile } from '../../../card/Tile'
import { Grid, Typography, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material'
import { useState } from 'react'

const CompanyChoice = {
    firstCompany : '',
    firstRoll : '',
    secondCompany : '',
    secondRoll : '',
    thirdCompany : '',
    thirddRoll : ''
}

export const StudentCompanyChoice = () => {

    const[choice,setChoice] = useState(CompanyChoice);

  return (
    <Tile>
        <Grid container spacing={1}>
            <Grid item md={12}>
                <Typography variant='h6' fontWeight={'bold'}>Company Selection</Typography>
                <Typography variant='body1'>Select 3 companies you wish to apply Internship</Typography>
            </Grid>

            <Grid item md={12}>
                <Grid container>

                    <Grid item md={12}>
                        <Grid container spacing={1}>

                            <Grid item md={12}>
                                <Grid container columnSpacing={2}>                                    
                                    <Grid item md={2.5}>
                                        <Typography variant='body1'>First Choice</Typography>
                                    </Grid>

                                    <Grid item md={5}>
                                    <FormControl fullWidth size='small'>
                                        <InputLabel>Company</InputLabel>
                                            <Select value={CompanyChoice.firstCompany}>
                                                <MenuItem value={'wso2'}>WSO2</MenuItem>
                                                <MenuItem value={'99x'}>99X</MenuItem>
                                                <MenuItem value={'creative'}>Ceative</MenuItem>
                                            </Select>
                                    </FormControl>
                                    </Grid>

                                    <Grid item md={4}>
                                        <FormControl fullWidth size='small'>
                                            <InputLabel>Job Role</InputLabel>
                                            <Select value={CompanyChoice.firstRoll}>
                                                <MenuItem value={'se'}>Software eng</MenuItem>
                                                <MenuItem value={'ba'}>Business Aanlyst</MenuItem>
                                                <MenuItem value={'qa'}>Quality Achueance</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>

                                </Grid>
                            </Grid>
                            <Grid item md={12}>
                                <Grid container columnSpacing={2}>                                    
                                    <Grid item md={2.5}>
                                        <Typography variant='body1'>Second Choice</Typography>
                                    </Grid>

                                    <Grid item md={5}>
                                        <FormControl fullWidth size='small'>
                                            <InputLabel>Company</InputLabel>
                                            <Select value={CompanyChoice.secondCompany}>
                                                <MenuItem value={'wso2'}>WSO2</MenuItem>
                                                <MenuItem value={'99x'}>99X</MenuItem>
                                                <MenuItem value={'creative'}>Ceative</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>

                                    <Grid item md={4}>
                                        <FormControl fullWidth size='small'>
                                            <InputLabel>Job Role</InputLabel>
                                            <Select value={CompanyChoice.secondRoll}>
                                                <MenuItem value={'se'}>Software eng</MenuItem>
                                                <MenuItem value={'ba'}>Business Aanlyst</MenuItem>
                                                <MenuItem value={'qa'}>Quality Achueance</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>

                                </Grid>
                            </Grid>
                            <Grid item md={12}>
                                <Grid container columnSpacing={2}>                                    
                                    <Grid item md={2.5}>
                                        <Typography variant='body1'>Third Choice</Typography>
                                    </Grid>

                                    <Grid item md={5}>
                                        <FormControl fullWidth size='small'>
                                            <InputLabel>Company</InputLabel>
                                            <Select value={CompanyChoice.thirdCompany}>
                                                <MenuItem value={'wso2'}>WSO2</MenuItem>
                                                <MenuItem value={'99x'}>99X</MenuItem>
                                                <MenuItem value={'creative'}>Ceative</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>

                                    <Grid item md={4}>
                                        <FormControl fullWidth size='small'>
                                            <InputLabel>Job Role</InputLabel>
                                            <Select value={CompanyChoice.thirdRoll}>
                                                <MenuItem value={'se'}>Software eng</MenuItem>
                                                <MenuItem value={'ba'}>Business Aanlyst</MenuItem>
                                                <MenuItem value={'qa'}>Quality Achueance</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>

                                </Grid>
                            </Grid>
                                    

                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item md={12}>
                <Grid container justifyContent={'flex-end'}>
                    <Grid item md={1}>
                    <Button variant='itms' size='items-small'>Save</Button>
                    </Grid>
                </Grid>
            </Grid>

        </Grid>
    </Tile>
  )
}
