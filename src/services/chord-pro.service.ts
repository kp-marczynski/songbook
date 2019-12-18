import {Injectable} from '@angular/core';
import {ChordProGroup} from '../model/chord-pro-group.model';
import {ISong, Song} from '../model/song.model';
import {SongBase} from '../model/song-base.model';

@Injectable({
    providedIn: 'root'
})
export class ChordProService {

    constructor() {
    }

    public parseSongsFromChordProFile(chordProFileContent: string, callback: (progress: number) => void): ISong[] {
        const chordProSongs = chordProFileContent.split('{new_song}');
        return this.parseSongsFromChordProFileRecursive(chordProSongs, 0, callback);
    }

    private parseSongsFromChordProFileRecursive(chordProSongs: string[], index, callback: (progress: number) => void): ISong[] {
        callback(index / chordProSongs.length);
        if (index < chordProSongs.length) {
            console.log((index + 1) + ' of ' + chordProSongs.length);
            const song = chordProSongs[index];
            let title = song.match('{title:.+}');
            if (!title || !title[0]) {
                title = song.match('{t:.+}');
            }
            const author = song.match('{artist:.+}');
            const language = song.match('{language:.+}');
            const result = this.parseSongsFromChordProFileRecursive(chordProSongs, index + 1, callback);
            if (title && author && language) {
                result.push(new Song(new SongBase(
                    null,
                    title[0].substring(title[0].indexOf(':') + 2, title[0].indexOf('}')),
                    author[0].substring(author[0].indexOf(':') + 2, author[0].indexOf('}')),
                    language[0].substring(language[0].indexOf(':') + 2, language[0].indexOf('}'))),
                    song));
            }
            return result;
        } else {
            return [] as ISong[];
        }
    }

    public parseChordPro(chordProText: string): ChordProGroup[] {
        const result: ChordProGroup[] = [];
        let currentChords = '';
        let currentChordsArray = [];
        let tempText: string[] = [];
        const lines = chordProText.split('\n');
        for (const line of lines) {
            const splitLeft = line.split('[');
            let chords = '';
            let text = '';
            if (splitLeft.length > 1) {
                currentChordsArray.push(currentChords);
                currentChords = '';
                if (tempText.filter(elem => elem && elem.length > 0).length > 0) {
                    result.push(new ChordProGroup(currentChordsArray, tempText));
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
                    } else {
                        text += left;
                        chords += ' ' + '_'.repeat(left.length) + ' ';
                    }
                }
                if (text.trim() !== '') {
                    tempText.push(text);
                }
                currentChords = chords;
            } else if (splitLeft[0].includes(']')) {
                currentChordsArray.push(currentChords);
                currentChords = '';
                if (tempText.filter(elem => elem && elem.length > 0).length > 0) {
                    result.push(new ChordProGroup(currentChordsArray, tempText));
                    tempText = [];
                    currentChordsArray = [];
                    currentChords = splitLeft[0];
                }
            } else if (!(
                tempText.length >= 2
                && splitLeft[0].trim() === ''
                && tempText[tempText.length - 1].trim() === ''
                && tempText[tempText.length - 2].trim() === '')
            ) {
                tempText.push(splitLeft[0]);
            }
        }
        if (currentChords !== '') {
            currentChordsArray.push(currentChords);
        }
        if (tempText.length > 0 || currentChords.length > 0) {
            result.push(new ChordProGroup(currentChordsArray, tempText));
        }
        return result;
    }
}
