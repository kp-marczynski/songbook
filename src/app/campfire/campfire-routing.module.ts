import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CampfireQueueComponent} from './campfire-queue/campfire-queue.component';
import {SongDetailsComponent} from "../song/song-details/song-details.component";


const routes: Routes = [
    {
        path: '',
        component: CampfireQueueComponent
    },
    {
        path: ':uuid/view',
        component: SongDetailsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CampfireRoutingModule {
}
