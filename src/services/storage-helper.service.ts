import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {getSongBase, Song} from '../model/song.model';
import {Subject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class StorageHelperService {

    private songListUpdateSubject = new Subject();
    public songListUpdate$ = this.songListUpdateSubject.asObservable();

    private queueUpdateSubject = new Subject();
    public queueUpdate$ = this.queueUpdateSubject.asObservable();

    constructor(private storage: Storage) {
    }

    public saveSong(song: Song): Promise<any> {
        return this.saveSongLocally(song);
    }

    private saveSongLocally(song: Song): Promise<any> {
        return new Promise<any>((resolve, reject) =>
            this.storage.set(song.uuid, JSON.stringify(song))
                .then(() => this.addSongToIndex(getSongBase(song)).then(() => resolve()))
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

    private addSongToIndex(newSong): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.getSongIndex().then(index => {
                const pos = index.findIndex(obj => obj.uuid === newSong.uuid);
                if (pos >= 0) {
                    index[pos] = newSong;
                } else {
                    index.push(newSong);
                }
                this.storage.set('index', JSON.stringify(index)).then(() => {
                    this.songListUpdateSubject.next();
                    resolve()
                });
            });
        });
    }

    public removeSong(song: Song) {
        this.storage.remove(song.uuid);
        this.removeSongFromIndex(song);
        this.removeFromQueue(song);
    }

    private removeSongFromIndex(song: Song): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.getSongIndex().then(index => {
                const updatedIndex = index.filter(elem => elem.uuid !== song.uuid);
                this.storage.set('index', JSON.stringify(updatedIndex)).then(() => {
                    this.songListUpdateSubject.next();
                    resolve();
                });
            });
        });
    }

    public getQueue(): Promise<any[]> {
        return new Promise<any[]>((resolve, reject) => {
            this.storage.get('queue').then(res => {
                let queue: any[] = [];
                if (res) {
                    queue = JSON.parse(res) as any[];
                }
                resolve(queue);
            });
        });
    }

    public addToQueue(song): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.getQueue().then(queue => {
                queue.push(getSongBase(song));
                this.storage.set('queue', JSON.stringify(queue)).then(() => {
                    this.queueUpdateSubject.next();
                    resolve();
                });
            });
        });
    }

    public removeFromQueue(song): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.getQueue().then(queue => {
                queue = queue.filter(elem => elem.uuid !== song.uuid);
                this.storage.set('queue', JSON.stringify(queue)).then(() => {
                    this.queueUpdateSubject.next();
                    resolve();
                });
            });
        });
    }

    public getDarkMode(): Promise<any> {
        return this.storage.get('dark-mode');
    }

    public setDarkMode(darkMode: boolean): Promise<any> {
        return this.storage.set('dark-mode', darkMode);
    }
}
