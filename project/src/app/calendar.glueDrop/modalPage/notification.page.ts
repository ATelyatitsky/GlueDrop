import {Component, Input, OnInit} from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';
import {NotificationModel} from './notification.model';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.page.html',
    styleUrls: ['./notification.page.scss'],
})

export class NotificationPage implements OnInit {
    @Input() typeNotification: number;

    public notificationModel: NotificationModel = new NotificationModel();

    public dateNow: Date = new Date();
    public dateString: string;
    public mainValue: string;

    constructor(private modalController: ModalController) {
        this.dateNow.setHours(this.dateNow.getHours() + 1);
        this.dateString = this.dateNow.toISOString();

        this.notificationModel.date = this.dateNow;
    }

    public ngOnInit(): void {
        this.checkMainValue(this.typeNotification);
    }

    public closeModal(): void {
        this.modalController.dismiss();
    }

    public setNotification(): void {
        console.log(this.notificationModel);
        this.modalController.dismiss({
            notification: this.notificationModel
        });
    }

    public checkMainValue(typeNotification: number): void {
        switch (typeNotification) {
            case 1: this.mainValue = 'Измерить сахар'; break;
            case 2: this.mainValue = 'Поставить инсулин'; break;
            case 3: this.mainValue = 'Прием пищи'; break;
            case 4: this.mainValue = ''; break;
        }
        this.notificationModel.category = typeNotification.toString();
        this.notificationModel.goal = this.mainValue;
    }
}
