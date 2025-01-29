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
    CircularProgress,
    Chip,
} from "@mui/material";

import axios from "axios";
import { Candy } from "../Util/types";

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
                candies: candies.candies,
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
                {isLoading ? (
                    <Box sx={{ textAlign: "center", mt: 2 }}>
                        <CircularProgress />
                        <Typography variant="body2" color="textSecondary">
                            Thinking...
                        </Typography>
                    </Box>
                ) : recommendations.length > 0 ? (
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="h6">Recommended Candies:</Typography>
                        <List>
                            {(recommendations as [{score: number, candy: Candy}]).map((recommendation, index) => (
                                <ListItem key={index} alignItems="flex-start">
                                    {/*<Avatar*/}
                                    {/*    src={URL.createObjectURL(recommendation.candy.image)}*/}
                                    {/*    alt={recommendation.candy.flavorName}*/}
                                    {/*    sx={{ mr: 2 }}*/}
                                    {/*/>*/}
                                    <ListItemText
                                        primary={recommendation.candy.flavorName}
                                        secondary={
                                            <>
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    color="textPrimary"
                                                >
                                                    {recommendation.candy.description}
                                                </Typography>
                                                <Box sx={{ mt: 1 }}>
                                                    <Chip
                                                        label={`Matching rating: ${recommendation.score} ⭐`}
                                                        size="small"
                                                        color="primary"
                                                    />
                                                    {recommendation.candy.glutenFree && (
                                                        <Chip
                                                            label="Gluten-Free"
                                                            size="small"
                                                            color="success"
                                                            sx={{ ml: 1 }}
                                                        />
                                                    )}
                                                    {recommendation.candy.sugarFree && (
                                                        <Chip
                                                            label="Sugar-Free"
                                                            size="small"
                                                            color="warning"
                                                            sx={{ ml: 1 }}
                                                        />
                                                    )}
                                                    {recommendation.candy.kosher && (
                                                        <Chip
                                                            label="Kosher"
                                                            size="small"
                                                            color="info"
                                                            sx={{ ml: 1 }}
                                                        />
                                                    )}
                                                    {recommendation.candy.seasonal && (
                                                        <Chip
                                                            label="Seasonal"
                                                            size="small"
                                                            color="secondary"
                                                            sx={{ ml: 1 }}
                                                        />
                                                    )}
                                                </Box>
                                            </>
                                        }
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                ) : (
                    <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                        No recommendations yet. Start by telling me what you like!
                    </Typography>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseChat}>Close</Button>
                <Button onClick={handleSendMessage} disabled={isLoading || !userInput}>
                    Send
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ChatBot;
