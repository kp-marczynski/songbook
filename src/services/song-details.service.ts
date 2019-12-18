import {Injectable} from '@angular/core';
import {ISong, Song} from '../model/song.model';
import {ISongBase} from '../model/song-base.model';
import {Storage} from '@ionic/storage';
import {SongIndexService} from './song-index.service';
import {CampfireService} from './campfire.service';
import {ChordProService} from './chord-pro.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {AuthService} from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class SongDetailsService {

    constructor(
        private storage: Storage,
        private songIndexService: SongIndexService,
        private campfireService: CampfireService,
        private chordProService: ChordProService,
        private angularFirestore: AngularFirestore,
        private authService: AuthService) {
    }

    getSong(uuid: string): Promise<ISong> {
        return new Promise<ISong>((resolve, reject) => {
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

    saveSong(song: ISong): Promise<any> {
        // if (this.authService.user) {
        //     this.angularFirestore
        //         .collection('songs-details').doc(this.authService.user.uid)
        //         .collection('content').doc(song.songBase.uuid)
        //         .set(JSON.parse(JSON.stringify(song)));
        // }
        this.angularFirestore.collection('songs-details').get()
        return new Promise<any>((resolve, reject) =>
            this.storage.set(song.songBase.uuid, song.content)
                .then(() => this.songIndexService.addSongToIndex(song.songBase).then(() => resolve()))
        );
    }

    removeSong(song: ISongBase) {
        this.storage.remove(song.uuid);
        this.songIndexService.removeSongFromIndex(song);
        this.campfireService.removeFromQueue(song);
    }
}
