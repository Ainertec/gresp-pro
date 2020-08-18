import factory from 'factory-girl';
import faker from 'faker';
import User, { Questions } from '../src/models/User';
import Item from '../src/models/Item';
import Order from '../src/models/Order';
import Category from '../src/models/Category';
import Ingredient from '../src/models/Ingredient';

factory.define('User', User, {
  name: faker.name.firstName(),
  password: faker.internet.password(),
  question: Questions.first,
  response: 'A famosa',
  admin: true,
});

factory.define('Item', Item, {
  name: faker.commerce.productName(),
  price: faker.commerce.price(),
  description: faker.commerce.productAdjective(),
  drink: faker.random.boolean(),
  stock: faker.random.number(50),
  cost: faker.commerce.price(),
  ingredients: [
    {
      material: factory.assoc('Ingredient', '_id'),
      quantity: faker.random.number(10),
    },
  ],
});

factory.define('Ingredient', Ingredient, {
  name: faker.commerce.productName(),
  price: faker.commerce.price(),
  priceUnit: faker.commerce.price(),
  unit: 'g',
  stock: faker.random.number(100),
  description: faker.commerce.productAdjective(),
});
factory.define('Category', Category, {
  name: faker.commerce.productName(),
  products: factory.assocMany('Item', 2, '_id'),
});

factory.define('Order', Order, {
  identification: faker.random.number(999),
  total: faker.commerce.price(),
  note: faker.commerce.productAdjective(),
  closed: false,
  finished: false,
  payment: 'Dinhero',
  items: [
    {
      product: factory.assoc('Item', '_id'),
      quantity: faker.random.number(10),
    },
  ],
});

export default factory;
