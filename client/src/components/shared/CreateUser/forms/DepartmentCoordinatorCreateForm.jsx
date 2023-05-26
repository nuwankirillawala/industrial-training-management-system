import {
  TextField,
  Button,
  Typography,
  Grid,
  Stack,
  Box,
  InputAdornment,
  IconButton,
  Paper,
  Divider,
} from "@mui/material";
import React, { useState } from "react";
import { Tile } from "../../../card/Tile";
import { Formik } from "formik";
import * as yup from "yup";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { StatusSnackBar } from "../../../StatusSnackBar/StatusSnackBar";
import axios from "axios";

const User = {
  adminName: "",
  adminEmail: "",
  adminContactNo: "",
  adminStaffId: "",
  adminPassword: "",
  adminConfirmPassword: "",
};

export const DepartmentCoordinatorCreateForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);
  const handleMouseDownConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  //statusSnackBar state
  const [trigger, setTrigger] = useState({
    success: false,
    error: false,
  });
  //snackBar message state
  const [message, setMessage] = useState(null);

  //End of statusSnackBar state
  const handleSnackBar = (key) => {
    setTrigger((prevState) => {
      let newState = { ...prevState };
      newState[key] = !newState[key];
      return newState;
    });
  };

  const handleFormSubmit = async (values) => {
    // console.log(values);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/admin/create",
        {
          role: "department-coordinator",
          name: values.adminName,
          email: values.adminEmail,
          contactNo: values.adminContactNo,
          staffId: values.adminStaffId,
          password: values.adminPassword,
        },
        { withCredentials: true }
      );
      console.log(res);
      if (res.status === 201) {
        setMessage("User created successfullly");
        handleSnackBar("success");
        // alert('You data submited')
      } else {
        setMessage("User not created");
        handleSnackBar("error");
        // alert('fail to post')
      }
    } catch (error) {
      setMessage(error.response.data.message);
      // console.log(error.response.data.message);
      handleSnackBar("error");
    }
  };

  const handleReset = () => {
    <StatusSnackBar
      severity="error"
      trigger={trigger.error}
      setTrigger={() => {
        handleSnackBar("error");
      }}
      alertMessage={message}
    >
      <Button onClick={handleOk}>ok</Button>
      <Button>cancel</Button>
    </StatusSnackBar>;
  };

  const handleOk = (values, form) => {
    form.resetForm();
  };

  const validation = yup.object().shape({
    // adminName : yup.string(),
    adminName: yup.string().required("required Field"),
    adminEmail: yup.string().email("Invalid Email").required("required Field"),
    adminContactNo: yup.string().length(10, "must contain 10 digits"),
    adminStaffId: yup.string().required("required Field"),
    adminPassword: yup
      .string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
        "Must Contain 6 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      )
      .required("Enter your new password"),
    adminConfirmPassword: yup
      .string()
      .oneOf([yup.ref("adminPassword")], "Your password do not match.")
      .required("Confirm your new password"),
  });

  return (
    <Tile>
      <Stack direction={"column"} spacing={2} height={"75vh"}>
        <Stack>
          <Typography variant="head6">Creation Form</Typography>
        </Stack>
        <Divider />
        <Stack padding={"30px"}>
          <Grid container>
            <Grid item md={12}>
              <Stack alignItems={"center"}>
                <Paper
                  variant="outlined"
                  sx={{ bgcolor: "#fff", padding: 5, width: "55vw" }}
                >
                  <Stack alignItems={"center"}>
                    <Box width={"50vw"}>
                      <Formik
                        onSubmit={handleFormSubmit}
                        onReset={handleReset}
                        initialValues={User}
                        validationSchema={validation}
                      >
                        {({
                          values,
                          errors,
                          touched,
                          handleBlur,
                          handleChange,
                          handleSubmit,
                          handleReset,
                        }) => (
                          <form onSubmit={handleSubmit}>
                            <Stack direction={"column"} spacing={1}>
                              <Stack direction={"row"}>
                                <Stack minWidth={"200px"} flex={1}>
                                  <Typography fontWeight={"bold"}>
                                    Name
                                  </Typography>
                                </Stack>
                                <Stack flex={3} maxWidth={"30vw"}>
                                  <TextField
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    type="text"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.adminName}
                                    name="adminName"
                                    error={
                                      !!touched.adminName && !!errors.adminName
                                    }
                                    helperText={
                                      touched.adminName && errors.adminName
                                    }
                                  />
                                </Stack>
                              </Stack>

                              <Stack direction={"row"}>
                                <Stack minWidth={"200px"} flex={1}>
                                  <Typography fontWeight={"bold"}>
                                    Email Address
                                  </Typography>
                                </Stack>
                                <Stack flex={3} maxWidth={"30vw"}>
                                  <TextField
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    type="email"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.adminEmail}
                                    name="adminEmail"
                                    error={
                                      !!touched.adminEmail &&
                                      !!errors.adminEmail
                                    }
                                    helperText={
                                      touched.adminEmail && errors.adminEmail
                                    }
                                  />
                                </Stack>
                              </Stack>
                              <Stack direction={"row"}>
                                <Stack minWidth={"200px"} flex={1}>
                                  <Typography fontWeight={"bold"}>
                                    Contact Number
                                  </Typography>
                                </Stack>
                                <Stack flex={3} maxWidth={"30vw"}>
                                  <TextField
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    type="text"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.adminContactNo}
                                    name="adminContactNo"
                                    error={
                                      !!touched.adminContactNo &&
                                      !!errors.adminContactNo
                                    }
                                    helperText={
                                      touched.adminContactNo &&
                                      errors.adminContactNo
                                    }
                                  />
                                </Stack>
                              </Stack>

                              <Stack direction={"row"}>
                                <Stack minWidth={"200px"} flex={1}>
                                  <Typography fontWeight={"bold"}>
                                    Staff Id
                                  </Typography>
                                </Stack>
                                <Stack flex={3} maxWidth={"30vw"}>
                                  <TextField
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    type="text"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.adminStaffId}
                                    name="adminStaffId"
                                    error={
                                      !!touched.adminStaffId &&
                                      !!errors.adminStaffId
                                    }
                                    helperText={
                                      touched.adminStaffId &&
                                      errors.adminStaffId
                                    }
                                  />
                                </Stack>
                              </Stack>

                              <Stack direction={"row"}>
                                <Stack minWidth={"200px"} flex={1}>
                                  <Typography fontWeight={"bold"}>
                                    Password
                                  </Typography>
                                </Stack>
                                <Stack flex={3} maxWidth={"30vw"}>
                                  <TextField
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    type={showPassword ? "text" : "password"}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.adminPassword}
                                    name="adminPassword"
                                    error={
                                      !!touched.adminPassword &&
                                      !!errors.adminPassword
                                    }
                                    helperText={
                                      touched.adminPassword &&
                                      errors.adminPassword
                                    }
                                    InputProps={{
                                      endAdornment: (
                                        <InputAdornment position="end">
                                          <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={
                                              handleMouseDownPassword
                                            }
                                          >
                                            {showPassword ? (
                                              <VisibilityOutlinedIcon />
                                            ) : (
                                              <VisibilityOffOutlinedIcon />
                                            )}
                                          </IconButton>
                                        </InputAdornment>
                                      ),
                                    }}
                                  />
                                </Stack>
                              </Stack>
                              <Stack direction={"row"}>
                                <Stack minWidth={"200px"} flex={1}>
                                  <Typography fontWeight={"bold"}>
                                    Confirm Password
                                  </Typography>
                                </Stack>
                                <Stack flex={3} maxWidth={"30vw"}>
                                  <TextField
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    type={
                                      showConfirmPassword ? "text" : "password"
                                    }
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.adminConfirmPassword}
                                    name="adminConfirmPassword"
                                    error={
                                      !!touched.adminConfirmPassword &&
                                      !!errors.adminConfirmPassword
                                    }
                                    helperText={
                                      touched.adminConfirmPassword &&
                                      errors.adminConfirmPassword
                                    }
                                    InputProps={{
                                      endAdornment: (
                                        <InputAdornment position="end">
                                          <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={
                                              handleClickShowConfirmPassword
                                            }
                                            onMouseDown={
                                              handleMouseDownConfirmPassword
                                            }
                                          >
                                            {showConfirmPassword ? (
                                              <VisibilityOutlinedIcon />
                                            ) : (
                                              <VisibilityOffOutlinedIcon />
                                            )}
                                          </IconButton>
                                        </InputAdornment>
                                      ),
                                    }}
                                  />
                                </Stack>
                              </Stack>

                              <Stack alignItems={"flex-end"}>
                                <Stack direction={"row"}>
                                  <Button
                                    variant="itms"
                                    size="itms-small"
                                    onClick={handleReset}
                                  >
                                    clear
                                  </Button>

                                  <Button
                                    variant="itms"
                                    size="itms-small"
                                    type="submit"
                                  >
                                    ADD
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
                        alertMessage={message}
                      />

                      <StatusSnackBar
                        severity="error"
                        trigger={trigger.error}
                        setTrigger={() => {
                          handleSnackBar("error");
                        }}
                        alertMessage={message}
                      />
                    </Box>
                  </Stack>
                </Paper>
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Stack>
    </Tile>
  );
};
