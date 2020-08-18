import { Schema, model } from 'mongoose';
import { ICategory } from '../interfaces/base';

const ItemSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Item',
      },
    ],
  },
  {
    timestamps: true,
  },
);

export default model<ICategory>('Category', ItemSchema);
