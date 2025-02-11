import request from 'supertest';
import mongoose from 'mongoose';
import { createServer } from 'http';
import { Server } from 'socket.io';
import initApp from '../server'; // Adjust the path as needed
import Candy from '../models/candyModel'; // Adjust the path as needed
import User from '../models/userModel'; // Adjust the path as needed

let app: any;
let server: any;
let io: any;
let accessToken: string;

const user = {
    name: 'test user',
    email: 'test@example.com',
    password: 'password123',
};

beforeAll(async () => {
    // Initialize the app and server
    app = await initApp();
    server = createServer(app);
    io = new Server(server, {
        cors: {
            origin: '*',
        },
    });

    // Start the server
    const port = process.env.PORT || 3003;
    server.listen(port, () => {
        console.log(`Test server is running on http://localhost:${port}`);
    });

    // Ensure the database is connected
    await mongoose.connect(process.env.DB_CONNECT!);

    // Clean up existing data
    await Candy.deleteMany({});
    await User.deleteOne({ email: user.email });

    // Register and log in a test user
    await request(app).post('/api/users').send(user);
    const loginResponse = await request(app).post('/api/users/login').send(user);
    accessToken = loginResponse.body.token;
}, 10000);
afterAll(async () => {
    // Clean up and close connections
    await Candy.deleteMany({});
    await User.deleteOne({ email: user.email });
    await mongoose.connection.close();
    server.close();
}, 10000);

describe('Candy Controller', () => {
    let candyId: string;

    // Test GET /api/candy
    it('GET /api/candy should return all candies', async () => {
        const response = await request(app).get('/api/candy');
        expect(response.status).toBe(200);
        expect(response.body.candies).toBeInstanceOf(Array);
    });

    // Test POST /api/candy
    it('POST /api/candy should create a new candy', async () => {
        const candyData = {
            flavorName: 'Test Flavor',
            description: 'Test Description',
            createdBy: new mongoose.Types.ObjectId(), // Mock user ID
        };

        const response = await request(app)
            .post('/api/candy')
            .set('Authorization', `Bearer ${accessToken}`)
            .send(candyData);

        console.log('Created Candy:', response.body); // Log the created candy
        expect(response.status).toBe(201);
        expect(response.body.flavorName).toBe('Test Flavor');
        candyId = response.body._id; // Save the candy ID for later tests
    });

    // Test GET /api/candy/:id
    it('GET /api/candy/:id should return a candy by ID', async () => {
        const response = await request(app).get(`/api/candy/${candyId}`);
        console.log('Candy ID:', candyId); // Log the candy ID
        expect(response.status).toBe(200);
    });

    // Test PUT /api/candy/:id
    it('PUT /api/candy/:id should update a candy', async () => {
        const updatedData = {
            flavorName: 'Updated Flavor',
            description: 'Updated Description',
        };

        const response = await request(app)
            .put(`/api/candy/${candyId}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .send(updatedData);

        expect(response.status).toBe(200);
        expect(response.body.flavorName).toBe('Updated Flavor');
    });

    // Test POST /api/candy/:id/reviews
    it('POST /api/candy/:id/reviews should add a review to a candy', async () => {
        const reviewData = {
            rating: 5,
            comment: 'Great candy!',
        };

        const response = await request(app)
            .post(`/api/candy/${candyId}/reviews`)
            .set('Authorization', `Bearer ${accessToken}`)
            .send({ review: reviewData });

        expect(response.status).toBe(200);
        expect(response.body.reviews.length).toBe(1);
        expect(response.body.reviews[0].comment).toBe('Great candy!');
    });

    // Test GET /api/candy/top
    it('GET /api/candy/top should return top-rated candies', async () => {
        const response = await request(app).get('/api/candy/top');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    // Test GET /api/candy/example
    it('GET /api/candy/example should return example candies', async () => {
        const response = await request(app).get('/api/candy/example');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    // Test DELETE /api/candy/:id
    it('DELETE /api/candy/:id should delete a candy', async () => {
        const response = await request(app)
            .delete(`/api/candy/${candyId}`)
            .set('Authorization', `Bearer ${accessToken}`);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Candy removed');
    });
});