import React, { useState, useEffect } from "react";
import { Tile } from "../../card/Tile";
import {
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Stack,
  Box,
  Divider,
  Paper,
} from "@mui/material";
import { Formik } from "formik";
import axios from "axios";
import { StatusSnackBar } from "../../StatusSnackBar/StatusSnackBar";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

axios.defaults.withCredentials = true;

const CompanyChoice = {
  company01: "",
  jobRole01: "",
  company02: "",
  jobRole02: "",
  company03: "",
  jobRole03: "",
  company04: "",
  jobRole04: "",
  company05: "",
  jobRole05: "",
};

export const StudentCompanyChoice = () => {
  const [choice, setChoice] = useState(CompanyChoice);
  const [companyList, setCompanyList] = useState([]);
  const [choisedCompany, setChoisedCompany] = useState();
  const [message, setMessage] = useState();

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
      //   console.log(res);
      if (res.status === 200) {
        // console.log("company list : ", res.data);
        setCompanyList(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getChoisedCompany = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/v1/undergraduate/intern/company-selection"
      );
      if (res.status === 200) {
        console.log(
          "Student choices : ",
          res.data.companySelection.companySelection
        );
        setChoisedCompany(res.data.companySelection.companySelection);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCompanyList();
    getChoisedCompany();
  }, []);
  //End of fetch data

  const handleOnSubmit = async (values) => {
    console.log("values : ", values);
    try {
      const res = await axios.patch(
        "http://localhost:5000/api/v1/undergraduate/intern/company-selection",
        {
          choice01: {
            company: values.company01,
            robRole: values.jobRole01,
          },
          choice02: {
            company: values.company02,
            robRole: values.jobRole02,
          },
          choice03: {
            company: values.company03,
            robRole: values.jobRole03,
          },
          choice04: {
            company: values.company04,
            robRole: values.jobRole04,
          },
          choice05: {
            company: values.company05,
            robRole: values.jobRole05,
          },
        },
        { withCredentials: true }
      );
      console.log(res.status);
      if (res.status === 200) {
        setMessage("Update Succefully");
        handleSnackBar("success");
      }
    } catch (error) {
      console.log(error.response.status);
      //   console.log(error.response.data.error);
      if (error.response.status === 400) {
        setMessage("You can not update the choices");
        handleSnackBar("error");
      } else {
        setMessage("update Fail");
        handleSnackBar("error");
      }
    }
  };

  return (
    // <Tile>
    <Grid container spacing={3}>
      <Grid item md={12} spacing={3}>
        <Stack spacing={1}>
          <Stack direction={"column"}>
            <Typography variant="head3">Company Selection</Typography>
          </Stack>
          <Stack>
            <Typography variant="body">
              Select 5 companies you wish to apply Internship
            </Typography>
          </Stack>
          <Divider />
        </Stack>
      </Grid>

      <Grid item md={12}>
        <Stack spacing={2}>
          <Stack>
            <Paper
              variant="outlined"
              sx={{
                bgcolor: "#faf7dc",
                padding: 2,
                borderColor: "#fff",
              }}
            >
              <Stack spacing={1}>
                <Stack direction={"row"} spacing={1}>
                  <WarningAmberIcon color="error" />
                  <Typography color={"error"} fontWeight={"bold"}>
                    warning !!
                  </Typography>
                </Stack>
                <Stack>
                  <Typography variant="body" color={"GrayText"}>
                    The form restricted to edit again, Fill the form at once.
                  </Typography>
                </Stack>
              </Stack>
            </Paper>
          </Stack>
          <Stack>
            <Formik initialValues={CompanyChoice} onSubmit={handleOnSubmit}>
              {({ values, handleChange, handleSubmit, handleReset }) => (
                <form onSubmit={handleSubmit}>
                  <Stack direction={"column"} spacing={1}>
                    <Stack direction={"row"} spacing={2}>
                      <Stack flex={2}>
                        <Typography variant="body1">Choice 01</Typography>
                      </Stack>
                      <Stack flex={3}>
                        <FormControl fullWidth size="small">
                          <InputLabel>Company</InputLabel>
                          <Select
                            variant="outlined"
                            labelId="company01"
                            id="company01"
                            name="company01"
                            value={values.company01}
                            onChange={handleChange}
                            label="company01"
                          >
                            {companyList.map((company) => (
                              <MenuItem value={company._id}>
                                {company.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Stack>
                      <Stack flex={3}>
                        <FormControl fullWidth size="small">
                          <InputLabel>Job Role</InputLabel>
                          <Select
                            variant="outlined"
                            labelId="jobRole01"
                            id="jobRole01"
                            name="jobRole01"
                            value={values.jobRole01}
                            onChange={handleChange}
                            label="jobRole01"
                          >
                            <MenuItem value={"software_engineering"}>
                              Software eng
                            </MenuItem>
                            <MenuItem value={"business_analyst"}>
                              Business Analyst
                            </MenuItem>
                            <MenuItem value={"quality_achueance"}>
                              Quality Achueance
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </Stack>
                    </Stack>

                    <Stack direction={"row"} spacing={2}>
                      <Stack flex={2}>
                        <Typography variant="body1">Choice 02</Typography>
                      </Stack>
                      <Stack flex={3}>
                        <FormControl fullWidth size="small">
                          <InputLabel>Company</InputLabel>
                          <Select
                            variant="outlined"
                            labelId="company02"
                            id="company02"
                            name="company02"
                            value={values.company02}
                            onChange={handleChange}
                            label="company02"
                          >
                            {companyList.map((company) => (
                              <MenuItem value={company._id}>
                                {company.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Stack>
                      <Stack flex={3}>
                        <FormControl fullWidth size="small">
                          <InputLabel>Job Role</InputLabel>
                          <Select
                            variant="outlined"
                            labelId="jobRole02"
                            id="jobRole02"
                            name="jobRole02"
                            value={values.jobRole02}
                            onChange={handleChange}
                            label="jobRole02"
                          >
                            <MenuItem value={"software_engineering"}>
                              Software eng
                            </MenuItem>
                            <MenuItem value={"business_analyst"}>
                              Business Analyst
                            </MenuItem>
                            <MenuItem value={"quality_achueance"}>
                              Quality Achueance
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </Stack>
                    </Stack>

                    <Stack direction={"row"} spacing={2}>
                      <Stack flex={2}>
                        <Typography variant="body1">Choice 03</Typography>
                      </Stack>
                      <Stack flex={3}>
                        <FormControl fullWidth size="small">
                          <InputLabel>Company</InputLabel>
                          <Select
                            variant="outlined"
                            labelId="company03"
                            id="company03"
                            name="company03"
                            value={values.company03}
                            onChange={handleChange}
                            label="company03"
                          >
                            {companyList.map((company) => (
                              <MenuItem value={company._id}>
                                {company.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Stack>
                      <Stack flex={3}>
                        <FormControl fullWidth size="small">
                          <InputLabel>Job Role</InputLabel>
                          <Select
                            variant="outlined"
                            labelId="jobRole03"
                            id="jobRole03"
                            name="jobRole03"
                            value={values.jobRole03}
                            onChange={handleChange}
                            label="jobRole03"
                          >
                            <MenuItem value={"software_engineering"}>
                              Software eng
                            </MenuItem>
                            <MenuItem value={"business_analyst"}>
                              Business Analyst
                            </MenuItem>
                            <MenuItem value={"quality_achueance"}>
                              Quality Achueance
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </Stack>
                    </Stack>

                    <Stack direction={"row"} spacing={2}>
                      <Stack flex={2}>
                        <Typography variant="body1">Choice 04</Typography>
                      </Stack>
                      <Stack flex={3}>
                        <FormControl fullWidth size="small">
                          <InputLabel>Company</InputLabel>
                          <Select
                            variant="outlined"
                            labelId="company04"
                            id="company04"
                            name="company04"
                            value={values.company04}
                            onChange={handleChange}
                            label="company04"
                          >
                            {companyList.map((company) => (
                              <MenuItem value={company._id}>
                                {company.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Stack>
                      <Stack flex={3}>
                        <FormControl fullWidth size="small">
                          <InputLabel>Job Role</InputLabel>
                          <Select
                            variant="outlined"
                            labelId="jobRole04"
                            id="jobRole04"
                            name="jobRole04"
                            value={values.jobRole04}
                            onChange={handleChange}
                            label="jobRole04"
                          >
                            <MenuItem value={"software_engineering"}>
                              Software eng
                            </MenuItem>
                            <MenuItem value={"business_analyst"}>
                              Business Analyst
                            </MenuItem>
                            <MenuItem value={"quality_achueance"}>
                              Quality Achueance
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </Stack>
                    </Stack>

                    <Stack direction={"row"} spacing={2}>
                      <Stack flex={2}>
                        <Typography variant="body1">Choice 05</Typography>
                      </Stack>
                      <Stack flex={3}>
                        <FormControl fullWidth size="small">
                          <InputLabel>Company</InputLabel>
                          <Select
                            variant="outlined"
                            labelId="company05"
                            id="company05"
                            name="company05"
                            value={values.company05}
                            onChange={handleChange}
                            label="company05"
                          >
                            {companyList.map((company) => (
                              <MenuItem value={company._id}>
                                {company.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Stack>
                      <Stack flex={3}>
                        <FormControl fullWidth size="small">
                          <InputLabel>Job Role</InputLabel>
                          <Select
                            variant="outlined"
                            labelId="jobRole05"
                            id="jobRole05"
                            name="jobRole05"
                            value={values.jobRole05}
                            onChange={handleChange}
                            label="jobRole05"
                          >
                            <MenuItem value={"software_engineering"}>
                              Software eng
                            </MenuItem>
                            <MenuItem value={"business_analyst"}>
                              Business Analyst
                            </MenuItem>
                            <MenuItem value={"quality_achueance"}>
                              Quality Achueance
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </Stack>
                    </Stack>

                    <Stack alignItems="flex-end">
                      <Stack direction={"row"}>
                        <Button
                          variant="itms"
                          size="itms-small"
                          onClick={handleReset}
                        >
                          cancel
                        </Button>
                        <Button variant="itms" size="itms-small" type="submit">
                          Save
                        </Button>
                      </Stack>
                    </Stack>
                  </Stack>
                </form>
              )}
            </Formik>
          </Stack>
        </Stack>
        {/* success and error messagers */}
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
      </Grid>
    </Grid>
    // </Tile>
  );
};
