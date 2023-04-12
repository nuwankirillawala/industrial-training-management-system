import { useState } from 'react'
import React from 'react'
import { Stack, Box, Typography, Button, Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Select, MenuItem } from '@mui/material'
import { Formik } from 'formik'

function resultsData(courseUnitName,courseUnitCode,courseUnitGrade) { 
    return {courseUnitName,
            courseUnitCode,
            courseUnitGrade}
}

const results = [
    resultsData('AMT112β','Mathematical Foundations of Computer Science','A'),
    resultsData('CSC1113','Programing Techniques','A-'),
    resultsData('CSC1122','Computer Systems I','C'),
    resultsData('CSC113α','Internet Services and Web Development','B+'),
    resultsData('CSC1142','System Analyst & Design','D+'),
    resultsData('CSC1153','Laboratory Assignments','B+'),
    resultsData('MAT112δ','Differential Equation','A'),
    resultsData('MAT113δ','Introductory Statistics','A-'),
    resultsData('CSC1213','Database Management Systems','B'),
    resultsData('CSC1223','Data Structure and Algorithms','B+'),
    resultsData('CSC1233','Software Engineering','C'),
    resultsData('CSC1242','Object Oriented System Development','B-'),
    resultsData('CSC1251','Computer Laboratory','B'),
    resultsData('ENG1201','Preliminary English II (Level 01)','D+'),
    resultsData('MAT121β','Algebra','B'),
    resultsData('MAT122β','Calculus','B'),
    resultsData('AMT212β','Computational Mathematics','C+'),
    resultsData('CSC2113','Data Communication & Computer Networks','B-'),
    resultsData('CSC2123','Object Oriented Programming','B'),
    resultsData('CSC2133','Operating Systems','B'),
    resultsData('CSC2143','Computer Graphics and Image Processing','MC'),
    resultsData('MAT211β','Linear Algebra','A-'),
    resultsData('PHY2112','Electronics','C'),
    resultsData('CSC2263','Multimedia and Video Production','B+')
]

export const ShowStudentResults = () => {

    const [levels , setLevels] = useState({level : 0});
    const [semesters , setSemesters] = useState({semester :0});

  return (

        <Stack direction={'column'} spacing={2} width={'100%'} alignItems={'center'}>

            <Stack alignItems={'center'}>
                <Typography variant='h6' fontWeight={'bold'}>Results</Typography>
            </Stack>

            <Stack direction={'row'} spacing={2} width={'100%'} maxHeight={'35px'}>
                <Stack direction={'row'} spacing={2} flex={3}>
                    <Typography variant='body' fontWeight={'bold'}>Level</Typography>
                    <Select 
                        variant='outlined'
                        size='small' 
                        // id='levels'
                        // name='levels'
                        // value={levels.level}
                        // placeholder='Level'
                        fullWidth>
                        <MenuItem onClick={()=>setLevels(1)}>Level 1</MenuItem>
                        <MenuItem onClick={()=>setLevels(2)}>Level 2</MenuItem>
                        <MenuItem onClick={()=>setLevels(3)}>Level 3</MenuItem>
                        <MenuItem onClick={()=>setLevels(0)}>All</MenuItem>
                    </Select>
                </Stack>
                <Stack direction={'row'} spacing={2} flex={3}>
                    <Typography variant='body' fontWeight={'bold'}>Semester</Typography>
                    <Select variant='outlined'size='small' fullWidth>
                        <MenuItem onClick={()=>setSemesters(1)}>Semester 1</MenuItem>
                        <MenuItem onClick={()=>setSemesters(2)}>Semester 2</MenuItem>
                        <MenuItem onClick={()=>setSemesters(0)}>All</MenuItem>
                    </Select>
                </Stack>
                <Stack flex={1}>
                    <Button 
                        variant='itms'
                        size='itms-small'
                        onClick={()=>{console.log(levels);
                                    console.log(semesters);}}
                        >Filter</Button>
                </Stack>
            </Stack>

            <Stack width={'100%'}>
                <TableContainer sx={{maxHeight:'68vh'}}>
                    <Table stickyHeader size='small'>
                        <TableHead>
                            <TableRow>
                                <TableCell align='left' width={'130px'}>
                                    <Typography fontWeight={'bold'}>Course Unit</Typography>
                                </TableCell>
                                <TableCell align='center'>
                                    <Typography fontWeight={'bold'}>Subjet Name</Typography>
                                </TableCell>
                                <TableCell align='center'>
                                    <Typography fontWeight={'bold'}>Grade</Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {results.map((row)=>(
                                <TableRow key={results.courseUnitCode}>
                                    <TableCell align='center'>{row.courseUnitName}</TableCell>
                                    <TableCell align='left'>{row.courseUnitCode}</TableCell>
                                    <TableCell align='center'>{row.courseUnitGrade}</TableCell>
                                </TableRow>
                            )

                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Stack>

        </Stack>
  )
}