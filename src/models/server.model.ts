import express, { Express, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import 'express-async-errors';

import customMiddleware from '../middlewares';
import NotFoundError from '../errors/not-found.error';
import mainRoute from '../routes/_main.route';
class Server {
  public app: Express;
  private port: number = process.env.PORT ? parseInt(process.env.PORT) : 3001;
  constructor () {
    this.app = express();
    this.middlewares();
    this.routes();
    this.middlewaresError();
  }

  private middlewares = () => {
    this.app.set('trust proxy', true);
    this.app.use('/api/v1/public', express.static('public'));
    this.app.use(express.json());
    this.app.use(morgan('dev'));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
  };

  private middlewaresError = () => {
    this.app.all('*', (req: Request, res: Response) => {
      throw new NotFoundError();
    });
    this.app.use(customMiddleware.errorHandler);
  };

  private routes = () => {
    this.app.use('/api/v1', mainRoute);
  };

  public listen = () => {
    try {
      this.app.listen(this.port, () =>
        console.log('Server listen on port:', this.port)
      );
    } catch (error) {
      console.error(error);
    }
  };
}

export default Server;
