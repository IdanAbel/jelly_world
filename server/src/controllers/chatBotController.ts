import { GoogleGenerativeAI } from "@google/generative-ai";
import asyncHandler from "express-async-handler";

const genAI = new GoogleGenerativeAI("aaa"); //todo: put your own api key here to make it work
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export const getRecommendations = asyncHandler(async (req, res) => {
    const { prompt, candies } = req.body;

    console.log(prompt, candies);

    try {
        const promptText: string = `Based on the following candies: ${JSON.stringify(
                candies)}, recommend candies for this user preference: "${prompt}"`;
        const result = await model.generateContent(promptText);
        const aiResponse = result.response.text();

        console.log("AI Response: ", aiResponse);

        const recommendedCandies = candies.filter((candy: any) =>
            aiResponse.includes(candy.description)  || aiResponse.includes(candy.flavorName) || aiResponse.includes(candy.groupName)
        );

        console.log("The recommended candies are", recommendedCandies);

        res.status(200).json({ recommendations: recommendedCandies });
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ error: "failed to generate recommendations"});
    }
});