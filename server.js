/*
 * File: 'server.js'
 * Created by Dare McAdewole <dare.dev.adewole@gmail.com>
 * Created on Fri Jun 28 2019
 *
 * Copyright (c) 2019 Echwood Inc.
 *
 * Description:
 *       Express Server API entry point
 */
// Import Environment Variables
import Logger from './src/Logger';
Logger.info('Loading SHEMSYS server configurations ... ');
require('dotenv').config();
import Express from 'express';
import Http from 'http';
import CORS from 'cors';

var App = Express();
Logger.info('SHEMSYS Server is booting up ... ');
var Server = Http.createServer(App);
// sleep(700);

Logger.info('Registering BodyParser and Multer plugin ... ');
App.use(Express.json());
App.use(Express.urlencoded({
    extended: true
}));

Logger.info('Setting up CORS middleware ... ');
const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,POST,PUT',
    allowedHeaders: [
        // 'Authorization',
        'Content-Type',
        'X-Requested-With'
    ]
};
App.use(CORS(corsOptions));

// Initialize routes
require('./src/Router').default.initRoutes(App, Server);

var serverInstance = Server.listen(
    process.env.PORT,
    process.env.HOST,
    () => {
        var address = serverInstance.address().address;
        var port = serverInstance.address().port;
        Logger.info(`Say 'Hello' to SHEMSYS Server @ http://${address}:${port}`);
    }
);
