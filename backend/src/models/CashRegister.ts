import { Schema, model } from 'mongoose';
import { CashRegisterInterface } from '../interfaces/base';
import Category from './Category';

const ExitsSchema = new Schema({
    value: {
        type: Number,
        required: true,
    },
    login: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }
});

const CashRegisterSchema = new Schema(
  {
    thing: {
        type: Number,
        required: true,
    },
    debit: {
        type: Number,
        default:0,
    },
    credit: {
        type: Number,
        default:0,
    },
    cash: {
        type: Number,
        default:0,
    },
    closure: {
        type: Number,
        default:0,
    },
    exits: [ExitsSchema],
  },
  {
    timestamps: true,
  },
);

export default model<CashRegisterInterface>('CashRegister', CashRegisterSchema);
