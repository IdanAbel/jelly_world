import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Box,
    Typography,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";

import axios from "axios";
import {Candy} from "../Util/types.ts";

interface ChatBotProps {
    isChatOpen: boolean;
    handleCloseChat: () => void;
    candies: Candy[];
}

const ChatBot: React.FC<ChatBotProps> = ({ isChatOpen, handleCloseChat, candies }) => {
    const [userInput, setUserInput] = useState<string>("");
    const [recommendations, setRecommendations] = useState<Candy[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleUserInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserInput(e.target.value);
    };

    const handleSendMessage = async () => {
        if (!userInput.trim()) return;
        setIsLoading(true);

        try {
            const response = await axios.post("/api/chatbot/recommended", {
                prompt: userInput,
                candies: ["vanil","shoko"],
            });

            setRecommendations(response.data.recommendations);
        } catch (error) {
            console.error("Error fetching recommendations:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isChatOpen} onClose={handleCloseChat} maxWidth="sm" fullWidth>
            <DialogTitle>AI Candy Recommender</DialogTitle>
            <DialogContent>
                <Box sx={{ mb: 2 }}>
                    <Typography variant="body1">
                        Tell me about your candy preferences, and I'll recommend some for you!
                    </Typography>
                </Box>
                <TextField
                    fullWidth
                    label="What kind of flavors do you like?"
                    value={userInput}
                    onChange={handleUserInputChange}
                    disabled={isLoading}
                />
                {isLoading && (
                    <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                        Thinking...
                    </Typography>
                )}
                {recommendations.length > 0 && (
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="h6">Recommended Candies:</Typography>
                        <List>
                            {recommendations.map((candy, index) => (
                                <ListItem key={index}>
                                    <ListItemText
                                        primary={candy.flavorName}
                                        secondary={candy.description}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseChat}>Close</Button>
                <Button onClick={handleSendMessage} disabled={isLoading}>
                    Send
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ChatBot;
