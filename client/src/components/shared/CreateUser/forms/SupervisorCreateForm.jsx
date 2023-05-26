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
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { Tile } from "../../../card/Tile";
import { Formik } from "formik";
import * as yup from "yup";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { StatusSnackBar } from "../../../StatusSnackBar/StatusSnackBar";
import axios from "axios";

const User = {
  supervisorName: "",
  supervisorEmail: "",
  supervisorContactNo: "",
  supervisorCompany: "",
  supervisorJobRole: "",
  supervisorPassword: "",
  supervisorConfirmPassword: "",
};

export const SupervisorCreateForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [companyList, setCompanyList] = useState([]);
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

  //fetch data
  const getCompanyList = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/v1/company/all");
      console.log("company list ", res);
      if (res.status === 200) {
        console.log("company list : ", res.data);
        setCompanyList(res.data);
      }
    } catch (error) {
      console.log("errrrrr", error);
    }
  };

  useEffect(() => {
    getCompanyList();
  }, []);
  //End of fetch data

  const handleFormSubmit = async (values) => {
    // console.log(values);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/supervisor/create",
        {
          name: values.supervisorName,
          email: values.supervisorEmail,
          contactNo: values.supervisorContactNo,
          company: values.supervisorCompany,
          jobRole: values.supervisorRegNo,
          password: values.supervisorPassword,
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
    } catch (error) {
      // setMessage(error.response.data.message);
      console.log(error);
      handleSnackBar("error");
    }
  };

  const validation = yup.object().shape({
    supervisorName: yup.string().required("required Field"),
    supervisorEmail: yup
      .string()
      .email("Invalid Email")
      .required("required Field"),
    supervisorContactNo: yup.string().length(10, "must contain 10 digits"),
    supervisorCompany: yup.string().required("required Field"),
    supervisorJobRole: yup.string().required("Required Field"),
    supervisorPassword: yup
      .string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
        "Must Contain 6 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      )
      .required("Enter your new password"),
    supervisorConfirmPassword: yup
      .string()
      .oneOf([yup.ref("supervisorPassword")], "Your password do not match.")
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
                        // onReset={handleReset}
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
                                    value={values.supervisorName}
                                    name="supervisorName"
                                    error={
                                      !!touched.supervisorName &&
                                      !!errors.supervisorName
                                    }
                                    helperText={
                                      touched.supervisorName &&
                                      errors.supervisorName
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
                                    value={values.supervisorEmail}
                                    name="supervisorEmail"
                                    error={
                                      !!touched.supervisorEmail &&
                                      !!errors.supervisorEmail
                                    }
                                    helperText={
                                      touched.supervisorEmail &&
                                      errors.supervisorEmail
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
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    values={values.supervisorContactNo}
                                    name="supervisorContactNo"
                                    error={
                                      !!touched.supervisorContactNo &&
                                      !!errors.supervisorContactNo
                                    }
                                    helperText={
                                      touched.supervisorContactNo &&
                                      errors.supervisorContactNo
                                    }
                                  />
                                </Stack>
                              </Stack>

                              <Stack direction={"row"}>
                                <Stack minWidth={"200px"} flex={1}>
                                  <Typography fontWeight={"bold"}>
                                    Supervisor Company
                                  </Typography>
                                </Stack>
                                <Stack flex={3} maxWidth={"30vw"}>
                                  <FormControl fullWidth size="small">
                                    <Select
                                      variant="outlined"
                                      labelId="supervisorCompany"
                                      id="supervisorCompany"
                                      name="supervisorCompany"
                                      value={values.supervisorCompany}
                                      onChange={handleChange}
                                      label="supervisorCompany"
                                    >
                                      {companyList.map((company) => (
                                        <MenuItem value={company._id}>
                                          {company.name}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </FormControl>
                                </Stack>
                              </Stack>

                              <Stack direction={"row"}>
                                <Stack minWidth={"200px"} flex={1}>
                                  <Typography fontWeight={"bold"}>
                                    Supervisor JobRole
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
                                    value={values.supervisorJobRole}
                                    name="supervisorJobRole"
                                    error={
                                      !!touched.supervisorJobRole &&
                                      !!errors.supervisorJobRole
                                    }
                                    helperText={
                                      touched.supervisorJobRole &&
                                      errors.supervisorJobRole
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
                                    value={values.supervisorPassword}
                                    name="supervisorPassword"
                                    error={
                                      !!touched.supervisorPassword &&
                                      !!errors.supervisorPassword
                                    }
                                    helperText={
                                      touched.supervisorPassword &&
                                      errors.supervisorPassword
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
                                    value={values.supervisorConfirmPassword}
                                    name="supervisorConfirmPassword"
                                    error={
                                      !!touched.supervisorConfirmPassword &&
                                      !!errors.supervisorConfirmPassword
                                    }
                                    helperText={
                                      touched.supervisorConfirmPassword &&
                                      errors.supervisorConfirmPassword
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
