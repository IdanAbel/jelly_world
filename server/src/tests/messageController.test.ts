import request from 'supertest';
import mongoose from 'mongoose';
import { createServer } from 'http';
import { Server } from 'socket.io';
import initApp from '../server';
import Message, { IMessage } from '../models/messageModel';

let app: any;
let server: any;
let io: any;

beforeAll(async () => {
    app = await initApp();
    server = createServer(app);
    io = new Server(server, {
        cors: {
            origin: '*',
        },
    });

    const port = process.env.PORT || 3002;
    server.listen(port, () => {
        console.log(`Test server is running on http://localhost:${port}`);
    });

    await Message.deleteMany({});
}, 20000);

afterAll(async () => {
    await Message.deleteMany({});
    await mongoose.connection.close();
    server.close();
}, 10000);

describe('Message Controller', () => {
    describe('GET /api/messages', () => {
        it('should return all messages', async () => {
            const testMessage = {
                text: 'Test message',
                sender: 'user1',
                senderName: 'User One',
            };
            await Message.create(testMessage);

            const response = await request(app).get('/api/messages');

            expect(response.status).toBe(200);
            expect(response.body.messages).toBeInstanceOf(Array);
            expect(response.body.messages.length).toBeGreaterThan(0);
            expect(response.body.messages[0].text).toBe('Test message');
        });
    });

    describe('createMessage', () => {
        it('should create a new message', async () => {
            const mockMessage = {
                text: 'Test message',
                sender: 'user2',
                senderName: 'User Two',
            };

            const newMessage = await Message.create(mockMessage);

            const response = await request(app).get('/api/messages');

            expect(response.status).toBe(200);
            expect(response.body.messages).toBeInstanceOf(Array);
            expect(response.body.messages.some((msg: IMessage) => msg.text === mockMessage.text)).toBeTruthy();
            expect(newMessage.text).toBe(mockMessage.text);
            expect(newMessage.sender).toBe(mockMessage.sender);
            expect(newMessage.senderName).toBe(mockMessage.senderName);
        });
    });
});