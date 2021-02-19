/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */

import request from 'supertest';
import App from '../../src/app';
import {
  OrderInterface,
  IngredientInterface,
  ItemInterface,
} from '../../src/interfaces/base';

import { closeConnection, openConnection } from '../utils/connection';
import Token from '../utils/getToken';
import factory from '../factories';
import Order from '../../src/models/Order';
import Item from '../../src/models/Item';
import Ingredient from '../../src/models/Ingredient';
import { subIngredientStock } from '../../src/utils/subIngredientStock';

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
    await Item.deleteMany({});
  });

  it('should subtract an item stock when the order is closing', async () => {
    const token = await Token;

    const item = await factory.create<ItemInterface>('Item', {
      stock: 25,
      available: true,
      ingredients: undefined,
    });

    const order = await factory.create<OrderInterface>('Order', {
      items: [
        {
          product: item._id,
          quantity: 5,
          courtesy: false,
        },
      ],
    });

    await request(app)
      .delete(`/orders/${order.identification}/dinheiro`)
      .set('Authorization', `Bearer ${token}`);

    const itemStock = await Item.findOne({ _id: item._id });

    expect(itemStock?.stock).toBe(20);
    // expect(response.body).toBe(200);
  });

  it('should not subtract an item stock when the order is not closed, update', async () => {
    const token = await Token;

    const item = await factory.create<ItemInterface>('Item', {
      stock: 25,
    });

    const order = await factory.create<OrderInterface>('Order', {
      items: [
        {
          product: item._id,
          quantity: 5,
          courtesy: false,
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

  it('should update an ingredient stock with subIngredientStock function', async () => {
    const ingredient = await factory.create<IngredientInterface>('Ingredient', {
      stock: 2000,
      name: 'farinha',
    });
    const ingredient2 = await factory.create<IngredientInterface>(
      'Ingredient',
      {
        stock: 2000,
        name: 'Chocolate',
      },
    );
    const item = await factory.create<ItemInterface>('Item', {
      ingredients: [
        {
          material: ingredient._id,
          quantity: 200,
        },
        {
          material: ingredient2._id,
          quantity: 200,
        },
      ],
    });
    const item2 = await factory.create<ItemInterface>('Item', {
      ingredients: [
        {
          material: ingredient._id,
          quantity: 400,
        },
        {
          material: ingredient2._id,
          quantity: 100,
        },
      ],
    });

    const orderArray = [item, item2];

    for (const orderItem of orderArray) {
      if (orderItem.ingredients)
        await subIngredientStock(orderItem.ingredients, 2);
    }

    const ingredientUpdated = await Ingredient.findOne({ _id: ingredient._id });
    const ingredientUpdated2 = await Ingredient.findOne({
      _id: ingredient2._id,
    });
    expect(ingredientUpdated?.stock).toBe(800);
    expect(ingredientUpdated2?.stock).toBe(1400);
  });

  it('should sub all product ingredients stock when a order is finished(same ingredients)', async () => {
    const token = await Token;

    const ingredient = await factory.create<IngredientInterface>('Ingredient', {
      stock: 2000,
      name: 'farinha',
    });
    const ingredient2 = await factory.create<IngredientInterface>(
      'Ingredient',
      {
        stock: 2000,
        name: 'Chocolate',
      },
    );
    const item = await factory.create<ItemInterface>('Item', {
      ingredients: [
        {
          material: ingredient._id,
          quantity: 200,
        },
        {
          material: ingredient2._id,
          quantity: 200,
        },
      ],
    });
    const item2 = await factory.create<ItemInterface>('Item', {
      ingredients: [
        {
          material: ingredient._id,
          quantity: 400,
        },
        {
          material: ingredient2._id,
          quantity: 100,
        },
      ],
    });
    const order = await factory.create<OrderInterface>('Order', {
      items: [
        {
          product: item._id,
          quantity: 2,
          courtesy: false,
        },
        {
          product: item2._id,
          quantity: 3,
          courtesy: false,
        },
      ],
      finished: false,
    });

    const response = await request(app)
      .delete(`/orders/${order.identification}/dinheiro`)
      .set('Authorization', `Bearer ${token}`);
    const ingredientUpdated = await Ingredient.findOne({ _id: ingredient._id });
    const ingredientUpdated2 = await Ingredient.findOne({
      _id: ingredient2._id,
    });
    // console.log(ingredientUpdated);
    expect(response.status).toBe(200);
    expect(ingredientUpdated?.stock).toBe(400);
    expect(ingredientUpdated2?.stock).toBe(1300);
  });
});
