import React from "react";
import { Stack, Typography, Box, TextField, Button } from '@mui/material';
import { Unilogo } from '../shared/Images/Unilogo'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export const Login = () => {
    // we have update error handling, responsiveness.

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault()
        console.log({ email, password });


        try {
            const data = { email, password }
            const res = await axios.post('http://localhost:5000/login', data)
            console.log({ res })

            if (res.status === 200) {
                console.log('success');
                // in here we have to change navigate location acording to the user. currently no navigaton.
                navigate('/layout')
            }
        }

        catch (err) {
            console.log({ err })
        }

    }
    return (
        <Stack
            direction={'column'}
            backgroundColor={'#EAF0FF'}
            height={'100vh'} spacing={3}
            justifyContent={'space-evenly'}
            width={'100vw'}
        >
            <Stack
                direction={'row'}
                alignItems={'center'}
                justifyContent={'center'}
                spacing={4}
            >
                <Stack>
                    <Unilogo width={'75px'} height={'150px'} />
                </Stack>
                <Stack alignItems={'center'}>
                    <Typography
                        variant={'h3'}
                        color={'#7F3A41'}
                        fontWeight={'bold'}
                        fontStyle={'inter'}
                    >
                        UNIVERSITY OF RUHUNA
                    </Typography>
                    <Typography
                        variant={'h6'}
                        color={'#4665D1'}
                        fontWeight={'bold'}
                        fontStyle={'inter'}
                    >
                        INDUSTRIAL TRAINING MANAGEMENT SYSTEM
                    </Typography>
                </Stack>
            </Stack>

            {/* login form */}
            <Stack
                alignItems={'center'}
                justifyContent={'center'}
            >
                <Box
                    backgroundColor={'#FFFF'}
                    padding={'30px'}
                    borderRadius={'30px'}
                    boxShadow={5}
                >
                    <Stack
                        direction={'column'}
                        alignItems={'center'}
                        spacing={3}
                    >
                        <Stack>
                            <Typography
                                variant={'h6'}
                                fontWeight={'bold'}
                                fontStyle={'inter'}
                                color={'#4665D1'}
                            >
                                LOGIN
                            </Typography>
                        </Stack>
                        <Stack>
                            <form onSubmit={onSubmit}>
                                <Stack
                                    direction={'column'}
                                    spacing={3}
                                    alignItems={'center'}
                                >
                                    <TextField
                                        id="outlined-basic"
                                        label="Username"
                                        variant="outlined"
                                        type="text"
                                        placeholder="Enter Your Username"
                                        onChange={e => setEmail(e.target.value)}
                                        required
                                    />
                                    <TextField
                                        id="outlined-basic"
                                        label="Password"
                                        variant="outlined"
                                        type="password"
                                        placeholder="Enter Your Password"
                                        onChange={e => setPassword(e.target.value)}
                                        required
                                    />
                                    <a href='http://google.com'>
                                        <Typography
                                            variant={'caption'}
                                            fontWeight={'bold'}
                                            color={'#4665D1'}
                                        >
                                            Fogot Password?
                                        </Typography>
                                    </a>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        sx={{ borderRadius: '15px', width: '100%' }}
                                    >
                                        LOGIN
                                    </Button>
                                </Stack>
                            </form>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>

        </Stack>

    );
}