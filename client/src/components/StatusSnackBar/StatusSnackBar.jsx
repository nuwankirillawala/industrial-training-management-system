import { Snackbar } from "@mui/material";
import React, { useState } from "react";
import MuiAlert from "@mui/material/Alert";

//creating alert by importing MuiAlert
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
//end of creating alert by importing MuiAlert

export const StatusSnackBar = ({
  trigger,
  setTrigger,
  severity,
  alertMessage,
}) => {
  //Controllers
  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }

    setTrigger(false);
  };
  //End of Controllers

  return (
    <Snackbar
      open={trigger}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {alertMessage}
      </Alert>
    </Snackbar>
  );
};
