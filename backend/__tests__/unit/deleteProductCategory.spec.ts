import request from 'supertest';

import { ItemInterface, ICategory } from '../../src/interfaces/base';
import App from '../../src/app';

import { closeConnection, openConnection } from '../utils/connection';
import factory from '../factories';
import Token from '../utils/getToken';
import Item from '../../src/models/Item';
import User from '../../src/models/User';
import Category from '../../src/models/Category';

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
    await Category.deleteMany({});
  });

  it('should delete a product from a category, when deleted a product', async () => {
    const token = await Token;
    const item = await factory.create<ItemInterface>('Item', {
      name: 'Nescal',
    });
    const item2 = await factory.create<ItemInterface>('Item', {
      name: 'Café',
    });
    const item3 = await factory.create<ItemInterface>('Item', {
      name: 'Coca',
    });
    const category = await factory.create<ICategory>('Category', {
      products: [item2._id, item._id, item3._id],
    });

    await request(app)
      .delete(`/items/${item._id}`)
      .set('Authorization', `Bearer ${token}`);

    const categoryUpdated = await Category.findOne({
      _id: category._id,
    })
      .populate('products')
      .lean();

    expect(categoryUpdated?.products.length).toBe(2);
  });
});
