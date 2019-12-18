import {Component, OnInit} from '@angular/core';
import {CampfireService} from '../../../services/campfire.service';
import {ISongBase} from '../../../model/song-base.model';

@Component({
    selector: 'app-campfire-queue',
    templateUrl: './campfire-queue.component.html',
    styleUrls: ['./campfire-queue.component.scss'],
})
export class CampfireQueueComponent implements OnInit {

    songQueue: ISongBase[];

    constructor(private campfireService: CampfireService) {
    }

    ngOnInit() {
        this.loadSongs();
        this.campfireService.queueUpdate$.subscribe(() => {
            this.loadSongs();
        });
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

    remove(song: ISongBase) {
        this.campfireService.removeFromQueue(song);
    }
}
