import 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import { errors } from 'celebrate';
import cors from 'cors';
import socketio from 'socket.io';
import http from 'http';
const compression = require('compression');

import routes from './routes';
import { CustomRequest } from './interfaces/base';

class App {
  public express: express.Application;

  public server: http.Server;

  public io: socketio.Server;

  public constructor() {
    this.express = express();
    this.server = new http.Server(this.express);
    this.io = socketio(this.server);
    this.webSocket();
    this.middlewares();
    if (!(process.env.NODE_ENV === 'test')) this.database();
    this.routes();
  }

  private middlewares(): void {
    this.express.use(express.json());
    this.express.use(cors());
  }

  private database(): void {
    mongoose.connect('mongodb://localhost:27017/gresp_pro', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
  }

  private routes(): void {
    this.express.use(compression());
    this.express.use(routes);
    this.express.use(errors());
  }

  private webSocket() {
    this.io.on('connection', socket => {
      socket.on('newFinished', data => {
        socket.broadcast.emit('hasFinished', data);
      });
    });

    this.express.use((req: CustomRequest, res, next) => {
      req.io = this.io;
      return next();
    });
  }
}

export default new App();
