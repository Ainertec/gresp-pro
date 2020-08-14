import request from 'supertest';

import { ItemInterface, OrderInterface } from '../../src/interfaces/base';
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

  it('should create a order', async () => {
    const token = await Token;
    const item = await factory.create<ItemInterface>('Item', {
      stock: 5,
    });
    const response = await request(app)
      .post('/orders')
      .send({
        identification: 123,
        note: 'Ola',
        items: [
          {
            product: item._id,
            quantity: 4,
          },
        ],
      })
      .set('Authorization', `Bearer ${token}`);

    expect(response.body).toHaveProperty('stockAlert');
    expect(response.status).toBe(200);
  });

  it('should not create a order with already existent identification', async () => {
    const token = await Token;
    const item = await factory.create<ItemInterface>('Item');
    await factory.create<OrderInterface>('Order', {
      identification: 123,
    });
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

    expect(response.status).toBe(400);
  });

  it('should update a order', async () => {
    const token = await Token;

    const order = await factory.create<OrderInterface>('Order', {
      identification: 123,
    });

    const item = await factory.create<ItemInterface>('Item', {
      stock: 5,
    });

    const response = await request(app)
      .put(`/orders/${order.identification}`)
      .send({
        note: 'Ola',
        items: [
          {
            product: item._id,
            quantity: 5,
          },
        ],
      })
      .set('Authorization', `Bearer ${token}`);

    expect(response.body).toHaveProperty('stockAlert');
    expect(response.status).toBe(200);
  });

  it('should not update an order with invalid identification', async () => {
    const token = await Token;

    await factory.create<OrderInterface>('Order', {
      identification: 123,
    });

    const item = await factory.create<ItemInterface>('Item', {
      stock: 5,
    });

    const response = await request(app)
      .put(`/orders/234234`)
      .send({
        note: 'Ola',
        items: [
          {
            product: item._id,
            quantity: 5,
          },
        ],
      })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
  });

  it('should close an order ', async () => {
    const token = await Token;

    const order = await factory.create<OrderInterface>('Order', {
      identification: 123,
    });

    const response = await request(app)
      .delete(`/orders/${order.identification}/dinheiro`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it('should list all open orders ', async () => {
    const token = await Token;

    await factory.createMany<OrderInterface>('Order', 5);

    const response = await request(app)
      .get(`/orders`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);

    expect(response.body.length).toBe(5);
  });
  it('should list an open orders by identification ', async () => {
    const token = await Token;

    const order = await factory.create<OrderInterface>('Order', {
      identification: 123,
    });

    const response = await request(app)
      .get(`/orders/${order.identification}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });
});
