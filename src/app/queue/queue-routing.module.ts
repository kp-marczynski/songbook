import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {QueueListComponent} from './queue-list/queue-list.component';


const routes: Routes = [
  {
    path: '',
    component: QueueListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QueueRoutingModule { }
