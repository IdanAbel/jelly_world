import { Typography, Box, Tooltip, Fab } from "@mui/material";
import CandyList from "./components/CandyList.tsx";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store.ts";
import Chat from "../../Components/Chat.tsx";
import ChatIcon from "@mui/icons-material/Chat";

const Home = () => {
  const [isChatOpen, setChatOpen] = useState(false);
  const userLogin = useSelector((state: RootState) => state.userLogin);
  const { userInfo } = userLogin;

  const handleOpenChat = () => {
    setChatOpen(true);
  };

  const handleCloseChat = () => {
    setChatOpen(false);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Welcome to Candy World
      </Typography>
      <CandyList />
      <Box sx={{ display: "flex" }}>
        <Tooltip title="Open Movie Land Hub">
          <Fab
            color="primary"
            onClick={handleOpenChat}
            disabled={!userInfo || !userInfo.id}
            sx={{
              backgroundColor: "rgb(30, 153, 139)",
              position: "fixed",
              bottom: 16,
              right: 16,
            }}
          >
            <ChatIcon />
          </Fab>
        </Tooltip>
        {userInfo && userInfo.id && (
          <Chat isChatOpen={isChatOpen} handleCloseChat={handleCloseChat} />
        )}
      </Box>
    </Box>
  );
};

export default Home;