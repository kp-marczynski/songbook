import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TunerComponent} from "./tuner.component";
import {TunerRoutingModule} from "./tuner-routing.module";
import {MeterComponent} from "./meter/meter.component";
import {NotesComponent} from "./notes/notes.component";


@NgModule({
    declarations: [
        TunerComponent,
        MeterComponent,
        NotesComponent
    ],
    imports: [
        CommonModule,
        TunerRoutingModule
    ]
})
export class TunerModule {
}
