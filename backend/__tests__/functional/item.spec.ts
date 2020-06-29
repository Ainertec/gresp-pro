import request from 'supertest';

import { ItemInterface } from '../../src/interfaces/base';
import App from '../../src/app';

import { closeConnection, openConnection } from '../utils/connection';
import factory from '../factories';
import Token from '../utils/getToken';
import Item from '../../src/models/Item';
import User from '../../src/models/User';

const app = App.express;

describe('Item Tests', () => {
  beforeAll(() => {
    openConnection();
  });
  afterAll(() => {
    closeConnection();
  });
  beforeEach(async () => {
    await Item.deleteMany({});
    await User.deleteMany({});
  });

  it('should create an item', async () => {
    const token = await Token;

    const response = await request(app)
      .post('/items')
      .send({
        name: 'Coca cola',
        price: 10.5,
        description: 'Zero',
        drink: true,
        stock: 20,
      })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it('should update a Item', async () => {
    const token = await Token;

    const item = await factory.create<ItemInterface>('Item');

    const response = await request(app)
      .put(`/items/${item._id}`)
      .send({
        name: 'Coca cola',
        price: 10.5,
        description: 'Zero',
      })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it('should delete a Item', async () => {
    const token = await Token;

    const item = await factory.create<ItemInterface>('Item');

    const response = await request(app)
      .delete(`/items/${item._id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it('should list all items by page ', async () => {
    const token = await Token;

    await factory.createMany<ItemInterface>('Item', 10, {
      name: 'CLeiton',
    });
    await factory.createMany<ItemInterface>('Item', 10, {
      name: 'Aldair',
    });

    const response = await request(app)
      .get(`/items`)
      .set('Authorization', `Bearer ${token}`)
      .query({
        page: 2,
      });

    expect(response.status).toBe(200);
  });

  it('should list items by name', async () => {
    const token = await Token;

    await factory.create<ItemInterface>('Item', {
      name: 'pizza',
    });

    const response = await request(app).get(`/items/p`).set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });
});
