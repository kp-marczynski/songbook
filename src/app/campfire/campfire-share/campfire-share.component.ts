import { Component, OnInit } from '@angular/core';
import {NavParams, PopoverController} from "@ionic/angular";

@Component({
  selector: 'app-campfire-share',
  templateUrl: './campfire-share.component.html',
  styleUrls: ['./campfire-share.component.scss'],
})
export class CampfireShareComponent implements OnInit {

  currentSongUuid = '';
  pop: PopoverController;

  constructor(navParams: NavParams) {
    this.currentSongUuid = navParams.get('message');
    this.pop = navParams.get('popoverController');
  }

  close() {
    this.pop.dismiss();
  }

  ngOnInit() {}

}
