import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CampfireQueueComponent} from './campfire-queue/campfire-queue.component';
import {CampfireGuestComponent} from "./campfire-guest/campfire-guest.component";


const routes: Routes = [
    {
        path: '',
        component: CampfireQueueComponent
    },
    {
        path: 'guest/:uuid',
        component: CampfireGuestComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CampfireRoutingModule {
}
