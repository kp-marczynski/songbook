import {Injectable} from '@angular/core';
import {SongBase} from '../model/song-base.model';
import {Storage} from '@ionic/storage';
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SongIndexService {
    public songIndex: SongBase[] = [];
    private songListUpdateSubject = new Subject();
    public songListUpdate$ = this.songListUpdateSubject.asObservable();

    constructor(private storage: Storage) {
    }

    getSongIndex(): Promise<SongBase[]> {
        return new Promise<SongBase[]>((resolve, reject) => {
            this.storage.get('index').then((res: SongBase[]) => {
                this.songIndex = res ? res : [];
                resolve(res ? res : []);
            });
        });
    }

    public removeSongFromIndex(song: SongBase): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.getSongIndex().then(index => {
                const updatedIndex = index.filter(elem => elem.uuid !== song.uuid);
                this.songIndex = updatedIndex;
                this.storage.set('index', updatedIndex).then(() => {
                    this.songListUpdateSubject.next();
                    resolve();
                });
            });
        });
    }

    public addSongToIndex(newSong: SongBase): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.getSongIndex().then(index => {
                index = index ? index : [];
                const pos = index.findIndex(obj => obj.uuid === newSong.uuid);
                if (pos >= 0) {
                    index[pos] = newSong;
                } else {
                    index.push(newSong);
                }
                this.songIndex = index;
                this.storage.set('index', index).then(() => {
                    this.songListUpdateSubject.next();
                    resolve();
                });
            });
        });
    }
}
