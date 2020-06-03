import { Schema, model, Document } from 'mongoose';

interface ProductInterface extends Document {
  name: String;
  price: Number;
  decription?: String;
}
interface DrinkableInterface extends Document {
  name: String;
  price: Number;
  decription?: String;
  stock?: Number;
}

interface OrderInterface extends Document {
  identification: Number;
  total: Number;
  note?: String;
  closed?: Boolean;
  finished?: Boolean;
  payment?: String;
  products?: Array<ProductInterface>;
  drinkables?: Array<DrinkableInterface>;
}

const ProductSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
  },
  quantity: {
    type: Number,
  },
});
const DrinkableSchema = new Schema({
  drinkable: {
    type: Schema.Types.ObjectId,
    ref: 'Drinkable',
  },
  quantity: {
    type: Number,
  },
});

const OrderSchema = new Schema(
  {
    identification: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    note: {
      type: String,
    },
    closed: {
      type: Boolean,
      default: false,
    },
    payment: {
      type: String,
      default: null,
    },
    finished: {
      type: Boolean,
      default: false,
    },
    products: [ProductSchema],
    drinkables: [DrinkableSchema],
  },
  {
    timestamps: true,
  }
);

export default model<OrderInterface>('Order', OrderSchema);
