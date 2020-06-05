import request from 'supertest';
import app from '../../src/app';

import { closeConnection, openConnection } from '../utils/connection';
import factory from '../factories';
import User from '../../src/models/User';

interface UserInterface extends Document {
  name: string;
  password_hash: string;
  password: string;
  question: string;
  response: string;
  admin: boolean;
  generateToken(): string;
}

describe('Session Tests', () => {
  beforeAll(() => {
    openConnection();
  });
  afterAll(() => {
    closeConnection();
  });
  beforeEach(async () => {
    await User.deleteMany({});
  });

  it('it should authenticate a user', async () => {
    await factory.create<UserInterface>('User', {
      name: 'Cleiton',
      password: '123456',
    });

    const response = await request(app).post('/sessions').send({
      name: 'Cleiton',
      password: '123456',
    });

    expect(response.status).toBe(200);
  });

  it('it should not authenticate a user with invalid password', async () => {
    await factory.create<UserInterface>('User', {
      name: 'Cleiton',
      password: '123456',
    });

    const response = await request(app).post('/sessions').send({
      name: 'Cleiton',
      password: '214123',
    });

    expect(response.status).toBe(401);
  });

  it('it should not authenticate a user with invalid name', async () => {
    await factory.create<UserInterface>('User', {
      name: 'Cleiton',
      password: '123456',
    });

    const response = await request(app).post('/sessions').send({
      name: 'Marcos',
      password: '123456',
    });

    expect(response.status).toBe(401);
  });

  it('it should return a Jwt token when authenticate', async () => {
    await factory.create<UserInterface>('User', {
      name: 'Cleiton',
      password: '123456',
    });

    const response = await request(app).post('/sessions').send({
      name: 'Cleiton',
      password: '123456',
    });

    expect(response.body).toHaveProperty('token');
    expect(response.status).toBe(200);
  });

  it('it should to be able to access private routes', async () => {
    const user = await factory.create<UserInterface>('User', {
      name: 'Cleiton',
      password: '123456',
    });

    const response = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${user.generateToken()}`);

    console.log('users', response.body);
    expect(response.status).toBe(200);
  });
});
