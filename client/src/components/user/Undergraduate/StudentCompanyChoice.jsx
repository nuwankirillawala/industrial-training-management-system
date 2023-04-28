import React from 'react'
import { Tile } from '../../card/Tile'
import { Grid, Typography, FormControl, InputLabel, Select, MenuItem, Button, Stack, Box } from '@mui/material'
import { useState } from 'react'
import { Formik } from 'formik'

const CompanyChoice = {
    firstCompany : '',
    firstRoll : '',
    secondCompany : '',
    secondRoll : '',
    thirdCompany : '',
    thirdRoll : ''
}

export const StudentCompanyChoice = () => {

    const[choice,setChoice] = useState(CompanyChoice);

    const handleOnSubmit = async (values) => {
        console.log(values);
        await new Promise((r) => setTimeout(r, 500));
        alert(JSON.stringify(values, null, 2));
    }

  return (
    <Tile>
        <Grid container spacing={3}>
            <Grid item md={12}>
                <Typography variant='h6' fontWeight={'bold'}>Company Selection</Typography>
                <Typography variant='body1'>Select 3 companies you wish to apply Internship</Typography>
            </Grid>

            <Grid item md={12}>
                <Formik
                    initialValues={CompanyChoice}
                    onSubmit={handleOnSubmit}
                >
                    {({
                        values,
                        handleChange,
                        handleSubmit,
                        handleReset
                    })=>(

                            <form onSubmit={handleSubmit}>
                                <Stack direction={'column'} spacing={1}>
                                    <Stack direction={'row'} spacing={2}>                                   
                                        <Stack flex={2}>
                                            <Typography variant='body1'>First Choice</Typography>
                                        </Stack>
                                        <Stack flex={3}>
                                            <FormControl 
                                                fullWidth
                                                size='small'
                                            >
                                                <InputLabel>Company</InputLabel>
                                                    <Select 
                                                        variant="outlined"
                                                        labelId="firstCompany"
                                                        id="firstCompany"
                                                        name="firstCompany"
                                                        value={values.firstCompany}
                                                        onChange={handleChange}
                                                        label="Company"
                                                    >
                                                        <MenuItem value="none"><em>None</em></MenuItem>
                                                        <MenuItem value='wso2'>WSO2</MenuItem>
                                                        <MenuItem value='99x'>99X</MenuItem>
                                                        <MenuItem value='creative'>Ceative</MenuItem>
                                                    </Select>
                                            </FormControl>
                                        </Stack>
                                        <Stack flex={3}>
                                            <FormControl 
                                                fullWidth 
                                                size='small'
                                            >
                                                <InputLabel>Job Role</InputLabel>
                                                <Select 
                                                    variant="outlined"
                                                    labelId="firstRoll"
                                                    id="firstRoll"
                                                    name="firstRoll"
                                                    value={values.firstRoll}
                                                    onChange={handleChange}
                                                    label="Job Role">
                                                    <MenuItem value="none"><em>None</em></MenuItem>
                                                    <MenuItem value={'se'}>Software eng</MenuItem>
                                                    <MenuItem value={'ba'}>Business Aanlyst</MenuItem>
                                                    <MenuItem value={'qa'}>Quality Achueance</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Stack>
                                    </Stack>

                                    <Stack direction={'row'} spacing={2}>                                    
                                        <Stack flex={2}>
                                            <Typography variant='body1'>Second Choice</Typography>
                                        </Stack>
                                        <Stack flex={3}>
                                            <FormControl fullWidth size='small'>
                                                <InputLabel>Company</InputLabel>
                                                <Select 
                                                    variant="outlined"
                                                    labelId="secondCompany"
                                                    id="secondCompany"
                                                    name="secondCompany"
                                                    value={values.secondCompany}
                                                    onChange={handleChange}
                                                    label="Job Role">
                                                    <MenuItem value="none"><em>None</em></MenuItem>
                                                    <MenuItem value={'wso2'}>WSO2</MenuItem>
                                                    <MenuItem value={'99x'}>99X</MenuItem>
                                                    <MenuItem value={'creative'}>Ceative</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Stack>
                                        <Stack flex={3}>
                                            <FormControl fullWidth size='small'>
                                                <InputLabel>Job Role</InputLabel>
                                                <Select 
                                                    variant="outlined"
                                                    labelId="secondRoll"
                                                    id="secondRoll"
                                                    name="secondRoll"
                                                    value={values.secondRoll}
                                                    onChange={handleChange}
                                                    label="Job Role">
                                                    <MenuItem value="none"><em>None</em></MenuItem>
                                                    <MenuItem value={'se'}>Software eng</MenuItem>
                                                    <MenuItem value={'ba'}>Business Aanlyst</MenuItem>
                                                    <MenuItem value={'qa'}>Quality Achueance</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Stack>
                                    </Stack>
                                        
                                    <Stack direction={'row'} spacing={2}>                                    
                                        <Stack flex={2}>
                                            <Typography variant='body1'>Third Choice</Typography>
                                        </Stack>
                                        <Stack flex={3}>
                                            <FormControl fullWidth size='small'>
                                                <InputLabel>Company</InputLabel>
                                                <Select 
                                                    variant="outlined"
                                                    labelId="firstRoll"
                                                    id="thirdCompany"
                                                    name="thirdCompany"
                                                    value={values.thirdCompany}
                                                    onChange={handleChange}
                                                    label="Comapny">
                                                    <MenuItem value="none"><em>None</em></MenuItem>
                                                    <MenuItem value={'wso2'}>WSO2</MenuItem>
                                                    <MenuItem value={'99x'}>99X</MenuItem>
                                                    <MenuItem value={'creative'}>Ceative</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Stack>
                                        <Stack flex={3}>
                                            <FormControl fullWidth size='small'>
                                                <InputLabel>Job Role</InputLabel>
                                                <Select 
                                                    variant="outlined"
                                                    labelId="thirdRoll"
                                                    id="thirdRoll"
                                                    name="thirdRoll"
                                                    value={values.thirdRoll}
                                                    onChange={handleChange}
                                                    label="Job Role">
                                                    <MenuItem value="none"><em>None</em></MenuItem>
                                                    <MenuItem value={'se'}>Software eng</MenuItem>
                                                    <MenuItem value={'ba'}>Business Aanlyst</MenuItem>
                                                    <MenuItem value={'qa'}>Quality Achueance</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Stack>
                                    </Stack>

                                    <Stack alignItems='flex-end'>
                                        <Stack direction={'row'}>
                                            <Button variant='itms' size='itms-small' onClick={handleReset}>cancel</Button>
                                            <Button variant='itms' size='itms-small' type='submit'>Save</Button>
                                        </Stack>
                                    </Stack>

                                </Stack>
                            </form>
                    )}

                </Formik>
            </Grid>

        </Grid>
    </Tile>
  )
}
