import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SongListComponent} from './song-list/song-list.component';
import {SongDetailsComponent} from './song-details/song-details.component';
import {SongEditComponent} from './song-edit/song-edit.component';


const routes: Routes = [
    {
        path: '',
        component: SongListComponent
    },
    {
        path: ':uuid/view',
        component: SongDetailsComponent
    },
    {
        path: ':uuid/edit',
        component: SongEditComponent
    },
    {
        path: 'new',
        component: SongEditComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SongRoutingModule {
}
