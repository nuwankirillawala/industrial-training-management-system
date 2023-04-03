import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import './Login.css'
import { Unilogo } from '../../components/shared/Images/Unilogo';
import { Button, Checkbox, TextField } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import classnames from 'classnames';

const Login = () => {
    // we have update error handling, responsiveness.
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();

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
                        'app__login-form_withError': emailError ||  passwordError
                    })}>
                        <form className="app__login-container-form" onSubmit={handleSubmit}>
                            <h2>LOGIN</h2>
                            <div className="app__login-container-form_fields">
                                <TextField
                                    id="usarname"
                                    name="email"
                                    label="Username"
                                    variant="outlined"
                                    type="text"
                                    placeholder="Enter Your Username"
                                    fullWidth
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                    error={(!!emailError)}
                                    helperText={emailError && emailError}
                                />
                                <TextField
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
                                />
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