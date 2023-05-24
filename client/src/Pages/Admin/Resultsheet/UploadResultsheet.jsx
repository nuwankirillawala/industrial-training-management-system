import React, { useState } from "react";
import { Tile } from "../../../components/card/Tile";
import { Box, Button, Stack, Typography } from "@mui/material";
import { StatusSnackBar } from "../../../components/StatusSnackBar/StatusSnackBar";
import axios from "axios";

const UploadResultsheet = () => {
  // on change states
  const [excelFile, setExcelFile] = useState(null);
  const [excelFileStatus, setExcelFileStatus] = useState(null);
  //End of on change states

  //statusSnackBar state
  const [trigger, setTrigger] = useState({
    inputError: false,
    onlyExcel: false,
    success: false,
  });
  //End of statusSnackBar state

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
        setExcelFileStatus("Success");
        console.log(excelFile);
      } else {
        setExcelFileStatus("Please select only excel file types");
        setExcelFile(null);
        handleSnackBar("onlyExcel");
      }
    } else {
      setExcelFileStatus("please select your file");
      setExcelFile(null);
      handleSnackBar("inputError");
    }
  };
  //End of Handle file

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
    <Box sx={{ height: "85vh" }}>
      <Box sx={{ mb: 1 }}>
        <Box>
          <Typography
            variant="h6"
            color="primary"
            marginBottom={"5px"}
            paddingLeft={"15px"}
          >
            Upload Result Sheet
          </Typography>
        </Box>
      </Box>
      <Box sx={{ mt: 1, mb: 1, height: "100%" }}>
        <Tile sx={{ height: "100%" }}>
          <Stack
            height={"100%"}
            direction="column"
            display={"flex"}
            justifyContent="space-around"
          >
            <Box>
              <Typography
                align="center"
                fontSize={20}
                variant="body2"
                fontWeight="bold"
              >
                Instruction for the upload:
              </Typography>{" "}
            </Box>
            <Box>
              <Typography variant="body2">
                1.Click on the file input field to open the file selection
                dialog box. <br />
                2.Navigate to the folder on your device where the Excel file is
                located.
                <br />
                3.Select the Excel file by clicking on it and then click on the
                "Open" button in the dialog box.
                <br />
                4.Once you've selected the file, the file input field should
                display the file name or path to the file.
                <br />
                5.Submit the form or perform any other necessary actions to
                upload or process the selected Excel file. <br />
                <br />
                <br />
              </Typography>
              <Typography variant="body2" fontWeight="bold">
                Note: It's important to ensure that the Excel file you are
                selecting is in a format that is compatible with the webpage or
                application you are using. Some file formats, such as older
                versions of Excel files, may not be compatible and may cause
                errors or problems.
              </Typography>
            </Box>
            <Box display="flex" justifyContent="center">
              <form onSubmit={handleSubmit}>
                <input
                  onSubmit={handleSubmit}
                  type="file"
                  onChange={handleFile}
                />
                <br />
                <Button
                  // type="submit"
                  variant="itms"
                  size="itms-x-small"
                  onClick={handleSubmit}
                  sx={{ mt: 1 }}
                >
                  Submit
                </Button>
              </form>
            </Box>
          </Stack>

          <StatusSnackBar
            severity="error"
            trigger={trigger.inputError}
            setTrigger={() => {
              handleSnackBar("inputError");
            }}
            alertMessage={excelFileStatus}
          />
          <StatusSnackBar
            severity="error"
            trigger={trigger.onlyExcel}
            setTrigger={() => {
              handleSnackBar("onlyExcel");
            }}
            alertMessage={excelFileStatus}
          />
          <StatusSnackBar
            severity="success"
            trigger={trigger.success}
            setTrigger={() => {
              handleSnackBar("success");
            }}
            alertMessage={excelFileStatus}
          />
        </Tile>
      </Box>
    </Box>
  );
};

export default UploadResultsheet;
