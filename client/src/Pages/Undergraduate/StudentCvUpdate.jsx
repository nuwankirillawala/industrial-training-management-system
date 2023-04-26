import React from "react";
import { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Stack,
  Dialog,
  Slide,
  IconButton,
  Toolbar,
  AppBar,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { Tile } from "../../components/card/Tile";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { EnglishProficiency } from "../../components/user/Undergraduate/studentCV/EnglishProficiency";
import { PopUpDialog } from "../../components/user/Undergraduate/studentCV/PopUpDialog";
import { StatusSnackBar } from "../../components/StatusSnackBar/StatusSnackBar";
import { MiniNoticeBoard } from "../../components/MiniNoticeBoard/MiniNoticeBoard";

//creating transition for dialog
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
//end of creation transition for dialog

export const StudentCvUpdate = () => {
  //Data for End point
  const [englishProficiency, setEnglishProficiency] = useState({
    olResult: "",
    alResult: "",
    speakingLevel: "",
    writingLevel: "",
    readingLevel: "",
  });

  const passDataFromChild = (newValue) => {
    setEnglishProficiency(newValue);
    // console.log(englishProficiency);
  };
  //End of Data for End Point

  //useState for PopUpDialog
  const [openForm, setOpenForm] = React.useState({
    englishProficiency: false,
    programmingLanguages: false,
    otherSkills: false,
    projects: false,
  });
  //End of useState for PopUpDialog

  //Control Stack toggle
  const [isStackOpen, setStackOpen] = useState({
    englishProficiency: false,
    programmingLanguages: false,
    otherSkills: false,
    projects: false,
  });

  const toggleStack = (key) => {
    setStackOpen((prevState) => {
      prevState[key] = !prevState[key];
    });
  };
  //End of Control Stack toggle

  //Handling state for PopUpDialog
  const togglePopup = (key) => {
    setOpenForm((prevState) => {
      let newState = { ...prevState };
      newState[key] = !newState[key];
      // console.log(newState);
      return newState;
    });
  };
  //End of handling state for PopUpDialog

  //useState for snackbar and dialog of pdf selector
  const [open, setOpen] = React.useState(false);
  const [errorOpen, setErrorOpen] = React.useState(false);
  //end of useState for snackbar dialog of pdf selector

  //handling dialog closing
  const handleClose = () => {
    setOpen(false);
  };
  //End of Handling dialog closing

  //useStates for pdfviewer
  const [PDFFile, setPDFFile] = useState(null);
  const [viewPDF, setViewPDF] = useState(null);
  //end of useStates for pdfviewer

  //defining filetype for filepicker
  const fileType = ["application/pdf"];
  //end of defining filetype for filepicker

  //handling the change in file picker
  const handleChange = (e) => {
    let selectedFile = e.target.files[0];
    console.log(selectedFile.type);
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onload = (e) => {
          setPDFFile(selectedFile);
          setViewPDF(e.target.result);
        };
      } else {
        //if a selected file is not a pdf
        setErrorOpen(true);
        setPDFFile(null);
      }
    } else {
      //if a file not selected
      setErrorOpen(true);
    }
  };
  //end of handling the changes in file picker

  //view pdf
  const viewButtonHandle = (e) => {
    e.preventDefault();
    if (viewPDF !== null) {
      // setViewPDF(PDFFile);
      // console.log(PDFFile);
      setOpen(true);
    } else {
      setViewPDF(null);
    }
  };
  //end of view pdf

  //newpluging creation for pdf viewer
  const newplugin = defaultLayoutPlugin();
  //end of new plugin creation for pdf viewer

  //End point
  const handleSubmit = (e) => {
    console.log("EndPoint here");
  };
  //end of the end point

  return (
    <Box sx={{ height: "88vh" }}>
      <Box>
        <Typography
          variant="h6"
          color="primary"
          marginBottom={"5px"}
          paddingLeft={"15px"}
        >
          Additional Information
        </Typography>
      </Box>
      <Box sx={{ height: "100%" }}>
        <Grid container spacing={1} sx={{ height: "100%" }}>
          <Grid item xs={9}>
            {/* content here */}
            <Stack
              height={"100%"}
              spacing={1}
              display={"flex"}
              direction={"column"}
              justifyContent={"space-around"}
            >
              <Tile sx={{ height: "100%" }}>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={2}
                  justifyContent="space-between"
                >
                  <Typography varient="h2" fontWeight="bold">
                    English Proficiency
                  </Typography>
                  <IconButton
                    name="addEnglishProficiency"
                    onClick={() => {
                      togglePopup("englishProficiency");
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                  <PopUpDialog
                    open={openForm.englishProficiency}
                    setOpen={() => {
                      togglePopup("englishProficiency");
                    }}
                    id={"EnglishProficiency"}
                  >
                    <EnglishProficiency passDataFromChild={passDataFromChild} />
                  </PopUpDialog>
                </Stack>
              </Tile>
              <Tile sx={{ height: "100%" }}>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={2}
                  justifyContent="space-between"
                >
                  <Typography varient="h2" fontWeight="bold">
                    Programming languages
                  </Typography>
                  <IconButton
                    name="addProgrammingLanguages"
                    onClick={() => {
                      togglePopup("programmingLanguages");
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                  <PopUpDialog
                    open={openForm.programmingLanguages}
                    setOpen={() => {
                      togglePopup("programmingLanguages");
                    }}
                    id={"ProgrammingLanguages"}
                  ></PopUpDialog>
                </Stack>
              </Tile>

              <Tile sx={{ height: "100%" }}>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={2}
                  justifyContent="space-between"
                >
                  <Typography varient="h2" fontWeight="bold">
                    Other Skills
                  </Typography>
                  <IconButton
                    name="addOtherSkills"
                    onClick={() => {
                      togglePopup("otherSkills");
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                  <PopUpDialog
                    open={openForm.otherSkills}
                    setOpen={() => {
                      togglePopup("otherSkills");
                    }}
                    id={"OtherSkills"}
                  ></PopUpDialog>
                </Stack>
              </Tile>

              <Tile sx={{ height: "100%" }}>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={2}
                  justifyContent="space-between"
                >
                  <Typography varient="h2" fontWeight="bold">
                    Projects
                  </Typography>
                  <IconButton
                    name="addProjects"
                    onClick={() => {
                      togglePopup("projects");
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                  <PopUpDialog
                    open={openForm.projects}
                    setOpen={() => {
                      togglePopup("projects");
                    }}
                    id={"projects"}
                  ></PopUpDialog>
                </Stack>
              </Tile>
            </Stack>
          </Grid>
          <Grid item xs={3}>
            <Stack direction="column" spacing={1} height={"100%"}>
              {/* right bottom content here */}
              <Box sx={{ height: "60%" }}>
                <Tile sx={{ height: "100%" }}>
                  <Stack
                    height={"100%"}
                    display={"flex"}
                    justifyContent={"space-around"}
                  >
                    <Box>
                      <Typography
                        variant="body2"
                        align="center"
                        fontWeight={"bold"}
                      >
                        Upload your CV
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2">Choose file:</Typography>
                    </Box>
                    <Box>
                      <form onSubmit={handleSubmit}>
                        <input type="file" onChange={handleChange} />
                        <Button
                          variant="itms"
                          size="itms-small"
                          onClick={viewButtonHandle}
                        >
                          View
                        </Button>
                        <Button type="submit" variant="itms" size="itms-small">
                          Submit
                        </Button>
                      </form>

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
                            {viewPDF && (
                              <>
                                <Viewer
                                  fileUrl={viewPDF}
                                  plugins={[newplugin]}
                                />
                              </>
                            )}
                            {!viewPDF && <>No PDF</>}
                          </Worker>
                        </Box>
                      </Dialog>

                      <StatusSnackBar
                        trigger={errorOpen}
                        setTrigger={setErrorOpen}
                        severity="info"
                        alertMessage="motherfucker"
                      />
                    </Box>
                  </Stack>
                </Tile>
              </Box>
              {/* right top content here */}
              <Box sx={{ height: "100%" }}>
                <Tile sx={{ height: "100%" }}>
                  <MiniNoticeBoard />
                </Tile>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
