import request from 'supertest';
import { ItemInterface, ICategory } from '../../src/interfaces/base';
import App from '../../src/app';

import { closeConnection, openConnection } from '../utils/connection';
import factory from '../factories';
import Token from '../utils/getToken';
import Category from '../../src/models/Category';
import User from '../../src/models/User';

const app = App.express;

describe('Categories Tests', () => {
  beforeAll(() => {
    openConnection();
  });
  afterAll(() => {
    closeConnection();
  });
  beforeEach(async () => {
    await Category.deleteMany({});
    await User.deleteMany({});
  });

  it('Should create a category', async () => {
    const token = await Token;
    const item = await factory.create<ItemInterface>('Item');

    const response = await request(app)
      .post('/categories')
      .send({
        name: 'Bebidas',
        products: [item._id],
      })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it('Should update a category', async () => {
    const token = await Token;
    const category = await factory.create<ICategory>('Category');

    const response = await request(app)
      .put(`/categories/${category._id}`)
      .send({
        name: 'Bebidas',
        products: category.products,
      })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it('Should delete a category', async () => {
    const token = await Token;
    const category = await factory.create<ICategory>('Category');

    const response = await request(app)
      .delete(`/categories/${category._id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it('Should list all category', async () => {
    const token = await Token;
    await factory.createMany<ICategory>('Category', 2);
    await factory.createMany<ICategory>('Category', 2);

    const response = await request(app)
      .get(`/categories`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.body.length).toBe(4);
    expect(response.status).toBe(200);
  });

  it('Should list all products of a category menu', async () => {
    const token = await Token;

    const item = await factory.create<ItemInterface>('Item', {
      name: 'Coca cola',
      available: true,
    });
    const item3 = await factory.create<ItemInterface>('Item', {
      name: 'Coca colaaaaa',
      available: true,
    });
    const item2 = await factory.create<ItemInterface>('Item', {
      name: 'Guaraná',
      available: false,
    });
    const category = await factory.create<ICategory>('Category', {
      name: 'Bebidas geladas',
      products: [item._id, item2._id, item3._id],
    });

    const response = await request(app).get(`/categories/menu`);
    // .set('Authorization', `Bearer ${token}`);
    // expect(response.body.length).toBe(2);
    expect(response.status).toBe(200);
  });
  it('Should list all products of a category', async () => {
    const token = await Token;

    const item = await factory.create<ItemInterface>('Item', {
      name: 'Coca cola',
    });
    const item2 = await factory.create<ItemInterface>('Item', {
      name: 'Guaraná',
    });
    const category = await factory.create<ICategory>('Category', {
      name: 'Bebidas geladas',
      products: [item._id, item2._id],
    });

    const response = await request(app)
      .get(`/categories/${category._id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.body.length).toBe(2);
    expect(response.status).toBe(200);
  });
});
