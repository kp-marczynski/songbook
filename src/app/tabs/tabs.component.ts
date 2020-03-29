import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {TabsService} from '../../services/tabs.service';
import {RouterExtService} from '../../services/router-ext.service';

@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent {

    showTabs = true;

    constructor(private router: Router, private tabsService: TabsService, private routerExtService: RouterExtService) {
        this.tabsService.visibility$.subscribe(res => this.showTabs = res);
    }

    isSelected = (tab: string) => this.router.url.includes(tab);

    changeTab = (tab: string) => this.router.navigate(['/tabs', tab]);
}
