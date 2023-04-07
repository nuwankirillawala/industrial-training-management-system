import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import './ForgotPassword.css'
import { Unilogo } from '../../components/shared/Images/Unilogo';
import { Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import classnames from 'classnames';


const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [emailSent, setEmailSent] = useState(true);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [countdown, setCountdown] = useState(15);
    const navigate = useNavigate();

    useEffect(() => {
        let timer;
        if(isButtonDisabled){
            setCountdown(15);
            timer = setInterval(() => {
                setCountdown((countdown) => countdown - 1);
            }, 1000);

            setTimeout(() => {
                setIsButtonDisabled(false);
                setCountdown(timer);
            }, 15000);
        }


        return () => clearTimeout(timer);
    }, [isButtonDisabled])

    const handleSubmit = async (e) => {
        try {
            if(!emailSent){
                e.preventDefault();
                await loginUser({ email, password });
            } else {
                setIsButtonDisabled(true);
                setCountdown(15);
                setTimeout(() => {
                    setIsButtonDisabled(false);
                }, 15000);
            }
            
        } catch (err) {
            console.log(err);
        }
    }



    return (
        <div className="app__forgotPassword">
            <div className="app__forgotPassword-header">
                <h1 className="app__forgotPassword-header-text">
                    ITMS
                </h1>
                <HelpOutlineIcon />
            </div>
            <div className="app__forgotPassword-content">
                <div className="app__forgotPassword-title">
                    <div className="app__forgotPassword-title_logo">
                        <Unilogo />
                    </div>
                    <div className="app__forgotPassword-title_heading">
                        <h1>Department of Computer Science</h1>
                        <h2>University of Ruhuna - Sri Lanka</h2>
                    </div>
                </div>

                {/* <div className="app__forgotPassword-container"> */}
                {!emailSent ? <div className={classnames('app__forgotPassword-right', { 'app__forgotPassword-form_withError': emailError })}>
                    <form className="app__forgotPassword-container-form" onSubmit={handleSubmit}>
                        <h2>Forgot Password?</h2>
                        <p>Please enter the email address associated with your account below. We will send you an email with instructions on how to reset your password.</p>
                        <div className="app__forgotPassword-container-form_fields">
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

                        </div>

                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            sx={{ borderRadius: '15px', width: '100%', marginTop: '16px' }}
                        >
                            SEND
                        </Button>

                        <a href="/login">Back to Login</a>
                    </form>
                    {/* </div> */}
                </div>
                :
                <div className={classnames('app__forgotPassword-right', { 'app__forgotPassword-form_withError': emailError })}>
                    <div className="app__forgotPassword-container-form" onSubmit={handleSubmit}>
                        <h2>Check Your Mailbox!</h2>
                        <p>We sent the password reset link to your email. If you do not receive an email within a few minutes, please check your spam folder. If you are still having trouble accessing your account, please contact our support team for assistance. Thank you.</p>

                        <Button
                            onClick={handleSubmit}
                            variant="contained"
                            size="large"
                            sx={{ borderRadius: '15px', width: '100%', marginTop: '16px' }}
                            disabled={isButtonDisabled}
                        >
                            {isButtonDisabled ? `Try again after ${countdown}s` : 'Send again'}
                        </Button>
                        <a href="/login">Back to Login</a>
                    </div>
                    {/* </div> */}
                </div>}
            </div>
        </div>
    )
}

export default ForgotPassword;