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
    const user = await factory.create<UserInterface>('User', {
      name: 'Cleiton',
      password: '123456',
    });

    const response = await request(app).post('/sessions').send({
      name: 'Cleiton',
      password: '123456',
    });

    expect(response.status).toBe(200);
  });
  it('it should not authenticate a user with invalid credential', async () => {
    const user = await factory.create<UserInterface>('User', {
      name: 'Cleiton',
      password: '123456',
    });

    const response = await request(app).post('/sessions').send({
      name: 'Cleiton',
      password: '214123',
    });

    expect(response.status).toBe(401);
  });
});
