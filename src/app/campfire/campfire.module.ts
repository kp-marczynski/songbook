import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CampfireRoutingModule} from './campfire-routing.module';
import {IonicModule} from '@ionic/angular';
import {CampfireQueueComponent} from './campfire-queue/campfire-queue.component';
import {SongModule} from "../song/song.module";
import {CampfireGuestComponent} from "./campfire-guest/campfire-guest.component";
import {SharedModule} from "../shared/shared.module";


@NgModule({
    declarations: [
        CampfireQueueComponent,
        CampfireGuestComponent
    ],
    imports: [
        CommonModule,
        CampfireRoutingModule,
        IonicModule,
        SongModule,
        SharedModule
    ]
})
export class CampfireModule {
}
