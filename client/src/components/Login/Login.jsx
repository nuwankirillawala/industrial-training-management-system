import React from "react";
import { Stack, Typography, Box, TextField, Button } from '@mui/material';
import { Unilogo } from '../shared/Images/Unilogo'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Formik, useFormik } from 'formik'
import * as Yup from 'yup'
import './Login.css'

// const validationSchema = Yup.object().shape({
//     email: Yup.string().email("Invalid email").required("Required"),
//     password: Yup.string().required("Required")
// });

export const Login = () => {
    // we have update error handling, responsiveness.

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();

    // const initialValues = {
    //     email: "",
    //     password: ""
    // }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post('http://localhost:5000/login', { email, password });

            const data = response.data;

            console.log(response);
            // navigate(`/${data.role}-dashboard`);
            navigate(`/student-dashboard`);
        } catch (err) {
            if (err.response) {
                const errors = err.response;
                setEmailError(errors.data.errors.email);
                setPasswordError(errors.data.errors.password);
            }
            else {
                console.log(err);
            }
        }
    }


    return (
        <Stack direction={'column'} backgroundColor={'#EAF0FF'} height={'97vh'} spacing={1} justifyContent={'space-evenly'} width={'100vw'}>
            <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} spacing={4}>
                <Stack>
                    <Unilogo width={'90px'} height={'180px'} />
                </Stack>
                <Stack alignItems={'center'}>
                    <Typography variant={'h2'} color={'#7F3A41'} fontWeight={'bold'} fontStyle={'itner'}>UNIVERSITY OF RUHUNA</Typography>
                    <Typography variant={'h5'} color={'#4665D1'} fontWeight={'bold'} fontStyle={'inter'}>INDUSTRIAL TRAINING MANAGEMENT SYSTEM</Typography>
                </Stack>
            </Stack>

            {/* login form */}
            <Stack alignItems={'center'} justifyContent={'center'}>
                <Box
                    backgroundColor={'#EAFFFF'}
                    padding={'30px 10px 30px 10px'}
                    borderRadius={'30px'}
                    boxShadow={5}
                    width={'400px'}
                    height={(emailError || passwordError) ? '400px' : '360px'}>
                    <Stack direction={'column'} alignItems={'center'} spacing={3}>
                        <Stack>
                            <Typography variant={'h5'} fontWeight={'bold'} fontStyle={'inter'} color={'#4665D1'}>LOGIN</Typography>
                        </Stack>
                        <Stack minWidth={'350px'}>
                            {/* <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                            >
                                {({
                                    values,
                                    errors,
                                    touched,
                                    handleChange,
                                    isSubmitting
                                }) => (
                                    <form onSubmit={handleSubmit}>
                                        <Stack
                                            direction={'column'}
                                            spacing={3}
                                            alignItems={'center'}
                                        >
                                            <TextField
                                                id="outlined-basic"
                                                name="email"
                                                label="Username"
                                                variant="outlined"
                                                type="text"
                                                placeholder="Enter Your Username"
                                                fullWidth
                                                value={values.email}
                                                onChange={handleChange}
                                                required
                                                error={(touched.email && !!errors.email)}
                                                helperText={(touched.email && errors.email)}


                                            />
                                            {errors.email && touched.email && errors.email}
                                            <TextField
                                                id="outlined-basic"
                                                name="password"
                                                label="Password"
                                                variant="outlined"
                                                type="password"
                                                placeholder="Enter Your Password"
                                                fullWidth
                                                value={values.password}
                                                onChange={handleChange}
                                                required
                                                error={(touched.email && !!errors.password)}
                                                helperText={(touched.password && errors.password)}
                                            />
                                            {errors.password && touched.password && errors.password}
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                size="large"
                                                sx={{ borderRadius: '15px', width: '100%' }}
                                                disabled={isSubmitting}
                                            >
                                                LOGIN
                                            </Button>
                                            <a href='http://google.com'>
                                                <Typography
                                                    variant={'caption'}
                                                    fontWeight={'bold'}
                                                    color={'#4665D1'}
                                                >
                                                    Fogot Password?
                                                </Typography>
                                            </a>
                                        </Stack>
                                    </form>
                                )}

                            </Formik> */}
                            <form onSubmit={handleSubmit}>
                                <Stack
                                    direction={'column'}
                                    spacing={3}
                                    alignItems={'center'}
                                >
                                    <TextField
                                        id="outlined-basic"
                                        name="email"
                                        label="Username"
                                        variant="outlined"
                                        type="text"
                                        placeholder="Enter Your Username"
                                        fullWidth
                                        onChange={e =>setEmail(e.target.value)}
                                        required
                                        error={(!!emailError)}
                                        helperText={emailError && emailError}


                                    />
                                    <TextField
                                        id="outlined-basic"
                                        name="password"
                                        label="Password"
                                        variant="outlined"
                                        type="password"
                                        placeholder="Enter Your Password"
                                        fullWidth
                                        onChange={e =>setPassword(e.target.value)}
                                        required
                                        error={(!!passwordError)}
                                        helperText={passwordError && passwordError}
                                    />
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        size="large"
                                        sx={{ borderRadius: '15px', width: '100%' }}
                                    >
                                        LOGIN
                                    </Button>
                                    <a href='http://google.com'>
                                        <Typography
                                            variant={'caption'}
                                            fontWeight={'bold'}
                                            color={'#4665D1'}
                                        >
                                            Fogot Password?
                                        </Typography>
                                    </a>
                                </Stack>
                            </form>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>

        </Stack>

    );
}










// (
//     <Stack
//         direction={'column'}
//         spacing={3}
//         alignItems={'center'}
//     >
//         <TextField
//             id="outlined-basic"
//             name="email"
//             label="Username"
//             variant="outlined"
//             type="text"
//             placeholder="Enter Your Username"
//             fullWidth
//             value={values.email}
//             onChange={e => {
//                 setEmail(e.target.value);
//                 handleChange(e)
//             }}
//             required
//             error={(!!emailError) || (touched.email && !!errors.email)}
//             helperText={(emailError && emailError) || (touched.email && errors.email)}


//         />
//         <TextField
//             id="outlined-basic"
//             name="password"
//             label="Password"
//             variant="outlined"
//             type="password"
//             placeholder="Enter Your Password"
//             fullWidth
//             value={values.password}
//             onChange={e => {
//                 setPassword(e.target.value)
//                 handleChange
//             }}
//             required
//             error={(!!passwordError) || (touched.email && !!errors.password)}
//             helperText={(passwordError && passwordError) || (touched.password && errors.password)}
//         />

//         <Button
//             type="submit"
//             variant="contained"
//             size="large"
//             sx={{ borderRadius: '15px', width: '100%' }}
//         >
//             LOGIN
//         </Button>
//         <a href='http://google.com'>
//             <Typography
//                 variant={'caption'}
//                 fontWeight={'bold'}
//                 color={'#4665D1'}
//             >
//                 Fogot Password?
//             </Typography>
//         </a>
//     </Stack>
// )