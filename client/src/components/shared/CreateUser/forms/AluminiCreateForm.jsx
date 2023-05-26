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
  aluminiName: "",
  aluminiEmail: "",
  aluminiContactNo: "",
  aluminiRegNo: "",
  aluminiGraduatedYear: "",
  aluminiPassword: "",
  aluminiConfirmPassword: "",
};

export const AluminiCreateForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const [message, setMessage] = useState(null);

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
  //End of statusSnackBar state
  const handleSnackBar = (key) => {
    setTrigger((prevState) => {
      let newState = { ...prevState };
      newState[key] = !newState[key];
      return newState;
    });
  };

  const handleFormSubmit = async (values) => {
    console.log(values);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/alumni/create",
        {
          name: values.aluminiName,
          email: values.aluminiEmail,
          contactNo: values.aluminiContactNo,
          regNo: values.aluminiRegNo,
          graduatedYear: values.aluminiGraduatedYear,
          password: values.aluminiPassword,
        },
        { withCredentials: true }
      );
      // console.log(res);
      if (res.status === 201) {
        setMessage("User created successfullly");
        handleSnackBar("success");
        // alert('You data submited')
      } else {
        setMessage("User not created");
        handleSnackBar("error");
        // alert('fail to post')
      }
    } catch (err) {
      if (err.response.data.errors.email !== "") {
        // setMessage(err.response.data.errors.email);
        setMessage("User already craeted");
        handleSnackBar("error");
      } else if (err.response.data.errors.regNo !== "") {
        // setMessage(err.response.data.errors.regNo);
        setMessage("User already created");
        handleSnackBar("error");
      }
    }
  };

  const validation = yup.object().shape({
    aluminiName: yup.string().required("required Field"),
    aluminiEmail: yup
      .string()
      .email("Invalid Email")
      .required("required Field"),
    aluminiContactNo: yup.string().length(10, "must contain 10 digits"),
    aluminiRegNo: yup.string().required("required Field"),
    aluminiGraduatedYear: yup.string().required("Required Field"),
    aluminiPassword: yup
      .string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
        "Must Contain 6 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      )
      .required("Enter your new password"),
    aluminiConfirmPassword: yup
      .string()
      .oneOf([yup.ref("aluminiPassword")], "Your password do not match.")
      .required("Confirm your new password"),
  });

  return (
    <Tile>
      <Stack direction={"column"} spacing={2} height={"75vh"}>
        <Stack>
          <Typography variant="head6">Creation Form</Typography>
        </Stack>
        <Divider />
        <Stack>
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
                                    value={values.aluminiName}
                                    name="aluminiName"
                                    error={
                                      !!touched.aluminiName &&
                                      !!errors.aluminiName
                                    }
                                    helperText={
                                      touched.aluminiName && errors.aluminiName
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
                                    value={values.aluminiEmail}
                                    name="aluminiEmail"
                                    error={
                                      !!touched.aluminiEmail &&
                                      !!errors.aluminiEmail
                                    }
                                    helperText={
                                      touched.aluminiEmail &&
                                      errors.aluminiEmail
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
                                    value={values.aluminiContactNo}
                                    name="aluminiContactNo"
                                    error={
                                      !!touched.aluminiContactNo &&
                                      !!errors.aluminiContactNo
                                    }
                                    helperText={
                                      touched.aluminiContactNo &&
                                      errors.aluminiContactNo
                                    }
                                  />
                                </Stack>
                              </Stack>

                              <Stack direction={"row"}>
                                <Stack minWidth={"200px"} flex={1}>
                                  <Typography fontWeight={"bold"}>
                                    Registraion Number
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
                                    value={values.aluminiRegNo}
                                    name="aluminiRegNo"
                                    error={
                                      !!touched.aluminiRegNo &&
                                      !!errors.aluminiRegNo
                                    }
                                    helperText={
                                      touched.aluminiRegNo &&
                                      errors.aluminiRegNo
                                    }
                                  />
                                </Stack>
                              </Stack>

                              <Stack direction={"row"}>
                                <Stack minWidth={"200px"} flex={1}>
                                  <Typography fontWeight={"bold"}>
                                    Graduated Year
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
                                    value={values.aluminiGraduatedYear}
                                    name="aluminiGraduatedYear"
                                    error={
                                      !!touched.aluminiGraduatedYear &&
                                      !!errors.aluminiGraduatedYear
                                    }
                                    helperText={
                                      touched.aluminiGraduatedYear &&
                                      errors.aluminiGraduatedYear
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
                                    value={values.aluminiPassword}
                                    name="aluminiPassword"
                                    error={
                                      !!touched.aluminiPassword &&
                                      !!errors.aluminiPassword
                                    }
                                    helperText={
                                      touched.aluminiPassword &&
                                      errors.aluminiPassword
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
                                    value={values.aluminiConfirmPassword}
                                    name="aluminiConfirmPassword"
                                    error={
                                      !!touched.aluminiConfirmPassword &&
                                      !!errors.aluminiConfirmPassword
                                    }
                                    helperText={
                                      touched.aluminaluminiConfirmPasswordiPassword &&
                                      errors.aluminiConfirmPassword
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
