import {Component, OnInit} from '@angular/core';
import {StorageHelperService} from '../../services/storage-helper.service';
import {ChordProService} from '../../services/chord-pro.service';
import {SongService} from '../../services/song.service';
import {AuthService} from '../../services/auth.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
    darkMode = false;

    uploading = false;
    progress = 0;

    lastSync: Date;
    file: any;

    constructor(
        private storageHelperService: StorageHelperService,
        private chordProService: ChordProService,
        private authService: AuthService,
        private songService: SongService) {
    }

    ngOnInit() {
        this.storageHelperService.getDarkMode().then((res: boolean) => {
            this.darkMode = res;
        });
        this.songService.getSongsUpdateTimestamp().then((res: number) => {
            if (res) {
                this.lastSync = new Date(res);
            }
        });
    }

    switchDarkMode() {
        document.body.classList.toggle('dark', this.darkMode);
        this.storageHelperService.setDarkMode(this.darkMode);
    }

    fileChanged(e) {
        this.file = e.target.files[0];
    }

    uploadDocument() {
        const fileReader = new FileReader();

        fileReader.onload = (e) => {
            const songs = this.chordProService.parseSongsFromChordProFile(fileReader.result as string,
                (progress: number) => this.setParsingProgress(progress));
            this.uploading = false;
            console.log(songs);
            songs.forEach(song => {
                this.songService.saveSong(song);
            });
            // todo bulk save
        };
        fileReader.readAsText(this.file);
    }

    setParsingProgress(progress: number) {
        this.progress = progress;
        this.uploading = progress < 100;
    }

    syncWithFirebase() {
        this.songService.syncWithFirebase();
        this.lastSync = new Date();
    }
}
