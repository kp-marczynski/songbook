import {Injectable} from '@angular/core';
import {ISong, Song} from '../model/song.model';
import {Storage} from '@ionic/storage';
import {CampfireService} from './campfire.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {AuthService} from './auth.service';
import {Subject} from 'rxjs';
import {StorageKeys} from '../model/storage-keys.model';

@Injectable({
    providedIn: 'root'
})
export class SongService {

    public songIndex: ISong[] = [];
    private songListUpdateSubject = new Subject();
    public songListUpdate$ = this.songListUpdateSubject.asObservable();

    constructor(
        private storage: Storage,
        private campfireService: CampfireService,
        private angularFirestore: AngularFirestore,
        private authService: AuthService) {
    }

    getSong(uuid: string): Promise<ISong> {
        return new Promise<ISong>((resolve, reject) => {
            this.storage.get(uuid).then((res: ISong) => {
                resolve(res);
                // this.getSongIndex().then(() => {
                //     const base = this.songIndex.find(elem => elem.uuid === uuid);
                //     const song = new Song(base, res);
                //     song.formattedContent = this.chordProService.parseChordPro(song.content);
                //     resolve(song);
                // });
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
        // this.angularFirestore.collection('songs-details')

        return new Promise<any>((resolve, reject) =>
            this.storage.set(song.uuid, song)
                .then(() => this.addSongToIndex(song).then(() => resolve()))
        );
    }

    removeSong(song: ISong) {
        this.storage.remove(song.uuid);
        this.removeSongFromIndex(song);
        this.campfireService.removeFromQueue(song);
    }

    getSongIndex(): Promise<ISong[]> {
        return new Promise<ISong[]>((resolve, reject) => {
            this.storage.keys().then(keys => {
                // console.log(Object.values(StorageKeys));
                keys = keys.filter(key => !(Object.values(StorageKeys)).find(storageKey => storageKey === key));
                // console.log(keys.length);
                keys.forEach(key => {

                });
                this.loadSongsToIndex(keys, 0).then(() => {
                    // console.log(this.songIndex);
                    resolve(this.songIndex);
                });
            });
            // this.storage.get('index').then((res: ISong[]) => {
            //     this.songIndex = res ? res : [];
            //     resolve(res ? res : []);
            // });
        });
    }

    private loadSongsToIndex(keys: string[], index): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            if (index === keys.length) {
                resolve();
            } else {
                this.getSong(keys[index]).then(song => {
                    this.addSongToIndexInternal(song).then(() => {
                        this.loadSongsToIndex(keys, index + 1).then(() => resolve());
                    });
                });
            }
        });
    }

    public removeSongFromIndex(song: ISong): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.songIndex = this.songIndex.filter(elem => elem.uuid !== song.uuid);
            this.songListUpdateSubject.next();
            resolve();
        });
    }

    public addSongToIndex(newSong: ISong): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.addSongToIndexInternal(newSong).then(() => {
                this.songListUpdateSubject.next();
                resolve();
            });
        });
    }

    private addSongToIndexInternal(newSong: ISong): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            delete newSong.content;
            this.songIndex = this.songIndex.filter(song => song.uuid !== newSong.uuid);
            this.songIndex.push(newSong);
            resolve();
        });
    }

    public setSongsUpdateTimestamp() {
        this.storage.set(StorageKeys.SONGS_UPDATE_TIMESTAMP, Date.now());
    }

    public getSongsUpdateTimestamp(): Promise<number> {
        return this.storage.get(StorageKeys.SONGS_UPDATE_TIMESTAMP);
    }
}
