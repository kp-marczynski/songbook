import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TunerComponent} from "./tuner.component";


const routes: Routes = [
    {
        path: '',
        component: TunerComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TunerRoutingModule {
}
