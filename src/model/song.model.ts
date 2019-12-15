import {ChordProGroup} from './chord-pro-group.model';
import * as uuidv4 from 'uuid/v4';
import * as md5 from 'md5';

export class Song {
    uuid: string;
    title: string;
    author: string;
    language: string;
    // checksum: string;
    content: string;

    constructor(title: string, author: string, language: string, content: string, uuid?: string) {
        this.title = title;
        this.author = author;
        this.language = language;
        this.uuid = uuid ? uuid : uuidv4();
        this.content = content;
        // this.checksum = getChecksum(title, author, language, content);
    }
}

export function getSongBase(song: Song) {
    return {
        uuid: song.uuid,
        title: song.title,
        author: song.author,
        language: song.language,
        // checksum: song.checksum
    };
}

export function parseChordPro(song: Song): ChordProGroup[] {
    const chordProText = song.content;
    const result: ChordProGroup[] = [];
    let currentChords = '';
    let currentChordsArray = [];
    let tempText: string[] = [];
    const lines = chordProText.split('\n');
    for (const line of lines) {
        const splitLeft = line.split('[');
        let chords = '';
        let text = '';
        //console.log(line);
        if (splitLeft.length > 1) {
            currentChordsArray.push(currentChords);
            //console.log('push1 chords line');
            currentChords = '';
            if (tempText.filter(text => text && text.length > 0).length > 0) {
                // currentChordsArray.push(currentChords);
                result.push(new ChordProGroup(currentChordsArray, tempText));
                // currentChords = '';
                currentChordsArray = [];
                tempText = [];
            }
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
            if (text.trim() !== '') {
                // if (tempText.length < 2 || !(text.trim() === '' && tempText[tempText.length - 1].trim() === '' && tempText[tempText.length - 2].trim() === '')) {
                tempText.push(text);
                //console.log('push2 text');
            }
            currentChords = chords;
        } else if (splitLeft[0].includes(']')) {
            currentChordsArray.push(currentChords);
            //console.log('push3 chords line');
            currentChords = '';
            if (tempText.filter(text => text && text.length > 0).length > 0) {
                result.push(new ChordProGroup(currentChordsArray, tempText));
                tempText = [];
                currentChordsArray = [];
                currentChords = splitLeft[0];
            }
        } else {
            if (!(tempText.length >= 2 && splitLeft[0].trim() === '' && tempText[tempText.length - 1].trim() === '' && tempText[tempText.length - 2].trim() === '')) {
                // if (tempText.length < 2 || !(text.trim() === '' && tempText[tempText.length - 1].trim() === '' && tempText[tempText.length - 2].trim() === '')) {
                tempText.push(splitLeft[0]);
                //console.log('push4 text');
            }
        }
    }
    if (currentChords != '') {
        currentChordsArray.push(currentChords);
        //console.log('push5 chords line');
    }
    if (tempText.length > 0 || currentChords.length > 0) {
        result.push(new ChordProGroup(currentChordsArray, tempText));
    }
    return result;
}

function getChecksum(title: string, author: string, language: string, content: string): string {
    return md5(JSON.stringify({title, author, language, content}));
}
