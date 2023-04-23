import React, { useState, useEffect } from 'react'
import { Stack, Grid, Button, Typography, Box} from '@mui/material'
import { Tile } from '../../../components/card/Tile'
import { DataGrid } from "@mui/x-data-grid";

// import jsonData from "./data.json";
// import reportData from "./reportData.json"
import { DailyReport } from './DailyReport';

const jsonData = [
  {
    "id" : "SC/2019/11120",
    "name" : "gavesh madushan"
    
  },

  {
      "id" : "SC/2019/11121",
      "name" : "madushan gavesh"
  },

  {
      "id" : "SC/2019/11122",
      "name" : "G.M.Sooriyaarachchi"
  }
]

const reportData = [
  {
    "id" : "firstWeek",
    "report" : [
      {
          "monday" : "monday report data",
          "tuesday" : "tuesday report data",
          "wednesday" : "wednesday report data"
      }
    ]
  },

  {
      "id" : "secondtWeek",
      "report" : [
        {
          "monday" : "monday report data",
          "tuesday" : "tuesday report data",
          "wednesday" : "wednesday report data"
      }
    ]
  },

  {
      "id" : "thirdWeek",
      "report" : [
        {
          "monday" : "monday report data",
          "tuesday" : "tuesday report data",
          "wednesday" : "wednesday report data"
      }
    ]
  }
  
]




export const DailyReportList = () => {
  
  const [rows, setRows] = useState([]);
  // const [uid, setId] = useState(null);
  // const [rid, setRId] = useState(null);
  // const [selectedRows, setSelectedRows] = useState([]);
  const [selectStudent, setSelectStudent] = useState(false);
  const [selectReport, setSelectReport] = useState(false);

  const selectRowData = (params) => {
    try {
      const  usersid = params.row.id;
      setSelectStudent(true);
      console.log({selectStudent});
      // setId(usersid);
    } catch (error) {
      console.log(error);
    }
  };
  const selectReportData = (params) => {
    try {
      const  reportid = params.row.id;
      setSelectReport(true);
      // setRId(reportid);
      console.log({selectReport});
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnClick = () => {
    setSelectReport(false);
    setSelectStudent(false);
  }

  const studentColumns = [

    {
      field: "name",
      headerName: "Full Name",
      width: 150,
      editable: false,
    },
    {
      field: "id",
      headerName: "Student ID",
      width: 120,
      editable: false,
    }

  ];

  const reportColumns = [
    {
      field : "id",
      headerName : 'Date',
      editable : false,
      width : 200,
    }
  ]

//   ///API call
//   useEffect(() => {
//     const getData = async () => {
//       try {
//         const {
//           data: {
//             data: { data },
//           },
//         } = await getAllUsers();
//         setRows(data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     getData();
//   }, []);

  return (
    <Grid container spacing={1}>
        <Grid item md={3}>
          <Tile>
            <Stack direction={'column'} spacing={5} height={'84vh'}>

              <Stack alignItems={'center'}>
                {selectStudent === false && (
                  <Typography variant='h6' fontWeight={'bold'}>Student List</Typography>
                )}
                {selectStudent === true && (
                  <Typography variant='h6' fontWeight={'bold'}>Report List</Typography>
                )}
              </Stack>

              <Stack>
                <Typography>set search bar here</Typography>
              </Stack>

              <Stack direction="row" spacing={2}>
                <Box
                  sx={{
                    height: '55vh',
                    width: '100%',
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
                  {selectStudent === false && (

                    <DataGrid
                      //rows={rows}
                      rows={jsonData}
                      columns={studentColumns}
                      rowsPerPageOptions={[]}
                      onRowClick={selectRowData}
                      getRowId={(row) => row.id}
                      // pageSize={10}
                      // disableSelectionOnClick
                      // experimentalFeatures={{ newEditingApi: true }}
                    
                    />
                  )}
                  {selectStudent === true && (

                    <DataGrid
                      //rows={rows}
                      rows={reportData}
                      columns={reportColumns}
                      rowsPerPageOptions={[]}
                      onRowClick={selectReportData}
                      getRowId={(row) => row.id}
                      // pageSize={10}
                      // disableSelectionOnClick
                      // experimentalFeatures={{ newEditingApi: true }}
                    
                    />
                  )}
                </Box>
              </Stack>
              
              {selectStudent === true && (
                <Stack>
                  <Button
                    variant='itms'
                    onClick={handleOnClick}
                    >student list</Button>
                </Stack>
              )}

              </Stack>
          </Tile>
        </Grid>

        {selectStudent === true && selectReport === true && (
          <Grid item md={9}>
            <DailyReport />
          </Grid>
        )}
    </Grid>
  )
}
