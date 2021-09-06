process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import config from 'config';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import * as mqtt from "mqtt";
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Routes } from '@interfaces/routes.interface';
import errorMiddleware from '@middlewares/error.middleware';
import { logger, stream } from '@utils/logger';
import { mongoose } from "@typegoose/typegoose";

class App {
  public app: express.Application;
  public port: string | number;
  public env: string;

  constructor(routes: Routes[]) {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.env = process.env.NODE_ENV || 'development';
    mongoose.set('useCreateIndex', true);

    this.initDatabase().then(() => {
      // If database is not available nothing happens
      this.initializeMiddlewares();
      this.initializeRoutes(routes);
      this.initializeSwagger();
      this.initializeErrorHandling();
    });


    /*
      const client  = mqtt.connect('mqtt://192.168.0.100', { port: 1883 });
      client.on("connect",() => {
        console.log("connected");
      });

      client.on("error",(error) =>{ console.log("Can't connect"+error)});

      client.subscribe("stat/tasmota_E36E04/RESULT");
      client.subscribe("stat/tasmota_E36E04/STATUS");

      client.on('message', function (topic, message) {
        // message is Buffer
        logger.info(topic);
        logger.info(message);
      });

      client.publish("cmnd/tasmota_E36E04/POWER", 'ON');
      client.publish("cmnd/tasmota_E36E04/STATUS", '');
    }
    */
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private async initDatabase(): Promise<void> {
    await mongoose.connect('mongodb://root:root@localhost:27017/', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'smarthome'
    });
  }

  private initializeMiddlewares(): void {
    this.app.use(morgan(config.get('log.format'), { stream }));
    this.app.use(cors({ origin: config.get('cors.origin'), credentials: config.get('cors.credentials') }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private initializeRoutes(routes: Routes[]): void {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }

  private initializeSwagger(): void {
    const options = {
      swaggerDefinition: {
        info: {
          title: 'REST API',
          version: '1.0.0',
          description: 'Example docs',
        },
      },
      apis: ['swagger.yaml'],
    };

    const specs = swaggerJSDoc(options);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  }

  private initializeErrorHandling(): void {
    this.app.use(errorMiddleware);
  }
}

export default App;
