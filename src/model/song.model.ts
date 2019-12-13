import {ChordProGroup} from './chord-pro-group.model';
import * as uuidv4 from 'uuid/v4';
import * as md5 from 'md5';

export class SongBase {
    uuid: string;
    title: string;
    author: string;
    language: string;
    checksum: string;

    constructor(title: string, author: string, language: string) {
        this.title = title;
        this.author = author;
        this.language = language;
        this.uuid = uuidv4();
        this.checksum = getChecksum(title, author, language, '');
    }
}

export class Song extends SongBase {
    content: string;
    formattedContent: ChordProGroup[];

    constructor(title: string, author: string, language: string, content: string) {
        super(title, author, language);
        this.content = content;
        this.checksum = getChecksum(title, author, language, content);
        this.formattedContent = parseChordPro(this.content);
    }
}

function parseChordPro(chordProText: string): ChordProGroup[] {
    const result: ChordProGroup[] = [];
    let currentChords = '';
    let tempText: string[] = [];
    const lines = chordProText.split('\n');
    for (const line of lines) {
        const splitLeft = line.split('[');
        let chords = '';
        let text = '';
        if (splitLeft.length > 1) {
            result.push(new ChordProGroup(currentChords, tempText));
            currentChords = '';
            tempText = [];
            for (const left of splitLeft) {
                if (left.includes(']')) {
                    const splitRight = left.split(']');
                    for (let i = 0; i < splitRight.length; ++i) {
                        if (i % 2 === 0) {
                            chords += splitRight[i];
                        } else {
                            text += splitRight[i];
                            chords += ' ' + '_'.repeat(splitRight[i].length) + ' ';

                        }
                    }
                    // for (let i = 0; 2 * i < splitRight.length; ++i) {
                    //     chords += splitRight[2 * i] + ' ';
                    // }
                    //
                    // for (let i = 0; 2 * i + 1 < splitRight.length; ++i) {
                    //     text += splitRight[2 * i + 1] + ' ';
                    // }
                } else {
                    text += left;
                    chords += ' ' + '_'.repeat(left.length) + ' ';
                }
            }
            tempText.push(text);
            currentChords = chords;
        } else if (splitLeft[0].includes(']')) {
            result.push(new ChordProGroup(currentChords, tempText));
            tempText = [];
            currentChords = splitLeft[0];
        } else {
            tempText.push(splitLeft[0]);
        }
    }
    if (tempText.length > 0 || currentChords.length > 0) {
        result.push(new ChordProGroup(currentChords, tempText));
    }
    return result;
}

function getChecksum(title: string, author: string, language: string, content: string): string {
    return md5(JSON.stringify({title, author, language, content}));
}
