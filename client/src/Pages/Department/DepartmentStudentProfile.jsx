import React from 'react'
import { Stack, Grid, Box, Typography, Select, Button, Table, TableContainer, TableHead, TableBody, TableRow, TableCell } from '@mui/material'
import { Tile } from '../../components/card/Tile'
import { DepartmentShowStudentProfile } from '../../components/user/Department/DepartmentShowStudentProfile'
import { ShowStudentResults } from '../../components/user/Shared/ShowStudentResult/ShowStudentResults'

export const DepartmentStudentProfile = () => {
  return (
    <Grid container spacing={1}>
        <Grid item md={3}>
            <Tile>
                <Stack spacing={3} height={'83vh'} direction={'column'}>
                    <Stack alignItems={'center'}>
                        <Typography variant='h6' fontWeight={'bold'}>Student list</Typography>
                    </Stack>
                    <Stack direction={'row'} spacing={1}>
                        <Typography variant='body' fontWeight={'bold'}>Student Number</Typography>
                        <Select 
                            size='small'
                            fullWidth
                            ></Select>
                    </Stack>
                        <TableContainer>
                            <Table stickyHeader size='small'>
                                <TableHead>
                                    <TableRow>
                                        <TableCell><b>Reg. No</b></TableCell>
                                        <TableCell><b>Name</b></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>SC/2019/11121</TableCell>
                                        <TableCell>G.M.Sooriyaarachchi</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                </Stack>
            </Tile>
        </Grid>

        <Grid item md={9}>
            <Tile>
                <Stack direction={'column'} spacing={1}>
                    <Stack flex={1}>
                        <DepartmentShowStudentProfile/>
                    </Stack>

                    <Stack alignItems={'center'} flex={1}>
                        <ShowStudentResults />
                    </Stack>
                </Stack>
            </Tile>
        </Grid>
    </Grid>
  )
}
