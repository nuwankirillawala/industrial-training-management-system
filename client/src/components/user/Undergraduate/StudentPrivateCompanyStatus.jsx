import React, {useState, useEffect} from 'react'
import { Typography, Button, Grid, Select, MenuItem, Stack, Box } from '@mui/material'
import { Tile } from '../../card/Tile'
import { Formik } from 'formik'
import axios  from 'axios';

export const StudentPrivateCompanyStatus = ({pageNo,setPage,companyState,setCompanyState}) => {

    const [companyData , setCompanyData] = useState([]);

    //fetch data
    const getCompanyList = async() => {
        try {
          const res = await axios.get('http://localhost:5000/api/v1/company/intern-process-company-list');
          if(res.data.status === 'success'){
            // console.log(res.data.data);
            setCompanyData(res.data.data)
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
            // console.log(values);        
            try{
              const res = await axios.post(
                "http://localhost:5000/api/v1/undergraduate/edit-intern-status", 
                {   _id : values._id,
                    companyId : values.companyName,
                    newStatus : values.newStatus
                },
              {withCredentials: true}
              );
              if(res.status === 'success') {
                handleSnackBar("success");
                setMessage("User created successfullly");
                // alert('You data submited')
              } else {
                handleSnackBar("error");
                setMessage("User not created");
                // alert('fail to post')
              }
    
            } catch(error){
    c
            }
        };

  return (
    <Tile>
    <Grid container spacing={3}>

        <Grid item md={12}>
            <Typography variant='body1' fontWeight='bold'>Update Your Private Internship Status</Typography>
        </Grid>

        <Grid item md={12}>

            <Formik
                initialValues={companyState}
                onSubmit={handleOnSubmit}
            >
                {({
                    values,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                })=>(
                    <form onSubmit={handleSubmit}>
                        <Stack spacing={2}>
                            <Stack justifyContent={'center'}>
                                <Stack width={'80%'} direction={'column'} spacing={2}>

                                    <Stack direction={'row'}>
                                        <Stack alignItems={'center'} flex={1}>
                                            <Typography
                                                variant='body'
                                            >Company
                                            </Typography>
                                        </Stack>
                                        <Stack alignItems={'center'} flex={1}>
                                            <Typography
                                                variant='body'
                                            >Status
                                            </Typography>
                                        </Stack>
                                    </Stack>

                                    <Stack direction={'row'}>
                                        <Stack alignItems={'center'} flex={1}>
                                            <Stack width={'75%'}>
                                            {/* in here dispaly the company name */}
                                                <Select
                                                    size='small'
                                                    variant="outlined"
                                                    labelId="companyNameId"
                                                    id="companyName"
                                                    name="companyName"
                                                    value={values.companyName}
                                                    onChange={handleChange}
                                                    placeholder="company"
                                                    fullWidth
                                                >
                                                    <MenuItem value="none"><em>None</em></MenuItem>
                                                    {companyData.map((company)=>(
                                                        <MenuItem value={company._id}>{company.name}</MenuItem>
                                                    ))}

                                                </Select>
                                            </Stack>
                                        </Stack>
                                        <Stack alignItems={'center'} flex={1}>
                                            <Stack width={'75%'}>
                                                <Select
                                                    size='small'
                                                    variant="outlined"
                                                    labelId="statusId"
                                                    id="status"
                                                    name="status"
                                                    value={values.status}
                                                    onChange={handleChange}
                                                    placeholder="status"
                                                    fullWidth
                                                >
                                                    <MenuItem value="none"><em>None</em></MenuItem>
                                                    <MenuItem value={'selected'}>Selected</MenuItem>
                                                </Select>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </Stack>
                            
                            <Stack alignItems={'flex-end'}>
                                <Box>
                                    <Button
                                        variant='itms'
                                        size='itms-small'
                                        onClick={(prev) => {
                                                setPage(
                                                    {
                                                        ...prev,
                                                        no:1,
                                                    }
                                                );
                                        }}
                                    >cancel
                                    </Button>
                                    <Button
                                        variant='itms'
                                        size='itms-small'
                                        onClick={(prev) => {
                                                setPage(
                                                    {
                                                        ...prev,
                                                        no:2,
                                                    }
                                                );
                                        }}
                                    >Add Company
                                    </Button>

                                    <Button
                                        type='submit'
                                        variant='itms'
                                        size='itms-small'
                                        >save
                                    </Button>
                                </Box>
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
