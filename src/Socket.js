/*
 * File: 'WMSSocket.js'
 * Created by Dare McAdewole <dare.dev.adewole@gmail.com>
 * Created on Fri Jun 28 2019
 *
 * Copyright (c) 2019 Echwood Inc.
 *
 * Description:
 *       Socket for Sensor Data
 */
import SocketIO from 'socket.io';
import EventEmitter from 'eventemitter3';
import Logger from './Logger';
import Events from './Events';
import Store from './Store';

const WMS_NAMESPACE = '/shemsys';

class Socket extends EventEmitter {    
    /**
     * 
     * @param {*} server 
     */
    initialize (server) {
        this._clients = [];
        Logger.info('Initializing Socket ...');
        var IO = SocketIO.listen(server, {
            origins: '*:*'
        });
        // IO.set('transports', [ 'websockets' ]);

        IO.of(WMS_NAMESPACE).on('connection', (client) => {
            if (!this._clients.includes(client)) {
                client.on(Events.SHEMSYS_CURRENT_DATA_REQ, () => {
                    client.emit(Events.SHEMSYS_CURRENT_DATA, Store);
                });
    
                this.on(Events.SHEMSYS_MOTION_STATE_UPDATED, ({ state }) => {
                    client.emit(Events.SHEMSYS_MOTION_STATE, { state });
                });
    
                this.on(Events.SHEMSYS_POWER_UPDATED, ({ value }) => {
                    client.emit(Events.SHEMSYS_POWER, { value });
                });
            }

            this._clients.push(client);
            Logger.info(`${this._clients.length} connection(s) opened!`);

            client.on('disconnect', () => {
                this._clients.splice(this._clients.indexOf(client), 1);
                Logger.info(`1 client disconnected, Clients left: ${this._clients.length}`);
            });
        });
        Logger.info('Socket has been initialized successfully!');
    }
}

export default new Socket();
