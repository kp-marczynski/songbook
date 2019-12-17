import {SongBase} from './song-base.model';
import {ChordProGroup} from './chord-pro-group.model';

export class Song {
    songBase: SongBase;
    content: string;
    formattedContent: ChordProGroup[];

    constructor(songBase: SongBase, content?: string) {
        this.songBase = songBase;
        this.content = content;
    }
}
