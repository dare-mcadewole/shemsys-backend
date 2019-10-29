import Events from '../Events';
import Store from '../Store';
import Logger from '../Logger';

export default class MotionController {
    /**
     * 
     * @param {*} Socket 
     * @param {*} req 
     * @param {*} reply 
     * @param {*} next 
     */
    static async update (Socket, { body: { state } }, reply, next) {
        Store.motion = state;
        Socket.emit(Events.MOTION_STATE_UPDATED, { state });
        Logger.info(`[MOTION_STATE] Motion is now ${state}`);
        reply.send({ state });
    }
}
