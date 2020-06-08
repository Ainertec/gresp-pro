import { Schema, model, Document } from 'mongoose';

interface ItemInterface extends Document {
  name: string;
  price: number;
  decription?: string;
  stock?: number;
  drink?: boolean;
}

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

export default model<ItemInterface>('Product', ItemSchema);
