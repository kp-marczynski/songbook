import {Injectable} from '@angular/core';
import {Song} from '../model/song.model';
import {SongBase} from '../model/song-base.model';
import {Storage} from '@ionic/storage';
import {SongIndexService} from './song-index.service';
import {CampfireService} from './campfire.service';
import {ChordProService} from './chord-pro.service';

@Injectable({
    providedIn: 'root'
})
export class SongDetailsService {

    constructor(
        private storage: Storage,
        private songIndexService: SongIndexService,
        private campfireService: CampfireService,
        private chordProService: ChordProService) {
    }

    getSong(uuid: string): Promise<Song> {
        return new Promise<Song>((resolve, reject) => {
            this.storage.get(uuid).then((res: string) => {
                this.songIndexService.getSongIndex().then(() => {
                    const base = this.songIndexService.songIndex.find(elem => elem.uuid === uuid);
                    const song = new Song(base, res);
                    song.formattedContent = this.chordProService.parseChordPro(song.content);
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
}
