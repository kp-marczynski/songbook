import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
    darkMode = false;

    constructor() {
    }

    ngOnInit() {
    }

    switchDarkMode() {
        document.body.classList.toggle('dark', this.darkMode);
    }
}
