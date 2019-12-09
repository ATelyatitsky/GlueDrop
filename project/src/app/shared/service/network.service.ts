import {Injectable} from '@angular/core';
import {Network} from '@ionic-native/network/ngx';
import {ToastController} from '@ionic/angular';

@Injectable()
export class NetworkService {
    public isInternet = true;
    constructor(private network: Network, public toastController: ToastController) {
        const disconnectSubscription = this.network.onDisconnect().subscribe(() => {
            this.isInternet = false;
            this.presentToast('Отсутствует интернет - соединение', 'warning');
        });

        // watch network for a connection
        const connectSubscription = this.network.onConnect().subscribe(() => {
            this.isInternet = true;
        });
    }

    public async presentToast(messageString: string, type: string = 'success'): Promise<void> {
        const toast = await this.toastController.create({
            header: messageString,
            message: 'Данные будут синхронизированны позднее',
            duration: 5000,
            color: type
        });
        toast.present();
    }

}
