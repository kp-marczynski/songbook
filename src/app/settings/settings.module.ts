import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SettingsRoutingModule} from './settings-routing.module';
import {SettingsComponent} from './settings.component';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {LoginComponent} from './login/login.component';
import {AppInfoComponent} from './app-info/app-info.component';


@NgModule({
    declarations: [SettingsComponent, LoginComponent, AppInfoComponent],
    imports: [
        CommonModule,
        SettingsRoutingModule,
        IonicModule,
        FormsModule
    ]
})
export class SettingsModule {
}
