import request from 'supertest';
import fs from 'fs';
import path from 'path';
import app from '../../src/app';
import { OrderInterface } from '../../src/interfaces/base';

import { closeConnection, openConnection } from '../utils/connection';
import Token from '../utils/getToken';
import factory from '../factories';
import Order from '../../src/models/Order';

describe('Stock controller', () => {
  beforeAll(() => {
    openConnection();
  });
  afterAll(() => {
    closeConnection();
  });
  beforeEach(async () => {
    await Order.deleteMany({});
  });
  it('shuld create a recipe', async () => {
    const token = await Token;
    const order = await factory.create<OrderInterface>('Order');

    const response = await request(app)
      .get(`/printer`)
      .query({
        identification: order.identification,
        type: 'fiscal',
      })
      .set('Authorization', `Bearer ${token}`);

    setTimeout(async () => {
      await fs.unlinkSync(path.resolve(__dirname, '..', 'recipes', `${order.identification}.txt`));
    }, 1000);

    expect(response.status).toBe(200);
  });
});
