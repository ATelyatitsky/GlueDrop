import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';
import {NotificationPage} from './modalPage/notification.page';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

  public dateNow: string = new Date().toISOString();

  public async openModal(data: number): Promise<void> {
    const modal = await this.modalController.create({
      component: NotificationPage,
      componentProps: {
        typeNotification: data
      },
    });
    return await modal.present();
  }

}
