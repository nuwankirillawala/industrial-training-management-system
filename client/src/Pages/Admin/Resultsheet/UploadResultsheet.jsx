import React, { useRef, useState } from "react";
import { Tile } from "../../../components/card/Tile";
import { Box, Button, Divider, Grid, Stack, Typography } from "@mui/material";
import { StatusSnackBar } from "../../../components/StatusSnackBar/StatusSnackBar";
import axios from "axios";
import { Upload } from "@mui/icons-material";
// import { useHistory } from "react-router-dom"
const UploadResultsheet = () => {
  // on change states
  const [excelFile, setExcelFile] = useState(null);
  const [excelFileStatus, setExcelFileStatus] = useState(null);
  //End of on change states

  //statusSnackBar state
  const [trigger, setTrigger] = useState(false);
  //End of statusSnackBar state

  //use State for filename
  const [fileName, setFileName] = useState("");
  //End of states

  //handle snackbar
  const handleSnackBar = (key) => {
    setTrigger((prevState) => {
      let newState = { ...prevState };
      newState[key] = !newState[key];
      return newState;
    });
  };
  //End of handle snackbar

  // Handle File
  const fileType = [
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];
  const handleFile = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      // console.log(selectedFile.type);
      if (selectedFile && fileType.includes(selectedFile.type)) {
        setExcelFile(selectedFile);
        setFileName(selectedFile.name);
        setExcelFileStatus("Success");
        console.log(excelFile);
      } else {
        setExcelFileStatus("Please select only excel file types");
        setExcelFile(null);
        handleSnackBar("onlyExcel");
      }
    } else {
      // setExcelFileStatus("please select your file");
      // setExcelFile(null);
      // handleSnackBar("inputError");
    }
  };
  //End of Handle file

  //reference for input
  const fileInputRef = useRef(null);
  //End of reference

  //Calling the reference
  const handleAttachButtonClick = () => {
    fileInputRef.current.click();
  };
  //end of calling the reference

  // submit function
  const handleSubmit = async (e) => {
    console.log("End point here");

    if (excelFileStatus === "Success") {
      const headers = {
        "Content-Type": "multipart/form-data",
        withCredentials: true,
      };

      const formData = new FormData();
      formData.append("result-sheet", excelFile);

      const res = await axios.post(
        "http://localhost:5000/api/v1/result/upload",
        formData,
        headers
      );
      console.log(res);
      handleSnackBar("success");
    } else {
      if (excelFileStatus === "Please select only excel file types") {
        handleSnackBar("onlyExcel");
      }
      setExcelFileStatus("Please select your file");
      handleSnackBar("inputError");
    }
  };
  //End of Submit Function

  return (
    <Grid container style={{ height: "85vh" }}>
      <Grid item xs={12}>
        <Box mb={1}>
          <Box>
            <Typography variant="pageTitle">Upload Result Sheet</Typography>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} style={{ height: "100%" }}>
        <Grid container spacing={1} style={{ height: "100%" }}>
          <Grid item xs={12}>
            <Tile style={{ height: "100%" }}>
              <Typography variant="head6">
                Instruction for the upload:
              </Typography>
              <Divider sx={{ m: 1 }} />
              <Grid
                container
                direction="column"
                justify="space-around"
                alignItems="center"
                style={{ height: "100%" }}
              >
                <Grid item>
                  <Typography variant="body2">
                    1. Click on the file input field to open the file selection
                    dialog box. <br />
                    2. Navigate to the folder on your device where the Excel
                    file is located.
                    <br />
                    3. Select the Excel file by clicking on it and then click on
                    the "Open" button in the dialog box.
                    <br />
                    4. Once you've selected the file, the file input field
                    should display the file name or path to the file.
                    <br />
                    5. Submit the form or perform any other necessary actions to
                    upload or process the selected Excel file. <br />
                    <br />
                    <br />
                  </Typography>
                  <Typography variant="body2" fontWeight="bold">
                    Note: It's important to ensure that the Excel file you are
                    selecting is in a format that is compatible with the webpage
                    or application you are using. Some file formats, such as
                    older versions of Excel files, may not be compatible and may
                    cause errors or problems.
                  </Typography>
                </Grid>
                <Grid item>
                  <Grid container justifyContent="center">
                    <form onSubmit={handleSubmit}>
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
                          onChange={handleFile}
                          style={{ display: "none" }}
                        />
                      </Stack>
                      {/* <input
                        onSubmit={handleSubmit}
                        type="file"
                        onChange={handleFile}
                      /> */}
                      <br />
                      <Button
                        type="submit"
                        variant="itms"
                        size="itms-x-small"
                        onClick={handleSubmit}
                        style={{ marginTop: "8px" }}
                      >
                        Submit
                      </Button>
                    </form>
                    <StatusSnackBar
                      trigger={trigger}
                      setTrigger={setTrigger}
                      severity="error"
                      alertMessage={excelFileStatus}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Tile>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UploadResultsheet;
