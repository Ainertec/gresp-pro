import { Schema, model, Document } from 'mongoose';
import { OrderInterface, ItemInterface } from '../interfaces/base';

const ItemSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Item',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
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
    items: [ItemSchema],
  },
  {
    timestamps: true,
  }
);

export default model<OrderInterface>('Order', OrderSchema);
