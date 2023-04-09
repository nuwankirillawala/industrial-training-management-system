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
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import { Tile } from "../../components/card/Tile";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const StudentCvUpdate = () => {
  const [open, setOpen] = React.useState(false);
  const [errorOpen, setErrorOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const [PDFFile, setPDFFile] = useState(null);
  const [viewPDF, setViewPDF] = useState(null);

  const fileType = ["application/pdf"];

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

  //submit the selected pdf
  const handleSubmit = (e) => {
    e.preventDefault();
    if (PDFFile !== null) {
      setViewPDF(PDFFile);
    } else {
      setViewPDF(null);
    }
  };

  //view the pdf
  const viewButtonHandle = (e) => {
    setOpen(true);
    console.log(open);
  };

  //error handle
  const errorHandleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setErrorOpen(false);
  };

  const newplugin = defaultLayoutPlugin();

  return (
    <Box>
      <Grid container spacing={1}>
        <Grid item xs={9}>
          {/* content here */}
          <Tile height="89vh">
            <Stack direction="column">
              <Typography variant="h5" fontWeight="bold" align="center">
                Curriculum Vitae
              </Typography>
            </Stack>
          </Tile>
        </Grid>
        <Grid item xs={3}>
          <Grid container direction="column" spacing={1}>
            <Grid item>
              {/* left top content here */}
              <Box>
                <Tile>hello</Tile>
              </Box>
            </Grid>
            <Grid item>
              {/* left bottom content here */}
              <Box>
                <Tile>
                  <Typography variant="body2">Upload your CV:</Typography>
                  <br />
                  <Typography variant="body2">Choose file:</Typography>
                  <form onSubmit={handleSubmit}>
                    <input type="file" onChange={handleChange} />
                    <Button
                      type="submit"
                      variant="itms"
                      size="itms-small"
                      onClick={viewButtonHandle}
                    >
                      View
                    </Button>
                  </form>

                  {/* viewing the cv */}
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

                  {/* error massage */}

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
