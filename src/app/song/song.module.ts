import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SongRoutingModule } from './song-routing.module';
import {SongListComponent} from './song-list/song-list.component';
import {SongDetailsComponent} from './song-details/song-details.component';
import {SongEditComponent} from './song-edit/song-edit.component';
import {IonicModule} from '@ionic/angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [SongListComponent, SongDetailsComponent, SongEditComponent],
  imports: [
    CommonModule,
    SongRoutingModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SongModule { }
