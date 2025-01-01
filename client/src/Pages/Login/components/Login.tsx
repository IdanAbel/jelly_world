import React from "react";
import { useEffect, useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, TextField, Typography, Button, CircularProgress } from "@mui/material";
import { container, inputContainer, submitButton } from "./styles";
import FormContainer from "../../../components/FormContainer";
import { login } from "../../../services/userService";

import Message from "../../../Components/Message"; //TODO
import { useAuth } from "../../../context/AuthContext"; //TODO
import { RootState } from "../../../store"; //TODO

const Login = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //TODO  - define UserLoginState store
    const userLogin = useSelector<RootState, UserLoginState>((state) => state.userLogin);
    const { loading, error, userInfo } = userLogin;

    const { setAuthenticatedWithGoogle } = useAuth();

    useEffect(() => {
        if (userInfo) {
            navigate("/");
        }
    }, [navigate, userInfo]);

    const handleLogin = (e: FormEvent) => {
        e.preventDefault();
        dispatch(login(email, password));
        setAuthenticatedWithGoogle(false);
    };

    return (
        <FormContainer>
            {loading ? (
                <CircularProgress />
            ) : (
                <Box sx={container}>
                    <Typography>{'Sign in with your credentials'}</Typography>
                    <TextField
                        sx={inputContainer}
                        placeholder="Email"
                        onChange={(event) => setEmail(event.target.value)}
                        value={email}
                    />
                    <TextField
                        sx={inputContainer}
                        placeholder="Password"
                        type="password"
                        onChange={(event) => setPassword(event.target.value)}
                        value={password}
                    />
                    <Button sx={submitButton} onClick={handleLogin}>
                        {'Login'}
                    </Button>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Typography variant="subtitle2">
                            {"Don't have an account yet?"}
                        </Typography>
                        <Link to="/register">
                            <Typography variant="subtitle2">{'Sign Up here'}</Typography>
                        </Link>
                    </Box>
                    {error && <Message variant="alert-danger">{error}</Message>}
                </Box>
            )}
        </FormContainer>
    );
};

export default SelfLogin;