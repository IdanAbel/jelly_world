import { Typography, Box, Tooltip, Fab } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store.ts";
import ChatBot from "../../Components/ChatBot.tsx";
import Chat from "../../Components/Chat.tsx";
import ChatIcon from "@mui/icons-material/Chat";
import SavedSearchIcon from '@mui/icons-material/SavedSearch';
import CandyList from "../../Components/candyList.tsx";

const Home = () => {
    const [isChatOpen, setChatOpen] = useState(false);
    const [isUserChatOpen, setUserChatOpen] = useState(false);
    const userLogin = useSelector((state: RootState) => state.userLogin);
    const { userInfo } = userLogin;
    const candies = useSelector((state: RootState) => state.candyList);

    const handleOpenChat = () => {
        setChatOpen(true);
    };

    const handleCloseChat = () => {
        setChatOpen(false);
    };

    const handleOpenUserChat = () => {
        setUserChatOpen(true);
    };

    const handleCloseUserChat = () => {
        setUserChatOpen(false);
    };

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Welcome to Candy World
            </Typography>
            <CandyList />
            <Box sx={{ display: "flex", position: "relative" }}>
                <Tooltip title="Open Candy Recommender">
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
                        <SavedSearchIcon />
                    </Fab>
                </Tooltip>

                <Tooltip title="Open User Chat">
                    <Fab
                        color="primary"
                        onClick={handleOpenUserChat}
                        disabled={!userInfo || !userInfo.id}
                        sx={{
                            backgroundColor: "rgb(30, 153, 139)",
                            position: "fixed",
                            bottom: 80,
                            right: 16,
                        }}
                    >
                        <ChatIcon />
                    </Fab>
                </Tooltip>

                {userInfo && userInfo.id && (
                    <ChatBot
                        isChatOpen={isChatOpen}
                        handleCloseChat={handleCloseChat}
                        candies={candies}
                    />
                )}

                {userInfo && userInfo.id && (
                    <Chat isChatOpen={isUserChatOpen} handleCloseChat={handleCloseUserChat} />
                )}
            </Box>
        </Box>
    );
};

export default Home;
