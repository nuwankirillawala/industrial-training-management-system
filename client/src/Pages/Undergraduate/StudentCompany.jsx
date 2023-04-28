import React, { useState } from 'react'
import { Tile } from '../../components/card/Tile'
import { Grid, Box, Typography, Stack} from '@mui/material'
import { Table, TableBody, TableCell, TableHead, TableRow, TableContainer } from '@mui/material'

import { StudentAddCompany } from '../../components/user/Undergraduate/StudentAddCompany'
import { StudentCompanyChoice } from '../../components/user/Undergraduate/StudentCompanyChoice'
import { StudentCompanyStatus } from '../../components/user/Undergraduate/StudentCompanyStatus'
import { StudentInternPeriod } from '../../components/user/Undergraduate/StudentInternPeriod'
import { StudentPrivateCompanyStatus } from '../../components/user/Undergraduate/StudentPrivateCompanyStatus'


const StudentcompanyState = {
    companyName : '',
    status : ''
}

export const StudentCompany = () => {
    
    const[companyState,setCompanyState] = useState(StudentcompanyState)
    const[page,setPage] = useState({no: 1})

  return (
    <Box overflow={'scroll'} maxHeight='89vh'>
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
                <Tile height={'89vh'}>
                    <Box maxHeight={'89vh'}>
                                    
                        <Typography variant='h6' fontWeight={'bold'}>Company Ranking List</Typography>
                            
                        <TableContainer>
                            <Table size='small'>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align='left'>Company</TableCell>
                                        <TableCell align='right'>Job Role</TableCell>
                                        <TableCell align='right'>Rating</TableCell>
                                        <TableCell align='right'># UOR Graduates</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell align='left'>WSO2</TableCell>
                                        <TableCell align='right'>SE</TableCell>
                                        <TableCell align='right'>8.5</TableCell>
                                        <TableCell align='right'>10</TableCell>
                                    </TableRow>
                                    
                                    <TableRow>
                                        <TableCell align='left'>WSO2</TableCell>
                                        <TableCell align='right'>SE</TableCell>
                                        <TableCell align='right'>8.5</TableCell>
                                        <TableCell align='right'>10</TableCell>
                                    </TableRow>
                                    
                                    <TableRow>
                                        <TableCell align='left'>WSO2</TableCell>
                                        <TableCell align='right'>SE</TableCell>
                                        <TableCell align='right'>8.5</TableCell>
                                        <TableCell align='right'>10</TableCell>
                                    </TableRow>
                                    
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Tile>
            </Grid>
        </Grid>
    </Box>
    
  )
}
