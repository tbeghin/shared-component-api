import * as express from 'express';
import * as errorHandler from 'errorhandler';
import 'reflect-metadata';

import {Container} from 'inversify';
import {InversifyExpressServer} from 'inversify-express-utils';

// declare metadata by @controller annotation
import './api/authenticate/authenticate.controller';
import './api/user/user.controller';
import ConfigurationServer from './configuration/application';
import {User} from './api/user/user';
import {Authenticate} from './api/authenticate/authenticate';
import {buildProviderModule} from "inversify-binding-decorators";

// set up container
let container = new Container();
container.load(buildProviderModule());

// set up bindings
Reflect.getMetadata('design:type', Authenticate, 'Authenticate');
Reflect.getMetadata('design:type', User, 'User');

let router = express.Router({
    caseSensitive: false,
    mergeParams: false,
    strict: false
});

// create server
let server = new InversifyExpressServer(container, router, {rootPath: '/api/v1'});
server.setConfig(ConfigurationServer);
server.setErrorConfig((app) => app.use(errorHandler()));

let app = server.build();
app.listen(3000);