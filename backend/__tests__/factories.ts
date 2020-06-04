import factory from 'factory-girl';

import User from '../src/models/User';

factory.define('User', User, {
  name: 'Cleiton',
  password: '123321',
  question: 'Qual o modelo do seu primeiro carro?',
  response: 'Estrada',
  admin: true,
});

export default factory;
