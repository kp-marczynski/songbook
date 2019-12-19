import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {StorageKeys} from '../model/storage-keys.model';

@Injectable({
    providedIn: 'root'
})
export class StorageHelperService {

    constructor(private storage: Storage) {
    }

    public getDarkMode(): Promise<any> {
        return this.storage.get(StorageKeys.DARK_MODE);
    }

    public setDarkMode(darkMode: boolean): Promise<any> {
        return this.storage.set(StorageKeys.DARK_MODE, darkMode);
    }
}
