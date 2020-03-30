import {Injectable} from '@angular/core';
import {PopoverController} from "@ionic/angular";
import {CurrentSongShareComponent} from "./current-song-share.component";

@Injectable({
    providedIn: 'root'
})
export class CurrentSongSharePopoverService {

    constructor(private popoverController: PopoverController) {
    }

    async presentPopover(ev: any) {
        const popover = await this.popoverController.create({
            component: CurrentSongShareComponent,
            event: ev,
            translucent: true,
            cssClass: 'popover',
            componentProps: {popoverController: this.popoverController}
        });
        return await popover.present();
    }
}
