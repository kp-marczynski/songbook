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
        // console.log(this.currentUrl);
        router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                // console.log(this.currentUrl);
                this.history.push(this.currentUrl);
                this.currentUrl = event.url;
            }
        });
    }

    public getPreviousUrl() {
        const res = this.history.pop();
        // console.log(res);
        return res === this.router.url ? null : res;
    }
}
