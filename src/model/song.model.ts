import {ISongBase} from './song-base.model';
import {IChordProGroup} from './chord-pro-group.model';

export interface ISong {
    songBase: ISongBase;
    content: string;
    formattedContent: IChordProGroup[];
}

export class Song implements ISong {
    formattedContent: IChordProGroup[];

    constructor(public songBase: ISongBase, public content: string) {
        this.songBase = songBase;
        this.content = content;
    }
}
