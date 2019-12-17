import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CampfireRoutingModule} from './campfire-routing.module';
import {IonicModule} from '@ionic/angular';
import {CampfireQueueComponent} from './campfire-queue/campfire-queue.component';


@NgModule({
    declarations: [CampfireQueueComponent],
    imports: [
        CommonModule,
        CampfireRoutingModule,
        IonicModule
    ]
})
export class CampfireModule {
}
