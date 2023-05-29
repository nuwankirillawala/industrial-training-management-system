import React, { useState, useEffect } from "react";
import { Tile } from "../../components/card/Tile";
import { Grid, Stack, Box, Typography, TextField, Button } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import { ChangePassword } from "../../components/ChangePassword/ChangePassword";
import { ChangeAvatar } from "../../components/ChangeAvatar/ChangeAvatar";
import { StatusSnackBar } from "../../components/StatusSnackBar/StatusSnackBar";
import axios from "axios";

// get current values form backend and set that valuse as default values in textfields

const studentValues = {
  firstName: "",
  // lastName : '',
  // fullName : '',
  regNo: "",
  email: "",
  contactNo: "",
  linkedin: "",
  github: "",
  internStatus: "",
};

export const StudentSettings = () => {
  const [profile, setProfile] = useState(studentValues);
  const [userId, setUserId] = useState("");
  const [studentData, setStudentData] = useState({
    firstName: "",
    // lastName : '',
    // fullName : '',
    regNo: "",
    email: "",
    contactNo: "",
    linkedin: "",
    github: "",
    internStatus: "",
  });

  //fetch data
  const getStudentData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/v1/undergraduate/profile"
      );
      if (res.status === 200) {
        console.log("res :", res.data);
        setStudentData({
          firstName: res.data.name,
          //  lastName : '',
          // fullName : '',
          regNo: res.data.regNo,
          email: res.data.email,
          contactNo: res.data.contactNo,
          linkedin: res.data.linkdinURL,
          github: res.data.githubURL,
          internStatus: "cv-send",
          userId: res.data._id,
        });
        setUserId(res.data._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStudentData();
  }, []);
  //End of fetch data

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
      const res = await axios.patch(
        "http://localhost:5000/api/v1/undergraduate/profile",
        { withCredentials: true },
        {
          // name: values.adminName === "" ? studentData.name : values.adminName,
          email: values.email === "" ? studentData.email : values.email,
          contactNo:
            values.contactNo === "" ? studentData.contactNo : values.contactNo,
          githubURL:
            values.githubURL === "" ? studentData.github : values.githubURL,
          linkedin:
            values.linkedin === "" ? studentData.linkedin : values.linkedin,
          internStatus:
            values.internStatus === ""
              ? studentData.internStatus
              : values.internStatus,
        },
        { withCredentials: true }
      );
      console.log("reponse : ", res.status);
      if (res.status === 200) {
        handleSnackBar("success");
      }
    } catch (error) {
      console.log(error);
      handleSnackBar("error");
    }
  };

  const validationForm = Yup.object().shape({
    firstName: Yup.string(),
    lastName: Yup.string(),
    fullName: Yup.string(),
    regNo: Yup.string(),
    email: Yup.string().email("Invalid Email Address"),
    contactNo: Yup.string().length(10, "Invalid Number"),
    linkedin: Yup.string().url("invalid URL"),
    github: Yup.string().url("Invalid URL"),
  });

  return (
    <Grid container spacing={1}>
      <Grid item md={12}>
        <Stack>
          <Typography variant="head3" marginBottom={"5px"}>
            Update Your Profile
          </Typography>
        </Stack>
      </Grid>

      <Grid item md={3}>
        {/* <Tile> */}
        {/* <Box padding={'20px'}> */}
        <Stack direction="column" spacing={1}>
          <Tile>
            {/* update profile photo */}
            <Stack>
              <ChangeAvatar
                sumbitProfileImage={
                  "http://localhost:5000/api/v1/undergraduate/profile/image"
                }
                getProfileImage={
                  "http://localhost:5000/api/v1/undergraduate/profile"
                }
              />
            </Stack>
          </Tile>

          <Tile>
            {/* change password */}
            <Stack direction={"column"} spacing={2}>
              <Stack>
                <Typography variant="h6" fontWeight={"bold"}>
                  Change Password
                </Typography>
              </Stack>

              {/* Use change password component */}
              <Stack>
                <ChangePassword userId={userId} />
              </Stack>
            </Stack>
          </Tile>
        </Stack>
        {/* </Box> */}
        {/* </Tile> */}
      </Grid>

      {/* update profile details */}
      {/* set the current values as default values */}
      <Grid item md={9}>
        <Tile>
          <Box padding={"20px"}>
            <Stack spacing={2} direction="column">
              {/* <Stack>
                        <Typography variant='h6' fontWeight={'bold'}>Update Your Profile</Typography>
                    </Stack> */}
              <Stack alignItems={"center"}>
                <Box width={"70%"}>
                  <Formik
                    initialValues={studentValues}
                    validationSchema={validationForm}
                    onSubmit={handleFormSubmit}
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
                        <Stack spacing={1}>
                          <Stack direction={"row"}>
                            <Stack minWidth={"200px"} flex={1}>
                              <Typography>First Name</Typography>
                            </Stack>
                            <Stack flex={3}>
                              <TextField
                                variant="outlined"
                                size="small"
                                placeholder={studentData.firstName}
                                type="text"
                                name="firstName"
                                fullWidth
                                value={values.firstName}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={
                                  !!touched.firstName && !!errors.firstName
                                }
                                helperText={
                                  touched.firstName && errors.firstName
                                }
                              />
                            </Stack>
                          </Stack>
                          {/* <Stack direction={'row'}>
                                            <Stack minWidth={'200px'} flex={1}>
                                                <Typography>Last Name</Typography>
                                            </Stack>
                                            <Stack flex={3}>
                                                <TextField
                                                    variant='outlined'
                                                    size='small'
                                                    type='text'
                                                    defaultValue={'Perera'}
                                                    name='lastName'
                                                    fullWidth
                                                    value={values.lastName}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    error={!!touched.lastName && !!errors.lastName}
                                                    helperText={touched.lastName && errors.lastName}
                                                />
                                            </Stack>
                                        </Stack> */}
                          {/* 
                                        <Stack direction={'row'}>
                                            <Stack minWidth={'200px'} flex={1}>
                                                <Typography>Name With Initials</Typography>
                                            </Stack>
                                            <Stack flex={3}>
                                                <TextField
                                                    variant='outlined'
                                                    size='small'
                                                    type='text'
                                                    defaultValue={'k.Perera'}
                                                    name='fullName'
                                                    fullWidth
                                                    value={values.fullName}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    error={!!touched.fullName && !!errors.fullName}
                                                    helperText={touched.fullName && errors.fullName}
                                                    />
                                            </Stack>
                                        </Stack> */}

                          <Stack direction={"row"}>
                            <Stack flex={1} minWidth={"200px"}>
                              <Typography>Registration Number</Typography>
                            </Stack>
                            <Stack flex={3}>
                              <TextField
                                variant="outlined"
                                size="small"
                                type="text"
                                placeholder={studentData.regNo}
                                name="regNo"
                                fullWidth
                                value={values.regNo}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={!!touched.regNo && !!errors.regNo}
                                helperText={touched.regNo && errors.regNo}
                              />
                            </Stack>
                          </Stack>
                          <Stack direction={"row"} minWidth={"200px"}>
                            <Stack flex={1} minWidth={"200px"}>
                              <Typography>Email Address</Typography>
                            </Stack>
                            <Stack flex={3}>
                              <TextField
                                variant="outlined"
                                size="small"
                                type="text"
                                placeholder={studentData.email}
                                name="email"
                                fullWidth
                                value={values.email}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={!!touched.email && !!errors.email}
                                helperText={touched.email && errors.email}
                              />
                            </Stack>
                          </Stack>
                          <Stack direction={"row"}>
                            <Stack flex={1} minWidth={"200px"}>
                              <Typography>Contact Number</Typography>
                            </Stack>
                            <Stack flex={3}>
                              <TextField
                                variant="outlined"
                                size="small"
                                type="text"
                                placeholder={studentData.contactNo}
                                name="contactNo"
                                fullWidth
                                value={values.contactNo}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={
                                  !!touched.contactNo && !!errors.contactNo
                                }
                                helperText={
                                  touched.contactNo && errors.contactNo
                                }
                              />
                            </Stack>
                          </Stack>
                          <Stack direction={"row"}>
                            <Stack flex={1} minWidth={"200px"}>
                              <Typography>Linkedin Account Address</Typography>
                            </Stack>
                            <Stack flex={3}>
                              <TextField
                                variant="outlined"
                                size="small"
                                type="url"
                                placeholder={studentData.linkedin}
                                name="linkedin"
                                fullWidth
                                value={values.linkedin}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={!!touched.linkedin && !!errors.linkedin}
                                helperText={touched.linkedin && errors.linkedin}
                              />
                            </Stack>
                          </Stack>
                          <Stack direction={"row"}>
                            <Stack flex={1} minWidth={"200px"}>
                              <Typography>Github Account Address</Typography>
                            </Stack>
                            <Stack flex={3}>
                              <TextField
                                variant="outlined"
                                size="small"
                                type="url"
                                placeholder={studentData.githubURL}
                                name="github"
                                fullWidth
                                value={values.github}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={!!touched.github && !!errors.github}
                                helperText={touched.github && errors.github}
                              />
                            </Stack>
                          </Stack>
                          <Stack alignItems={"flex-end"}>
                            <Box>
                              <Button variant="itms" onClick={handleReset}>
                                reset
                              </Button>
                              <Button variant="itms" type="submit">
                                Update
                              </Button>
                            </Box>
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
                    alertMessage={"Update Successfully"}
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
              </Stack>
            </Stack>
          </Box>
        </Tile>
      </Grid>
    </Grid>
  );
};
