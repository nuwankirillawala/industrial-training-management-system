import React ,{useState} from "react"
import { TextField, Button, Typography, Grid, Stack, Box, InputAdornment, IconButton} from "@mui/material"
import { Tile } from '../../../card/Tile'
import { Formik } from "formik"
import * as yup from "yup"
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { FormControl, Select, MenuItem } from '@mui/material'
import { StatusSnackBar } from "../../../StatusSnackBar/StatusSnackBar";
import axios from 'axios';


const User = {
    aluminiName : '',
    aluminiEmail : '',
    aluminiContactNo : '',
    aluminiRegNo : '',
    aluminiGraduatedYear : '',
    aluminiPassword : '',
    // aluminiConfirmPassword : '',
}

export const AluminiCreateForm = () => {
    
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
    const handleMouseDownConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
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
          "http://localhost:5000/api/v1/alumni/create-alumni", 
          { name: values.aluminiName,
            email : values.aluminiEmail,
            contactNo : values.aluminiContactNo,
            regNo : values.aluminiRegNo, 
            graduatedYear: values.aluminiGraduatedYear,
            password: values.aluminiPassword,
         },
          {withCredentials: true}
          );

          console.log(res.data);
          handleSnackBar("success");
    };

    const validation = yup.object().shape({
        aluminiName : yup.string().required('required Field'),
        aluminiEmail : yup.string().email("Invalid Email").required("required Field"),
        aluminiContactNo : yup.string().length(10,"must contain 10 digits").required("Required Field"),
        aluminiRegNo : yup.string().required('required Field'),
        aluminiGraduatedYear : yup.string().required("Required Field"),
        aluminiPassword : yup.string().matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
            "Must Contain 6 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
          ).required('Enter your new password'),
        // aluminiConfirmPassword : yup.string().oneOf([yup.ref("aluminiPassword")], "Your password do not match.").required('Confirm your new password')
    })


    return(
    <Tile>
        <Box padding={'30px'}>
        <Grid container>
            <Grid item md={12}>

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

                        <Stack alignItems={'center'}>
                            <Stack direction={'column'} spacing={1} width={'60%'}>
                            
                                <Stack direction={'row'}>
                                    <Stack flex={2}>
                                        <Typography variant="body1">Name</Typography>
                                    </Stack>
                                    <Stack flex={3}>
                                        <TextField
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                        type="text"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.aluminiName}
                                        name="aluminiName"
                                        error={!!touched.aluminiName && !!errors.aluminiName}
                                        helperText={touched.aluminiName && errors.aluminiName}
                                        />
                                    </Stack>
                                </Stack>
                            

                                <Stack direction={'row'}>
                                    <Stack flex={2}>
                                        <Typography>Email Address</Typography>
                                    </Stack>
                                    <Stack flex={3}>
                                        <TextField
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                        type="email"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.aluminiEmail}
                                        name="aluminiEmail"
                                        error={!!touched.aluminiEmail && !!errors.aluminiEmail}
                                        helperText={touched.aluminiEmail && errors.aluminiEmail}
                                        />
                                    </Stack>
                                </Stack>

                                <Stack direction={'row'}>
                                    <Stack minWidth={'200px'} flex={2}>
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
                                        value={values.aluminiContactNo}
                                        name="aluminiContactNo"
                                        error={!!touched.aluminiContactNo && !!errors.aluminiContactNo}
                                        helperText={touched.aluminiContactNo && errors.aluminiContactNo}
                                        />
                                    </Stack>
                                </Stack>

                                <Stack direction={'row'}>
                                    <Stack flex={2}>
                                        <Typography>Registraion Number</Typography>
                                    </Stack>
                                    <Stack flex={3}>
                                        <TextField
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                        type="text"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.aluminiRegNo}
                                        name="aluminiRegNo"
                                        error={!!touched.aluminiRegNo && !!errors.aluminiRegNo}
                                        helperText={touched.aluminiRegNo && errors.aluminiRegNo}
                                        />
                                    </Stack>
                                </Stack>

                                <Stack direction={'row'}>
                                    <Stack flex={2}>
                                        <Typography>Graduated Year</Typography>
                                    </Stack>
                                    <Stack flex={3}>
                                        <TextField
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                        type="text"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.aluminiGraduatedYear}
                                        name="aluminiGraduatedYear"
                                        error={!!touched.aluminiGraduatedYear && !!errors.aluminiGraduatedYear}
                                        helperText={touched.aluminiGraduatedYear && errors.aluminiGraduatedYear}
                                        />
                                    </Stack>
                                </Stack>

                                <Stack direction={'row'}>
                                    <Stack flex={2}>
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
                                        value={values.aluminiPassword}
                                        name="aluminiPassword"
                                        error={!!touched.aluminiPassword && !!errors.aluminiPassword}
                                        helperText={touched.aluminiPassword && errors.aluminiPassword}
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
                                    <Stack flex={2}>
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
                                        value={values.aluminiConfirmPassword}
                                        name="aluminiConfirmPassword"
                                        error={!!touched.aluminiConfirmPassword && !!errors.aluminiConfirmPassword}
                                        helperText={touched.aluminaluminiConfirmPasswordiPassword && errors.aluminiConfirmPassword}
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
                                        <Button variant="itms" size='itms-small' onClick={handleReset}>clear</Button>
                                        <Button variant="itms" size='itms-small' type="submit">ADD</Button>
                                    </Stack>
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
       </Grid>
       </Grid>
       </Box>
    </Tile>    
    
    )
} 