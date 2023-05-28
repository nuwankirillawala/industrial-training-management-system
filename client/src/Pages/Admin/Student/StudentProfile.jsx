import React, { useState, useEffect } from "react";
import {
  Stack,
  Box,
  Divider,
  Paper,
  Grid,
  Typography,
  Button,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Icon,
  Slide,
} from "@mui/material";
import { Tile } from "../../../components/card/Tile";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { ShowStudentResults } from "../../../components/user/Department/ShowStudentResults";
import { DepartmentShowStudentProfile } from "../../../components/user/Department/DepartmentShowStudentProfile";
import FeaturedCard from "../../../components/Dashboard/FeaturedCard";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import { CustomBackdrop } from "../../../components/backdrop/CustomBackdrop";
import { Viewer, Worker } from "@react-pdf-viewer/core";

import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import CloseIcon from "@mui/icons-material/Close";
import { ClickableTile } from "../../../components/card/ClickableTile";

//creating transition for dialog
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
//end of creation transition for dialog

const StudentProfile = () => {
  const [selecteduser, setSelectedUser] = useState();
  const [select, setSelect] = useState(false);
  const [selectedPDFURL, setSelectedPDFURL] = useState("");
  const [records, setRecords] = useState([
    {
      role: "",
      _id: "",
      name: "",
      regNo: "",
      email: "",
      password: "",
      __v: 0,
      weightedGPA: "",
      notes: [],
      internStatus: [],
      weeklyReports: [],
      monthlyReports: [],
      gpa: "",
      contactNo: "",
    },
  ]);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  //useState for dialogbox
  const [open, setOpen] = useState(false);

  //handling dialog closing
  const handleClose = () => {
    setOpen(false);
  };
  //End of Handling dialog closing

  //newpluging creation for pdf viewer
  const newplugin = defaultLayoutPlugin();
  //end of new plugin creation for pdf viewer

  const getUndergraduateData = async () => {
    setOpenBackdrop(true);
    try {
      const res = await axios.get(
        "http://localhost:5000/api/v1/undergraduate/user/all"
      );
      console.log(res);
      if (res.status === 200) {
        console.log(res.data.users);
        setRecords(res.data.users);
      }
    } catch (error) {
      console.log(error);
    }
    setOpenBackdrop(false);
  };

  useEffect(() => {
    getUndergraduateData();
  }, []);

  const selectRowData = (params) => {
    setOpenBackdrop(true);
    try {
      let userid = params.row.regNo;
      setSelect(true);
      setSelectedUser(userid);
      // console.log(params);
      let pdfURL = records.find((item) => item.regNo === userid);
      console.log(pdfURL.cvURL);
      setSelectedPDFURL(pdfURL.cvURL);
    } catch (error) {
      console.log(error);
    }
    setOpenBackdrop(false);
  };

  const undergraduateColumns = [
    {
      field: "name",
      headerName: "Name",
      editable: false,
      flex: 1,
    },
    {
      field: "regNo",
      headerName: "reg No",
      editable: false,
      flex: 1,
    },
    {
      field: "gpa",
      headerName: "GPA",
      editable: false,
      flex: 1,
    },
    {
      field: "wgpa",
      headerName: "Weighted GPA",
      editable: false,
      flex: 1,
    },
    {
      field: "contact",
      headerName: "Contact Number",
      editable: false,
      flex: 1,
    },
  ];
  const undergraduateListColumns = [
    {
      field: "name",
      headerName: "Name",
      editable: false,
      flex: 1,
    },
    {
      field: "regNo",
      headerName: "reg No",
      editable: false,
      flex: 1,
    },
  ];

  return (
    <Grid container spacing={1}>
      <Grid item md={12} spacing={1}>
        <Typography variant="pageTitle">Undergraduate Profile</Typography>
      </Grid>
      {select === false && (
        <Grid item md={12}>
          <Tile>
            <Stack direction={"column"} spacing={2}>
              <Stack>
                <Typography>Select Undergraduate to show profile</Typography>
              </Stack>

              <Divider />

              <Stack>
                <Box
                  sx={{
                    height: "65vh",
                    width: "100%",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
                  <DataGrid
                    rows={records.map((student) => {
                      return {
                        name: student.name,
                        regNo: student.regNo,
                        gpa: student.gpa,
                        wgpa: student.weightedGPA,
                        contact: student.contactNo,
                      };
                    })}
                    // rows
                    columns={undergraduateColumns}
                    onRowClick={selectRowData}
                    getRowId={(row) => row.regNo}
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                    // hideFooter={true}
                    style={{ cursor: "pointer" }}
                  />
                </Box>
              </Stack>
            </Stack>
          </Tile>
        </Grid>
      )}
      {select === true && (
        <>
          {/* <Grid container spacing={1}> */}
          {/* <Grid item md={3}>
            <Tile>
              <Stack spacing={2}>
                <Stack>
                  <Typography variant="head6">Undergraduate List</Typography>
                </Stack>
                <Divider />
                <Stack>
                  <Box
                    sx={{
                      height: "65vh",
                      width: "100%",
                      justifyContent: "center",
                      textAlign: "center",
                    }}
                  >
                    <DataGrid
                      rows={records.map((student) => {
                        return {
                          name: student.name,
                          regNo: student.regNo,
                          gpa: student.gpa,
                          wgpa: student.weightedGPA,
                          contact: student.contactNo,
                        };
                      })}
                      // rows
                      columns={undergraduateListColumns}
                      onRowClick={selectRowData}
                      getRowId={(row) => row.regNo}
                      disableSelectionOnClick
                      experimentalFeatures={{ newEditingApi: true }}
                      hideFooter={true}
                      style={{ cursor: "pointer" }}
                    />
                  </Box>
                </Stack>
              </Stack>
            </Tile>
          </Grid> */}

          <Grid item md={12}>
            <Grid container spacing={2}>
              <Grid item md={12}>
                <Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                  spacing={2}
                >
                  <Stack>
                    <Stack direction={"row"} spacing={2}>
                      {/* <FeaturedCard
                        title="Resume"
                        color="primary"
                        icon={ContactPageIcon}
                        link="/student-company"
                      /> */}
                      <Button
                        variant="itms"
                        onClick={(e) => {
                          e.preventDefault;
                          setOpen(true);
                        }}
                      >
                        View CV
                      </Button>
                    </Stack>
                  </Stack>
                  <Stack alignContent={"flex-end"}>
                    <Button
                      variant="itms"
                      onClick={(e) => {
                        e.preventDefault;
                        setSelect(false);
                      }}
                    >
                      Student List
                    </Button>
                  </Stack>
                </Stack>
              </Grid>
              <Grid item md={12}>
                <Stack direction={"row"} spacing={2}>
                  {/* <Stack direction={"row"} spacing={2} justifyContent={"center"}> */}
                  <Stack spacing={2} direction={"column"}>
                    <Stack>
                      <Tile>
                        <DepartmentShowStudentProfile />
                      </Tile>
                    </Stack>
                    <Stack>
                      <Tile>skills in here</Tile>
                    </Stack>
                  </Stack>
                  <Stack>
                    <Tile>
                      <ShowStudentResults />
                    </Tile>
                    {openBackdrop && <CustomBackdrop />}
                    {/* viewing the cv dialog*/}
                    <Dialog
                      fullScreen
                      open={open}
                      onClose={handleClose}
                      TransitionComponent={Transition}
                    >
                      <AppBar sx={{ position: "relative" }} elevation={0}>
                        <Toolbar>
                          <IconButton
                            edge="start"
                            color="#363853"
                            onClick={handleClose}
                            aria-label="close"
                          >
                            <CloseIcon />
                          </IconButton>
                          <Typography
                            sx={{ ml: 2, flex: 1 }}
                            variant="body2"
                            fontWeight="bold"
                          >
                            Uploaded File
                          </Typography>
                        </Toolbar>
                      </AppBar>
                      <Box
                        justifyContent="center"
                        justifyItems="center"
                        sx={{
                          height: "900px",
                          width: "100%",
                        }}
                        overflow-y="auto"
                      >
                        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                          {selectedPDFURL && (
                            <>
                              <Viewer
                                fileUrl={selectedPDFURL}
                                plugins={[newplugin]}
                              />
                            </>
                          )}
                          {!selectedPDFURL && <>No PDF</>}
                        </Worker>
                      </Box>
                    </Dialog>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
          {/* </Grid> */}
        </>
      )}
    </Grid>
  );
};

export default StudentProfile;
