import React , {useState, useEffect} from 'react'
import { Tile } from '../../card/Tile'
import { Grid, Typography, FormControl, InputLabel, Select, MenuItem, Button, Stack, Box } from '@mui/material'
import { Formik } from 'formik'
import axios from 'axios'

const CompanyChoice = {
    firstCompany : '',
    firstRole : '',
    secondCompany : '',
    secondRole : '',
    thirdCompany : '',
    thirdRole : ''
}

export const StudentCompanyChoice = () => {

    const[choice,setChoice] = useState(CompanyChoice);
    const [companyList , setCompanyList] = useState([]);

        //fetch data
        const getCompanyList = async() => {
            try {
              const res = await axios.get('http://localhost:5000/api/v1/company/intern-process-company-list');
              if(res.data.status === 'success'){
                console.log(res.data.data);
                setCompanyList(res.data.data);
              }
            } catch (error) {
              console.log(error)
            }
          }
        
          useEffect(()=> {
            getCompanyList();
          }, [])
          //End of fetch data

    const handleOnSubmit = async (values) => {
        try{
            const res = await axios.patch('http://localhost:5000/api/v1/undergraduate/company-selection',
            {
                id : "640ac55788b5c24f7a66706b",
                company01 :values.firstCompany,
                jobRole01 :values.firstRole,
                company02 :values.secondCompany,
                jobRole02 :values.secondRole,
                company03 :values.thirdCompany,
                jobRole03 :values.thirdRole
            });
            console.log(res.status)
        }
        catch (error){
            console.log(error);
        }
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
                                                        {companyList.map((company)=>(
                                                            <MenuItem value={company._id}>{company.name}</MenuItem>
                                                        ))}
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
                                                    labelId="firstRole"
                                                    id="firstRole"
                                                    name="firstRole"
                                                    value={values.firstRole}
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
                                                    {companyList.map((company)=>(
                                                        <MenuItem value={company._id}>{company.name}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Stack>
                                        <Stack flex={3}>
                                            <FormControl fullWidth size='small'>
                                                <InputLabel>Job Role</InputLabel>
                                                <Select 
                                                    variant="outlined"
                                                    labelId="secondRole"
                                                    id="secondRole"
                                                    name="secondRole"
                                                    value={values.secondRole}
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
                                                    {companyList.map((company)=>(
                                                        <MenuItem value={company._id}>{company.name}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Stack>
                                        <Stack flex={3}>
                                            <FormControl fullWidth size='small'>
                                                <InputLabel>Job Role</InputLabel>
                                                <Select 
                                                    variant="outlined"
                                                    labelId="thirdRole"
                                                    id="thirdRole"
                                                    name="thirdRole"
                                                    value={values.thirdRole}
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
