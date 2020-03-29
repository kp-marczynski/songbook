import {Injectable} from '@angular/core';
import {ToastController} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class ToastHelperService {

    constructor(private toastController: ToastController) {
    }

    public async presentToast(message: string, duration?: number) {
        const toast = await this.toastController.create({
            message,
            duration: !!duration ? duration : 2000
        });
        toast.present();
    }
}
