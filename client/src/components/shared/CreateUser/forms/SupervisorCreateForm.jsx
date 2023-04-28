import { TextField, Button, Typography, Box, Stack, InputAdornment, IconButton} from "@mui/material"
import React, {useState} from "react"
import { Tile } from '../../../card/Tile'
import { Formik } from "formik"
import * as yup from "yup"
import { FormControl, Select, MenuItem } from '@mui/material'
import { StatusSnackBar } from "../../../StatusSnackBar/StatusSnackBar"
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import axios from 'axios';


const User = {
    supervisorName : '',
    supervisorEmail : '',
    supervisorContactNo : '',
    supervisorCompany : '',
    supervisorJobRole : '',
    supervisorPassword : '',
    // supervisorConfirmPassword : ''
}

export const SupervisorCreateForm = () => {

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    
    // const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    // const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
    // const handleMouseDownConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
  

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
          "http://localhost:5000/api/v1/supervisor/create-supervisor", 
          { name: values.supervisorName,
            email : values.supervisorEmail,
            contactNo : values.supervisorContactNo,
            company: values.supervisorGpa,
            jobRole : values.supervisorRegNo, 
            password: values.supervisorPassword,
         },
          {withCredentials: true}
          );

          console.log(res.data);
          handleSnackBar("success");
    };

    const validation = yup.object().shape({
        supervisorName : yup.string().required('required Field'),
        supervisorEmail : yup.string().email("Invalid Email").required("required Field"),
        supervisorContactNo : yup.string().length(10,"must contain 10 digits").required("Required Field"),
        supervisorCompany : yup.string().required('required Field'),
        supervisorJobRole : yup.string().required("Required Field"),
        supervisorPassword : yup.string().matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
            "Must Contain 6 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
          ).required('Enter your new password'),
        // supervisorConfirmPassword : yup.string().oneOf([yup.ref("supervisorPassword")], "Your password do not match.").required('Confirm your new password')
        })


    return(
    <Tile>
        <Stack alignItems={'center'}>
        <Box width={'70%'}>
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
                  handleReset,
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
                                        size="small"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.supervisorName}
                                        name="supervisorName"
                                        error={!!touched.supervisorName && !!errors.supervisorName}
                                        helperText={touched.supervisorName && errors.supervisorName}
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
                                        size="small"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.supervisorEmail}
                                        name="supervisorEmail"
                                        error={!!touched.supervisorEmail && !!errors.supervisorEmail}
                                        helperText={touched.supervisorEmail && errors.supervisorEmail}
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
                                        variant="outlined"
                                        type="text"
                                        size="small"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        values={values.supervisorContactNo}
                                        name="supervisorContactNo"
                                        error={!!touched.supervisorContactNo && !!errors.supervisorContactNo}
                                        helperText={touched.supervisorContactNo && errors.supervisorContactNo}
                                        />
                                        </Stack>
                                    </Stack>

                            <Stack direction={'row'}>
                                    <Stack minWidth={'200px'} flex={1}>
                                        <Typography>Supervisor Company</Typography>
                                        </Stack>
                                    <Stack flex={3}>
                                        <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="text"
                                        size="small"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.supervisorCompany}
                                        name="supervisorCompany"
                                        error={!!touched.supervisorCompany && !!errors.supervisorCompany}
                                        helperText={touched.supervisorCompany && errors.supervisorCompany}
                                        />
                                        </Stack>
                                    </Stack>

                            <Stack direction={'row'}>
                                    <Stack minWidth={'200px'} flex={1}>
                                        <Typography>Supervisor JobRole</Typography>
                                        </Stack>
                                    <Stack flex={3}>
                                        <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="text"
                                        size="small"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.supervisorJobRole}
                                        name="supervisorJobRole"
                                        error={!!touched.supervisorJobRole && !!errors.supervisorJobRole}
                                        helperText={touched.supervisorJobRole && errors.supervisorJobRole}
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
                                    value={values.supervisorPassword}
                                    name="supervisorPassword"
                                    error={!!touched.supervisorPassword && !!errors.supervisorPassword}
                                    helperText={touched.supervisorPassword && errors.supervisorPassword}
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

                            {/* <Stack direction={'row'}>
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
                                    value={values.supervisorConfirmPassword}
                                    name="supervisorConfirmPassword"
                                    error={!!touched.supervisorConfirmPassword && !!errors.supervisorConfirmPassword}
                                    helperText={touched.supervisorConfirmPassword && errors.supervisorConfirmPassword}
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
                            </Stack> */}

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
    </Stack>
    </Tile>    
    
    )
} 