import React from "react";
import { Box, Divider } from "@mui/material";
import LoginForm from "./components/LoginForm";
import LoginPanel from "../../Components/LoginPanel.tsx";

const Login: React.FC = () => {
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
      <LoginPanel />
    </Box>
  );
};

export default Login;
