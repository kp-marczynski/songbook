import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TabsService} from '../../services/tabs.service';
import {RouterExtService} from '../../services/router-ext.service';

@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnInit {

    showTabs = true;

    constructor(private router: Router, private tabsService: TabsService, private routerExtService: RouterExtService) {
        this.tabsService.visibility$.subscribe(res => this.showTabs = res);
    }

    ngOnInit() {
    }

    isSelected(tab: string) {
        return this.router.url.includes(tab);
    }

    changeTab(tab: string) {
        this.router.navigate(['/tabs', tab]);
    }
}
