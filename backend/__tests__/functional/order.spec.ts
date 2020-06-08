import request from 'supertest';

import { ItemInterface } from '../../src/interfaces/base';
import app from '../../src/app';
import { closeConnection, openConnection } from '../utils/connection';

import factory from '../factories';
import Order from '../../src/models/Order';
import Token from '../utils/getToken';
import Item from '../../src/models/Item';

describe('Order Controller', () => {
  beforeAll(() => {
    openConnection();
  });
  afterAll(() => {
    closeConnection();
  });
  beforeEach(async () => {
    await Order.deleteMany({});
    await Item.deleteMany({});
  });

  it('should create a order', async () => {
    const token = await Token;
    const item = await factory.create<ItemInterface>('Item');
    const response = await request(app)
      .post('/orders')
      .send({
        identification: 123,
        note: 'Ola',
        items: [
          {
            product: item._id,
            quantity: 5,
          },
        ],
      })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });
});
