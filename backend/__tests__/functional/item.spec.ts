import request from 'supertest';

import {
  ItemInterface,
  IngredientInterface,
  ICategory,
} from '../../src/interfaces/base';
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
        cost: 50,
        available: false,
      })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it('should create an item and add a category', async () => {
    const token = await Token;
    const category = await factory.create<ICategory>('Category');

    const response = await request(app)
      .post('/items')
      .send({
        name: 'Coca cola',
        price: 10.5,
        description: 'Zero',
        drink: true,
        stock: 20,
        cost: 50,
        categoryId: category._id,
      })
      .set('Authorization', `Bearer ${token}`);
    const categoryItems = await Category.find({ _id: category._id })
      .populate('products')
      .lean();

    expect(categoryItems[0].products.length).toBe(3);
    expect(response.status).toBe(200);
  });

  it('should create an item with ingredients', async () => {
    const token = await Token;
    const ingredient = await factory.create<IngredientInterface>('Ingredient', {
      price: 5,
      stock: 2000,
      priceUnit: 5 / 2000,
    });

    const response = await request(app)
      .post('/items')
      .send({
        name: 'Coca cola',
        price: 10.5,
        description: 'Zero',
        drink: true,
        stock: 20,
        ingredients: [
          {
            material: ingredient._id,
            quantity: 500,
          },
        ],
      })
      .set('Authorization', `Bearer ${token}`);
    // console.log(response.body.ingredients);
    expect(response.body).toHaveProperty('cost');
    expect(response.body).toEqual(
      expect.objectContaining({
        cost: 1.25,
      }),
    );
    expect(response.status).toBe(200);
  });

  it('should not create an item without ingredients and cost', async () => {
    const token = await Token;
    const response = await request(app)
      .post('/items')
      .send({
        name: 'Coca cola',
        price: 10.5,
        description: 'Zero',
        drink: true,
        stock: 30,
      })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
  });

  it('should not create an item without ingredients and stock', async () => {
    const token = await Token;
    const response = await request(app)
      .post('/items')
      .send({
        name: 'Coca cola',
        price: 10.5,
        description: 'Zero',
        drink: true,
        cost: 2.5,
      })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
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
        cost: 50,
        stock: 60,
        available: false,
      })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it('should update a Item and change category', async () => {
    const token = await Token;

    const item = await factory.create<ItemInterface>('Item');
    await factory.create<ICategory>('Category', {
      products: [item._id],
      name: 'Quentes',
    });
    const category2 = await factory.create<ICategory>('Category', {
      products: [],
      name: 'gelados',
    });

    const response = await request(app)
      .put(`/items/${item._id}`)
      .send({
        name: 'Coca cola',
        price: 10.5,
        description: 'Zero',
        cost: 50,
        stock: 60,
        categoryId: category2._id,
      })
      .set('Authorization', `Bearer ${token}`);
    const categories = await Category.find({}).populate('products').lean();

    expect(categories[0].products.length).toBe(0);
    expect(categories[1].products[0]).toEqual(
      expect.objectContaining({
        name: 'Coca cola',
      }),
    );
    expect(response.status).toBe(200);
  });

  it('should update a Item with ingredient', async () => {
    const token = await Token;

    const item = await factory.create<ItemInterface>('Item');
    const ingredient = await factory.create<IngredientInterface>('Ingredient', {
      price: 5,
      stock: 2000,
      priceUnit: 5 / 2000,
    });

    const response = await request(app)
      .put(`/items/${item._id}`)
      .send({
        name: 'Coca cola',
        price: 10.5,
        description: 'Zero',
        ingredients: [
          {
            material: ingredient._id,
            quantity: 500,
          },
        ],
        cost: 50,
      })
      .set('Authorization', `Bearer ${token}`);
    // console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'Coca cola',
        cost: 1.25,
      }),
    );
  });

  it('should not update a Item without ingredient and cost', async () => {
    const token = await Token;

    const item = await factory.create<ItemInterface>('Item');

    const response = await request(app)
      .put(`/items/${item._id}`)
      .send({
        name: 'Coca cola',
        price: 10.5,
        description: 'Zero',
        stock: 20,
      })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(400);
  });

  it('should not update a Item without ingredient and stock', async () => {
    const token = await Token;

    const item = await factory.create<ItemInterface>('Item');

    const response = await request(app)
      .put(`/items/${item._id}`)
      .send({
        name: 'Coca cola',
        price: 10.5,
        description: 'Zero',
        cost: 20,
      })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(400);
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

    const response = await request(app)
      .get(`/items/p`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });
});
