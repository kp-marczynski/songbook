import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TunerComponent} from "./tuner.component";
import {TunerRoutingModule} from "./tuner-routing.module";


@NgModule({
    declarations: [TunerComponent],
    imports: [
        CommonModule,
        TunerRoutingModule
    ]
})
export class TunerModule {
}
