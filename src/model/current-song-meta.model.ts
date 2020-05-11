import * as uuidv4 from 'uuid/v4';

export interface ICurrentSongMeta {
    songUUid?: string;
    firebaseUuid?: string;
    timestamp: number;
}

export class CurrentSongMeta implements ICurrentSongMeta {

    public timestamp: number;

    constructor(public songUUid?: string, public firebaseUuid?: string) {
        this.firebaseUuid = firebaseUuid ? firebaseUuid : uuidv4();
        this.timestamp = Date.now()
    }
}
