import {Component} from '@angular/core';
import {NavParams, PopoverController} from "@ionic/angular";
import {CampfireService} from "../../../services/campfire.service";
import {AuthService} from "../../../services/auth.service";
import {StorageKeys} from "../../../model/storage-keys.model";

@Component({
    selector: 'app-share-current-song',
    templateUrl: './current-song-share.component.html',
    styleUrls: ['./current-song-share.component.scss'],
})
export class CurrentSongShareComponent {
    shareUrl = '';
    pop: PopoverController;

    constructor(navParams: NavParams, campfireService: CampfireService, public authService: AuthService) {
        const currentUrl = window.location.href;
        if (currentUrl.includes(StorageKeys.CAMPFIRE)) {
            this.shareUrl = currentUrl;
        } else {
            if (authService.user) {
                campfireService.getCurrentSongMeta().then(meta => {
                    this.shareUrl = 'kpmarczynski-songbook.firebaseapp.com/tabs/campfire/guest/' + meta.firebaseUuid;
                });
            }
        }
        this.pop = navParams.get('popoverController');
    }

    close = () => this.pop.dismiss();
}
