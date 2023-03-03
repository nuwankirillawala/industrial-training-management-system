import React, { useState } from 'react'
import { Layout } from '../../components/Layout/Layout'
import { Tile } from '../../components/card/Tile'
import { Grid, Box, Typography} from '@mui/material'
import { Table, TableBody, TableCell, TableHead, TableRow, TableContainer } from '@mui/material'
import { StudentCompanyStatus } from '../../components/user/Undergraduate/PageComponent/StudentCompanyStatus'
import { StudentAddCompany } from '../../components/user/Undergraduate/StudentAddCompany'
import { StudentInternPeriod } from '../../components/user/Undergraduate/PageComponent/StudentInternPeriod'
import { StudentCompanyChoice } from '../../components/user/Undergraduate/PageComponent/StudentCompanyChoice'
import { Formik } from 'formik'


export const StudentCompnay = () => {

    const[page,setPage] = useState({no: 1})

  return (
    <Layout>
            <Grid container spacing={1}>
                <Grid item md={7}>

                    <Grid container spacing={1}>

{/* company selection  */}
                        <Grid item md={12}>
                            <StudentCompanyChoice />
                        </Grid>

{/* company status, add company, inter time period component add dinamikally */}
                        <Grid item md={12}>

                        <Formik
                            // validationSchema={studentSchema}
                        >
                        {({})=>(
                            <Box>
                            {page.no === 1 && (
                                <StudentCompanyStatus pageNo={page} setPage={setPage}
                                    // values={values}
                                    // errors={errors}
                                    // touched={touched}
                                    // handleBlur={handleBlur}
                                    // handleChange={handleChange}
                                />
                               
                            )}
                            {page.no === 2 && (
                                <StudentAddCompany pageNo={page} setPage={setPage}
                                    // values={values}
                                    // errors={errors}
                                    // touched={touched}
                                    // handleBlur={handleBlur}
                                    // handleChange={handleChange}
                                />
                            )}
                            {page.no === 3 && (
                                <Student    InternPeriod pageNo={page} setPage={setPage}
                                    // values={values}
                                    // errors={errors}
                                    // touched={touched}
                                    // handleBlur={handleBlur}
                                    // handleChange={handleChange}
                                />
                            )}
                        </Box>
                        )}
                        </Formik>
                        </Grid>
                        
                    </Grid>
                </Grid>


                <Grid item md={5}>
                <Tile height={'90vh'}>
                    <Grid container>
                        <Grid item md={12}>

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


                        </Grid>
                    </Grid>
                </Tile>
                </Grid>

            </Grid>
    </Layout>
    
  )
}
