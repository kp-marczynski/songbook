import {Component, OnInit} from '@angular/core';
import {CampfireService} from '../../../services/campfire.service';
import {ISong} from '../../../model/song.model';
import {SongService} from '../../../services/song.service';
import {Router} from '@angular/router';
import {CurrentSongSharePopoverService} from "../../shared/current-song-share/current-song-share-popover.service";

@Component({
    selector: 'app-campfire-queue',
    templateUrl: './campfire-queue.component.html',
    styleUrls: ['./campfire-queue.component.scss'],
})
export class CampfireQueueComponent implements OnInit {

    songQueue: ISong[];
    currentSong: ISong;
    loading: boolean;

    constructor(
        private campfireService: CampfireService,
        private currentSongSharePopoverService: CurrentSongSharePopoverService,
        private songService: SongService,
        private router: Router) {
    }

    ngOnInit() {
        this.loadSongs();
        this.campfireService.queueUpdate$.subscribe(() => this.loadSongs());
        this.campfireService.getCurrentSongMeta().then(meta => {
            if (meta) {
                this.songService.getSong(meta.songUUid).then(res => this.currentSong = res);
            }
        });
        this.campfireService.currentSong$.subscribe((res: ISong) => this.currentSong = res);
    }

    loadSongs(): Promise<any> {
        this.loading = true;
        return new Promise<any>((resolve, reject) => {
            this.campfireService.getQueue().then(res => {
                    this.songQueue = res;
                    this.loading = false;
                    resolve();
                }
            );
        });
    }

    doRefresh = (event) => this.loadSongs().then(() => event.target.complete());

    removeSongFromQueue = (song: ISong) => this.campfireService.removeFromQueue(song);

    presentPopover = (ev: any) => this.currentSongSharePopoverService.presentPopover(ev);

    navigateToSongDetails(song: ISong) {
        this.router.navigate(['/tabs/song', song.uuid, 'view']);
    }
}
