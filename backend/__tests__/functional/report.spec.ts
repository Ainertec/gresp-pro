import request from 'supertest';

import { ItemInterface, UserInterface } from '../../src/interfaces/base';
import App from '../../src/app';
import { closeConnection, openConnection } from '../utils/connection';

import factory from '../factories';
import Order from '../../src/models/Order';
import Token from '../utils/getToken';
import Item from '../../src/models/Item';
import { sub } from 'date-fns';

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

  it('shold list closed orders amount by an informated date ', async () => {
    const token = await Token;

    await factory.createMany('Order', 3, {
      createdAt: new Date(2020, 3, 1),
      closed: true,
    });
    await factory.createMany('Order', 3, {
      createdAt: new Date(2020, 5, 30),
      closed: true,
    });
    await factory.createMany('Order', 3, {
      createdAt: new Date(2020, 7, 30),
      closed: true,
    });
    await factory.createMany('Order', 3, {
      createdAt: new Date(2020, 2, 30),
      closed: true,
    });

    const response = await request(app)
      .get('/reports')
      .query({
        initial: '2020-06-01',
        final: '2020-08-30',
      })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it('shold list closed orders total by an informated date ', async () => {
    const token = await Token;

    await factory.createMany('Order', 3, {
      createdAt: new Date(2020, 3, 1),
      closed: true,
    });
    await factory.createMany('Order', 3, {
      createdAt: new Date(2020, 5, 30),
      closed: true,
    });
    await factory.createMany('Order', 3, {
      createdAt: new Date(2020, 7, 30),
      closed: true,
    });
    await factory.createMany('Order', 3, {
      createdAt: new Date(2020, 2, 30),
      closed: true,
    });

    const response = await request(app)
      .get('/reports/total')
      .query({
        initial: '2020-06-01',
        final: '2020-08-30',
      })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it('shold not list closed orders amount with invalide date period ', async () => {
    const token = await Token;

    const response = await request(app)
      .get('/reports')
      .query({
        initial: '2020-13-01',
        final: '2020-08-33',
      })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(400);
  });

  it('shold list closed orders amount ', async () => {
    const token = await Token;

    await factory.createMany('Order', 3, {
      createdAt: new Date(2020, 3, 1),
      closed: true,
      total: 100,
    });
    await factory.createMany('Order', 3, {
      createdAt: new Date(2020, 5, 30),
      closed: true,
      total: 100,
    });
    await factory.createMany('Order', 3, {
      createdAt: new Date(2020, 7, 30),
      closed: true,
      total: 100,
    });
    await factory.createMany('Order', 3, {
      createdAt: new Date(2020, 2, 30),
      closed: true,
      total: 100,
    });

    const response = await request(app).get('/reports/all').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        total: '1200.00',
      })
    );
  });

  it('shold list items with amount quantity ', async () => {
    const token = await Token;

    const item = await factory.create<ItemInterface>('Item', {
      name: 'Pizza',
    });
    const item2 = await factory.create<ItemInterface>('Item', {
      name: 'coca cola',
      drink: true,
    });

    await factory.createMany('Order', 2, {
      createdAt: new Date(2020, 3, 1),
      items: [
        {
          product: item._id,
          quantity: 3,
        },
        {
          product: item2._id,
          quantity: 1,
        },
      ],
      total: 100,
    });
    await factory.createMany('Order', 3, {
      createdAt: new Date(2020, 5, 30),
      items: [
        {
          product: item._id,
          quantity: 1,
        },
        {
          product: item2._id,
          quantity: 2,
        },
      ],
      closed: true,
      total: 100,
    });

    const response = await request(app)
      .get('/reports/products')
      .set('Authorization', `Bearer ${token}`);

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          amount: 9,
        }),
      ])
    );
    expect(response.status).toBe(200);
  });

  it('should not access report rout without admin privileges', async () => {
    const user = await factory.create<UserInterface>('User', {
      admin: false,
    });
    const response = await request(app)
      .get('/reports')
      .query({
        initial: '2020-06-01',
        final: '2020-08-30',
      })
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(401);
  });

  it('should list closed orders by period', async () => {
    const token = await Token;

    await factory.createMany('Order', 3, {
      createdAt: new Date(2020, 3, 1),
      closed: true,
      total: 100,
    });
    await factory.createMany('Order', 3, {
      createdAt: new Date(2020, 5, 30),
      closed: true,
      total: 100,
    });
    await factory.createMany('Order', 3, {
      createdAt: new Date(2020, 7, 30),
      closed: true,
      total: 100,
    });
    await factory.createMany('Order', 3, {
      createdAt: new Date(2020, 2, 30),
      closed: true,
      total: 100,
    });

    const response = await request(app)
      .get('/reports/orders')
      .query({
        initial: '2020-06-01',
        final: '2020-08-30',
      })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(6);
  });

  it('should delete close order with more than 2 years', async () => {
    const token = await Token;

    await factory.createMany('Order', 3, {
      createdAt: sub(new Date(), { years: 2 }),
      closed: true,
    });
    await factory.create('Order');

    const response = await request(app).delete('/reports').set('Authorization', `Bearer ${token}`);

    const sales = await Order.find().countDocuments();
    expect(response.status).toBe(200);
    expect(sales).toBe(1);
  });
});
