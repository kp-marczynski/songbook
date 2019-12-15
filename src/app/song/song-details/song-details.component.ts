import {AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import {StorageHelperService} from '../../../services/storage-helper.service';
import {ActivatedRoute, Router} from '@angular/router';
import {parseChordPro, Song} from '../../../model/song.model';
import {ToastController} from '@ionic/angular';
import {ChordProGroup} from '../../../model/chord-pro-group.model';
import {RouterExtService} from "../../../services/router-ext.service";

@Component({
    selector: 'app-song-details',
    templateUrl: './song-details.component.html',
    styleUrls: ['./song-details.component.scss'],
})
export class SongDetailsComponent implements OnInit, AfterViewInit {

    previousUrl = '';
    song: Song;
    formattedContent: ChordProGroup[];
    chordsVisible = true;
    simpleChords = true;

    constructor(
        private storageHelperService: StorageHelperService,
        private route: ActivatedRoute,
        private toastController: ToastController,
        private router: Router,
        private routerExtService: RouterExtService) {
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            this.storageHelperService.getSong(params.get('uuid')).then(res => {
                this.song = res;
                if (this.song) {
                    this.formattedContent = parseChordPro(this.song);
                }
            });
        });
    }

    // ngAfterViewChecked(): void {
    //     setTimeout(() => {
    //             if (this.song) {
    //                 this.storageHelperService.getSong(this.song.uuid).then(res => this.song = res);
    //             }
    //         }
    //     )
    //     ;
    // }
    ngAfterViewInit(): void {
        setTimeout(() =>
            this.previousUrl = this.previousState());
    }

    async presentToast() {
        this.storageHelperService.addToQueue(this.song);
        const toast = await this.toastController.create({
            message: 'Song added to queue',
            duration: 2000
        });
        toast.present();
    }

    remove() {
        this.storageHelperService.removeSong(this.song);
        this.router.navigate(['/tabs/song']);
    }

    previousState() {
        // const prevUrl = this.routerExtService.getPreviousUrl();
        // return prevUrl ? prevUrl : '/tabs/song';
        // todo fix it
        return '/tabs/song'
    }
}
