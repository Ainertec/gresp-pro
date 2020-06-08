import { Schema, model, Document } from 'mongoose';
import { ItemInterface } from '../../src/interfaces/base';

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
  },
  {
    timestamps: true,
  }
);

export default model<ItemInterface>('Item', ItemSchema);
