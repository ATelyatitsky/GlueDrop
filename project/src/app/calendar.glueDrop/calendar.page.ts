import {Component, OnInit} from '@angular/core';
import {AlertController, ModalController, Platform} from '@ionic/angular';
import {NotificationPage} from './modalPage/notification.page';
import {ELocalNotificationTriggerUnit, LocalNotifications} from '@ionic-native/local-notifications/ngx';
import {Router} from '@angular/router';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {

  constructor(public modalController: ModalController, private plt: Platform, private localNotification: LocalNotifications, private router: Router) {
    this.plt.ready().then(() => {
      this.localNotification.on('click').subscribe(res => {
        const url = res.data ? res.data.page : '/';
        this.router.navigate([url]);
      });

      // this.localNotification.on('trigger').subscribe(res => {
      //   const url = res.data ? res.data.page : '/';
      //   this.router.navigate([url]);
      // });
    });
}

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
    await modal.present();
    const notification =  await modal.onWillDismiss();
    console.log(notification.data.notification);
  }

  public sheduleNotification(): void {
    this.localNotification.schedule({
      id: 1,
      title: 'Измерить сахар',
      text: 'Цель на 20:00 - Измерить сахар',
      data: {page: '/cardsGlueDrop'},
      // trigger: {every: {hour: 20, minute: 0} }
      trigger: {in: 10, unit: ELocalNotificationTriggerUnit.SECOND},
      foreground: true
    });
  }

}
