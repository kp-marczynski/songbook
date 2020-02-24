import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {IonContent} from '@ionic/angular';
import {RouterExtService} from '../../../services/router-ext.service';
import {ISong} from '../../../model/song.model';
import {SongService} from '../../../services/song.service';
import {CampfireService} from '../../../services/campfire.service';
import {IChordProGroup} from '../../../model/chord-pro-group.model';
import {ChordProService} from '../../../services/chord-pro.service';
import {StorageKeys} from '../../../model/storage-keys.model';
import {ToastHelperService} from '../../../services/toast-helper.service';

@Component({
    selector: 'app-song-details',
    templateUrl: './song-details.component.html',
    styleUrls: ['./song-details.component.scss'],
})
export class SongDetailsComponent implements OnInit, AfterViewInit {
    @ViewChild(IonContent, {static: false}) content: IonContent;
    previousUrl = '';
    song: ISong = null;
    formattedContent: IChordProGroup[];
    chordsVisible = true;
    simpleChords = true;
    guestMode = false;

    scrollSpeed = 0;
    isScrolling = false;
    scrollPaused = false;
    wheeling;

    constructor(
        private songService: SongService,
        private campfireService: CampfireService,
        private chordProService: ChordProService,
        private route: ActivatedRoute,
        private router: Router,
        private routerExtService: RouterExtService,
        private toastHelperService: ToastHelperService) {
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            if (!params || !params.get('uuid')) {
                this.previousState();
            }
            const uuid = params.get('uuid');
            if (this.router.url.includes(StorageKeys.CAMPFIRE)) {
                this.guestMode = true;
                document.body.classList.toggle('dark', true);
                this.campfireService.getCurrentSongFromFirebase(uuid).subscribe(res => this.displaySong(res));
            } else {
                this.songService.getSong(params.get('uuid')).then(res => this.displaySong(res));
            }
        });
        this.registerScrollListeners();
    }

    private displaySong(song: ISong) {
        this.song = song;
        if (!this.song) {
            this.previousState();
        } else {
            this.formattedContent = this.chordProService.parseChordPro(this.song.content);
        }
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            const prevUrl = this.routerExtService.getPreviousUrl();
            this.previousUrl = prevUrl ? prevUrl : '/tabs/song';
        });
    }

    addSongToQueue() {
        this.campfireService.addToQueue(this.song);
        this.toastHelperService.presentToast('Song added to queue');
    }

    removeSong() {
        this.songService.removeSong(this.song);
        this.router.navigate(['/tabs/song']);
    }

    previousState = () => this.router.navigate([this.previousUrl]);

    setCurrentSong = () => this.campfireService.setCurrentSong(this.song);

    private registerScrollListeners() {
        window.addEventListener('wheel', event => {
            if (!this.wheeling) {
                if (this.isScrolling) {
                    this.triggerScrollPause();
                }
            }

            clearTimeout(this.wheeling);
            this.wheeling = setTimeout(() => {
                if (this.scrollPaused) {
                    this.triggerScrollPause();
                }
                this.wheeling = undefined;
            }, 250);
        });

        window.addEventListener('touchstart', event => {
            if (this.isScrolling) {
                this.triggerScrollPause();
            }
        });

        window.addEventListener('touchend', event => {
            if (this.scrollPaused) {
                this.triggerScrollPause();
            }
        });
    }

    private triggerScrollPause() {
        this.scrollPaused = !this.scrollPaused;
        this.triggerAutoScroll();
    }

    triggerAutoScroll() {
        this.content.getScrollElement().then((element: HTMLElement) => {
            this.isScrolling = !this.isScrolling;
            this.performScroll(this.calculateScrollableHeight(element), element.scrollTop);
        });
    }

    private calculateScrollableHeight(element: HTMLElement): number {
        return document.getElementById('song-details-list').scrollHeight
            + element.getBoundingClientRect().top + element.getBoundingClientRect().bottom
            - 2 * element.offsetHeight;
    }

    private performScroll(scrollableHeight: number, scrollOffset: number) {
        if (this.isScrolling) {
            scrollOffset += (this.scrollSpeed + 5) / 50;
            if (scrollOffset >= scrollableHeight) {
                this.isScrolling = false;
            }
            this.content.scrollToPoint(0, scrollOffset).then(() => {
                setTimeout(() => this.performScroll(scrollableHeight, scrollOffset));
            });
        }
    }
}
