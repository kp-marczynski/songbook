import {Component, Input, OnInit} from '@angular/core';
import {ISong} from "../../../model/song.model";
import {Router} from "@angular/router";

@Component({
    selector: 'app-song-list-item',
    templateUrl: './song-list-item.component.html',
    styleUrls: ['./song-list-item.component.scss'],
})
export class SongListItemComponent implements OnInit {

    @Input() song: ISong;

    constructor(private router: Router) {
    }

    ngOnInit() {
    }

    hideKeyboard = () => (document.activeElement as HTMLElement).blur();

    navigateWithTimeout(url: string[]) {
        this.hideKeyboard();
        setTimeout(() => this.router.navigate(url), 500);
    }

    navigateToSongDetails() {
        this.navigateWithTimeout(['/tabs/song', this.song.uuid, 'view'])
    }
}
