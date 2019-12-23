import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Storage} from '@ionic/storage';
import {ISong, Song} from '../model/song.model';
import {StorageKeys} from '../model/storage-keys.model';
import {AngularFirestore} from "@angular/fire/firestore";
import {AuthService} from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class CampfireService {
    private queueUpdateSubject = new Subject();
    public queueUpdate$ = this.queueUpdateSubject.asObservable();
    private currentSongSubject = new Subject();
    public currentSong$ = this.currentSongSubject.asObservable();

    constructor(
        private storage: Storage,
        private angularFirestore: AngularFirestore,
        private authService: AuthService) {
    }

    setCurrentSong(song: ISong): Promise<any> {
        return new Promise<any>((resolve, reject) => this.getCurrentSong().then((res: ISong) => {
            const currentSong = new Song(res ? res.uuid : null, song.title, song.artist, song.language, song.content);
            this.currentSongSubject.next(currentSong);
            if (this.authService.user) {
                currentSong.owner = this.authService.user.uid;
                this.angularFirestore
                    .collection(StorageKeys.CAMPFIRE).doc(currentSong.uuid)
                    .set(JSON.parse(JSON.stringify(currentSong)));
            }
            this.storage.set(StorageKeys.CURRENT_SONG, song).then(() => resolve());
        }))
    }

    getCurrentSong(): Promise<ISong> {
        return this.storage.get(StorageKeys.CURRENT_SONG);
    }

    getCurrentSongFromFirebase(currentSongUuid): Observable<ISong> {
        return this.angularFirestore.collection(StorageKeys.CAMPFIRE).doc<ISong>(currentSongUuid).valueChanges();
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
