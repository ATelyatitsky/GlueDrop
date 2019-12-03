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
    public customMonthName: string[] = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];

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
        this.modalController.dismiss({
            notification: this.notificationModel,
        });
    }

    public checkMainValue(typeNotification: number): void {
        switch (typeNotification) {
            case 1: this.mainValue = 'Измерить сахар'; break;
            case 2: this.mainValue = 'Поставить инсулин'; break;
            case 3: this.mainValue = 'Прием пищи'; break;
        }
        this.notificationModel.category = typeNotification.toString();
        this.notificationModel.goal = this.mainValue;
    }

    public changeDate() {
        this.notificationModel.date = new Date(this.dateString);
    }

    public changeDateBy(type: number) {
        switch (type) {
            case 1: {
                this.notificationModel.date = new Date();
                this.notificationModel.date.setMinutes(this.notificationModel.date.getMinutes() + 15);
                break;
            }
            case 2: {
                this.notificationModel.date = new Date();
                this.notificationModel.date.setMinutes(this.notificationModel.date.getMinutes() + 30);
                break;
            }
            case 3: {
                this.notificationModel.date = new Date();
                this.notificationModel.date.setHours(this.notificationModel.date.getHours() + 1);
                break;
            }
            case 4: {
                this.notificationModel.date = new Date();
                this.notificationModel.date.setHours(this.notificationModel.date.getHours() + 1);
                this.notificationModel.date.setMinutes(this.notificationModel.date.getMinutes() + 30);
                break;
            }
            case 5: {
                this.notificationModel.date = new Date();
                this.notificationModel.date.setHours(this.notificationModel.date.getHours() + 2);
                break;
            }
        }
        this.dateString = this.notificationModel.date.toISOString();
    }
}
