import {CommandType} from './command-type.model';

export interface ICampfireQueueCommand {
    commandType: CommandType;
    timestamp: number;
    songUuid: string;
}

export class CampfireQueueCommand implements ICampfireQueueCommand {
    constructor(
        public commandType: CommandType,
        public timestamp: number,
        public songUuid: string
    ) {
    }
}
