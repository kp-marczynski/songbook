import {Component, OnInit} from '@angular/core';
import {StorageHelperService} from '../../services/storage-helper.service';
import {ChordProService} from '../../services/chord-pro.service';
import {SongDetailsService} from '../../services/song-details.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
    darkMode = false;

    uploading = false;
    progress = 0;

    file: any;

    constructor(
        private storageHelperService: StorageHelperService,
        private chordProService: ChordProService,
        private songDetailsService: SongDetailsService) {
    }

    ngOnInit() {
        this.storageHelperService.getDarkMode().then((res: boolean) => {
            this.darkMode = res;
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
            // todo bulk save
        };
        fileReader.readAsText(this.file);
    }

    setParsingProgress(progress: number) {
        this.progress = progress;
        this.uploading = progress < 100;
    }
}
