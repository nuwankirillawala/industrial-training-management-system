import React, { useState } from 'react'
import { Typography, Grid, Button } from '@mui/material'
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material'
import { FormControl, Select, MenuItem } from '@mui/material'
import { Tile } from '../../card/Tile'

const StdcompanyState = {
    comapnyName : '',
    interviewed : '',
    select : ''
}

export const StudentCompanyStatus = ({pageNo,setPage}) => {

    const[state,setState] = useState(StdcompanyState)

  return (
    <Tile>

        <Grid container>
            {/* university intern status */}
            <Grid item md={12}>
                <Grid container>

                    <Grid item md={12}>
                        <Typography variant='body1' fontWeight='bold'>Update Your Internship Status</Typography>
                    </Grid>

                    <Grid item md={12}>
                        <TableContainer sx={{ maxHeight: '24vh' }}>
                            <Table size='small'>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Company</TableCell>
                                        <TableCell>Interview</TableCell>
                                        <TableCell>Selected or Not</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>WSO2</TableCell>
                                        <TableCell>
                                            <FormControl variant="standard" fullWidth size='small'>
                                                <Select style={{ height: '30px' }}>
                                                    <MenuItem value={''}>None</MenuItem>
                                                    <MenuItem value={'called'}>Called</MenuItem>
                                                    <MenuItem value={'notCalled'}>Not Called</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </TableCell>
                                        <TableCell>
                                            <FormControl variant="standard" fullWidth size='small'>
                                                <Select style={{ height: '30px' }}>
                                                    <MenuItem value={''}>None</MenuItem>
                                                    <MenuItem value={'selected'}>Selected</MenuItem>
                                                    <MenuItem value={'notSelected'}>Not Selected</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell>WSO2</TableCell>
                                        <TableCell>
                                            <FormControl variant="standard" fullWidth size='small'>
                                                <Select style={{ height: '30px' }}>
                                                    <MenuItem value={''}>None</MenuItem>
                                                    <MenuItem value={'called'}>Called</MenuItem>
                                                    <MenuItem value={'notCalled'}>Not Called</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </TableCell>
                                        <TableCell>
                                            <FormControl variant="standard" fullWidth size='small'>
                                                <Select style={{ height: '30px' }}>
                                                    <MenuItem value={''}>None</MenuItem>
                                                    <MenuItem value={'selected'}>Selected</MenuItem>
                                                    <MenuItem value={'notSelected'}>Not Selected</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell>WSO2</TableCell>
                                        <TableCell>
                                            <FormControl variant="standard" fullWidth size='small'>
                                                <Select style={{ height: '30px' }}>
                                                    <MenuItem value={''}>None</MenuItem>
                                                    <MenuItem value={'called'}>Called</MenuItem>
                                                    <MenuItem value={'notCalled'}>Not Called</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </TableCell>
                                        <TableCell>
                                            <FormControl variant="standard" fullWidth size='small'>
                                                <Select style={{ height: '30px' }}>
                                                    <MenuItem value={''}>None</MenuItem>
                                                    <MenuItem value={'selected'}>Selected</MenuItem>
                                                    <MenuItem value={'notSelected'}>Not Selected</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </TableCell>
                                    </TableRow>

                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>

                    <Grid item md={12}>
                        <Grid container justifyContent='flex-end'>
                            <Grid item>
                                <Button variant='itms' size='itms-small'>save</Button>
                            </Grid>
                        </Grid>                        
                    </Grid>
                </Grid>
            </Grid>
            {/* private intern status */}
            <Grid item md={12}>
                <Grid container>

                    <Grid item md={12}>
                        <Typography variant='body1' fontWeight='bold'>Update Your Private Internship Status</Typography>
                    </Grid>

                    <Grid item md={12}>
                        <TableContainer>
                            <Table size='small'>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Company</TableCell>
                                        <TableCell>Interview</TableCell>
                                        <TableCell>Selected or Not</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>WSO2</TableCell>
                                        <TableCell>
                                            <FormControl variant="standard" fullWidth size='small'>
                                                <Select style={{ height: '30px' }}>
                                                    <MenuItem value={''}>None</MenuItem>
                                                    <MenuItem value={'called'}>Called</MenuItem>
                                                    <MenuItem value={'notCalled'}>Not Called</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </TableCell>
                                        <TableCell>
                                            <FormControl variant="standard" fullWidth size='small'>
                                                <Select style={{ height: '30px' }}>
                                                    <MenuItem value={''}>None</MenuItem>
                                                    <MenuItem value={'selected'}>Selected</MenuItem>
                                                    <MenuItem value={'notSelected'}>Not Selected</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>

                    <Grid item md={12}>
                        <Grid container justifyContent='flex-end'>
                            <Grid item>
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
                            </Grid>
                            <Grid item>
                                <Button variant='itms' size='itms-small'>save</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

        </Grid>




    </Tile>
  )
}
