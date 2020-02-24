import {Component, OnInit} from '@angular/core';
import {NavParams, PopoverController} from '@ionic/angular';
import {CampfireService} from '../../../services/campfire.service';
import {AuthService} from '../../../services/auth.service';
import {StorageKeys} from '../../../model/storage-keys.model';

@Component({
    selector: 'app-campfire-share',
    templateUrl: './campfire-share.component.html',
    styleUrls: ['./campfire-share.component.scss'],
})
export class CampfireShareComponent implements OnInit {

    shareUrl = '';
    pop: PopoverController;

    constructor(navParams: NavParams, campfireService: CampfireService, public authService: AuthService) {
        const currentUrl = window.location.href;
        if (currentUrl.includes(StorageKeys.CAMPFIRE)) {
            this.shareUrl = currentUrl;
        } else {
            if (authService.user) {
                campfireService.getCurrentSongMeta().then(meta => {
                    this.shareUrl = 'kpmarczynski-songbook.firebaseapp.com/tabs/campfire/' + meta.firebaseUuid + '/view';
                });
            }
        }
        this.pop = navParams.get('popoverController');
    }

    close = () => this.pop.dismiss();

    ngOnInit() {
    }

}
