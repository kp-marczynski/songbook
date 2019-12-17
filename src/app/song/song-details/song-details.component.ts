import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastController} from '@ionic/angular';
import {RouterExtService} from '../../../services/router-ext.service';
import {Song} from '../../../model/song.model';
import {SongDetailsService} from '../../../services/song-details.service';
import {CampfireService} from '../../../services/campfire.service';

@Component({
    selector: 'app-song-details',
    templateUrl: './song-details.component.html',
    styleUrls: ['./song-details.component.scss'],
})
export class SongDetailsComponent implements OnInit, AfterViewInit {

    previousUrl = '';
    song: Song = null;
    chordsVisible = true;
    simpleChords = true;

    constructor(
        private songDetailsService: SongDetailsService,
        private campfireService: CampfireService,
        private route: ActivatedRoute,
        private toastController: ToastController,
        private router: Router,
        private routerExtService: RouterExtService) {
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            if (!params || !params.get('uuid')) {
                this.previousState();
            }
            this.songDetailsService.getSong(params.get('uuid')).then(res => {
                this.song = res;
                if (!this.song) {
                    this.previousState();
                }
            });
        });
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            const prevUrl = this.routerExtService.getPreviousUrl();
            this.previousUrl = prevUrl ? prevUrl : '/tabs/song';
        });
    }

    async presentToast() {
        this.campfireService.addToQueue(this.song.songBase);
        const toast = await this.toastController.create({
            message: 'Song added to queue',
            duration: 2000
        });
        toast.present();
    }

    remove() {
        this.songDetailsService.removeSong(this.song.songBase);
        this.router.navigate(['/tabs/song']);
    }

    previousState() {
        this.router.navigate([this.previousUrl]);
    }
}
