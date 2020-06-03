import { Schema, model, Document } from 'mongoose';

interface DrinkableInterface extends Document {
  name: String;
  price: Number;
  decription?: String;
  stock?: Number;
}

const DrinkableSchema = new Schema(
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
    stock: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

export default model<DrinkableInterface>('Drinkable', DrinkableSchema);
