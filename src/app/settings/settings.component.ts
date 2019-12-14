import {Component, OnInit} from '@angular/core';
import {StorageHelperService} from "../../services/storage-helper.service";
import {version, name, author} from '../../../package.json';

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
}
