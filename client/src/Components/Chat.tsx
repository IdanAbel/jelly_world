import React, { useState, useEffect, KeyboardEvent } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Paper,
  Typography,
  Box,
  Avatar,
  Grid,
  IconButton,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SendIcon from "@mui/icons-material/Send";

const socket = io('http://localhost:3000'); // Update with your server URL

interface Message {
  text: string;
  sender: string;
  senderName: string;
}

interface UserInfo {
  id: string;
  name: string;
}

interface ChatProps {
  isChatOpen: boolean;
  handleCloseChat: () => void;
}

const Chat: React.FC<ChatProps> = ({ isChatOpen, handleCloseChat }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");

  const userLogin = useSelector((state: any) => state.userLogin);
  const { userInfo }: { userInfo: UserInfo } = userLogin;

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get("/api/messages");
      setMessages(data.messages);
    }
    fetchData();
  }, []);

  useEffect(() => {
    socket.on("update-messages", (message: Message) => {
      console.log(message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("update-messages");
    };
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      socket.emit("new-message", {
        text: newMessage,
        sender: userInfo.id,
        senderName: userInfo.name,
      });
      setNewMessage("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); 
      handleSendMessage();
    }
  };

  return (
    <Dialog open={isChatOpen} onClose={handleCloseChat} maxWidth="md" fullWidth>
      <DialogTitle>Candy Chat</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            height: "350px",
            overflowY: "auto",
            marginBottom: "10px",
          }}
        >
          <Paper
            elevation={3}
            style={{
              minHeight: "300px",
              maxHeight: "350px",
              padding: "10px",
              marginBottom: "10px",
              overflowY: "auto",
            }}
          >
            {messages?.map((message, index) => (
              <Grid
                key={index}
                container
                spacing={2}
                alignItems="center"
                style={{
                  marginBottom: "10px",
                  paddingLeft: "10px",
                }}
              >
                <Grid item>
                  <Avatar>
                    <AccountCircleIcon />
                  </Avatar>
                </Grid>
                <Grid item xs>
                  <Box
                    bgcolor={
                      message.sender === userInfo.id
                        ? "rgb(30, 153, 139)"
                        : "#bdbdbd"
                    }
                    p={2}
                    borderRadius={8}
                    style={{ position: "relative" }}
                  >
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      style={{
                        color:
                          message.sender === userInfo.id ? "white" : "black",
                        marginBottom: "4px",
                      }}
                    >
                      {message.senderName}
                    </Typography>
                    <Typography
                      variant="body2"
                      style={{
                        color:
                          message.sender === userInfo.id ? "white" : "black",
                      }}
                    >
                      {message.text}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            ))}
          </Paper>
        </Box>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TextField
            label="Type your message"
            variant="outlined"
            fullWidth
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <IconButton color="primary" onClick={handleSendMessage}>
            <SendIcon />
          </IconButton>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Chat;
