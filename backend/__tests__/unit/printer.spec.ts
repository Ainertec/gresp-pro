import request from 'supertest';

import App from '../../src/app';
import { OrderInterface, ItemInterface } from '../../src/interfaces/base';

import { closeConnection, openConnection } from '../utils/connection';
import Token from '../utils/getToken';
import factory from '../factories';
import Order from '../../src/models/Order';

const app = App.express;

describe('Printer', () => {
  beforeAll(() => {
    openConnection();
  });
  afterAll(() => {
    closeConnection();
  });
  beforeEach(async () => {
    await Order.deleteMany({});
  });
  it('should create a new recipe ', async () => {
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

  it('should create a recipe updated ', async () => {
    const token = await Token;

    const item = await factory.create<ItemInterface>('Item', {
      name: 'Tomate',
      price: 2,
    });
    const item1 = await factory.create<ItemInterface>('Item', {
      name: 'Manga',
      price: 4,
    });
    const item2 = await factory.create<ItemInterface>('Item', {
      name: 'Chocolate',
      price: 5,
    });

    const oldOrder = await factory.create<OrderInterface>('Order', {
      identification: 123,
      items: [
        {
          product: item._id,
          quantity: 5,
          courtesy: false,
        },
        {
          product: item1._id,
          quantity: 5,
          courtesy: true,
        },
      ],
    });

    oldOrder.items = [
      {
        product: item._id,
        quantity: 5,
        courtesy: false,
      },
      {
        product: item1._id,
        quantity: 5,
        courtesy: true,
      },
      {
        product: item2._id,
        quantity: 5,
        courtesy: true,
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
          {
            product: item1._id,
            quantity: 5,
          },
        ],
      })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it('should create a recipe with quantity updated', async () => {
    const token = await Token;

    const item = await factory.create<ItemInterface>('Item', {
      name: 'Tomate',
    });
    const item1 = await factory.create<ItemInterface>('Item', {
      name: 'Manga',
    });
    const item2 = await factory.create<ItemInterface>('Item', {
      name: 'Chocolate',
    });

    const oldOrder = await factory.create<OrderInterface>('Order', {
      identification: 123544,
      items: [
        {
          product: item1._id,
          quantity: 5,
          courtesy: false,
        },
        {
          product: item._id,
          quantity: 5,
          courtesy: false,
        },
      ],
    });

    oldOrder.items = [
      {
        product: item._id,
        quantity: 7,
        courtesy: false,
      },
      {
        product: item1._id,
        quantity: 5,
        courtesy: false,
      },
      {
        product: item2._id,
        quantity: 5,
        courtesy: false,
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
            product: item1._id,
            quantity: 5,
          },
          {
            product: item._id,
            quantity: 5,
          },
        ],
      })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it('should create a productsReport ', async () => {
    const token = await Token;

    await factory.createMany<OrderInterface>('Order', 4, {
      closed: true,
    });

    const response = await request(app)
      .get(`/printer/products`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });
  it('should create a ordersReport ', async () => {
    const token = await Token;

    await factory.createMany<OrderInterface>('Order', 4, {
      closed: true,
    });

    const response = await request(app)
      .get(`/printer/orders`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });
});
