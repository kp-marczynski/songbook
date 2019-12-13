import { Component, OnInit } from '@angular/core';
import {SongBase} from '../../../model/song.model';
import {StorageHelperService} from '../../../services/storage-helper.service';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss'],
})
export class SongListComponent implements OnInit {

  songIndex: SongBase[] = [];

  constructor(private storageHelperService: StorageHelperService) {
  }

  ngOnInit(): void {
    this.storageHelperService.getSongIndex().then(res => {
      this.songIndex = res;
    });
  }
}
