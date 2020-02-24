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
import {CampfireSharePopoverService} from '../../campfire/campfire-share-popover.service';

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
    isScrollPaused = false;
    wheeling;

    constructor(
        private songService: SongService,
        private campfireService: CampfireService,
        private chordProService: ChordProService,
        private route: ActivatedRoute,
        private router: Router,
        private routerExtService: RouterExtService,
        private toastHelperService: ToastHelperService,
        private campfireSharePopoverService: CampfireSharePopoverService) {
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
                this.campfireService.getCurrentSongFromFirebase(uuid).subscribe(res => {
                    this.displaySong(res);
                });
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
            if(this.content){
                this.content.scrollToTop();
            }
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

    editSong() {
        this.router.navigate(['/tabs/song', this.song.uuid, 'edit']);
    }

    previousState = () => this.router.navigate([this.previousUrl]);

    playSong() {
        this.setCurrentSong();
        this.startScroll();
    }

    setCurrentSong = () => this.campfireService.setCurrentSong(this.song);

    private registerScrollListeners() {
        window.addEventListener('wheel', event => {
            if (!this.wheeling && this.isScrolling) {
                this.isScrollPaused = true;
            }

            clearTimeout(this.wheeling);
            this.wheeling = setTimeout(() => {
                if (this.isScrollPaused) {
                    this.isScrollPaused = false;
                    this.performScroll();
                }
                this.wheeling = undefined;
            }, 250);
        });

        window.addEventListener('touchstart', event => {
            if (this.isScrolling) {
                this.isScrollPaused = true;
            }
        });

        window.addEventListener('touchend', event => {
            if (this.isScrollPaused) {
                this.isScrollPaused = false;
                this.performScroll();
            }
        });
    }

    triggerAutoScroll() {
        this.isScrolling = !this.isScrolling;
        this.performScroll();
    }

    performScroll() {
        this.content.getScrollElement().then((element: HTMLElement) => {
            this.performScrollRecursive(this.calculateScrollableHeight(element), element.scrollTop);
        });
    }

    startScroll() {
        this.isScrolling = true;
        this.performScroll();
    }

    pauseScrolling() {
        this.isScrolling = false;
    }

    private calculateScrollableHeight(element: HTMLElement): number {
        return document.getElementById('song-details-list').scrollHeight
            + element.getBoundingClientRect().top + element.getBoundingClientRect().bottom
            - 2 * element.offsetHeight;
    }

    private performScrollRecursive(scrollableHeight: number, scrollOffset: number) {
        if (this.isScrolling && !this.isScrollPaused) {
            scrollOffset += (this.scrollSpeed + 5) / 75;
            if (scrollOffset >= scrollableHeight) {
                this.isScrolling = false;
            }
            this.content.scrollToPoint(0, scrollOffset).then(() => {
                setTimeout(() => this.performScrollRecursive(scrollableHeight, scrollOffset));
            });
        }
    }

    presentPopover = (ev: any) => this.campfireSharePopoverService.presentPopover(ev);
}
