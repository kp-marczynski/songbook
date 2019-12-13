import {AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import {StorageHelperService} from '../../../services/storage-helper.service';

@Component({
    selector: 'app-song-list',
    templateUrl: './song-list.component.html',
    styleUrls: ['./song-list.component.scss'],
})
export class SongListComponent implements OnInit {

    songIndex: any[] = [];

    constructor(private storageHelperService: StorageHelperService) {
    }

    ngOnInit(): void {
        this.storageHelperService.getSongIndex().then(res => {
                this.songIndex = res;
                this.songIndex.sort((a, b) =>
                    this.compareStrings(a.author, b.author) === 0
                        ? this.compareStrings(a.title, b.title)
                        : this.compareStrings(a.author, b.author));
            }
        );
    }

    compareStrings(a: string, b: string): number {
        return a.localeCompare(b, 'en', {sensitivity: 'base'});
    }
}
