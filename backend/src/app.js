import 'dotenv/config';

import express from 'express';
import cors from 'cors';

import routes from './router';

import './database';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  // middleware para utilizar formato json no express
  middlewares() {
    this.server.use(express.json());
    this.server.use(cors());
  }

  // utiliza rotas
  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
