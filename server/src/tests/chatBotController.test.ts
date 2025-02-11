import request from "supertest";
import initApp from "../server";
import { createServer } from "http";

jest.mock("@google/generative-ai", () => {
    return {
        GoogleGenerativeAI: jest.fn().mockImplementation(() => ({
            getGenerativeModel: () => ({
                generateContent: jest.fn().mockResolvedValue({
                    response: { text: () => "Best candy recommendations: Chocolate Bar, Gummy Bears" }
                })
            })
        }))
    };
});

let app: any;
let server: any;

beforeAll(async () => {
    app = await initApp();
    server = createServer(app);
});

describe("GET /recommendations", () => {
    it("should return top 3 recommended candies", async () => {
        const response = await request(app)
            .post("/api/chatbot/recommended")
            .send({
                prompt: "I love chocolate and gummy candies.",
                candies: [
                    { flavorName: "Chocolate Bar", groupName: ["Chocolate"], description: "Rich dark chocolate", rating: 4.5, reviewsAmount: 100, glutenFree: true, sugarFree: false, kosher: true, seasonal: false },
                    { flavorName: "Gummy Bears", groupName: ["Gummy"], description: "Fruity chewy candy", rating: 4.7, reviewsAmount: 200, glutenFree: true, sugarFree: true, kosher: false, seasonal: false }
                ]
            });

        expect(response.status).toBe(200);
        expect(response.body.recommendations).toBeDefined();
        expect(response.body.recommendations.length).toBeGreaterThan(0);
    });
});