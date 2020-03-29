import {Component, OnInit} from '@angular/core';
import {author, name, version} from '../../../../package.json';

@Component({
    selector: 'app-info',
    templateUrl: './app-info.component.html',
    styleUrls: ['./app-info.component.scss'],
})
export class AppInfoComponent implements OnInit {

    version: string = version;
    name: string = name;
    author: string = author;
    year = new Date().getFullYear();

    constructor() {
    }

    ngOnInit() {
    }

}
