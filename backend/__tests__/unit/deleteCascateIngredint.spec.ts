import request from 'supertest';
import { closeConnection, openConnection } from '../utils/connection';
import Ingredient from '../../src/models/Ingredient';
import Item from '../../src/models/Item';
import App from '../../src/app';
import Token from '../utils/getToken';
import factory from '../factories';

import { IngredientInterface, ItemInterface } from '../../src/interfaces/base';

const app = App.express;

describe('should test a delete cascade when delete a ingredient', () => {
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

  it('should delete a product ingredient when a ingredient is deleted', async () => {
    const token = await Token;
    const ingredient = await factory.create<IngredientInterface>('Ingredient');
    const ingredient2 = await factory.create<IngredientInterface>('Ingredient');
    const item = await factory.create<ItemInterface>('Item', {
      ingredients: [
        {
          material: ingredient._id,
          quantity: 300,
        },
        {
          material: ingredient2._id,
          quantity: 200,
        },
      ],
    });

    const response = await request(app)
      .delete(`/ingredients/${ingredient._id}`)
      .set('Authorization', `Bearer ${token}`);
    const itemUpdated = await Item.findOne({ _id: item._id });

    expect(itemUpdated?.ingredients?.length).toBe(1);
    expect(response.status).toBe(200);
  });

  it('should delete a uniq product ingredient when a ingredient is deleted', async () => {
    const token = await Token;
    const ingredient = await factory.create<IngredientInterface>('Ingredient');

    const item = await factory.create<ItemInterface>('Item', {
      ingredients: [
        {
          material: ingredient._id,
          quantity: 300,
        },
      ],
    });

    const response = await request(app)
      .delete(`/ingredients/${ingredient._id}`)
      .set('Authorization', `Bearer ${token}`);
    const itemUpdated = await Item.findOne({ _id: item._id });

    expect(itemUpdated?.ingredients?.length).toBe(0);
    expect(response.status).toBe(200);
  });

  it('should not delete a product ingredient when a ingredient is deleted, if it does not use it', async () => {
    const token = await Token;
    const ingredient = await factory.create<IngredientInterface>('Ingredient');
    const ingredient2 = await factory.create<IngredientInterface>('Ingredient');
    const ingredient3 = await factory.create<IngredientInterface>('Ingredient');
    const item = await factory.create<ItemInterface>('Item', {
      ingredients: [
        {
          material: ingredient._id,
          quantity: 300,
        },
        {
          material: ingredient2._id,
          quantity: 200,
        },
      ],
    });

    const response = await request(app)
      .delete(`/ingredients/${ingredient3._id}`)
      .set('Authorization', `Bearer ${token}`);
    const itemUpdated = await Item.findOne({ _id: item._id });
    expect(itemUpdated?.ingredients?.length).toBe(2);
    expect(response.status).toBe(200);
  });
});
