import React from "react";
import { Box, Divider } from "@mui/material";
import LoginByGoogle from "../../Components/LoginByGoogle"; //TODO
import SelfLogin from "./components/Login";

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
      <SelfLogin />
      <Divider sx={{ width: "100%" }} />
      <LoginByGoogle />
    </Box>
  );
};

export default Login;
