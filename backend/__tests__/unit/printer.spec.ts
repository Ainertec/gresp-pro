import request from 'supertest';
import fs from 'fs';
import path from 'path';
import App from '../../src/app';
import { OrderInterface, ItemInterface } from '../../src/interfaces/base';

import { closeConnection, openConnection } from '../utils/connection';
import Token from '../utils/getToken';
import factory from '../factories';
import Order from '../../src/models/Order';

const app = App.express;

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
  it('shuld create a new recipe ', async () => {
    const token = await Token;

    const oldOrder = await factory.create<OrderInterface>('Order', {
      identification: 222,
    });

    const response = await request(app)
      .post(`/printer`)
      .send({
        type: true,
        identification: oldOrder.identification,
      })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it('shuld create a recipe updated ', async () => {
    const token = await Token;

    const item = await factory.create<ItemInterface>('Item', {
      name: 'Tomate',
    });
    const item2 = await factory.create<ItemInterface>('Item', {
      name: 'Chocolate',
    });

    const oldOrder = await factory.create<OrderInterface>('Order', {
      identification: 123,
      items: [
        {
          product: item._id,
          quantity: 5,
        },
      ],
    });

    oldOrder.items = [
      {
        product: item._id,
        quantity: 5,
      },
      {
        product: item2._id,
        quantity: 5,
      },
    ];

    await oldOrder.save();

    const response = await request(app)
      .post(`/printer`)
      .send({
        identification: oldOrder.identification,
        type: false,
        oldItems: [
          {
            product: item._id,
            quantity: 5,
          },
        ],
      })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it('shuld create a recipe with quantity updated', async () => {
    const token = await Token;

    const item = await factory.create<ItemInterface>('Item', {
      name: 'Tomate',
    });
    const item2 = await factory.create<ItemInterface>('Item', {
      name: 'Chocolate',
    });

    const oldOrder = await factory.create<OrderInterface>('Order', {
      identification: 123544,
      items: [
        {
          product: item._id,
          quantity: 5,
        },
      ],
    });

    oldOrder.items = [
      {
        product: item._id,
        quantity: 7,
      },
      {
        product: item2._id,
        quantity: 5,
      },
    ];

    await oldOrder.save();

    const response = await request(app)
      .post(`/printer`)
      .send({
        identification: oldOrder.identification,
        type: false,
        oldItems: [
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
