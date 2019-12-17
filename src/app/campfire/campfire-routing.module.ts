import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CampfireQueueComponent} from './campfire-queue/campfire-queue.component';


const routes: Routes = [
    {
        path: '',
        component: CampfireQueueComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CampfireRoutingModule {
}
