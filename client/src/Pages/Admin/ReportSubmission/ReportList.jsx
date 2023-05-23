import React, { useState, useEffect } from 'react'
import { Stack, Grid, Button, Typography, Box, Divider} from '@mui/material'
import { Tile } from '../../../components/card/Tile'
import { DataGrid } from "@mui/x-data-grid";
import { DailyReport } from './DailyReport';
import {FinalFeedback} from './FinalFeedback'
import axios from 'axios'


export const ReportList = ({reportType, setSelectReportType, selectReportType}) => {
  
  const [studentId, setStudentId] = useState();
  const [reportId, setReportId] = useState();
  const [selectStudent, setSelectStudent] = useState(false);
  const [selectReport, setSelectReport] = useState(false);
  const [reportList, setReportList] = useState([
    {
      "dailyReports": [],
      "problemSection":"",
      "reportStatus":"",
      "weekEndDate":"",
      "weekNumber":"",
      "weekStartDate":"",
      "_id":""
    }
  ]);
  const [studentList , setStudentList] = useState([
    {
        "role": "",
        "_id": "",
        "name": "",
        "regNo": "",
        "email": "",
        "password": "",
        "__v": 0,
        "weightedGPA": "",
        "notes": [],
        "internStatus": [],
        "weeklyReports": [],
        "monthlyReports": []
    }]);


  //fetch data

  const getStudentList = async() => {
      try{
        const res = await axios.get("http://localhost:5000/api/v1/admin/users/undergraduate",{withCredentials:true});
        if(res.status===200){
          console.log(res.data.users)
          setStudentList(res.data.users);
        }
      }
      catch (err) {
        console.log(err);
      }
  }

  useEffect(() => {
    getStudentList();
  },[])


  useEffect

//end fetch



  const selectRowData = (params) => {
    try {
        const  userid = params.row.id;
        setSelectStudent(true);
        console.log(params.row.name);
        console.log(userid);

        const getReportList = async() => {
          try{
              if(reportType === "Daily Report"){
                const res = await axios.get(`http://localhost:5000/api/v1/undergraduate/daily-report/all/${userid}`,{withCredentials:true});
                console.log("responce : ", res.data.dailyReports)
                if(res.status===200){
                  setReportList(res.data.dailyReports);
                }
              }else if(reportType === "Monthly Report"){
                const res = await axios.get(`http://localhost:5000/api/v1/undergraduate/monthly-report/all/${userid}`,{withCredentials:true});
                console.log("responce : ", res.data.monthlyReports)
                if(res.status===200){
                  setReportList(res.data.monthlyReports);
                }
              }
            }
            catch (err) {
              console.log(err);
            }
        }
        getReportList();

    }
    catch (error) {
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
      field: "regNo",
      headerName: "Student ID",
      width: 120,
      editable: false,
    }

  ];

  const dailyReportColumns = [
    {
      field : "weekNumber",
      headerName : 'Week',
      editable : false,
      flex :1
    },
    {
      field : "weekStartDate",
      headerName : 'Start Date',
      editable : false,
      flex :3
    },
    {
      field : "weekEndDate",
      headerName : 'End Date',
      editable : false,
      flex :3
    }
  ]
  const monthlyReportColumns = [
    {
      field : "monthNumber",
      headerName : 'Month',
      editable : false,
      flex :1
    },
    {
      field : "monthEndDate",
      headerName : 'End Date',
      editable : false,
      flex :1
    }
  ]


  return (
  <Stack>
    { selectReportType === false &&
    <Grid container spacing={2}>
      <Grid item md={12}>
        <Typography variant="head3" marginBottom={'5px'}>{reportType}</Typography>
      </Grid>

      <Grid item md={12}>
          <Grid container spacing={1}>
{/* student list in here */}
            <Grid item md={3} minWidth={'340px'}>
              <Tile>
                <Stack direction={'column'} spacing={4} height={'75vh'}>

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
                          rows={studentList.map((student) => {
                            return { name: student.name, regNo: student.regNo, id: student._id};
                          })}
                          // rows
                          columns={studentColumns}
                          onRowClick={selectRowData}
                          getRowId={(row) => row.id}
                          disableSelectionOnClick
                          experimentalFeatures={{ newEditingApi: true }}
                          hideFooter={true}
                        
                        />
                      )}
                      {selectStudent === true && (

                        <>
                          {reportType === "Daily Report" && (
                            <DataGrid
                            rows={reportList.map((report) => {
                              return { weekNumber: report.weekNumber, weekStartDate: report.weekStartDate.substring(0,10), weekEndDate: report.weekEndDate.substring(0,10)};
                            })}
                            columns={dailyReportColumns}
                            onRowClick={selectReportData}
                            getRowId={(row) => row.weekNumber}
                            disableSelectionOnClick
                            hideFooter={true}
                            // disableSelectionOnClick
                            experimentalFeatures={{ newEditingApi: true }}
                          
                          />
                          ) 
                          }
                          {reportType === "Monthly Report" && (
                            <DataGrid
                            // rows
                            rows={reportList.map((report) => {
                              return { monthNumber: report.monthNumber, monthEndDate: report.monthEndDate.substring(0,10), id:report._id};
                            })}
                            columns={monthlyReportColumns}
                            onRowClick={selectReportData}
                            getRowId={(row) => row.id}
                            disableSelectionOnClick
                            hideFooter={true}
                            // disableSelectionOnClick
                            experimentalFeatures={{ newEditingApi: true }}
                          
                          />
                          ) 
                          }
                        </>

                        
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
