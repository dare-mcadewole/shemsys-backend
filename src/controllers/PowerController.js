import Events from '../Events';
import Store from '../Store';
import Logger from '../Logger';

export default class PowerController {
    /**
     * 
     * @param {*} Socket 
     * @param {*} req 
     * @param {*} reply 
     * @param {*} next 
     */
    static async update (Socket, { body: { value } }, reply, next) {
        Store.power = value;
        Socket.emit(Events.SHEMSYS_POWER_UPDATED, { value });
        Logger.info(`[POWER] Power is ${value}`);
        reply.send({ value });
    }
}
