import {Component, OnInit} from '@angular/core';
import {AlertController, ModalController, Platform, ToastController} from '@ionic/angular';
import {NotificationPage} from './modalPage/notification.page';
import {ELocalNotificationTriggerUnit, LocalNotifications} from '@ionic-native/local-notifications/ngx';
import {Router} from '@angular/router';
import {NotificationService} from '../shared/service/notification.service';
import {NotificationModel} from './modalPage/notification.model';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {
  public notificationModelArray: NotificationModel[] = [];
  public notificationDone: NotificationModel[] = [];
  public notificationUnDone: NotificationModel[] = [];

  public sugarCount = 0;
  public insulinCount = 0;
  public foodCount = 0;

  public sugarCountDone = 0;
  public insulinCountDone = 0;
  public foodCountDone = 0;

  public dateNow: string = new Date().toISOString();

  public customMonthName: string[] = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];

  constructor(public modalController: ModalController, private plt: Platform, private localNotification: LocalNotifications,
              private router: Router, private notificationService: NotificationService, public toastController: ToastController) {
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
    this.getNotification();
  }

  public getNotification(): void {
    this.notificationService.getNotificationByPersonId().then(val => {
      this.notificationModelArray = val;
      this.notificationDone = this.notificationModelArray.filter((note: NotificationModel) => note.isDone && (note.date.toDateString() === new Date(this.dateNow).toDateString() || note.daily));
      this.notificationUnDone = this.notificationModelArray.filter((note: NotificationModel) => !note.isDone && (note.date.toDateString() === new Date(this.dateNow).toDateString() || note.daily));

      this.sugarCount = this.notificationModelArray.filter((note: NotificationModel) => note.category === '1' &&  (note.date.toDateString() === new Date(this.dateNow).toDateString() || note.daily)).length;
      this.insulinCount = this.notificationModelArray.filter((note: NotificationModel) => note.category === '2' && (note.date.toDateString() === new Date(this.dateNow).toDateString() || note.daily)).length;
      this.foodCount = this.notificationModelArray.filter((note: NotificationModel) => note.category === '3' && (note.date.toDateString() === new Date(this.dateNow).toDateString() || note.daily)).length;

      this.sugarCountDone = this.notificationModelArray.filter((note: NotificationModel) => note.category === '1' && note.isDone && (note.date.toDateString() === new Date(this.dateNow).toDateString() || note.daily)).length;
      this.insulinCountDone = this.notificationModelArray.filter((note: NotificationModel) => note.category === '2' && note.isDone && (note.date.toDateString() === new Date(this.dateNow).toDateString() || note.daily)).length;
      this.foodCountDone = this.notificationModelArray.filter((note: NotificationModel) => note.category === '3' && note.isDone && (note.date.toDateString() === new Date(this.dateNow).toDateString() || note.daily)).length;
    });
  }

  public async openModal(data: number): Promise<void> {
    const modal = await this.modalController.create({
      component: NotificationPage,
      componentProps: {
        typeNotification: data
      },
    });
    await modal.present();
    const notification =  await modal.onWillDismiss();
    this.setNotification(notification.data.notification);
  }

  public setNotification(notification: NotificationModel): void {
    this.scheduleNotification(notification.goal, notification.date, notification.daily);
    this.notificationService.saveNotification(notification);
    this.presentToast('Цель добавлена');
    this.getNotification();
  }

  public scheduleNotification(goal: string, date: Date, daily: boolean): void {
    this.localNotification.schedule({
      id: 1,
      title: goal,
      text: 'Цель на ' + date.toLocaleDateString() + ' в ' + date.toLocaleTimeString() + ' - ' + goal,
      data: {page: '/cardsGlueDrop'},
      trigger: daily ?  {every: {hour: date.getDate(), minute: date.getMinutes()} } :  {at: date},
      foreground: true
    });
  }

  public async presentToast(messageString: string, type: string = 'success'): Promise<void> {
    const toast = await this.toastController.create({
      message: messageString,
      duration: 2000,
      color: type
    });
    toast.present();
  }

  public async doneNotification(index: number): Promise<void> {
    await this.notificationService.doneNotification(this.notificationUnDone[index]);
    this.presentToast('Цель выполнена');
    this.getNotification();
  }

  public async deleteNotification(index: number): Promise<void> {
    await this.notificationService.deleteNotification(this.notificationUnDone[index]);
    this.presentToast('Цель удалена');
    this.getNotification();
  }
}
