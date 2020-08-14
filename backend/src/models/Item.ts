import { Schema, model, Document } from 'mongoose';
import { ItemInterface } from '../../src/interfaces/base';

const IngredientSchema = new Schema({
  material: {
    type: Schema.Types.ObjectId,
    ref: 'Ingredient',
  },
  quantity: {
    type: Number,
  },
});

const ItemSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      default: null,
    },
    stock: {
      type: Number,
      default: null,
    },
    drink: {
      type: Boolean,
      default: false,
    },
    cost: {
      type: Number,
      required: true,
    },
    ingredients: [IngredientSchema],
  },
  {
    timestamps: true,
  }
);

export default model<ItemInterface>('Item', ItemSchema);
