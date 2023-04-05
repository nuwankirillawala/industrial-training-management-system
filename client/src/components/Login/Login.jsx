import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import './Login.css'
import { Unilogo } from '../../components/shared/Images/Unilogo';
import { Button, Checkbox, FilledInput, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import classnames from 'classnames';
import useAuth from '../../Hooks/useAuth';
import { VisibilityOff, Visibility } from '@mui/icons-material/';

const Login = () => {
    // we have update error handling, responsiveness.
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { loginUser, isAuthenticated, loading, user, error } = useAuth();

    const handleClickShowPassword = () => {
        setShowPassword((show) => !show)
    }

    const handleMouseDownPassword = (event) => {
        e.preventDefault();
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            await loginUser({ email, password });
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (!loading && user && isAuthenticated) {
            console.log(user.role);
            switch (user.role) {
                case 'system-admin':
                    navigate('/admin-dashboard');
                    break;

                case 'department-coordinator':
                    navigate('/coordinator-dashboard');
                    break;

                case 'undergraduate':
                    navigate('/student-dashboard');
                    break;

                case 'supervisor':
                    navigate('/supervisor-dashboard');
                    break;

                case 'alumni':
                    navigate('/alumni-dashboard');
                    break;

                default:
                    break;
            }
        }

        else if (error) {
            if (error.response) {
                const errors = error.response;
                console.log(errors);
                setEmailError(errors.data.errors.email);
                setPasswordError(errors.data.errors.password);
            }
            else {
                console.log(error);
            }
        }

    }, [isAuthenticated, user, error]);

    return (
        <div className="app__login">
            <div className="app__login-header">
                <h1 className="app__login-header-text">
                    ITMS
                </h1>
                <HelpOutlineIcon />
            </div>
            <div className="app__login-content">
                <div className="app__login-title">
                    <div className="app__login-title_logo">
                        <Unilogo />
                    </div>
                    <div className="app__login-title_heading">
                        <h1>Department of Computer Science</h1>
                        <h2>University of Ruhuna - Sri Lanka</h2>
                    </div>
                </div>

                <div className="app__login-container">
                    <div className="app__login-left">
                        <div className="app__login-container-welcome">
                            <h1>Industrial Training Management System</h1>
                        </div>
                    </div>

                    <div className={classnames('app__login-right', {
                        'app__login-form_withError': emailError || passwordError
                    })}>
                        <form className="app__login-container-form" onSubmit={handleSubmit}>
                            <h2>LOGIN</h2>
                            <div className="app__login-container-form_fields">
                                <TextField
                                    id="email"
                                    name="email"
                                    label="Email"
                                    variant="outlined"
                                    type="text"
                                    placeholder="Enter your email"
                                    fullWidth
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                    error={(!!emailError)}
                                    helperText={emailError && emailError}
                                />
                                {/* <TextField
                                    id="password"
                                    name="password"
                                    label="Password"
                                    variant="outlined"
                                    type="password"
                                    placeholder="Enter Your Password"
                                    fullWidth
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                    error={(!!passwordError)}
                                    helperText={passwordError && passwordError}
                                /> */}
                                {/* <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
                                    <InputLabel htmlFor="password">Password</InputLabel>
                                    <OutlinedInput
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        placeholder='Enter your password'
                                        onChange={e => setPassword(e.target.value)}
                                        error={(!!passwordError)}
                                        helperText={passwordError && passwordError}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    // onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password"
                                    />
                                </FormControl> */}
                                <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
                                    <InputLabel htmlFor="password" required>Password</InputLabel>
                                    <OutlinedInput
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        placeholder='Enter your password'
                                        onChange={e => setPassword(e.target.value)}
                                        error={(!!passwordError)}
                                        helperText={passwordError}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password"
                                    />
                                    {passwordError && (
                                        <FormHelperText id={passwordError} sx={{color: '#d32f2f'}}>{passwordError}</FormHelperText>
                                    )}
                                </FormControl>

                            </div>
                            <div className="app__login-container-form_forgotPassword">
                                <div className='app__login-remember'>
                                    <Checkbox size="small" />
                                    <p>Remember User</p>
                                </div>
                                <p><a href="/">Forgot Password</a></p>
                            </div>

                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                sx={{ borderRadius: '15px', width: '100%', marginTop: '16px' }}
                            >
                                LOGIN
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { Login }