import {AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import {StorageHelperService} from '../../../services/storage-helper.service';
import {HostListener} from '@angular/core';
import {Song} from "../../../model/song.model";

@Component({
    selector: 'app-song-list',
    templateUrl: './song-list.component.html',
    styleUrls: ['./song-list.component.scss'],
})
export class SongListComponent implements OnInit {

    songIndex: any[] = [];
    displaySongs: any[] = [];
    numberOfItems = 20;

    constructor(private storageHelperService: StorageHelperService) {
    }

    ngOnInit(): void {
        this.loadSongs();
        this.storageHelperService.songListUpdate$.subscribe(() => {
            this.loadSongs();
        });
    }

    loadSongs(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.storageHelperService.getSongIndex().then(res => {
                    this.songIndex = res;
                    this.sortSongList();
                    this.loadData(null);
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

    // @HostListener('window:popstate', ['$event'])
    // onPopState(event) {
    //     this.loadSongs();
    // }

    remove(song: any) {
        this.storageHelperService.removeSong(song);
    }

    addToQueue(song: any) {
        this.storageHelperService.addToQueue(song);
    }

    loadData(event) {
        setTimeout(() => {
            const displayedSongs = this.displaySongs.length;
            for (let i = displayedSongs; i < this.songIndex.length && i - displayedSongs < this.numberOfItems; ++i) {
                this.displaySongs.push(this.songIndex[i]);
            }
            if(event){
                event.target.complete();
            }

            if (this.displaySongs.length == this.songIndex.length && event) {
                event.target.disabled = true;
            }
        }, 500);
    }
}
