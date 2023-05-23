import React, { useState } from 'react'
import { Typography, Grid, Button, Box, Stack } from '@mui/material'
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material'
import { FormControl, Select, MenuItem } from '@mui/material'
import { Tile } from '../../card/Tile'
import { Formik } from 'formik'

export const StudentCompanyStatus = ({companyState,setCompanyState}) => {

    const handleOnSubmit = async (values) => {
        console.log(values);
        await new Promise((r) => setTimeout(r, 500));
        alert(JSON.stringify(values, null, 2));
      };

  return (
    // <Tile>

        <Box>
            {/* university intern status */}
            <Formik
                initialValues={companyState}
                onSubmit={handleOnSubmit}
            >
                {({
                    values,
                    handleChange,
                    handleSubmit,
                    handleReset,
                })=>(
                    <form onSubmit={handleSubmit}>
                        <Stack direction={'column'} spacing={2}>
                            <Stack>
                                <Typography variant='h6' fontWeight='bold'>Update Your Internship Status</Typography>
                            </Stack>

                            <Stack alignItems={'center'}>
                                <Stack width={'80%'}>
                                    <TableContainer>
                                        <Table size='small'>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Company</TableCell>
                                                    <TableCell>Status</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell>
                                                        WSO2
                                                    </TableCell>
                                                    <TableCell>
                                                        <FormControl variant="standard" fullWidth size='small'>
                                                            <Select
                                                                size='small'
                                                                variant="outlined"
                                                                labelId="companyStatusId"
                                                                id="companyStatus"
                                                                name="companyStatus"
                                                                value={values.companyState}
                                                                onChange={handleChange}
                                                                placeholder="company"
                                                                fullWidth
                                                            >
                                                                <MenuItem value={''}>None</MenuItem>
                                                                <MenuItem value={'called'}>Called</MenuItem>
                                                                <MenuItem value={'notCalled'}>Not Called</MenuItem>
                                                                <MenuItem value={'selected'}>Selected</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>
                                                        WSO2
                                                    </TableCell>
                                                    <TableCell>
                                                        <FormControl variant="standard" fullWidth size='small'>
                                                            <Select
                                                                size='small'
                                                                variant="outlined"
                                                                labelId="companyStatusId"
                                                                id="companyStatus"
                                                                name="companyStatus"
                                                                value={values.companyState}
                                                                onChange={handleChange}
                                                                placeholder="company"
                                                                fullWidth
                                                            >
                                                                <MenuItem value={''}>None</MenuItem>
                                                                <MenuItem value={'called'}>Called</MenuItem>
                                                                <MenuItem value={'notCalled'}>Not Called</MenuItem>
                                                                <MenuItem value={'selected'}>Selected</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>
                                                        WSO2
                                                    </TableCell>
                                                    <TableCell>
                                                        <FormControl variant="standard" fullWidth size='small'>
                                                            <Select
                                                                size='small'
                                                                variant="outlined"
                                                                labelId="companyStatusId"
                                                                id="companyStatus"
                                                                name="companyStatus"
                                                                value={values.companyState}
                                                                onChange={handleChange}
                                                                placeholder="company"
                                                                fullWidth
                                                            >
                                                                <MenuItem value={''}>None</MenuItem>
                                                                <MenuItem value={'called'}>Called</MenuItem>
                                                                <MenuItem value={'notCalled'}>Not Called</MenuItem>
                                                                <MenuItem value={'selected'}>Selected</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Stack>
                            </Stack>

                            <Stack>
                                <Stack justifyContent='flex-end' direction={'row'}>
                                          
                                    <Stack>
                                        <Button
                                        variant='itms'
                                        size='itms-small'
                                        onClick={handleReset}
                                        >reset
                                        </Button>
                                    </Stack>
                                          
                                    <Stack>
                                        <Button variant='itms' size='itms-small' type='submit'>save</Button>
                                    </Stack>
                                          
                                </Stack>
                            </Stack>
                                              
                        </Stack>
                    </form>
                )}

            </Formik>
        </Box>




    // </Tile>
  )
}
