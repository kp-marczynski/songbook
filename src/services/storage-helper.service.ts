import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';

@Injectable({
    providedIn: 'root'
})
export class StorageHelperService {

    constructor(private storage: Storage) {
    }

    public getDarkMode(): Promise<any> {
        return this.storage.get('dark-mode');
    }

    public setDarkMode(darkMode: boolean): Promise<any> {
        return this.storage.set('dark-mode', darkMode);
    }
}
