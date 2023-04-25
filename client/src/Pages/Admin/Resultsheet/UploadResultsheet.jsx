import React, { useState } from "react";
import { Tile } from "../../../components/card/Tile";
import { Box, Button, Typography } from "@mui/material";
import { StatusSnackBar } from "../../../components/StatusSnackBar/StatusSnackBar";

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
  const handleSnackBar = (key) => {
    setTrigger((prevState) => {
      let newState = { ...prevState };
      newState[key] = !newState[key];
      return newState;
    });
  };

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
      setExcelFileStatus("plese select your file");
      setExcelFile(null);
      handleSnackBar("inputError");
    }
  };
  //End of Handle file

  // submit function
  const handleSubmit = (e) => {
    console.log("End point here");
    handleSnackBar("success");
  };
  //End of Submit Function

  return (
    <Box>
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
      <Box sx={{ mt: 1, mb: 1 }}>
        <Tile>
          <Box>
            <Typography variant="body2" align="center">
              Instruction for the upload
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
                size="itms-small"
                onClick={handleSubmit}
                sx={{ mt: 1 }}
              >
                Submit
              </Button>
            </form>
          </Box>

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
