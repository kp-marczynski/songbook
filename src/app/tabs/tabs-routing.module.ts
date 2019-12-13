import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TabsComponent} from './tabs.component';


const routes: Routes = [
  {
    path: 'tabs',
    component: TabsComponent,
    children: [
      {
        path: 'queue',
        children: [
          {
            path: '',
            loadChildren: () =>
                import('../queue/queue.module').then(m => m.QueueModule)
          }
        ]
      },
      {
        path: 'song',
        children: [
          {
            path: '',
            loadChildren: () =>
                import('../song/song.module').then(m => m.SongModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/song',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/song',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsRoutingModule { }
