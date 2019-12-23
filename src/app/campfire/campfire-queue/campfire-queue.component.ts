import {Component, OnInit} from '@angular/core';
import {CampfireService} from '../../../services/campfire.service';
import {ISong} from '../../../model/song.model';
import {PopoverController} from "@ionic/angular";
import {CampfireShareComponent} from "../campfire-share/campfire-share.component";

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
        private popoverController: PopoverController) {
    }

    ngOnInit() {
        this.loadSongs();
        this.campfireService.queueUpdate$.subscribe(() => {
            this.loadSongs();
        });
        this.campfireService.getCurrentSong().then(res => this.currentSong = res);
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

    async presentPopover(ev: any) {
        const popover = await this.popoverController.create({
            component: CampfireShareComponent,
            event: ev,
            translucent: true,
            cssClass: 'popover',
            componentProps: {currentSongUuid: this.currentSong.uuid, popoverController: this.popoverController}
        });
        return await popover.present();
    }
}
