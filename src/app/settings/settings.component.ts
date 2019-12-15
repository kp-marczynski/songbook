import {Component, OnInit} from '@angular/core';
import {StorageHelperService} from "../../services/storage-helper.service";
import {version, name, author} from '../../../package.json';
import {Song} from "../../model/song.model";

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
    darkMode = false;
    version: string = version;
    name: string = name;
    author: string = author;
    year = new Date().getFullYear();
    uploading = false;
    progress = 0;

    file: any;

    constructor(private storageHelperService: StorageHelperService) {
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
        // console.log(result);
        let songs = result.split("{new_song}");
        // console.log(songs);
        this.progress = 0;
        this.uploading = true;
        this.parseResultRecursive(songs, 0);
    }

    parseResultRecursive(songs: string[], index) {
        this.progress = index / songs.length;
        if (index < songs.length) {
            console.log((index + 1) + ' of ' + songs.length);
            const song = songs[index];
            const title = song.match('{title:.+}');
            const author = song.match('{artist:.+}');
            const language = song.match('{language:.+}');
            if (title && author && language) {
                this.storageHelperService.saveSong(new Song(
                    title[0].substring(title[0].indexOf(':') + 2, title[0].indexOf('}')),
                    author[0].substring(author[0].indexOf(':') + 2, author[0].indexOf('}')),
                    language[0].substring(language[0].indexOf(':') + 2, language[0].indexOf('}')),
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
