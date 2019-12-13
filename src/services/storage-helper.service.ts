import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {getSongBase, Song} from '../model/song.model';

@Injectable({
    providedIn: 'root'
})
export class StorageHelperService {

    constructor(private storage: Storage) {
    }

    public saveSong(song: Song): Promise<any> {
        return this.saveSongLocally(song);
    }

    private saveSongLocally(song: Song): Promise<any> {
        return new Promise<any>((resolve, reject) =>
            this.storage.set(song.uuid, JSON.stringify(song))
                .then(() => this.updateSongIndex(getSongBase(song)).then(() => resolve()))
        );
    }

    public getSong(uuid: string): Promise<Song> {
        return this.getLocalSong(uuid);
    }

    private getLocalSong(uuid: string): Promise<Song> {
        return new Promise<Song>((resolve, reject) => {
            this.storage.get(uuid).then(res => {
                resolve(JSON.parse(res));
            });
        });
    }

    public getSongIndex(): Promise<any[]> {
        return new Promise<any[]>((resolve, reject) => {
            this.storage.get('index').then(res => {
                let index: any[] = [];
                if (res) {
                    index = JSON.parse(res) as any[];
                }
                resolve(index);
            });
        });
    }

    private updateSongIndex(newSong): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.getSongIndex().then(index => {
                const pos = index.findIndex(obj => obj.uuid === newSong.uuid);
                if (pos >= 0) {
                    index[pos] = newSong;
                } else {
                    index.push(newSong);
                }
                this.storage.set('index', JSON.stringify(index)).then(() => resolve());
            });
        });
    }
}
