import request from 'supertest';
import app from '../../src/app';
import { OrderInterface, ItemInterface } from '../../src/interfaces/base';

import { closeConnection, openConnection } from '../utils/connection';
import Token from '../utils/getToken';
import factory from '../factories';
import Order from '../../src/models/Order';
import Item from '../../src/models/Item';

describe('Stock controller', () => {
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

  it('shuld substract an item stock when the order is closeing', async () => {
    const token = await Token;

    const item = await factory.create<ItemInterface>('Item', {
      stock: 25,
    });

    const order = await factory.create<OrderInterface>('Order', {
      items: [
        {
          product: item._id,
          quantity: 5,
        },
      ],
    });

    const response = await request(app)
      .delete(`/orders/${order.identification}/dinheiro`)
      .set('Authorization', `Bearer ${token}`);

    const itemStock = await Item.findOne({ _id: item._id });

    expect(itemStock?.stock).toBe(20);
  });

  it('shuld not substract an item stock when the order is not closed, update', async () => {
    const token = await Token;

    const item = await factory.create<ItemInterface>('Item', {
      stock: 25,
    });

    const order = await factory.create<OrderInterface>('Order', {
      items: [
        {
          product: item._id,
          quantity: 5,
        },
      ],
    });

    await request(app)
      .put(`/orders/${order.identification}`)
      .send({
        note: 'hehehe',
        items: [
          {
            product: item._id,
            quantity: 5,
          },
        ],
      })
      .set('Authorization', `Bearer ${token}`);

    const itemStock = await Item.findOne({ _id: item._id });

    expect(itemStock?.stock).toBe(25);
  });
});
