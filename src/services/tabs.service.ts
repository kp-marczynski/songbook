import {Injectable} from '@angular/core';
import {filter} from 'rxjs/operators';
import {NavigationEnd, Router} from '@angular/router';
import {Platform} from '@ionic/angular';
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TabsService {

    private visibilitySubject = new Subject<boolean>();

    visibility$ = this.visibilitySubject.asObservable();

    hideTabBarPages = ['view', 'edit', 'new', 'guest'];

    constructor(private router: Router, private platform: Platform) {
        this.platform.ready().then(() => {
            this.navEvents();
        });
    }

    private navEvents() {
        this.router.events.pipe(filter(e => e instanceof NavigationEnd))
            .subscribe((e: any) => this.showHideTabs(e));
    }

    private showHideTabs(e: any) {
        const url: string = e.url;
        this.changeVisibility(this.hideTabBarPages.filter(elem => url.includes(elem)).length == 0);
    }

    changeVisibility = (visibility: boolean) => this.visibilitySubject.next(visibility);
}
