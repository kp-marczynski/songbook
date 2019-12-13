import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QueueRoutingModule } from './queue-routing.module';
import {QueueListComponent} from './queue-list/queue-list.component';
import {IonicModule} from '@ionic/angular';


@NgModule({
  declarations: [QueueListComponent],
  imports: [
    CommonModule,
    QueueRoutingModule,
    IonicModule
  ]
})
export class QueueModule { }
