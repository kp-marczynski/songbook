import {AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import {CampfireService} from '../../../services/campfire.service';
import {ISong} from '../../../model/song.model';

@Component({
    selector: 'app-campfire-queue',
    templateUrl: './campfire-queue.component.html',
    styleUrls: ['./campfire-queue.component.scss'],
})
export class CampfireQueueComponent implements OnInit {

    songQueue: ISong[];
    currentSong: ISong;

    constructor(private campfireService: CampfireService) {
    }

    ngOnInit() {
        this.loadSongs();
        this.campfireService.queueUpdate$.subscribe(() => {
            this.loadSongs();
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

    doRefresh(event) {
        this.loadSongs().then(() => event.target.complete());
    }

    remove(song: ISong) {
        this.campfireService.removeFromQueue(song);
    }
}
