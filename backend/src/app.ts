import 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import { errors } from 'celebrate';

import routes from './routes';

// const app = express();

// app.use(express.json());
// app.use(routes);

class App {
  public express: express.Application;

  public constructor() {
    this.express = express();
    this.middlewares();
    if (!(process.env.NODE_ENV === 'test')) this.database();
    this.routes();
  }

  private middlewares(): void {
    this.express.use(express.json());
  }

  private database(): void {
    mongoose.connect('mongodb://localhost:27017/gresp_pro', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
  }

  private routes(): void {
    this.express.use(routes);
    this.express.use(errors());
  }
}

export default new App().express;
