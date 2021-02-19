/* eslint-disable no-param-reassign */
import { Schema, model } from 'mongoose';
import { IngredientInterface, ItemInterface } from '../interfaces/base';
import Item from './Item';
import getCost from '../utils/getItemsCost';

const Unit = Object.freeze({
  kilogram: 'g',
  liter: 'ml',
  unity: 'u',

  getUnit() {
    const unit = [this.kilogram, this.liter, this.unity];
    return unit;
  },
});

const IngredientSchema = new Schema<IngredientInterface>(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    priceUnit: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      default: null,
    },
    unit: {
      type: String,
      required: true,
      enum: Object.values(Unit),
    },
    stock: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

Object.assign(IngredientSchema.statics, {
  Unit,
});

export { Unit };

IngredientSchema.post<IngredientInterface>(
  'findOneAndUpdate',
  async document => {
    if (document) {
      const ingredientID = document._id;

      const items = await Item.find({
        'ingredients.material': { $in: ingredientID },
      });
      await Promise.all(
        items.map(async (item: ItemInterface) => {
          if (item.ingredients) {
            const cost = await getCost(item.ingredients);
            item.cost = cost;
            await item.save();
          }
        }),
      );
    }
  },
);

IngredientSchema.post<IngredientInterface>(
  'findOneAndRemove',
  async document => {
    if (document) {
      const ingredientID = document._id;
      const items = await Item.find({
        'ingredients.material': { $in: ingredientID },
      });
      await Promise.all(
        items.map(async (item: ItemInterface) => {
          if (item.ingredients) {
            const ingredientUpdated = item.ingredients.filter(
              ingredient =>
                String(ingredient.material) !== String(ingredientID),
            );
            item.ingredients = ingredientUpdated;
            await item.save();
          }
        }),
      );
    }
  },
);

export default model<IngredientInterface>('Ingredient', IngredientSchema);
