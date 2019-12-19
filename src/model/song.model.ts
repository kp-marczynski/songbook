import * as uuidv4 from 'uuid/v4';

export interface ISong {
    uuid: string;
    title: string;
    author: string;
    language: string;
    lastEdit: number;
    content: string;
}

export class Song implements ISong {
    lastEdit: number;

    constructor(public uuid: string, public title: string, public author: string, public language: string, public content: string) {
        this.title = title;
        this.author = author;
        this.language = language;
        this.uuid = uuid ? uuid : uuidv4();
        this.lastEdit = Date.now();
        this.content = content;
    }
}
