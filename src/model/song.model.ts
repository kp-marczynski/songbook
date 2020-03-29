import * as uuidv4 from 'uuid/v4';

export interface ISong {
    uuid: string;
    title: string;
    artist: string;
    language: string;
    lastEdit: number;
    content: string;
    owner: string;
}

export class Song implements ISong {
    lastEdit: number;
    owner: string;

    constructor(public uuid: string, public title: string, public artist: string, public language: string, public content: string) {
        this.title = title;
        this.artist = artist;
        this.language = language;
        this.uuid = uuid ? uuid : uuidv4();
        this.lastEdit = Date.now();
        this.content = content;
    }
}
