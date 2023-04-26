import { TextField, Button, Typography, Stack, Box, InputAdornment, IconButton } from "@mui/material"
import React, {useState} from "react"
import { Tile } from '../../../card/Tile'
import { Formik } from "formik"
import * as yup from "yup"
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { FormControl, Select, MenuItem } from '@mui/material'
import { StatusSnackBar } from "../../../StatusSnackBar/StatusSnackBar"
import axios from 'axios';


const User = {
    studentName : '',
    studentRegNo : '',
    studentEmail : '',
    studentContactNo : '',
    studentGpa : '',
    studentWeigthedGpa : '',
    studentInternStatus : '',
    studentLinkedInURL : '',
    studentGithubURL : '',
    studentPassword: '',
    studentConfirmPassword : '',
}

export const UndergraduateCreateForm = () => {

    //statusSnackBar state
    const [trigger, setTrigger] = useState({
        success: false,
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
        const res = await axios.post(
          "http://localhost:5000/api/v1/undergraduate/create-undergraduate", 
          { name: "Upeksha",
            regNo : "sc/2019/11112", 
            email : "la@gmail.com",
            contactNo : "1443363536",
            password: "test1234",
            gpa: 4.00,
         },
          {withCredentials: true}
          );

          console.log(res.data);
          handleSnackBar("success");
    };

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
    const handleMouseDownConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

    const validation = yup.object().shape({
        studentName : yup.string().required('required Field'),
        studentRegNo : yup.string().required('required Field'),
        studentEmail : yup.string().email("Invalid Email").required("required Field"),
        studentContactNo : yup.string().length(10,"must contain 10 digits").required("Required Field"),
        studentGpa : yup.string().required('required Field'),
        studentWeigthedGpa : yup.string().required('required Field'),
        studentInternStatus : yup.string(),
        studentLinkedInURL : yup.string().url("Invalid URL"),
        studentGithubURL : yup.string().url("Invalid URL"),
        studentPassword : yup.string().matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
            "Must Contain 6 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
          ).required('Enter your new password'),
        studentConfirmPassword : yup.string().oneOf([yup.ref("studentPassword")], "Your password do not match.").required('Confirm your new password')
    })


    return(
    <Tile>
<Box>
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={User}
            validationSchema={validation}>

            {({
                  values,
                  errors,
                  touched,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  handleReset
            }) => (

                    <form onSubmit={handleSubmit}>

                        <Stack direction={'column'} spacing={1}>

                            <Stack direction={'row'}>
                                <Stack minWidth={'200px'} flex={1}>
                                    <Typography variant="body1">Name</Typography>
                                </Stack>
                                <Stack flex={3}>
                                        <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="text"
                                        size='small'
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.studentName}
                                        name="studentName"
                                        error={!!touched.studentName && !!errors.studentName}
                                        helperText={touched.studentName && errors.studentName}
                                        />
                                </Stack>
                            </Stack>

                            <Stack direction={'row'}>
                                <Stack minWidth={'200px'} flex={1}>
                                        <Typography>Studnet Registration Number</Typography>
                                </Stack>
                                <Stack flex={3}>
                                        <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="text"
                                        size='small'
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.studentRegNo}
                                        name="studentRegNo"
                                        error={!!touched.studentRegNo && !!errors.studentRegNo}
                                        helperText={touched.studentRegNo && errors.studentRegNo}
                                        />
                                        </Stack>
                                    </Stack>

                            <Stack direction={'row'}>
                                <Stack minWidth={'200px'} flex={1}>
                                        <Typography>Email Address</Typography>
                                        </Stack>
                                <Stack flex={3}>
                                        <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="email"
                                        size='small'
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.studentEmail}
                                        name="studentEmail"
                                        error={!!touched.studentEmail && !!errors.studentEmail}
                                        helperText={touched.studentEmail && errors.studentEmail}
                                        />
                                    </Stack>
                            </Stack>

                            <Stack direction={'row'}>
                                    <Stack minWidth={'200px'} flex={1}>
                                        <Typography>Contact Number</Typography>
                                    </Stack>
                                    <Stack flex={3}>
                                        <TextField
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                        type="text"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.studentContactNo}
                                        name="studentContactNo"
                                        error={!!touched.studentContactNo && !!errors.studentContactNo}
                                        helperText={touched.studentContactNo && errors.studentContactNo}
                                        />
                                    </Stack>
                                </Stack>

                            <Stack direction={'row'}>
                                <Stack minWidth={'200px'} flex={1}>
                                        <Typography>Studnet Gpa</Typography>
                                        </Stack>
                                <Stack flex={3}>
                                        <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="text"
                                        size='small'
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.studentGpa}
                                        name="studentGpa"
                                        error={!!touched.studentGpa && !!errors.studentGpa}
                                        helperText={touched.studentGpa && errors.studentGpa}
                                        />
                                    </Stack>
                            </Stack>

                           <Stack direction={'row'}>
                                <Stack minWidth={'200px'} flex={1}>
                                        <Typography>Studnet Weigthed Gpa</Typography>
                                        </Stack>
                                <Stack flex={3}>
                                        <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="text"
                                        size='small'
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.studentWeigthedGpa}
                                        name="studentWeigthedGpa"
                                        error={!!touched.studentWeigthedGpa && !!errors.studentWeigthedGpa}
                                        helperText={touched.studentWeigthedGpa && errors.studentWeigthedGpa}
                                        />
                                    </Stack>
                            </Stack>

                            <Stack direction={'row'}>
                                <Stack minWidth={'200px'} flex={1}>
                                        <Typography>Intern Status</Typography>
                                        </Stack>
                                <Stack flex={3}>
                                        <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="text"
                                        size='small'
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.studentInternStatus}
                                        name="studentInternStatus"
                                        error={!!touched.studentInternStatus && !!errors.studentInternStatus}
                                        helperText={touched.studentInternStatus && errors.studentInternStatus}
                                        />
                                    </Stack>
                            </Stack>

                            <Stack direction={'row'}>
                                <Stack minWidth={'200px'} flex={1}>
                                        <Typography>LinkedIn URL</Typography>
                                        </Stack>
                                <Stack flex={3}>
                                        <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="url"
                                        size='small'
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.studentLinkedInURL}
                                        name="studentLinkedInURL"
                                        error={!!touched.studentLinkedInURL && !!errors.studentLinkedInURL}
                                        helperText={touched.studentLinkedInURL && errors.studentLinkedInURL}
                                        />
                                    </Stack>
                            </Stack>

                            <Stack direction={'row'}>
                                <Stack minWidth={'200px'} flex={1}>
                                        <Typography>Github URL</Typography>
                                        </Stack>
                                <Stack flex={3}>
                                        <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="text"
                                        size='small'
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.studentGithubURL}
                                        name="studentGithubURL"
                                        error={!!touched.studentGithubURL && !!errors.studentGithubURL}
                                        helperText={touched.studentGithubURL && errors.studentGithubURL}
                                        />
                                    </Stack>
                            </Stack>

                            <Stack direction={'row'}>
                                <Stack minWidth={'200px'} flex={1}>
                                    <Typography>Password</Typography>
                                </Stack>
                                <Stack flex={3}>
                                    <TextField
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    type={showPassword ? "text" : "password"}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.studentPassword}
                                    name="studentPassword"
                                    error={!!touched.studentPassword && !!errors.studentPassword}
                                    helperText={touched.studentPassword && errors.studentPassword}
                                    InputProps={{
                                        endAdornment: (
                                          <InputAdornment position="end">
                                            <IconButton
                                              aria-label="toggle password visibility"
                                              onClick={handleClickShowPassword}
                                              onMouseDown={handleMouseDownPassword}
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

                            <Stack direction={'row'}>
                                <Stack minWidth={'200px'} flex={1}>
                                    <Typography>Confirm Password</Typography>
                                </Stack>
                                <Stack flex={3}>
                                    <TextField
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    type={showConfirmPassword ? "text" : "password"}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.studentConfirmPassword}
                                    name="studentConfirmPassword"
                                    error={!!touched.studentConfirmPassword && !!errors.studentConfirmPassword}
                                    helperText={touched.studentConfirmPassword && errors.studentConfirmPassword}
                                    InputProps={{
                                        endAdornment: (
                                          <InputAdornment position="end">
                                            <IconButton
                                              aria-label="toggle password visibility"
                                              onClick={handleClickShowConfirmPassword}
                                              onMouseDown={handleMouseDownConfirmPassword}
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

                            <Stack alignItems={'flex-end'}>
                                    <Stack direction={'row'}>
                                        <Button
                                            variant='itms'
                                            size='itms-small'
                                            onClick={handleReset}
                                            >clear
                                        </Button>

                                        <Button 
                                            variant="itms"
                                            size='itms-small'
                                            type="submit"
                                            >ADD
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
          alertMessage={"Success"}
        />
        </Box>
    </Tile>    
    
    )
} 