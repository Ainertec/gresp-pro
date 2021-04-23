/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import { Schema, model } from 'mongoose';
import { OrderInterface } from '../interfaces/base';
import Item from './Item';
import { subIngredientStock } from '../utils/subIngredientStock';

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
  courtesy: {
    type: Boolean,
    default: false,
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
  },
);

OrderSchema.post<OrderInterface>('findOneAndUpdate', async document => {
  if (document && document.items && document.closed) {
    for (const item of document.items) {
      const product = await Item.findOne({ _id: item.product });

      if (product) {
        if (product.ingredients && product.ingredients.length > 0) {
          await subIngredientStock(product.ingredients, item.quantity);
        } else if (product.stock) {
          product.stock -= item.quantity;
          await product.save();
        }
      }
    }
  }
});

export default model<OrderInterface>('Order', OrderSchema);
