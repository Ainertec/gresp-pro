import { Schema, model, Document } from 'mongoose';

interface ProductInterface extends Document {
  name: String;
  price: Number;
  decription?: String;
}

const ProductSchema = new Schema(
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
    },
  },
  {
    timestamps: true,
  }
);

export default model<ProductInterface>('Product', ProductSchema);
