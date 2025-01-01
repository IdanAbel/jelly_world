import React from "react";
import { Box, Divider } from "@mui/material";
import LoginByGoogle from "../../Components/LoginByGoogle"; //TODO
import LoginForm from "./components/LoginForm.tsx";

const Login = (): JSX.Element => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
      }}
    >
      <LoginForm />
      <Divider sx={{ width: "100%" }} />
      <LoginByGoogle />
    </Box>
  );
};

export default Login;
