import * as express from "express";

import errorMiddleware from "../middleware/error.middleware";
import DBService from "../services/db.service";

import BookRoutes from "../routes/book.routes";

class App {
  public app: express.Application;

  constructor() {
    this.app = express();

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  public load() {
    DBService.connectDB();
    BookRoutes.route(this.app);
    this.app.use((req, res, next) => {
      console.log("req", req);
      console.log("res", res);

      next();
    });
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private initializeRoutes() {
    BookRoutes.route(this.app);
  }

  private connectToDatabase() {
    DBService.connectDB();
  }
}

export default new App().app;
