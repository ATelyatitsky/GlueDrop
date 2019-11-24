import {Component, Input, OnInit} from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.page.html',
    styleUrls: ['./notification.page.scss'],
})

export class NotificationPage implements OnInit{
    @Input() typeNotification: number;

    public dateNow: Date = new Date();
    public dateString: string;
    public mainValue: string;

    constructor(private modalController: ModalController) {
        this.dateNow.setHours(this.dateNow.getHours() + 1);
        this.dateString = this.dateNow.toISOString();
    }

    public ngOnInit(): void {
        this.checkMainValue(this.typeNotification);
    }

    public closeModal(): void {
        this.modalController.dismiss();
    }

    public checkMainValue(typeNotification: number): void {
        switch (typeNotification) {
            case 1: this.mainValue = 'Измерить сахар'; break;
            case 2: this.mainValue = 'Поставить инсулин'; break;
            case 3: this.mainValue = 'Прием пищи'; break;
            case 4: this.mainValue = ''; break;
        }
        console.log(this.mainValue);
    }
}
