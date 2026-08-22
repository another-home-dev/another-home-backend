import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import * as jwt from 'jsonwebtoken';
import { AppModule as GatewayModule } from '../../another-home-gateway/src/app.module';
import { AppModule as BackendModule } from '../src/app.module';

describe('Gateway & Accommodation End-to-End integration', () => {
    let gatewayApp: INestApplication;
    let backendApp: INestApplication;

    beforeAll(async () => {
        const backendFixture: TestingModule = await Test.createTestingModule({
            imports: [BackendModule],
        }).compile();
        backendApp = backendFixture.createNestApplication();
        await backendApp.listen(4001);

        const gatewayFixture: TestingModule = await Test.createTestingModule({
            imports: [GatewayModule],
        }).compile();
        gatewayApp = gatewayFixture.createNestApplication();
        await gatewayApp.listen(3001);
    });

    afterAll(async () => {
        await gatewayApp.close();
        await backendApp.close();
    });

    const generateToken = (sub: string, roles: string[]): string => {
        const payload = {
            sub,
            roles,
            exp: Math.floor(Date.now() / 1000) + 3600,
        };
        return jwt.sign(payload, 'test-secret-dev');
    };

    it('should reject requests without a JWT token with 401', async () => {
        await request('http://localhost:3001')
            .get('/api/v1/accommodation/rooms')
            .expect(401);
    });

    it('should reject student role from creating a room with 403', async () => {
        const studentToken = generateToken('student-1', ['student']);

        await request('http://localhost:3001')
            .post('/api/v1/accommodation/rooms')
            .set('Authorization', `Bearer ${studentToken}`)
            .send({
                roomNumber: 'A-901',
                capacity: 4,
                gender: 'Male',
                airConditioning: 'Non-AC',
                rentPerMonth: 5000,
                floor: 1
            })
            .expect(403);
    });

    it('should permit staff role to create a room successfully', async () => {
        const staffToken = generateToken('staff-1', ['staff']);
        const roomNumber = `A-${Math.floor(Math.random() * 1000000)}`;

        const response = await request('http://localhost:3001')
            .post('/api/v1/accommodation/rooms')
            .set('Authorization', `Bearer ${staffToken}`)
            .send({
                roomNumber,
                capacity: 2,
                gender: 'Female',
                airConditioning: 'AC',
                rentPerMonth: 6500,
                floor: 2
            });

        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Room created successfully.');
        expect(response.body.data.roomNumber).toBe(roomNumber);
    });

});
