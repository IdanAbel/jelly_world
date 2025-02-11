import { GoogleGenerativeAI } from "@google/generative-ai";
import asyncHandler from "express-async-handler";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export const getRecommendations = asyncHandler(async (req, res) => {
    const { prompt, candies } = req.body;

    try {
        const promptText = `Based on the following candies (details include flavorName, groupName, ingredients, user reviews, and attributes like glutenFree, sugarFree, kosher, and seasonal): ${JSON.stringify(
            candies
        )}, recommend the top candies for the user preference: "${prompt}". Please provide a score (0-10) for each candy based on relevance.`;

        const result = await model.generateContent(promptText);
        const aiResponse = result.response.text();

        const scores = calculateCandyScores(aiResponse, candies);

        const recommendedCandies = scores
            .filter((candy) => candy.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, 3);

        res.status(200).json({ recommendations: recommendedCandies });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Failed to generate recommendations" });
    }
});

function calculateCandyScores(aiResponse: string, candies: any[]) {
    const maxPossibleScore = 20; 
    const scores = [];

    for (const candy of candies) {
        let score = 0;

        if (aiResponse.includes(candy.flavorName)) score += 3;
        if (aiResponse.includes(candy.groupName.join(", "))) score += 2;
        if (aiResponse.includes(candy.description)) score += 1;

        if (candy.rating > 4) score += candy.rating;
        if (candy.reviewsAmount > 50) score += 2;

        if (aiResponse.includes("gluten free") && candy.glutenFree) score += 1;
        if (aiResponse.includes("sugar free") && candy.sugarFree) score += 1;
        if (aiResponse.includes("kosher") && candy.kosher) score += 1;
        if (aiResponse.includes("seasonal") && candy.seasonal) score += 1;

        const normalizedScore = (score / maxPossibleScore) * 10;

        scores.push({ candy, score: Math.min(Math.max(normalizedScore, 0), 10) });

        console.log("Candy:", candy.flavorName, "Raw Score:", score, "Normalized Score:", normalizedScore);
    }

    return scores;
}
