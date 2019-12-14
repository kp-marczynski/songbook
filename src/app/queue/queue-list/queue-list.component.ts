import { Component, OnInit } from '@angular/core';
import {StorageHelperService} from "../../../services/storage-helper.service";

@Component({
  selector: 'app-queue-list',
  templateUrl: './queue-list.component.html',
  styleUrls: ['./queue-list.component.scss'],
})
export class QueueListComponent implements OnInit {

  songQueue: any[];
  constructor(private storageHelperService: StorageHelperService) { }

  ngOnInit() {
    this.loadSongs();
  }

  loadSongs(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.storageHelperService.getQueue().then(res => {
            this.songQueue = res;
            resolve();
          }
      );
    });
  }

  doRefresh(event) {
    this.loadSongs().then(() => event.target.complete());
  }
}
