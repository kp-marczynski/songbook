import {Component, OnInit} from '@angular/core';
import {NavParams, PopoverController} from '@ionic/angular';
import {CampfireService} from '../../../services/campfire.service';
import {AuthService} from '../../../services/auth.service';

@Component({
    selector: 'app-campfire-share',
    templateUrl: './campfire-share.component.html',
    styleUrls: ['./campfire-share.component.scss'],
})
export class CampfireShareComponent implements OnInit {

    currentSongUuid = '';
    pop: PopoverController;

    constructor(navParams: NavParams, campfireService: CampfireService, public authService: AuthService) {
        campfireService.getCurrentSongMeta().then(meta => this.currentSongUuid = meta.firebaseUuid);
        this.pop = navParams.get('popoverController');
    }

    close = () => this.pop.dismiss();

    ngOnInit() {
    }

}
