import * as uuidv4 from 'uuid/v4';

export class SongBase {
    uuid: string;
    title: string;
    author: string;
    language: string;
    lastEdit: number;

    constructor(uuid: string, title: string, author: string, language: string) {
        this.title = title;
        this.author = author;
        this.language = language;
        this.uuid = uuid ? uuid : uuidv4();
        this.lastEdit = Date.now();
    }
}
