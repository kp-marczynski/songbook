import * as uuidv4 from 'uuid/v4';

export interface ISongBase {
    uuid: string;
    title: string;
    author: string;
    language: string;
    lastEdit: number;
}

export class SongBase implements ISongBase {
    lastEdit: number;

    constructor(public uuid: string, public title: string, public author: string, public language: string) {
        this.title = title;
        this.author = author;
        this.language = language;
        this.uuid = uuid ? uuid : uuidv4();
        this.lastEdit = Date.now();
    }
}
