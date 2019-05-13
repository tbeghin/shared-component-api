import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';
import * as errorHandler from 'errorhandler';
import {Express, NextFunction, Request, Response} from "express";
import * as swagger from "swagger-express-ts";
import {interfaces} from "inversify-express-utils";
import ConfigFunction = interfaces.ConfigFunction;

const ConfigurationServer: ConfigFunction =
    (app: Express): void => {
        const packageJson = require("../../package.json");
        app.use('/api-docs/swagger', express.static('swagger'));
        app.use('/api-docs/swagger/assets', express.static('node_modules/swagger-ui-dist'));
        app.use(morgan('dev'));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({
            extended: true
        }));
        app.use((req: Request, res: Response, next: NextFunction) => {
            res.setHeader("api-version", packageJson.version);
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            next();
        });
        app.use(express.static(__dirname + '/site'));
        app.use(swagger.express(
            {
                definition: {
                    info: {
                        title: packageJson.name,
                        version: packageJson.version
                    }
                }
            }
        ));

        app.use((err: any, req: Request, res: Response, next: NextFunction) => {
            err.status = 404;
            next(err);
        });

        app.use(errorHandler());
    };

export default ConfigurationServer;