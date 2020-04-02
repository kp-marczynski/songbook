import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Storage} from '@ionic/storage';
import {ISong, Song} from '../model/song.model';
import {StorageKeys} from '../model/storage-keys.model';
import {AngularFirestore} from '@angular/fire/firestore';
import {AuthService} from './auth.service';
import {CurrentSongMeta, ICurrentSongMeta} from '../model/current-song-meta.model';

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
        private authService: AuthService
    ) {
    }

    setCurrentSong(song: ISong): Promise<ICurrentSongMeta> {
        return new Promise<any>((resolve, reject) => this.getCurrentSongMeta().then((meta: ICurrentSongMeta) => {
            const songUuid = song ? song.uuid : null;
            if (!meta) {
                meta = new CurrentSongMeta(songUuid, null);
            } else {
                meta.songUUid = songUuid;
            }
            this.currentSongSubject.next(song);
            if (this.authService.user) {
                if (song) {
                    song.owner = this.authService.user.uid;
                    this.angularFirestore
                        .collection(StorageKeys.CAMPFIRE).doc(meta.firebaseUuid)
                        .set(JSON.parse(JSON.stringify(song)));
                } else {
                    this.angularFirestore
                        .collection(StorageKeys.CAMPFIRE).doc(meta.firebaseUuid)
                        .set(null);
                }
            }
            this.setCurrentSongMeta(meta).then(() => resolve(meta));
        }));
    }

    getCurrentSongMeta = (): Promise<ICurrentSongMeta> => {
        return new Promise<ICurrentSongMeta>((resolve, reject) => this.storage.get(StorageKeys.CURRENT_SONG).then((meta: ICurrentSongMeta) => {
            if (meta) {
                resolve(meta);
            } else {
                this.setCurrentSongMeta(new CurrentSongMeta(null, null)).then(res => resolve(res));
            }
        }))

    };

    private setCurrentSongMeta = (meta: ICurrentSongMeta): Promise<any> => this.storage.set(StorageKeys.CURRENT_SONG, meta);

    getCurrentSongFromFirebase = (currentSongUuid): Observable<ISong> =>
        this.angularFirestore.collection(StorageKeys.CAMPFIRE).doc<ISong>(currentSongUuid).valueChanges();

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
