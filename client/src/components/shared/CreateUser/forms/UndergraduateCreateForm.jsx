import {
  TextField,
  Button,
  Typography,
  Stack,
  Box,
  InputAdornment,
  IconButton,
  Divider,
  Grid,
  Paper,
} from "@mui/material";
import React, { useState } from "react";
import { Tile } from "../../../card/Tile";
import { Formik } from "formik";
import * as yup from "yup";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { FormControl, Select, MenuItem } from "@mui/material";
import { StatusSnackBar } from "../../../StatusSnackBar/StatusSnackBar";
import axios from "axios";

const User = {
  studentName: "",
  studentRegNo: "",
  studentEmail: "",
  studentContactNo: "",
  studentGpa: "",
  studentPassword: "",
  studentConfirmPassword: "",
};

export const UndergraduateCreateForm = () => {
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
      console.log(values.studentPassword);
      const res = await axios.post(
        "http://localhost:5000/api/v1/undergraduate/create",
        {
          name: values.studentName,
          regNo: values.studentRegNo,
          email: values.studentEmail,
          contactNo: values.studentContactNo,
          password: values.studentPassword,
          gpa: values.studentGpa,
        },
        { withCredentials: true }
      );

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
    studentName: yup.string().required("required Field"),
    studentRegNo: yup.string().required("required Field"),
    studentEmail: yup
      .string()
      .email("Invalid Email")
      .required("required Field"),
    studentContactNo: yup.string().length(10, "must contain 10 digits"),
    studentGpa: yup.string(),
    studentPassword: yup
      .string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
        "Must Contain 6 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      )
      .required("Enter your new password"),
    studentConfirmPassword: yup
      .string()
      .oneOf([yup.ref("studentPassword")], "Your password do not match.")
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
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.studentName}
                                    name="studentName"
                                    error={
                                      !!touched.studentName &&
                                      !!errors.studentName
                                    }
                                    helperText={
                                      touched.studentName && errors.studentName
                                    }
                                  />
                                </Stack>
                              </Stack>

                              <Stack direction={"row"}>
                                <Stack minWidth={"200px"} flex={1}>
                                  <Typography fontWeight={"bold"}>
                                    Studnet Registration Number
                                  </Typography>
                                </Stack>
                                <Stack flex={3} maxWidth={"30vw"}>
                                  <TextField
                                    fullWidth
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.studentRegNo}
                                    name="studentRegNo"
                                    error={
                                      !!touched.studentRegNo &&
                                      !!errors.studentRegNo
                                    }
                                    helperText={
                                      touched.studentRegNo &&
                                      errors.studentRegNo
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
                                    variant="outlined"
                                    type="email"
                                    size="small"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.studentEmail}
                                    name="studentEmail"
                                    error={
                                      !!touched.studentEmail &&
                                      !!errors.studentEmail
                                    }
                                    helperText={
                                      touched.studentEmail &&
                                      errors.studentEmail
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
                                    value={values.studentContactNo}
                                    name="studentContactNo"
                                    error={
                                      !!touched.studentContactNo &&
                                      !!errors.studentContactNo
                                    }
                                    helperText={
                                      touched.studentContactNo &&
                                      errors.studentContactNo
                                    }
                                  />
                                </Stack>
                              </Stack>

                              <Stack direction={"row"}>
                                <Stack minWidth={"200px"} flex={1}>
                                  <Typography fontWeight={"bold"}>
                                    Studnet Gpa
                                  </Typography>
                                </Stack>
                                <Stack flex={3} maxWidth={"30vw"}>
                                  <TextField
                                    fullWidth
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.studentGpa}
                                    name="studentGpa"
                                    error={
                                      !!touched.studentGpa &&
                                      !!errors.studentGpa
                                    }
                                    helperText={
                                      touched.studentGpa && errors.studentGpa
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
                                    value={values.studentPassword}
                                    name="studentPassword"
                                    error={
                                      !!touched.studentPassword &&
                                      !!errors.studentPassword
                                    }
                                    helperText={
                                      touched.studentPassword &&
                                      errors.studentPassword
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
                                    value={values.studentConfirmPassword}
                                    name="studentConfirmPassword"
                                    error={
                                      !!touched.studentConfirmPassword &&
                                      !!errors.studentConfirmPassword
                                    }
                                    helperText={
                                      touched.studentConfirmPassword &&
                                      errors.studentConfirmPassword
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
