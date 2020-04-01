import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RouterExtService} from '../../../services/router-ext.service';
import {ISong} from '../../../model/song.model';
import {SongService} from '../../../services/song.service';
import {CampfireService} from '../../../services/campfire.service';
import {ToastHelperService} from '../../../services/toast-helper.service';
import {SongScrollableDetailsComponent} from "../../shared/song-scrollable-details/song-scrollable-details.component";
import {CurrentSongSharePopoverService} from "../../shared/current-song-share/current-song-share-popover.service";

@Component({
    selector: 'app-song-details',
    templateUrl: './song-details.component.html',
    styleUrls: ['./song-details.component.scss'],
})
export class SongDetailsComponent implements OnInit, AfterViewInit {
    @ViewChild(SongScrollableDetailsComponent, {static: false}) songScrollableDetailsComponent: SongScrollableDetailsComponent;
    previousUrl = '';
    song: ISong = null;

    scrollSpeed = 100;
    speedStep = 20;
    scrollSpeedDecimals = 2;
    isScrolling = false;

    constructor(
        private songService: SongService,
        private campfireService: CampfireService,
        private route: ActivatedRoute,
        private router: Router,
        private routerExtService: RouterExtService,
        private toastHelperService: ToastHelperService,
        private currentSongSharePopoverService: CurrentSongSharePopoverService
    ) {
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            const uuid = params.get('uuid');
            if (!params || !uuid) {
                this.previousState();
            }
            this.songService.getSong(uuid).then(res => this.song = res);
        });
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

    startScroll() {
        this.songScrollableDetailsComponent.startScroll();
    }

    pauseScrolling() {
        this.songScrollableDetailsComponent.pauseScrolling();
    }

    changeScrollSpeed(value: number) {
        this.scrollSpeed = this.songScrollableDetailsComponent.changeScrollSpeed(value);
    }

    getSpeedWithDecimals(speed: number) {
        return speed / Math.pow(10, this.scrollSpeedDecimals);
    }

    scrollStateChanged(scroll: boolean) {
        this.isScrolling = scroll;
    }

    presentPopover = (ev: any) => {
        this.setCurrentSong();
        this.currentSongSharePopoverService.presentPopover(ev);
    }
}
