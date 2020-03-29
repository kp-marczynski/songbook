import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CampfireRoutingModule} from './campfire-routing.module';
import {IonicModule} from '@ionic/angular';
import {CampfireQueueComponent} from './campfire-queue/campfire-queue.component';
import {CampfireShareComponent} from "./campfire-share/campfire-share.component";
import {QRCodeModule} from "angular2-qrcode";
import {SongModule} from "../song/song.module";
import {CampfireSharePopoverService} from './campfire-share-popover.service';


@NgModule({
    declarations: [CampfireQueueComponent, CampfireShareComponent],
    imports: [
        CommonModule,
        CampfireRoutingModule,
        IonicModule,
        QRCodeModule,
        SongModule
    ],
    entryComponents: [CampfireShareComponent],
    providers: [CampfireSharePopoverService]
})
export class CampfireModule {
}
