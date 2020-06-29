import request from 'supertest';

import { OrderInterface } from '../../src/interfaces/base';
import App from '../../src/app';
import { closeConnection, openConnection } from '../utils/connection';

import factory from '../factories';
import Order from '../../src/models/Order';
import Token from '../utils/getToken';
import Item from '../../src/models/Item';

const app = App.express;

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

  it('should finish a order', async () => {
    const token = await Token;

    const order = await factory.create<OrderInterface>('Order');

    const response = await request(app)
      .post('/kitchen')
      .send({
        identification: order.identification,
      })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        finished: true,
      })
    );
  });

  it('should list all finished orders', async () => {
    const token = await Token;

    await factory.create<OrderInterface>('Order', {
      identification: 9,
      finished: true,
      closed: false,
    });
    await factory.createMany<OrderInterface>('Order', 2, {
      finished: false,
      closed: false,
    });

    const response = await request(app).get('/kitchen').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          identification: 9,
        }),
      ])
    );
  });
});
