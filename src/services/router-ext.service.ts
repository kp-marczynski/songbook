import {Injectable} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class RouterExtService {
    private currentUrl: string = undefined;
    private history: string[] = [];

    constructor(private router: Router) {
        this.currentUrl = this.router.url;
        router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.history.push(this.currentUrl);
                this.currentUrl = event.url;
            }
        });
    }

    public getPreviousUrl() {
        const res = this.history.pop();
        return res === this.router.url ? null : res;
    }
}
