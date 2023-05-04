import React, { useState, useEffect } from 'react'
import { Stack, Grid, Button, Typography, Box, Divider} from '@mui/material'
import { Tile } from '../../../components/card/Tile'
import { DataGrid } from "@mui/x-data-grid";
import { DailyReport } from './DailyReport';
import { ReportPortal } from './ReportPortal';
import {FinalFeedback} from './FinalFeedback'

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




export const DailyReportList = ({reportType, setSelectReportType, selectReportType}) => {
  
  const [rows, setRows] = useState([]);
  const [selectStudent, setSelectStudent] = useState(false);
  const [selectReport, setSelectReport] = useState(false);


  const selectRowData = (params) => {
    try {
      const  usersid = params.row.id;
      setSelectStudent(true);
      console.log({selectStudent});
    } catch (error) {
      console.log(error);
    }
  };
  const selectReportData = (params) => {
    try {
      const  reportid = params.row.id;
      setSelectReport(true);
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
  <Stack>
    { selectReportType === false &&
    <Grid container spacing={2}>
      <Grid item md={12}>
        <Typography variant='PageTitle'>{reportType}</Typography>
      </Grid>

{/* student list and report list */}
      <Grid item md={12}>
          <Grid container spacing={1}>
            <Grid item md={3}>
              <Tile>
                <Stack direction={'column'} spacing={4} height={'76vh'}>

                  <Stack alignItems={'center'}>
                    {selectStudent === false && (
                      <Stack width={'100%'}>
                      <Typography variant='h6' fontWeight={'bold'}>Student List</Typography>
                      <Divider />
                      </Stack>
                    )}
                    {selectStudent === true && (
                    <Stack width={'100%'}>
                      <Typography variant='h6' fontWeight={'bold'}>Report List</Typography>
                      <Divider />
                    </Stack>
                    )}
                  </Stack>

                  <Stack>
                    <Typography>set search bar here</Typography>
                  </Stack>

                  <Stack>
                    <Box
                      sx={{
                        height: '48vh',
                        width: '100%',
                        justifyContent: "center",
                        textAlign: "center",
                      }}
                    >
                      {selectStudent === false && (

                        <DataGrid
                          rows={jsonData}
                          columns={studentColumns}
                          onRowClick={selectRowData}
                          getRowId={(row) => row.id}
                          disableSelectionOnClick
                          experimentalFeatures={{ newEditingApi: true }}
                          hideFooter={true}
                        
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
                          pageSize={10}
                          hideFooter={true}
                          // disableSelectionOnClick
                          // experimentalFeatures={{ newEditingApi: true }}
                        
                        />
                      )}
                    </Box>
                  </Stack>
                  
                  {selectStudent === false && (
                    <Stack>
                      <Button
                        variant='itms'
                        onClick={()=>{
                          setSelectReport(false);
                          setSelectStudent(false);
                          setSelectReportType(true);
                        }}
                        >report type</Button>
                    </Stack>
                  )}
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

{/* show report in here */}
            {selectStudent === true && selectReport === true && (
              <Grid item md={9}>
                {reportType === "Daily Report" &&
                  <DailyReport />
                }
                {reportType === "Monthly Report" &&
                  <DailyReport />
                }
                {reportType === "Progress Report" &&
                  <DailyReport />
                }
                {reportType === "Final Feedback Report" &&
                  <FinalFeedback />
                }
              </Grid>
            )}
        </Grid>
      </Grid>
    </Grid>
    }
  </Stack>
  )
}
