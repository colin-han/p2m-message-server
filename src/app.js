#!/usr/bin/env node
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
import cors from 'cors';

import commonLogger from 'p2m-common-logger';
let logger = commonLogger('message-server');

let socketIoChannel, jpushChannel;
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  socketIoChannel = require('../../socketio/build');
  jpushChannel = require('../../jpush/build');
} else {
  socketIoChannel = require('p2m-message-channel-socket-io');
  jpushChannel = require('p2m-message-channel-jpush');
}

import api from './api';
import service from './service';
import {models} from './db'

let app = express();

app.use(morgan((config['p2m-message-server'].tracer && config['p2m-message-server'].tracer.morganFormat) || 'combined'));
app.use(compression());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

if (config['p2m-message-server'].server.cors) {
  logger.log(`Server add CORS support. "${JSON.stringify(config['p2m-message-server'].server.cors)}"`);
  app.use(cors(config['p2m-message-server'].server.cors));
}

app.use(api.path, api.router);

let server = app.listen(config['p2m-message-server'].server.port);

service.use(socketIoChannel({path: config['p2m-message-server'].server.path, models: models}))
    .use(jpushChannel(config['p2m-message-server'].jpush))
    .start(app, server);

logger.log(`Service is starting at http://localhost:${config['p2m-message-server'].server.port}`);

