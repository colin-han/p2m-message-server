/**
 * Created by colinhan on 23/03/2017.
 */

import express from 'express';
import config from 'config';
import compression from 'compression';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import path from 'path';

import commonLogger from 'p2m-common-logger';
let logger = commonLogger('message-server');

import api from './api';

let app = express();

app.use(morgan((config.tracer && config.tracer.morganFormat) || 'combined'));
app.use(compression());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(api.path, api.router);

let server = app.listen(config.server.port);

logger.log(`Service is starting at http://localhost:${config.server.port}`);

