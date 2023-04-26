import React ,{ useState } from 'react'
import { Stack, Grid, Box, Typography, Select, Button } from '@mui/material'
import { Tile } from '../../components/card/Tile'
import { DepartmentShowStudentProfile } from '../../components/user/Department/DepartmentShowStudentProfile'
import { ShowStudentResults } from '../../components/user/Shared/ShowStudentResult/ShowStudentResults'
import { DataGrid } from '@mui/x-data-grid'

// import jsonData from '../Admin/ReportSubmission/data.json'


export const DepartmentStudentProfile = () => {

    const [rows, setRows] = useState([]);
    const [uid, setId] = useState(null);
    const [selectStudent, setSelectStudent] = useState(false);

    const colums = [
        {
            field : "name",
            headerName : 'Name',
            width : 150,
            editable : false,
        },
        {
            field : "id",
            headerName : 'Reg No',
            width : "100%",
            editable : false,
        }
    ]

    const userData = (params) => {
        try{
            const userId = params.row.id;
            setId(userId);
            setSelectStudent(true);
        }
        catch (error){
            console.log(error);
        }
    };

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
                    <Stack>
                        <Box
                            sx={{
                                height : '65vh',
                                width : "100%",
                                justifyContent : "center",
                                textAlign : "center"
                            }}
                        >
                            <DataGrid
                                columns={colums}
                                rows={jsonData}
                                onRowClick={userData}
                                gerRowId={(row) => row.id}
                                />
                        </Box>
                    </Stack>
                </Stack>
            </Tile>
        </Grid>

        {selectStudent === true &&
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
        }
    </Grid>
  )
}
