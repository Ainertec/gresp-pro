/* eslint-disable camelcase */
import bcrypt from 'bcrypt';
import { Document } from 'mongoose';

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

describe('Generate a hash password', () => {
  beforeAll(() => {
    openConnection();
  });
  afterAll(() => {
    closeConnection();
  });
  beforeEach(async () => {
    await User.deleteMany({});
  });

  it('should encrypt user password', async () => {
    const user = await factory.create<UserInterface>('User', {
      password: '123321',
    });

    const compareHash = await bcrypt.compare('123321', user.password_hash);
    expect(compareHash).toBe(true);
  });
});
