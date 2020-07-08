import express from 'express'
import "reflect-metadata"
import {createConnection} from "typeorm"
import {User} from "./models/User"
import {Product} from "./models/Product"
import routes from './routes'
import { languageMiddleware } from './middlewares'
import bodyParser from 'body-parser'
import cors from 'cors'

class Api{
  public express: express.Application;
  public language: String = 'en'

  public constructor(){
    this.express = express();
    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.express.use(languageMiddleware);
    this.express.use(bodyParser.json());

    
    // TODO - Cors options - https://medium.com/@alexishevia/using-cors-in-express-cac7e29b005b
    const origin = (process.env.NODE_ENV == 'production') ? 'https://api-adopet-pablo.herokuapp.com/3000' : 'http://localhost:3000'
    this.express.use(cors({
      origin: origin
    }));
  }
  public async connectDatabase(){
    return createConnection({
      type: "postgres",
      host: "tuffi.db.elephantsql.com",
      port: 5432,
      username: "vgwwhxdf",
      password: "FYcY9yLcZO4BManG2WIwZ0fPx5dnuRHl",
      database: "vgwwhxdf",
      entities: [
          User, Product
      ],
      synchronize: true,
      logging: false
    })
  }

  private routes(): void {
    this.express.use(routes)
  }
}

export default new Api()