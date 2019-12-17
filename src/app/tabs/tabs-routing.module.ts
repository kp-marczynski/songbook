import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TabsComponent} from './tabs.component';

const routes: Routes = [
    {
        path: 'tabs',
        component: TabsComponent,
        children: [
            {
                path: 'campfire',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('../campfire/campfire.module').then(m => m.CampfireModule)
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
                path: 'settings',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('../settings/settings.module').then(m => m.SettingsModule)
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
export class TabsRoutingModule {
}
