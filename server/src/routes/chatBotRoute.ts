import express from "express";
import { getRecommendations } from "../controllers/chatBotController";

const router = express.Router();

router.post("/recommended", getRecommendations);

export default router;

/**
 * @swagger
 * /api/chatbot/recommended:
 *   post:
 *     summary: Get recommended candies based on user preferences
 *     tags:
 *       - Chatbot
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               prompt:
 *                 type: string
 *                 description: User preference input
 *               candies:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     flavorName:
 *                       type: string
 *                     groupName:
 *                       type: array
 *                       items:
 *                         type: string
 *                     ingredients:
 *                       type: array
 *                       items:
 *                         type: string
 *                     reviewsAmount:
 *                       type: integer
 *                     rating:
 *                       type: number
 *                     glutenFree:
 *                       type: boolean
 *                     sugarFree:
 *                       type: boolean
 *                     kosher:
 *                       type: boolean
 *                     seasonal:
 *                       type: boolean
 *     responses:
 *       '200':
 *         description: Successfully retrieved recommended candies
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 recommendations:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       candy:
 *                         type: object
 *                         properties:
 *                           flavorName:
 *                             type: string
 *                       score:
 *                         type: number
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Server error
 */
