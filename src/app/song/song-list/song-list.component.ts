import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CampfireService} from '../../../services/campfire.service';
import {SongService} from '../../../services/song.service';
import {ISong} from '../../../model/song.model';
import {Location} from '@angular/common';
import {Subscription} from 'rxjs';
import {ActivatedRoute, NavigationStart, Router} from '@angular/router';
import {IonSearchbar} from '@ionic/angular';

@Component({
    selector: 'app-song-list',
    templateUrl: './song-list.component.html',
    styleUrls: ['./song-list.component.scss'],
})
export class SongListComponent implements OnInit, OnDestroy {

    songIndex: ISong[] = [];
    filteredSongs: ISong[] = [];

    numberOfItems = 20;
    @ViewChild('searchbar', {static: false}) searchbar: IonSearchbar;

    locationSubscription: Subscription;

    constructor(
        private songService: SongService,
        private campfireService: CampfireService,
        private location: Location,
        private router: Router,
        private activatedRoute: ActivatedRoute) {
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                this.hideKeyboard();
            }
        });
    }

    ngOnInit(): void {
        this.loadSongs();
        this.songService.songListUpdate$.subscribe(() => this.loadSongs());
        this.locationSubscription = this.location.subscribe((ev) => this.loadSongsOnListUrl(ev.url)) as Subscription;
        this.activatedRoute.url.subscribe(url => this.loadSongs());
    }

    ngOnDestroy = (): void => this.locationSubscription.unsubscribe();

    loadSongsOnListUrl(url: string) {
        if (url === '/tabs/song') {
            this.loadSongs();
        }
    }

    loadSongs(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.songService.getSongIndex().then(res => {
                    if (!this.songListsEquals(res, this.songIndex)) {
                        this.songIndex = res;
                        this.sortSongList();
                    }
                    if (this.songIndex) {
                        this.searchSongs();
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

    compareStrings = (a: string, b: string): number => a.localeCompare(b, 'en', {sensitivity: 'base'});

    doRefresh(event) {
        this.filteredSongs = [];
        this.loadSongs().then(() => event.target.complete());
    }

    remove = (song: ISong) => this.songService.removeSong(song);

    addToQueue = (song: ISong) => this.campfireService.addToQueue(song);

    searchSongs() {
        const value: string = this.searchbar.value;
        let temp: ISong[];
        if (value && value.trim().length > 0) {
            temp = [...this.songIndex.filter(elem =>
                this.checkIncludesLowerCase(elem.title, value)
                || this.checkIncludesLowerCase(elem.artist, value))];
        } else {
            temp = [...this.songIndex];
        }
        if (!this.songListsEquals(temp, this.filteredSongs)) {
            this.filteredSongs = temp;
        }
    }

    checkIncludesLowerCase = (stringToCheck: string, value: string): boolean =>
        stringToCheck.toLowerCase().includes(value.trim().toLowerCase());

    songListsEquals(list1: ISong[], list2: ISong[]): boolean {
        return !!list1 && !!list2 && list1.length > 0 && list1.length === list2.length
            && list1.map(list1Elem => !!list2.find(list2Elem => list1Elem.uuid === list2Elem.uuid)).reduce((a, b) => a && b)
            && list2.map(list2Elem => !!list1.find(list1Elem => list1Elem.uuid === list2Elem.uuid)).reduce((a, b) => a && b);
    }

    trackByFn = (index, item) => index;

    hideKeyboard = () => (document.activeElement as HTMLElement).blur();

    navigateWithTimeout(url: string[]) {
        this.hideKeyboard();
        setTimeout(() => this.router.navigate(url), 500);
    }
}
