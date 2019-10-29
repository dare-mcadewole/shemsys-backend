/*
 * File: 'Router.js'
 * Created by Dare McAdewole <dare.dev.adewole@gmail.com>
 * Created on Fri Jun 28 2019
 *
 * Copyright (c) 2019 Echwood Inc.
 *
 * Description:
 *       Router for EXPRESS web server
 */
import Socket from './Socket';
import Logger from './Logger';
import PowerController from './controllers/PowerController';
import MotionController from './controllers/MotionController';

let Authorize = (req, reply, next) => {
    if (req.header('Authorization') !== `Bearer ${process.env.AUTH_KEY}`) {
        return reply.status(403).send({ msg: 'UNAUTHORIZED' });
    }
    return next();
};
 
export default class Router {

    /**
     *
     * @param {*} ServerInstance
     */
    static initRoutes (App, ServerInstance) {
        Logger.info('Initializing SHEMSYS Routes ... ');
        // Initialize and setup Socket
        Socket.initialize(ServerInstance);

        App.get('/api', (req, reply, next) => {
            reply.send({
                name: 'SHEMSYS Official API',
                version: '1.0'
            });
            return next();
        });

        App.put(
            '/api/power',
            Authorize,
            (req, reply, next) => PowerController.update(Socket, req, reply, next)
        );

        App.put(
            '/api/motion',
            Authorize,
            (req, reply, next) => MotionController.update(Socket, req, reply, next)
        );
        Logger.info('All SHEMSYS Routes Initialized successfully!');
    }
}
