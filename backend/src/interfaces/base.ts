import { Document } from 'mongoose';

export interface ItemInterface extends Document {
  name: string;
  price: number;
  decription?: string;
  stock?: number;
  drink?: boolean;
}
interface ItemsIterface {
  product: ItemInterface;
  quantity: number;
}

export interface UserInterface extends Document {
  name: string;
  password_hash: string;
  password: string;
  question: string;
  response: string;
  admin: boolean;
  generateToken(): string;
  checkPassword(password: string): Promise<boolean>;
}

export interface OrderInterface extends Document {
  identification: Number;
  total: Number;
  note?: String;
  closed?: Boolean;
  finished?: Boolean;
  payment?: String;
  items?: Array<ItemsIterface>;
}
