import {Component, OnInit} from '@angular/core';
import {CampfireService} from '../../../services/campfire.service';
import {ISong} from '../../../model/song.model';
import {SongService} from '../../../services/song.service';
import {CampfireSharePopoverService} from '../campfire-share-popover.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-campfire-queue',
    templateUrl: './campfire-queue.component.html',
    styleUrls: ['./campfire-queue.component.scss'],
})
export class CampfireQueueComponent implements OnInit {

    songQueue: ISong[];
    currentSong: ISong;

    constructor(
        private campfireService: CampfireService,
        private campfireSharePopoverService: CampfireSharePopoverService,
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
        return new Promise<any>((resolve, reject) => {
            this.campfireService.getQueue().then(res => {
                    this.songQueue = res;
                    resolve();
                }
            );
        });
    }

    doRefresh = (event) => this.loadSongs().then(() => event.target.complete());

    removeSongFromQueue = (song: ISong) => this.campfireService.removeFromQueue(song);

    presentPopover = (ev: any) => this.campfireSharePopoverService.presentPopover(ev);

    navigateToSongDetails(song: ISong) {
        this.router.navigate(['/tabs/song', song.uuid, 'view']);
    }
}
