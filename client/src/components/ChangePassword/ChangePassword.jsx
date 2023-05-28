import React, { useState } from "react";
import {
  Stack,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Box,
} from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { StatusSnackBar } from "../StatusSnackBar/StatusSnackBar";
import axios from "axios";

const pwd = {
  currentpassword: "",
  newPassword: "",
  confirmPassword: "",
};

export const ChangePassword = (userID) => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const handleClickShowCurrentPassword = () =>
    setShowCurrentPassword(!showCurrentPassword);
  const handleMouseDownCurrentPassword = () =>
    setShowCurrentPassword(!showCurrentPassword);

  const [showNewPassword, setShowNewPassword] = useState(false);
  const handleClickShowNewPassword = () => setShowNewPassword(!showNewPassword);
  const handleMouseDownNewPassword = () => setShowNewPassword(!showNewPassword);

  //statusSnackBar state
  const [trigger, setTrigger] = useState({
    success: false,
    error: false,
  });
  //End of statusSnackBar state
  const handleSnackBar = (key) => {
    setTrigger((prevState) => {
      let newState = { ...prevState };
      newState[key] = !newState[key];
      return newState;
    });
  };

  const handleOnSubmit = async (values) => {
    console.log(values.currentpassword);
    console.log(values.newPassword);
    console.log(userID.userId);
    try {
      const res = await axios.patch(
        "http://localhost:5000/api/v1/auth/update-password",
        {
          userId: userID.userId,
          oldPassword: values.currentpassword,
          newPassword: values.newPassword,
        },
        { withCredentials: true }
      );
      console.log("responces :", res.status);
      if (res.status === 200) {
        handleSnackBar("success");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const validatePwd = Yup.object().shape({
    currentpassword: Yup.string()
      // .length(6, "You must enter 6 characters")
      .required("Enter your current password"),
    newPassword: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
        "Must Contain 6 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      )
      .required("Enter your new password"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Your password do not match.")
      .required("Confirm your new password"),
  });

  return (
    <Box>
      <Formik
        initialValues={pwd}
        validationSchema={validatePwd}
        onSubmit={handleOnSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          handleReset,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <Stack direction={"column"} spacing={1}>
              <TextField
                variant="outlined"
                size="small"
                label="Current Password"
                type={showCurrentPassword ? "text" : "password"}
                value={values.currentpassword}
                name="currentpassword"
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
                error={!!touched.currentpassword && !!errors.currentpassword}
                helperText={touched.currentpassword && errors.currentpassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowCurrentPassword}
                        onMouseDown={handleMouseDownCurrentPassword}
                      >
                        {showCurrentPassword ? (
                          <VisibilityOutlinedIcon />
                        ) : (
                          <VisibilityOffOutlinedIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                variant="outlined"
                size="small"
                label="New Password"
                type={showNewPassword ? "text" : "password"}
                value={values.newPassword}
                name="newPassword"
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
                error={!!touched.newPassword && !!errors.newPassword}
                helperText={touched.newPassword && errors.newPassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowNewPassword}
                        onMouseDown={handleMouseDownNewPassword}
                      >
                        {showNewPassword ? (
                          <VisibilityOutlinedIcon />
                        ) : (
                          <VisibilityOffOutlinedIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                variant="outlined"
                size="small"
                label="Confirm Password"
                type={showNewPassword ? "text" : "password"}
                value={values.confirmPassword}
                name="confirmPassword"
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
                error={!!touched.confirmPassword && !!errors.confirmPassword}
                helperText={touched.confirmPassword && errors.confirmPassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowNewPassword}
                        onMouseDown={handleMouseDownNewPassword}
                      >
                        {showNewPassword ? (
                          <VisibilityOutlinedIcon />
                        ) : (
                          <VisibilityOffOutlinedIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Stack diraction={"row"} alignItems={"flex-end"}>
                <Stack direction={"row"}>
                  <Button variant="itms" onClick={handleReset}>
                    clear
                  </Button>
                  <Button variant="itms" type="submit">
                    save
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          </form>
        )}
      </Formik>

      <StatusSnackBar
        severity="success"
        trigger={trigger.success}
        setTrigger={() => {
          handleSnackBar("success");
        }}
        alertMessage={"Update Success"}
      />
      <StatusSnackBar
        severity="error"
        trigger={trigger.error}
        setTrigger={() => {
          handleSnackBar("error");
        }}
        alertMessage={"Update Fail"}
      />
    </Box>
  );
};
