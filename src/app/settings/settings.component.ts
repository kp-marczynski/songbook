import {Component, OnInit} from '@angular/core';
import {StorageHelperService} from '../../services/storage-helper.service';
import {Song} from '../../model/song.model';
import {SongDetailsService} from '../../services/song-details.service';
import {SongBase} from '../../model/song-base.model';

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

    constructor(private storageHelperService: StorageHelperService, private songDetailsService: SongDetailsService) {
    }

    ngOnInit() {
        this.storageHelperService.getDarkMode().then((res: boolean) => {
            this.darkMode = res;
        })
    }

    switchDarkMode() {
        document.body.classList.toggle('dark', this.darkMode);
        this.storageHelperService.setDarkMode(this.darkMode);
    }

    fileChanged(e) {
        this.file = e.target.files[0];
    }

    uploadDocument() {
        let fileReader = new FileReader();
        fileReader.onload = (e) => {
            this.parseResult(fileReader.result as string);
        };
        fileReader.readAsText(this.file);
    }

    parseResult(result: string) {
        let songs = result.split("{new_song}");
        this.progress = 0;
        this.uploading = true;
        this.parseResultRecursive(songs, 0);
    }

    parseResultRecursive(songs: string[], index) {
        this.progress = index / songs.length;
        if (index < songs.length) {
            console.log((index + 1) + ' of ' + songs.length);
            const song = songs[index];
            let title = song.match('{title:.+}');
            if (!title || !title[0]) {
                title = song.match('{t:.+}');
            }
            const author = song.match('{artist:.+}');
            const language = song.match('{language:.+}');
            if (title && author && language) {
                this.songDetailsService.saveSong(new Song(new SongBase(
                    null,
                    title[0].substring(title[0].indexOf(':') + 2, title[0].indexOf('}')),
                    author[0].substring(author[0].indexOf(':') + 2, author[0].indexOf('}')),
                    language[0].substring(language[0].indexOf(':') + 2, language[0].indexOf('}'))),
                    song)).then(() =>
                    this.parseResultRecursive(songs, index + 1));
            } else {
                this.parseResultRecursive(songs, index + 1);
            }
        } else {
            this.uploading = false;
        }
    }
}
