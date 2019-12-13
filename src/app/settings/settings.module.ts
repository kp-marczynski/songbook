import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SettingsRoutingModule} from './settings-routing.module';
import {SettingsComponent} from './settings.component';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';


@NgModule({
    declarations: [SettingsComponent],
    imports: [
        CommonModule,
        SettingsRoutingModule,
        IonicModule,
        FormsModule
    ]
})
export class SettingsModule {
}
