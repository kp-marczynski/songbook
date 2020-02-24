import { Injectable } from '@angular/core';
import {PopoverController} from '@ionic/angular';
import {CampfireShareComponent} from './campfire-share/campfire-share.component';

@Injectable({
  providedIn: 'root'
})
export class CampfireSharePopoverService {

  constructor(private popoverController: PopoverController) { }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: CampfireShareComponent,
      event: ev,
      translucent: true,
      cssClass: 'popover',
      componentProps: {popoverController: this.popoverController}
    });
    return await popover.present();
  }
}
