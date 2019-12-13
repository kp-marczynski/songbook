import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {Song, SongBase} from '../model/song.model';

@Injectable({
    providedIn: 'root'
})
export class StorageHelperService {

    constructor(private storage: Storage) {
    }

    public saveSong(song: Song) {
        this.saveSongLocally(song);
    }

    private saveSongLocally(song: Song) {
        this.storage.set(song.uuid, JSON.stringify(song));
        this.updateSongIndex(song as SongBase);
    }

    public getSong(uuid: string): Promise<Song> {
        return this.getLocalSong(uuid);
    }

    private getLocalSong(uuid: string): Promise<Song> {
        return new Promise<Song>((resolve, reject) => {
            this.storage.get(uuid).then(res => {
                resolve(JSON.parse(res) as Song);
            });
        });
    }

    public getSongIndex(): Promise<SongBase[]> {
        return new Promise<SongBase[]>((resolve, reject) => {
            this.storage.get('index').then(res => {
                let index: SongBase[] = [];
                if (res) {
                    index = JSON.parse(res) as SongBase[];
                }
                resolve(index);
            });
        });
    }

    private updateSongIndex(newSong: SongBase) {
        this.getSongIndex().then(index => {
            const pos = index.findIndex(obj => obj.uuid === newSong.uuid);
            if (pos >= 0) {
                index[pos] = newSong;
            } else {
                index.push(newSong);
            }
            this.storage.set('index', JSON.stringify(index));
        });
    }
}
