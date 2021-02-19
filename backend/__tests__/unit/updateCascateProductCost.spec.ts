import request from 'supertest';
import { closeConnection, openConnection } from '../utils/connection';
import Ingredient from '../../src/models/Ingredient';
import Item from '../../src/models/Item';
import App from '../../src/app';
import Token from '../utils/getToken';
import factory from '../factories';

import { IngredientInterface, ItemInterface } from '../../src/interfaces/base';

const app = App.express;

describe('should test a update cascade when update a ingredient price', () => {
  beforeAll(() => {
    openConnection();
  });
  afterAll(() => {
    closeConnection();
  });
  beforeEach(async () => {
    await Ingredient.deleteMany({});
    await Item.deleteMany({});
  });

  it('should update a product cost when update a ingredient price', async () => {
    const token = await Token;
    const ingredient = await factory.create<IngredientInterface>('Ingredient');
    const item = await factory.create<ItemInterface>('Item', {
      ingredients: [
        {
          material: ingredient._id,
          quantity: 200,
        },
      ],
    });
    const response = await request(app)
      .put(`/ingredients/${ingredient._id}`)
      .send({
        name: ingredient.name,
        price: 2,
        stock: 20,
        description: ingredient.description,
        unit: 'g',
      })
      .set('Authorization', `Bearer ${token}`);
    const itemUpdated = await Item.findOne({ _id: item._id });
    // console.log(response.body);
    // console.log(ItemUpdated);
    expect(response.status).toBe(200);
    expect(itemUpdated?.cost).toBe(20);
  });

  it('should update all products cost when update a ingredient price', async () => {
    const token = await Token;
    const ingredient = await factory.create<IngredientInterface>('Ingredient');
    const item = await factory.create<ItemInterface>('Item', {
      ingredients: [
        {
          material: ingredient._id,
          quantity: 200,
        },
      ],
    });
    const item2 = await factory.create<ItemInterface>('Item', {
      ingredients: [
        {
          material: ingredient._id,
          quantity: 200,
        },
      ],
    });
    const response = await request(app)
      .put(`/ingredients/${ingredient._id}`)
      .send({
        name: ingredient.name,
        price: 2,
        stock: 20,
        description: ingredient.description,
        unit: 'g',
      })
      .set('Authorization', `Bearer ${token}`);
    const itemUpdated = await Item.findOne({ _id: item._id });
    const itemUpdated2 = await Item.findOne({ _id: item2._id });
    // console.log(response.body);
    expect(response.status).toBe(200);
    expect(itemUpdated?.cost).toBe(20);
    expect(itemUpdated2?.cost).toBe(20);
  });
});
