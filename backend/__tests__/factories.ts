import factory from 'factory-girl';
import faker from 'faker';
import User from '../src/models/User';
import Item from '../src/models/Item';
import Order from '../src/models/Order';
import { Questions } from '../src/models/User';

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
});
factory.define('Order', Order, {
  identification: faker.random.number(999),
  total: faker.commerce.price(),
  note: faker.commerce.productAdjective(),
  closed: false,
  finished: false,
  payment: 'Dinhero',
  items: [{ product: factory.assoc('Item', '_id'), quantity: faker.random.number(10) }],
});

export default factory;