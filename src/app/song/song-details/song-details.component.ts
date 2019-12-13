import {Component, OnInit} from '@angular/core';
import {StorageHelperService} from '../../../services/storage-helper.service';
import {ActivatedRoute} from '@angular/router';
import {Song} from '../../../model/song.model';
import {ToastController} from '@ionic/angular';

@Component({
    selector: 'app-song-details',
    templateUrl: './song-details.component.html',
    styleUrls: ['./song-details.component.scss'],
})
export class SongDetailsComponent implements OnInit {

    song: Song;
    chordsVisible = true;
    simpleChords = true;

    constructor(private storageHelperService: StorageHelperService, private route: ActivatedRoute, private toastController: ToastController) {
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            this.storageHelperService.getSong(params.get('uuid')).then(res => this.song = res);
        });
    }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Song added to queue',
      duration: 2000
    });
    toast.present();
  }

}
