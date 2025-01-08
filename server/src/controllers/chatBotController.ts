import OpenAI from "openai";
import asyncHandler from "express-async-handler";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});


export const getRecommendations =
    asyncHandler(async (req, res) => {
        const {prompt, candies} = req.body;

        console.log(prompt, candies);

        try {
            const completion = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: "You are an assistant that recommends candies based on user preferences.",
                    },
                    {
                        role: "user",
                        content: `Based on the following candies: ${JSON.stringify(
                            candies
                        )}, recommend candies for this user preference: "${prompt}"`,
                    },
                ],
                max_tokens: 300,
            });

            const aiResponse = completion.choices[0].message.content;

            const recommendedCandies = (candies as any[]).filter((candy) =>
                aiResponse!.includes(candy.flavorName)
            );

            res.status(200).json({recommendations: recommendedCandies});
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({error: "Failed to fetch recommendations"});
        }
    })
;