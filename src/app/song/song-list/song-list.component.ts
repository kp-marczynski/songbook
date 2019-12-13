import {AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import {StorageHelperService} from '../../../services/storage-helper.service';
import {HostListener} from '@angular/core';

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
        this.loadSongs();
    }

    loadSongs(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.storageHelperService.getSongIndex().then(res => {
                    this.songIndex = res;
                    this.sortSongList();
                    resolve();
                }
            );
        });
    }

    sortSongList() {
        this.songIndex.sort((a, b) =>
            this.compareStrings(a.author, b.author) === 0
                ? this.compareStrings(a.title, b.title)
                : this.compareStrings(a.author, b.author));
    }

    compareStrings(a: string, b: string): number {
        return a.localeCompare(b, 'en', {sensitivity: 'base'});
    }

    doRefresh(event) {
        this.loadSongs().then(() => event.target.complete());
    }

    @HostListener('window:popstate', ['$event'])
    onPopState(event) {
        this.loadSongs();
    }
}
