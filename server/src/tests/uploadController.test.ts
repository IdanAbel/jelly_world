import request from 'supertest';
import mongoose from 'mongoose';
import { createServer } from 'http';
import { Server } from 'socket.io';
import initApp from '../server';
import path from 'path';
import fs from 'fs';

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

    const port = process.env.PORT || 3001;
    server.listen(port, () => {
        console.log(`Test server is running on http://localhost:${port}`);
    });
}, 20000);

afterAll(async () => {
    await mongoose.connection.close();
    server.close();
}, 10000);

describe('Upload Controller', () => {
    it('POST /api/upload should upload an image and return the file path', async () => {
        const filePath = path.resolve(__dirname, 'test-image.jpg'); // Path to a test image file
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, 'dummy image content');
        }

        const response = await request(app)
            .post('/api/upload')
            .attach('file', filePath);

        expect(response.status).toBe(200);
        expect(response.text).toContain('/assets/');
    });

    it('POST /api/upload should return 400 if no file is uploaded', async () => {
        const response = await request(app)
            .post('/api/upload')
            .send();

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('No file uploaded.');
    });
});