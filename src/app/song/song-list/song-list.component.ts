import {AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import {SongBase} from '../../../model/song.model';
import {StorageHelperService} from '../../../services/storage-helper.service';

@Component({
    selector: 'app-song-list',
    templateUrl: './song-list.component.html',
    styleUrls: ['./song-list.component.scss'],
})
export class SongListComponent implements AfterViewChecked {

    songIndex: SongBase[] = [];

    constructor(private storageHelperService: StorageHelperService) {
    }

    ngAfterViewChecked(): void {
        setTimeout(() => this.storageHelperService.getSongIndex().then(res => {
                this.songIndex = res;
            })
        );
    }
}
