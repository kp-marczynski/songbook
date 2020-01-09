import {Component, OnInit} from '@angular/core';
import {CampfireService} from '../../../services/campfire.service';
import {SongService} from '../../../services/song.service';
import {ISong} from '../../../model/song.model';

@Component({
    selector: 'app-song-list',
    templateUrl: './song-list.component.html',
    styleUrls: ['./song-list.component.scss'],
})
export class SongListComponent implements OnInit {

    songIndex: ISong[] = [];
    // displaySongs: ISong[] = [];
    filteredSongs: ISong[] = [];

    numberOfItems = 20;
    search = '';

    constructor(
        private songService: SongService,
        private campfireService: CampfireService) {
    }

    ngOnInit(): void {
        this.loadSongs();
        this.songService.songListUpdate$.subscribe(() => {
            this.loadSongs();
        });
    }

    loadSongs(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.songService.getSongIndex().then(res => {
                    this.songIndex = res;
                    if (this.songIndex) {
                        this.sortSongList();
                        this.searchSongs(this.search);
                        // this.loadDisplayData(null);
                    }
                    resolve();
                }
            );
        });
    }

    sortSongList() {
        if (this.songIndex) {
            this.songIndex.sort((a, b) =>
                'artist' in a && 'artist' in b && 'title' in a && 'title' in b
                    ? (this.compareStrings(a.artist, b.artist) === 0
                        ? this.compareStrings(a.title, b.title)
                        : this.compareStrings(a.artist, b.artist)
                    ) : 0
            );
        }
    }

    compareStrings(a: string, b: string): number {
        return a.localeCompare(b, 'en', {sensitivity: 'base'});
    }

    doRefresh(event) {
        this.loadSongs().then(() => event.target.complete());
    }

    remove(song: ISong) {
        this.songService.removeSong(song);
    }

    addToQueue(song: ISong) {
        this.campfireService.addToQueue(song);
    }

    // loadDisplayData(event) {
    //     setTimeout(() => {
    //         const displayedSongs = this.displaySongs.length;
    //         for (let i = displayedSongs; i < this.filteredSongs.length && i - displayedSongs < this.numberOfItems; ++i) {
    //             this.displaySongs.push(this.filteredSongs[i]);
    //         }
    //         if (event) {
    //             event.target.complete();
    //         }
    //
    //         if (this.displaySongs.length === this.filteredSongs.length && event) {
    //             event.target.disabled = true;
    //         }
    //     }, 500);
    // }

    searchSongs(value: string) {
        this.search = value;
        if (value && value.trim().length > 0) {
            this.filteredSongs = [...this.songIndex.filter(elem =>
                elem.title.toLowerCase().includes(value.trim().toLowerCase())
                || elem.artist.toLowerCase().includes(value.trim().toLowerCase()))];
        } else {
            this.filteredSongs = [...this.songIndex];
        }
        // this.displaySongs = [];
        // this.loadDisplayData(null);
    }
}
