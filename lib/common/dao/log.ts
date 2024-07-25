import mongoose from 'mongoose';
import Log from '../models/log';

export interface logParams {
		display: string[];
    target: string;
    details?: { [key: string]: any};
    targetId: mongoose.Types.ObjectId;
    loggerId: mongoose.Types.ObjectId;
}

async function logCreation(params: logParams) {
    const log = new Log({...params, action: 'create'});
    return await log.save();
}

async function logModification(params: logParams) {
    const log = new Log({...params, action: 'update'});
    return await log.save();
}

async function logDeletion(params: logParams) {
    const log = new Log({...params, action: 'delete'});
    return await log.save();
}

const LogDAO = {
    logCreation,
    logModification,
    logDeletion,
};

export default LogDAO;
