import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Storage} from '@ionic/storage';
import {ISong} from '../model/song.model';
import {StorageKeys} from '../model/storage-keys.model';

@Injectable({
    providedIn: 'root'
})
export class CampfireService {
    private queueUpdateSubject = new Subject();
    public queueUpdate$ = this.queueUpdateSubject.asObservable();

    constructor(private storage: Storage) {
    }

    addToQueue(song: ISong): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.getQueue().then(queue => {
                queue.push(song);
                this.storage.set(StorageKeys.QUEUE, queue).then(() => {
                    this.queueUpdateSubject.next();
                    resolve();
                });
            });
        });
    }

    getQueue(): Promise<ISong[]> {
        return new Promise<any[]>((resolve, reject) => {
            this.storage.get(StorageKeys.QUEUE).then(res => {
                let queue: any[] = [];
                if (res) {
                    queue = res as any[];
                }
                resolve(queue);
            });
        });
    }

    removeFromQueue(song: ISong): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.getQueue().then(queue => {
                queue = queue.filter(elem => elem.uuid !== song.uuid);
                this.storage.set(StorageKeys.QUEUE, queue).then(() => {
                    this.queueUpdateSubject.next();
                    resolve();
                });
            });
        });
    }
}
