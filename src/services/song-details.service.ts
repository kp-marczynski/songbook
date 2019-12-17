import {Injectable} from '@angular/core';
import {Song} from '../model/song.model';
import {ChordProGroup} from '../model/chord-pro-group.model';
import {SongBase} from '../model/song-base.model';
import {Storage} from '@ionic/storage';
import {SongIndexService} from './song-index.service';
import {CampfireService} from './campfire.service';

@Injectable({
    providedIn: 'root'
})
export class SongDetailsService {

    constructor(private storage: Storage, private songIndexService: SongIndexService, private campfireService: CampfireService) {
    }

    getSong(uuid: string): Promise<Song> {
        return new Promise<Song>((resolve, reject) => {
            this.storage.get(uuid).then((res: string) => {
                this.songIndexService.getSongIndex().then(() => {
                    const base = this.songIndexService.songIndex.find(elem => elem.uuid === uuid);
                    const song = new Song(base, res);
                    song.formattedContent = this.parseChordPro(song);
                    resolve(song);
                });
            });
        });
    }

    saveSong(song: Song): Promise<any> {
        return new Promise<any>((resolve, reject) =>
            this.storage.set(song.songBase.uuid, song.content)
                .then(() => this.songIndexService.addSongToIndex(song.songBase).then(() => resolve()))
        );
    }

    removeSong(song: SongBase) {
        this.storage.remove(song.uuid);
        this.songIndexService.removeSongFromIndex(song);
        this.campfireService.removeFromQueue(song);
    }

    private parseChordPro(song: Song): ChordProGroup[] {
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
            if (splitLeft.length > 1) {
                currentChordsArray.push(currentChords);
                currentChords = '';
                if (tempText.filter(text => text && text.length > 0).length > 0) {
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
                if (tempText.filter(text => text && text.length > 0).length > 0) {
                    result.push(new ChordProGroup(currentChordsArray, tempText));
                    tempText = [];
                    currentChordsArray = [];
                    currentChords = splitLeft[0];
                }
            } else {
                if (!(tempText.length >= 2 && splitLeft[0].trim() === '' && tempText[tempText.length - 1].trim() === '' && tempText[tempText.length - 2].trim() === '')) {
                    tempText.push(splitLeft[0]);
                }
            }
        }
        if (currentChords != '') {
            currentChordsArray.push(currentChords);
        }
        if (tempText.length > 0 || currentChords.length > 0) {
            result.push(new ChordProGroup(currentChordsArray, tempText));
        }
        return result;
    }
}
