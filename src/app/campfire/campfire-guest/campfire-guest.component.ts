import {Component, OnInit, ViewChild} from '@angular/core';
import {SongScrollableDetailsComponent} from "../../shared/song-scrollable-details/song-scrollable-details.component";
import {ISong} from "../../../model/song.model";
import {CampfireService} from "../../../services/campfire.service";
import {ActivatedRoute} from "@angular/router";
import {CurrentSongSharePopoverService} from "../../shared/current-song-share/current-song-share-popover.service";

@Component({
    selector: 'app-campfire-guest',
    templateUrl: './campfire-guest.component.html',
    styleUrls: ['./campfire-guest.component.scss'],
})
export class CampfireGuestComponent implements OnInit {
    @ViewChild(SongScrollableDetailsComponent, {static: false}) songScrollableDetailsComponent: SongScrollableDetailsComponent;
    song: ISong = null;

    scrollSpeed = 100;
    speedStep = 20;
    scrollSpeedDecimals = 2;
    isScrolling = false;

    constructor(
        private campfireService: CampfireService,
        private route: ActivatedRoute,
        private currentSongSharePopoverService: CurrentSongSharePopoverService
    ) {
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            const uuid = params.get('uuid');
            document.body.classList.toggle('dark', true);
            this.campfireService.getCurrentSongFromFirebase(uuid).subscribe(res => {
                this.song = res;
                // if (this.songScrollableDetailsComponent) {
                    setTimeout(() => this.songScrollableDetailsComponent.displaySong());
                // }
            });
        });
    }

    playSong() {
        this.startScroll();
    }

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

    presentPopover = (ev: any) => this.currentSongSharePopoverService.presentPopover(ev);
}
