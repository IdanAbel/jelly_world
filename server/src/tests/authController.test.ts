import request from 'supertest';
import mongoose from 'mongoose';
import { createServer } from 'http';
import { Server } from 'socket.io';
import initApp from '../server';
import User from '../models/userModel';

let app: any;
let server: any;
let io: any;
let accessToken: string;

const user = {
    name: 'rom bukobza',
    email: 'romdking@gmail.com',
    password: '23456789',
};

beforeAll(async () => {
    app = await initApp();
    server = createServer(app);
    io = new Server(server, {
        cors: {
            origin: '*',
        },
    });

    // Start the server
    const port = process.env.PORT || 3000;
    server.listen(port, () => {
        console.log(`Test server is running on http://localhost:${port}`);
    });

    await User.deleteOne({ email: user.email });
    await request(app).post('/api/users').send(user);
    const loginResponse = await request(app).post('/api/users/login').send(user);
    console.log(loginResponse.body);
    accessToken = loginResponse.body.token;
}, 20000);

afterAll(async () => {
    // Clean up and close connections
    await User.deleteOne({ email: user.email });
    await mongoose.connection.close();
    server.close();
}, 10000);

describe('User Routes', () => {
    afterEach(async () => {
        // Clean up test users after each test
        await User.deleteOne({ email: 'john@example.com' });
    });

    it('GET /api/users should return all users', async () => {
        const response = await request(app).get('/api/users').set('Authorization', `Bearer ${accessToken}`);
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    it('GET /api/users/:id should return a user by ID', async () => {
        const newUser = await User.create({
            name: 'Jon Cruyff',
            email: 'john@example.com',
            password: 'myPass23',
        });

        const response = await request(app).get(`/api/users/${newUser._id}`);
        expect(response.status).toBe(200);
        expect(response.body.name).toBe('Jon Cruyff');
    });

    it('GET /api/users/profile should return user profile', async () => {
        const response = await request(app)
            .get('/api/users/profile')
            .set('Authorization', `Bearer ${accessToken}`).send(user);
        expect(response.status).toBe(200);
        expect(response.body.name).toBe(user.name);
    });

    it('POST /api/users should create a new user', async () => {
        const userData = {
            name: 'Jon Cruyff',
            email: 'john@example.com',
            password: 'myPass23',
        };

        const response = await request(app).post('/api/users').send(userData);
        expect(response.status).toBe(200);
        expect(response.body.name).toBe('Jon Cruyff');
    });

    it('POST /api/users/login should authenticate user', async () => {
        const userData = {
            email: user.email,
            password: user.password,
        };

        const response = await request(app).post('/api/users/login').send(userData);
        expect(response.status).toBe(200);
        expect(response.body.token).toBeDefined();
    });

    it('PUT /api/users/profile should update user profile', async () => {
        const updatedData = {
            name: 'new Name',
            email: 'updatedUser@example.com',
        };

        const response = await request(app)
            .put('/api/users/profile')
            .set('Authorization', `Bearer ${accessToken}`)
            .send(updatedData);
        expect(response.status).toBe(200);
        expect(response.body.name).toBe('new Name');
    });

    it('DELETE /api/users/:id should delete user by ID', async () => {
        const newUser = await User.create({
            name: 'Jon Cruyff',
            email: 'john@example.com',
            password: 'myPass23',
        });

        const response = await request(app)
            .delete(`/api/users/${newUser._id}`)
            .set('Authorization', `Bearer ${accessToken}`);
        console.log(response.body);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('User deleted successfully');
    });
});