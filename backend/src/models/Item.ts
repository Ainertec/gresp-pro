import { Schema, model } from 'mongoose';
import { ItemInterface } from '../interfaces/base';
import Category from './Category';

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
  },
);

ItemSchema.post('deleteOne', document => {
  if (document) {
    const itemId = document._id;
    Category.find({ products: { $in: [itemId] } }).then(categories => {
      Promise.all(
        categories.map(category =>
          Category.findOneAndUpdate(
            { _id: category._id },
            { $pull: { products: itemId } },
            { new: true },
          ),
        ),
      );
    });
  }
});

export default model<ItemInterface>('Item', ItemSchema);
