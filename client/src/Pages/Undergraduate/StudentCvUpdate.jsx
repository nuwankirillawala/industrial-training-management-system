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
  Snackbar,
  DialogActions,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MuiAlert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import { Tile } from "../../components/card/Tile";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { EnglishProficiency } from "../../components/user/Undergraduate/studentCV/EnglishProficiency";

//creating transition for dialog
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
//end of creation transition for dialog

//creating alert by importing MuiAlert
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
//end of creating alert by importing MuiAlert

export const StudentCvUpdate = () => {
  // Testing
  const [englishProficiency, setEnglishProficiency] = useState({
    olResult: "",
    alResult: "",
    speakingLevel: "",
    writingLevel: "",
    readingLevel: "",
  });

  const passDataFromChild = () => {
    // setEnglishProficiency(newValue);
    console.log(englishProficiency);
  };
  //End of Testing

  //useState for dialog EnglishProficiency
  const [epOpen, setEpOpen] = React.useState(false);
  //End of useState for dialog EnglishProficiency

  //handling setEpOpen
  const handleCloseEP = () => {
    setEpOpen(false);
  };
  //End of handling setEpOpen

  //useState for snackbar and dialog of pdf selector
  const [open, setOpen] = React.useState(false);
  const [errorOpen, setErrorOpen] = React.useState(false);
  //end of useState for snackbar dialog of pdf selector

  //handling dialog closing
  const handleClose = () => {
    setOpen(false);
  };
  //end of handling dialog closing

  //handling snackbar closing
  const errorHandleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setErrorOpen(false);
  };
  //end of handling snackbar closing

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
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onload = (e) => {
          setPDFFile(e.target.result);
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
    if (PDFFile !== null) {
      setViewPDF(PDFFile);
      setOpen(true);
    } else {
      setViewPDF(null);
    }
  };
  //end of view pdf

  //End point
  const handleSubmit = (e) => {
    console.log("EndPoint here");
  };
  //end of the end point

  //newpluging creation for pdf viewer
  const newplugin = defaultLayoutPlugin();
  //end of new plugin creation for pdf viewer

  return (
    <Box>
      <Grid container spacing={1}>
        <Grid item xs={9}>
          {/* content here */}
          <Stack spacing={1}>
            <Tile height="auto">
              <Typography variant="h5" fontWeight="bold" align="center">
                Additional Information
              </Typography>
              <br />
            </Tile>
            <Tile>
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
                  aria-label="delete"
                  name="addEnglishProficiency"
                  onClick={(e) => {
                    setEpOpen(true);
                  }}
                >
                  <AddIcon />
                </IconButton>
                <Dialog open={epOpen} onClose={handleCloseEP}>
                  <DialogTitle id="EnglishProficiency">
                    {"English Proficiency"}
                  </DialogTitle>
                  <DialogContent>
                    <Tile>
                      <EnglishProficiency
                        passDataFromChild={passDataFromChild}
                      />
                    </Tile>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseEP}>close</Button>
                  </DialogActions>
                </Dialog>
              </Stack>
            </Tile>

            <Tile>
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
                  aria-label="delete"
                  name="addProgrammingLanguages"
                  onClick={(e) => {
                    setEpOpen(true);
                  }}
                >
                  <AddIcon />
                </IconButton>
                <Dialog open={epOpen} onClose={handleCloseEP}>
                  <DialogTitle id="programminglanguages">
                    {"Programming languages"}
                  </DialogTitle>
                  <DialogContent>
                    <Tile>
                      <EnglishProficiency />
                    </Tile>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseEP}>close</Button>
                  </DialogActions>
                </Dialog>
              </Stack>
            </Tile>

            <Tile>
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
                  aria-label="delete"
                  name="addOtherSkills"
                  onClick={(e) => {
                    setEpOpen(true);
                  }}
                >
                  <AddIcon />
                </IconButton>
                <Dialog open={epOpen} onClose={handleCloseEP}>
                  <DialogTitle id="otherSkills">{"Other skills"}</DialogTitle>
                  <DialogContent>
                    <Tile>
                      <EnglishProficiency />
                    </Tile>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseEP}>close</Button>
                  </DialogActions>
                </Dialog>
              </Stack>
            </Tile>

            <Tile>
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
                  aria-label="delete"
                  name="addProjects"
                  onClick={(e) => {
                    setEpOpen(true);
                  }}
                >
                  <AddIcon />
                </IconButton>
                <Dialog open={epOpen} onClose={handleCloseEP}>
                  <DialogTitle id="projects">{"Projects"}</DialogTitle>
                  <DialogContent>
                    <Tile>
                      <EnglishProficiency />
                    </Tile>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseEP}>close</Button>
                  </DialogActions>
                </Dialog>
              </Stack>
            </Tile>
          </Stack>
        </Grid>
        <Grid item xs={3}>
          <Grid container direction="column" spacing={1}>
            <Grid item>
              {/* right top content here */}
              <Box>
                <Tile>hello</Tile>
              </Box>
            </Grid>
            <Grid item>
              {/* right bottom content here */}
              <Box>
                <Tile>
                  <Typography variant="body2">Upload your CV:</Typography>
                  <br />
                  <Typography variant="body2">Choose file:</Typography>
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
                            <Viewer fileUrl={viewPDF} plugins={[newplugin]} />
                          </>
                        )}
                        {!viewPDF && <>No PDF</>}
                      </Worker>
                    </Box>
                  </Dialog>

                  {/* error massage snackbar*/}

                  <Snackbar
                    open={errorOpen}
                    autoHideDuration={6000}
                    onClose={errorHandleClose}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  >
                    <Alert
                      onClose={errorHandleClose}
                      severity="error"
                      sx={{ width: "100%" }}
                    >
                      Input Error!
                    </Alert>
                  </Snackbar>
                </Tile>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
