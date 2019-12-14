import {Component, OnInit} from '@angular/core';
import {StorageHelperService} from "../../services/storage-helper.service";

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
    darkMode = false;

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
