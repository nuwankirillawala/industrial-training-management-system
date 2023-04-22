import { Snackbar } from "@mui/material";
import React, { useState } from "react";
import MuiAlert from "@mui/material/Alert";

{
  /* ----- Documentation ----
    Create a state to controll the statusSnackBar in parent component and pass the relevent state controllers to the Snack bar component
    and other arguments are 
        severity-success or error 
        alertMessage-message that want to display

    eg: const [open, setOpen] = useState(false);

    <StatusSnackBar
        trigger= {open}
        setTrigger = {setOpen}
        severity = 'error'
        alertMessage = 'Input Error'
    />

*/
}

//creating alert by importing MuiAlert
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
//end of creating alert by importing MuiAlert

export const StatusSnackBar = ({
  trigger,
  setTrigger,
  //   vertical,
  //   horizontal,
  severity,
  alertMessage,
}) => {
  //state
  //   const [open, setOpen] = useState(false);
  //End of State

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
