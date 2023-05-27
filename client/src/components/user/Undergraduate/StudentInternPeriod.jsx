import React from "react";
import { useState, useEffect } from "react";
import { Tile } from "../../card/Tile";
import {
  Grid,
  Typography,
  Button,
  TextField,
  Stack,
  Select,
  MenuItem,
  Divider,
  Paper,
} from "@mui/material";
import { Formik } from "formik";
import axios from "axios";
import * as yup from "yup";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { StatusSnackBar } from "../../StatusSnackBar/StatusSnackBar";

const Internperiod = {
  companyName: "",
  startDate: "",
  endDate: "",
  jobRole: "",
  type: "",
};

export const StudentInternPeriod = () => {
  const [values, setValues] = useState(Internperiod);
  const [companyList, setCompanyList] = useState([]);
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

  //fetch data
  const getCompanyList = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/v1/company/intern-process/company-list"
      );
      if (res.status === 200) {
        setCompanyList(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCompanyList();
  }, []);
  //End of fetch data

  const validation = yup.object().shape({
    companyName: yup.string().required("required Field"),
    jobRole: yup.string().required("required Field"),
    type: yup.string().required("required Field"),
    startDate: yup.string().required("required Field"),
    endDate: yup.string().required("required Field"),
  });

  const handleOnSubmit = async (values) => {
    // console.log(values);
    // console.log(values.startDate);
    try {
      const res = await axios.patch(
        "http://localhost:5000/api/v1/undergraduate/intern/internship",
        {
          companyId: values.companyName,
          jobRole: values.jobRole,
          type: values.type,
          internshipStartDate: values.startDate,
          internshipEndDate: values.endDate,
        },
        { withCredentials: true }
      );
      //   console.log(res.status);
      if (res.status === 201) {
        handleSnackBar("success");
      } else {
        handleSnackBar("error");
      }
    } catch (error) {
      handleSnackBar("error");
      console.log(error);
    }
  };

  return (
    // <Tile>
    <Stack spacing={2} direction={"column"}>
      <Stack>
        <Typography variant="head6">Update Intership Period</Typography>
      </Stack>
      <Divider />

      <Stack spacing={2}>
        <Stack direction={"row"} justifyContent={"center"}>
          <Stack width={"50vw"}>
            <Paper variant="outlined" sx={{ bgcolor: "#fff", padding: 2 }}>
              <Formik
                initialValues={Internperiod}
                onSubmit={handleOnSubmit}
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
                    <Stack direction={"column"} spacing={2}>
                      <Stack direction={"row"} spacing={3}>
                        <Stack flex={2}>
                          <Typography variant="body1">
                            Internship Type
                          </Typography>
                        </Stack>
                        <Stack flex={3}>
                          <RadioGroup
                            defaultValue="internal"
                            row
                            variant="outlined"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            name="type"
                            value={values.type}
                            error={!!touched.type && !!errors.type}
                            helperText={touched.type && errors.type}
                          >
                            <FormControlLabel
                              value="internal"
                              control={<Radio />}
                              label="Internal"
                            />
                            <FormControlLabel
                              value="external"
                              control={<Radio />}
                              label="External"
                            />
                          </RadioGroup>
                        </Stack>
                      </Stack>

                      <Stack direction={"row"} spacing={3}>
                        <Stack flex={2}>
                          <Typography variant="body1">
                            Selected Company
                          </Typography>
                        </Stack>

                        <Stack flex={3}>
                          <Select
                            variant="outlined"
                            // label='Intership Start Date'
                            size="small"
                            fullWidth
                            onChange={handleChange}
                            name="companyName"
                            value={values.companyName}
                            labelId="companyName"
                            id="companyName"
                          >
                            {companyList.map((company) => (
                              <MenuItem value={company._id}>
                                {company.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </Stack>
                      </Stack>

                      <Stack direction={"row"} spacing={3}>
                        <Stack flex={2}>
                          <Typography variant="body1">
                            Intership Start Date
                          </Typography>
                        </Stack>
                        <Stack flex={3}>
                          <TextField
                            variant="outlined"
                            // label='Intership Start Date'
                            size="small"
                            fullWidth
                            onBlur={handleBlur}
                            onChange={handleChange}
                            name="startDate"
                            value={values.startDate}
                            error={!!touched.startDate && !!errors.startDate}
                            helperText={touched.startDate && errors.startDate}
                            type="date"
                          ></TextField>
                        </Stack>
                      </Stack>

                      <Stack direction={"row"} spacing={3}>
                        <Stack flex={2}>
                          <Typography variant="body1">
                            Intership End Date
                          </Typography>
                        </Stack>
                        <Stack flex={3}>
                          <TextField
                            variant="outlined"
                            // label='Intership End Date'
                            size="small"
                            fullWidth
                            onBlur={handleBlur}
                            onChange={handleChange}
                            name="endDate"
                            value={values.endDate}
                            error={!!touched.endDate && !!errors.endDate}
                            helperText={touched.endDate && errors.endDate}
                            type="date"
                          ></TextField>
                        </Stack>
                      </Stack>

                      <Stack direction={"row"} spacing={3}>
                        <Stack flex={2}>
                          <Typography variant="body1">Job Role</Typography>
                        </Stack>
                        <Stack flex={3}>
                          <Select
                            variant="outlined"
                            // label='Intership Start Date'
                            size="small"
                            fullWidth
                            onChange={handleChange}
                            name="jobRole"
                            value={values.jobRole}
                            labelId="jobRole"
                            id="jobRole"
                          >
                            <MenuItem value="none">
                              <em>None</em>
                            </MenuItem>
                            <MenuItem value="Software Engineering">
                              Software Engineering
                            </MenuItem>
                            <MenuItem value="Business Anylist">
                              Business Anylist
                            </MenuItem>
                            <MenuItem value="Quality Achurence">
                              Quality Achurence
                            </MenuItem>
                          </Select>
                        </Stack>
                      </Stack>

                      <Stack alignItems={"flex-end"}>
                        <Stack direction={"row"}>
                          <Button
                            variant="itms"
                            size="small"
                            onClick={handleReset}
                          >
                            clear
                          </Button>

                          <Button variant="itms" size="small" type="submit">
                            Save
                          </Button>
                        </Stack>
                      </Stack>
                    </Stack>
                  </form>
                )}
              </Formik>
            </Paper>
          </Stack>
        </Stack>
        <Stack direction={"row"} justifyContent={"center"}>
          <Stack>
            <Paper variant="outlined" sx={{ bgcolor: "#fff", padding: 2 }}>
              <Stack direction={"column"} spacing={1}>
                <Typography
                  color={"GrayText"}
                  fontWeight={"bold"}
                  variant="caption"
                >
                  If your company is not listed here, Please contact the system
                  adminitrator or computer science department
                </Typography>
                <Stack direction={"row"} justifyContent={"space-around"}>
                  <Typography
                    color={"GrayText"}
                    fontWeight={"bold"}
                    variant="caption"
                  >
                    Contact Number : 0712345689
                  </Typography>
                  <Typography
                    color={"GrayText"}
                    fontWeight={"bold"}
                    variant="caption"
                  >
                    Email : systemadmin@dcs.ruh.ac.lk
                  </Typography>
                </Stack>
              </Stack>
            </Paper>
          </Stack>
        </Stack>
      </Stack>

      {/* success and error messagers */}
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
    </Stack>
    // </Tile>
  );
};
