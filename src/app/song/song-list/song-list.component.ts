import {Component, OnInit} from '@angular/core';
import {ISongBase} from '../../../model/song-base.model';
import {SongIndexService} from '../../../services/song-index.service';
import {CampfireService} from '../../../services/campfire.service';
import {SongDetailsService} from '../../../services/song-details.service';

@Component({
    selector: 'app-song-list',
    templateUrl: './song-list.component.html',
    styleUrls: ['./song-list.component.scss'],
})
export class SongListComponent implements OnInit {

    songIndex: ISongBase[] = [];
    displaySongs: ISongBase[] = [];
    filteredSongs: ISongBase[] = [];

    numberOfItems = 20;
    search = '';

    constructor(
        private songIndexService: SongIndexService,
        private songDetailsService: SongDetailsService,
        private campfireService: CampfireService) {
    }

    ngOnInit(): void {
        this.loadSongs();
        this.songIndexService.songListUpdate$.subscribe(() => {
            this.loadSongs();
        });
    }

    loadSongs(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.songIndexService.getSongIndex().then(res => {
                    this.songIndex = res;
                    if (this.songIndex) {
                        this.sortSongList();
                        this.searchSongs(this.search);
                        this.loadDisplayData(null);
                    }
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

    remove(song: ISongBase) {
        this.songDetailsService.removeSong(song);
    }

    addToQueue(song: ISongBase) {
        this.campfireService.addToQueue(song);
    }

    loadDisplayData(event) {
        setTimeout(() => {
            const displayedSongs = this.displaySongs.length;
            for (let i = displayedSongs; i < this.filteredSongs.length && i - displayedSongs < this.numberOfItems; ++i) {
                this.displaySongs.push(this.filteredSongs[i]);
            }
            if (event) {
                event.target.complete();
            }

            if (this.displaySongs.length === this.filteredSongs.length && event) {
                event.target.disabled = true;
            }
        }, 500);
    }

    searchSongs(value: string) {
        this.search = value;
        if (value && value.trim().length > 0) {
            this.filteredSongs = [...this.songIndex.filter(elem =>
                elem.title.toLowerCase().includes(value.trim().toLowerCase())
                || elem.author.toLowerCase().includes(value.trim().toLowerCase()))];
        } else {
            this.filteredSongs = [...this.songIndex];
        }
        this.displaySongs = [];
        this.loadDisplayData(null);
    }
}
