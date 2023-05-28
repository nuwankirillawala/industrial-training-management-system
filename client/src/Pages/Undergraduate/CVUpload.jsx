import React, { useRef } from "react";
import {
  AppBar,
  Box,
  Button,
  Dialog,
  IconButton,
  Slide,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Tile } from "../../components/card/Tile";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import axios from "axios";
import { useState } from "react";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { StatusSnackBar } from "../../components/StatusSnackBar/StatusSnackBar";
import { Upload } from "@mui/icons-material";
import { UploadImg } from "../../assets";

//creating transition for dialog
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
//end of creation transition for dialog

export const CVUpload = () => {
  //useStates for pdfviewer
  const [PDFFile, setPDFFile] = useState(null);
  const [viewPDF, setViewPDF] = useState(null);
  //useState for dialogbox
  const [open, setOpen] = useState(false);
  //useState for errors
  const [errorOpen, setErrorOpen] = useState(false);
  //use State for filename
  const [fileName, setFileName] = useState("");
  //State for Backdrop
  const [openBackdrop, setOpenBackdrop] = useState(false);
  //End of states

  //handling dialog closing
  const handleClose = () => {
    setOpen(false);
  };
  //End of Handling dialog closing

  //newpluging creation for pdf viewer
  const newplugin = defaultLayoutPlugin();
  //end of new plugin creation for pdf viewer

  //defining filetype for filepicker
  const fileType = ["application/pdf"];
  //end of defining filetype for filepicker

  //handling the change in file picker
  const handleChange = (e) => {
    setOpenBackdrop(true);
    let selectedFile = e.target.files[0];
    console.log(selectedFile.type);
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        setPDFFile(selectedFile);
        setFileName(selectedFile.name);
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onload = (e) => {
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
    setOpenBackdrop(false);
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

  //reference for input
  const fileInputRef = useRef(null);
  //End of reference

  //Calling the reference
  const handleAttachButtonClick = () => {
    fileInputRef.current.click();
  };
  //end of calling the reference

  //handle submit         End point
  const handleSubmit = async (e) => {
    e.preventDefault();
    setOpenBackdrop(true);
    console.log("EndPoint here");

    const headers = {
      "Content-Type": "multipart/form-data",
      withCredentials: true,
    };

    const formData = new FormData();
    formData.append("cv-file", PDFFile);

    const res = await axios.post(
      "http://localhost:5000/api/v1/undergraduate/info/upload-cv",
      formData,
      headers
    );
    console.log(res);
    setOpenBackdrop(false);
  };
  //End of handle submit
  return (
    <Box>
      <Stack direction={"column"} spacing={1}>
        <Box>
          <Typography variant="pageTitle">View Results</Typography>
        </Box>
        <Tile sx={{ height: "100%" }}>
          <Box display={"flex"} justifyContent="center">
            <form onSubmit={handleSubmit}>
              <Stack
                height={"100%"}
                display={"flex"}
                justifyContent={"space-around"}
              >
                <Box sx={{ m: 1 }}>
                  <Typography
                    variant="body2"
                    align="center"
                    fontWeight={"bold"}
                  >
                    Upload your CV
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" mb={1}>
                    Attach file:
                  </Typography>
                  {/* <input type="file" onChange={handleChange} /> */}
                  <Stack direction={"column"}>
                    <Box>
                      <Button
                        variant="itms"
                        size="itms-x-small"
                        endIcon={<Upload />}
                        sx={{ textTransform: "capitalize" }}
                        onClick={handleAttachButtonClick}
                      >
                        Attach
                      </Button>
                    </Box>
                    <Box>
                      {fileName && (
                        <Typography variant="body2" sx={{ ml: 1 }}>
                          {fileName}
                        </Typography>
                      )}
                    </Box>
                    <input
                      type="file"
                      accept="*"
                      ref={fileInputRef}
                      onChange={handleChange}
                      style={{ display: "none" }}
                    />
                  </Stack>
                  <Stack direction={"row"} mt={1.5}>
                    {PDFFile && (
                      <Box>
                        <Button
                          variant="itms"
                          size="itms-x-small"
                          onClick={viewButtonHandle}
                        >
                          View
                        </Button>
                        <Button
                          type="submit"
                          variant="itms"
                          size="itms-x-small"
                        >
                          Submit
                        </Button>
                      </Box>
                    )}
                  </Stack>
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
                  <StatusSnackBar
                    trigger={errorOpen}
                    setTrigger={setErrorOpen}
                    severity="error"
                    alertMessage="Error"
                  />
                  {openBackdrop && <CustomBackdrop />}
                </Box>
              </Stack>
            </form>
          </Box>
        </Tile>
        <Box display={"flex"} justifyContent={"center"}>
          <img src={UploadImg} alt="Resume" width={"32%"} />
        </Box>
      </Stack>
    </Box>
  );
};
