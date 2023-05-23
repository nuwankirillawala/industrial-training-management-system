import React, { useState, useEffect } from 'react'
import { Tile } from '../../components/card/Tile'
import { Grid, Box, Typography, Stack, Divider} from '@mui/material'
import { DataGrid } from "@mui/x-data-grid";
import { StudentAddCompany } from '../../components/user/Undergraduate/StudentAddCompany'
import { StudentCompanyChoice } from '../../components/user/Undergraduate/StudentCompanyChoice'
import { StudentCompanyStatus } from '../../components/user/Undergraduate/StudentCompanyStatus'
import { StudentInternPeriod } from '../../components/user/Undergraduate/StudentInternPeriod'
import { StudentPrivateCompanyStatus } from '../../components/user/Undergraduate/StudentPrivateCompanyStatus'
import axios  from 'axios';


const StudentcompanyState = {
    companyName : '',
    status : ''
}

const companyDataColumns = [
    {
        field: "name",
        headerName: "Name",
        width: 150,
        editable: false,
    },
    {
        field: "rating",
        headerName: "Rating",
        width: 100,
        editable: false,
    },
    {
        field: "internSeats",
        headerName: "InternSeats",
        width: 120,
        editable: false,
    }
]


export const StudentCompany = () => {
    
    const[companyState,setCompanyState] = useState(StudentcompanyState)
    const[page,setPage] = useState({no: 1})
    const [companyList , setCompanyList] = useState([]);

    //fetch data
    const getCompanyList = async() => {
        try {
          const res = await axios.get('http://localhost:5000/api/v1/company/intern-process-company-list',{withCredentials: true});
          if(res.data.status === 'success'){
            // console.log(res.data.data);
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

  return (

    <Grid container spacing={1}>
        <Grid item md={12}>
            <Typography variant='PageTitle'>Company</Typography>
        </Grid>

        <Grid item md={12}>
            <Box overflow={'scroll'} maxHeight='88vh'>
                <Grid container spacing={1}>
                    
                    <Grid item md={7}>

                        <Stack spacing={1}>

        {/* company selection  */}
                            <Stack>
                                <StudentCompanyChoice />
                            </Stack>

        {/* company status, add company, inter time period component add dinamikally */}
                            <Stack>
                                <Box>
                                    {page.no === 1 && (
                                        <StudentCompanyStatus
                                            pageNo={page}
                                            setPage={setPage}
                                            companyState={companyState}
                                            setCompanyState={setCompanyState}
                                            />
                                    
                                    )}
                                    {page.no === 2 && (
                                        <StudentAddCompany
                                            pageNo={page}
                                            setPage={setPage}
                                            />
                                    )}
                                    {page.no === 3 && (
                                        <StudentInternPeriod
                                            pageNo={page}
                                            setPage={setPage}
                                            />
                                    )}
                                    {page.no === 4 && (
                                        <StudentPrivateCompanyStatus
                                            pageNo={page}
                                            setPage={setPage}
                                            companyState={companyState}
                                            setCompanyState={setCompanyState}
                                            />
                                    )}
                                </Box>
                            </Stack>
                        </Stack>
                    </Grid>

                    <Grid item md={5}>
                        <Tile height={'82vh'}>
                            <Stack maxHeight={'75vh'} padding={2} spacing={1}>
                                            
                                <Typography variant='h6' fontWeight={'bold'}>Company Ranking List</Typography>
                                <Divider />
                                <DataGrid
                                rows={companyList.map((company, index) => {
                                    return { name: company.name, rating: company.rating, internSeats: company.internSeats, email: company.email};
                                })}
                                columns={companyDataColumns}
                                autoHeight={true}
                                getRowId={(rows) => rows.email}
                                />
                            </Stack>
                        </Tile>
                    </Grid>
                </Grid>
            </Box>
        </Grid>
</Grid>
    
  )
}
