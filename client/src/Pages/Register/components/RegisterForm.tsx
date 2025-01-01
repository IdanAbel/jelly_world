import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, TextField, Typography, Button } from '@mui/material';
import { container, centeredContainer, inputContainer, submitButton } from './styles';
import { register } from '../../../services/userService';
import FormContainer from '../../../components/FormContainer';

import Message from '../../../Components/Message'; //TODO
import Loader from '../../../Components/Loader'; //TODO
import { RootState } from '../../../store'; //TODO

const RegisterForm: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [message, setMessage] = useState<string | null>(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userRegister = useSelector((state: RootState) => state.userRegister);
    const userLogin = useSelector((state: RootState) => state.userLogin);
    const { loading, error } = userRegister;
    const { userInfo } = userLogin;

    useEffect(() => {
        if (userInfo) {
            navigate('/');
        }
    }, [navigate, userInfo]);

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
        } else {
            dispatch(register(name, email, password) as any);
            navigate('/');
        }
    };

    return (
        <FormContainer>
            {loading && <Loader />}
            <Box sx={container}>
                <Typography variant="h6">{'Sign Up'}</Typography>
                <TextField
                    sx={inputContainer}
                    placeholder="Name"
                    onChange={(event) => setName(event.target.value)}
                />
                <TextField
                    sx={inputContainer}
                    placeholder="Email"
                    onChange={(event) => setEmail(event.target.value)}
                />
                <TextField
                    sx={inputContainer}
                    type="password"
                    placeholder="Password"
                    onChange={(event) => setPassword(event.target.value)}
                />
                <TextField
                    sx={inputContainer}
                    type="password"
                    placeholder="Confirm Password"
                    onChange={(event) => setConfirmPassword(event.target.value)}
                />
                <Button sx={submitButton} onClick={handleRegister}>
                    {'Register'}
                </Button>
                {error && <Message variant="alert-danger">{error}</Message>}
                {message && <Message variant="alert-danger">{message}</Message>}
                <Box sx={centeredContainer}>
                    <Typography variant="subtitle2">{'Already have an account?'}</Typography>
                    <Link to="/login">
                        <Typography variant="subtitle2">{'Sign In here'}</Typography>
                    </Link>
                </Box>
            </Box>
        </FormContainer>
    );
};

export default RegisterForm;
