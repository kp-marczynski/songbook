import * as uuidv4 from 'uuid/v4';

export interface ICurrentSongMeta {
    songUUid: string;
    firebaseUuid?: string;
}

export class CurrentSongMeta implements ICurrentSongMeta {

    constructor(public songUUid: string, public firebaseUuid?: string) {
        this.firebaseUuid = firebaseUuid ? firebaseUuid : uuidv4();
    }
}
