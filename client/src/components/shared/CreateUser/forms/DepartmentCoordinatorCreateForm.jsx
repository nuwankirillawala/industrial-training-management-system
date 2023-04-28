import { TextField, Button, Typography, Grid, Stack, Box, InputAdornment, IconButton, Select, MenuItem} from "@mui/material"
import React, {useState} from "react"
import { Tile } from '../../../card/Tile'
import { Formik } from "formik"
import * as yup from "yup"
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { StatusSnackBar } from "../../../StatusSnackBar/StatusSnackBar"


const User = {
    departmentCoordinatorName : '',
    departmentCoordinatorEmail : '',
    departmentCoordinatorContactNo : '',
    departmentCoordinatorStaffId : '',
    departmentCoordinatorPassword : '',
    departmentCoordinatorConfirmPassword : '',
    departmentCoordinatorPosition : '',
}

export const DepartmentCoordinatorCreateForm = () => {
    
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
        await new Promise((r) => setTimeout(r, 500));
        alert(JSON.stringify(values, null, 2));
        handleSnackBar("success");
    };

    const validation = yup.object().shape({
        // adminName : yup.string(),
        departmentCoordinatorName : yup.string().required('required Field'),
        departmentCoordinatorEmail : yup.string().email("Invalid Email").required("required Field"),
        departmentCoordinatorContactNo : yup.string().length(10,"must contain 10 digits").required("Required Field"),
        departmentCoordinatorStaffId : yup.string().required('required Field'),
        departmentCoordinatorPosition : yup.string().required('required Field'),
        departmentCoordinatorPassword : yup.string().matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
            "Must Contain 6 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
          ).required('Enter your new password'),
        departmentCoordinatorConfirmPassword : yup.string().oneOf([yup.ref("departmentCoordinatorPassword")], "Your password do not match.").required('Confirm your new password')
    })


    return(
    <Tile>
        <Box padding={'30px'}>
        <Grid container>
            <Grid item md={12}>
                <Stack alignItems={'center'}>
<Box width={'70%'}>
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
                            <Stack direction={'column'} spacing={1}>

                                <Stack direction={'row'}>
                                    <Stack minWidth={'200px'} flex={1}>
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
                                        value={values.departmentCoordinatorName}
                                        name="departmentCoordinatorName"
                                        error={!!touched.departmentCoordinatorName && !!errors.departmentCoordinatorName}
                                        helperText={touched.departmentCoordinatorName && errors.departmentCoordinatorName}
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
                                        size="small"
                                        variant="outlined"
                                        type="email"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.adminEmail}
                                        name="departmentCoordinatorEmail"
                                        error={!!touched.departmentCoordinatorEmail && !!errors.departmentCoordinatorEmail}
                                        helperText={touched.departmentCoordinatorEmail && errors.departmentCoordinatorEmail}
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
                                        value={values.departmentCoordinatorContactNo}
                                        name="departmentCoordinatorContactNo"
                                        error={!!touched.departmentCoordinatorContactNo && !!errors.departmentCoordinatorContactNo}
                                        helperText={touched.departmentCoordinatorContactNo && errors.departmentCoordinatorContactNo}
                                        />
                                    </Stack>
                                </Stack>

                                <Stack direction={'row'}>
                                    <Stack minWidth={'200px'} flex={1}>
                                        <Typography>Staff Id</Typography>
                                    </Stack>
                                    <Stack flex={3}>
                                        <TextField
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                        type="text"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.departmentCoordinatorStaffId}
                                        name="departmentCoordinatorStaffId"
                                        error={!!touched.departmentCoordinatorStaffId && !!errors.departmentCoordinatorStaffId}
                                        helperText={touched.departmentCoordinatorStaffId && errors.departmentCoordinatorStaffId}
                                        />
                                    </Stack>
                                </Stack>

                                <Stack direction={'row'}>
                                    <Stack minWidth={'200px'} flex={1}>
                                        <Typography>Position</Typography>
                                    </Stack>
                                    <Stack flex={3}>

                                        <Select
                                            variant="outlined"
                                            labelId="departmentCoordinatorPosition"
                                            id="departmentCoordinatorPosition"
                                            name="departmentCoordinatorPosition"
                                            value={values.departmentCoordinatorPosition}
                                            onChange={handleChange}
                                            placeholder="departmentCoordinatorPosition"
                                            size='small'
                                            >
                                            <MenuItem value="Proffer">Proffer</MenuItem>
                                            <MenuItem value="SiniorLec1">Sinior Lecture 1</MenuItem>
                                            <MenuItem value="SiniorLec2">Sinior Lecture 2</MenuItem>
                                            <MenuItem value="SiniorLec3">Sinior Lecture 3</MenuItem>
                                            <MenuItem value="Lecture">Lecture</MenuItem>
                                            <MenuItem value="Prbeshanary">Prbeshanary</MenuItem>                                            
                                        </Select>
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
                                        value={values.departmentCoordinatorPassword}
                                        name="departmentCoordinatorPassword"
                                        error={!!touched.departmentCoordinatorPassword && !!errors.departmentCoordinatorPassword}
                                        helperText={touched.departmentCoordinatorPassword && errors.departmentCoordinatorPassword}
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
                                        value={values.departmentCoordinatorConfirmPassword}
                                        name="departmentCoordinatorConfirmPassword"
                                        error={!!touched.departmentCoordinatorConfirmPassword && !!errors.departmentCoordinatorConfirmPassword}
                                        helperText={touched.departmentCoordinatorConfirmPassword && errors.departmentCoordinatorConfirmPassword}
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
                </Stack>
            </Grid>
       </Grid>
       </Box>
    </Tile>    
    
    )
} 