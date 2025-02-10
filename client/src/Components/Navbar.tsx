import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button } from "@mui/material";
import styled from "styled-components";

import React from "react";
import { useAuth } from "../Context/AuthContext";
import LogoutPanel from "./LogoutPanel.tsx";
import { logout } from "../Services/userService.ts";

interface UserLoginState {
  userInfo: {
    name: string;
    email: string;
  } | null;
}

interface RootState {
  userLogin: UserLoginState;
}

const StyledNavbar = styled.nav`
  z-index: 999;
  padding: 20px;
  display: flex;
  align-items: center;
  margin: 0 auto;
  border-bottom: 5px solidrgb(242, 242, 242);
  border-radius: 0 0 15px 15px;
  background-color: rgb(153, 30, 143);
  position: sticky;
  top: 0;
  justify-content: space-between;
`;

const StyledLink = styled(Link)`
  h1 {
    color: rgb(60, 185, 168);
  }
  margin-left: 16px;
  text-decoration: none;
  padding: 6px;
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state: RootState) => state.userLogin);
  const { userInfo } = userLogin;
  const { isAuthenticatedWithGoogle } = useAuth();

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(logout() as any);
  };

  const handleClick = () => {
    navigate("/candy-insert");
  };

  return (
    <StyledNavbar>
      <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <StyledLink to="/">
          <img src="\favicon.ico" alt="Logo" height={40} width={40} />
          <h1>Candy World</h1>
        </StyledLink>
      </Box>
      {userInfo ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginLeft: "auto",
          }}
        >
          <Button
            sx={{
              backgroundColor: "white",
              color: "black",
              borderRadius: "10px",
              marginRight: "5px",
              "&:hover": {
                backgroundColor: "red",
              },
            }}
            onClick={handleClick}
          >
            {"Add Candy"}
          </Button>
          <Button
            sx={{
              backgroundColor: "white",
              color: "black",
              borderRadius: "10px",
              marginRight: "-8px",
              "&:hover": {
                backgroundColor: "red",
              },
            }}
            onClick={handleLogout}
          >
            {isAuthenticatedWithGoogle ? <LogoutPanel /> : "Logout"}
          </Button>
          <StyledLink to="/profile">
            <Button
              sx={{
                backgroundColor: "white",
                color: "black",
                borderRadius: "10px",
                marginLeft: "-4px !important",
                "&:hover": {
                  backgroundColor: "red",
                },
              }}
            >
              Profile
            </Button>
          </StyledLink>
        </Box>
      ) : (
        <StyledLink to="/login">
          <Button
            sx={{
              backgroundColor: "white",
              color: "black",
              borderRadius: "10px",
              marginRight: "5px",
              "&:hover": {
                backgroundColor: "red",
              },
            }}
          >
            Sign In
          </Button>
        </StyledLink>
      )}
    </StyledNavbar>
  );
};

export default Navbar;
