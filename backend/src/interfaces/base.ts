import { Document } from 'mongoose';
import { Request } from 'express';

export interface ItemInterface extends Document {
  cost: number;
  ingredients?: Ingredients[];
  name: string;
  price: number;
  description?: string;
  stock?: number;
  drink?: boolean;
  available?: boolean;
}
export interface ItemsInterface {
  product: ItemInterface;
  quantity: number;
  courtesy: boolean;
}

export interface UserInterface extends Document {
  name: string;
  // password_hash: string;
  password: string;
  question: string;
  response: string;
  admin: boolean;
  generateToken(): string;
  checkPassword(password: string): Promise<boolean>;
}

export interface OrderInterface extends Document {
  identification: number;
  total: number;
  note?: string;
  closed?: boolean;
  finished?: boolean;
  payment?: string;
  items: Array<ItemsInterface>;
  updatedAt?: Date;
}

export interface CustomRequest extends Request {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [io: string]: any;
}

export interface IngredientInterface extends Document {
  name: string;
  price: number;
  priceUnit: number;
  description?: string;
  unit: string;
  stock: number;
}

export interface Ingredients {
  material: IngredientInterface;
  quantity: number;
}

export interface ICategory extends Document {
  name: string;
  color: string;
  products: ItemInterface[];
}
