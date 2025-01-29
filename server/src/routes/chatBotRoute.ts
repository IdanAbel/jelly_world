import express from "express";
import { getRecommendations } from "../controllers/chatBotController";

const router = express.Router();

router.post("/recommended", getRecommendations);

export default router;
