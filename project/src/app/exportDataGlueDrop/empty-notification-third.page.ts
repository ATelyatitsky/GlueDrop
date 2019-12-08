import { Component, OnInit } from '@angular/core';

import { environment } from '../../environments/environment';
import {RowDiaryService} from '../shared/service/row-diary.service';
import {RowDiaryModel} from '../shared/model/row-diary.model';
import {SocialSharing} from '@ionic-native/social-sharing/ngx';
import {Router} from '@angular/router';
import { File } from '@ionic-native/file/ngx';
import {Papa} from 'ngx-papaparse';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-empty-notification-third',
  templateUrl: './empty-notification-third.page.html',
  styleUrls: ['./empty-notification-third.page.scss'],
})
export class EmptyNotificationThirdPage implements OnInit {
  public customMonthName: string[] = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
  public dateFrom: string = new Date().toISOString();
  public dateTo: string = new Date().toISOString();
  env = environment;

  public filterDaySegment = '2week';

  public rowDiaryModel: RowDiaryModel[] = [];

  constructor(private papa: Papa, private file: File, private router: Router, public rowDiaryService: RowDiaryService, public socialSharing: SocialSharing, public toastController: ToastController) { }

  ngOnInit() {
    const date = new Date();
    date.setDate(date.getDate() - 14);
    this.dateFrom = date.toISOString();
    this.getRowByDate();
  }

  public changeDate(): void {
    this.filterDaySegment = 'Other';
    this.getRowByDate();
  }

  public setNewDateDiapason(): void {
    const date = new Date();
    switch (this.filterDaySegment) {
      case '2week': date.setDate(date.getDate() - 14); break;
      case 'Month': date.setMonth(date.getMonth() - 1); break;
      case '3Month': date.setMonth(date.getMonth() - 3); break;
    }
    this.dateFrom = date.toISOString();
    this.getRowByDate();
  }

  public async getRowByDate(): Promise<void> {
    this.rowDiaryModel = await this.rowDiaryService.findRowByDate(new Date(this.dateFrom), new Date(this.dateTo));
  }

  public exportData(): void {
    const objectToCsv = this.rowDiaryModel.map((element: RowDiaryModel) => {
      return {
        '№ записи': '    ' + element.id + '    ',
        '    Дата   ': element.date.toLocaleDateString(),
        ' Время  ': element.date.toLocaleTimeString(),
        'Уровень сахара': '       ' + (element.sugarValue !== '' && element.sugarValue !== '0.0' ? element.sugarValue : ' ')  + '      ',
        'XE': element.foodValue + '       ',
        'Короткий инсулин': element.shortInsulinValue + '       ',
        'Продленный инсулин': '       ' + element.extendedInsulinValue + '       ',
        'Комментарий': element.comment
      };
    });
    // json2csv(objectToCsv, (err, csv) => {
    //   if (err) throw err;
    //   console.log(csv);
    //   const test = new Blob([csv], {type: 'text/csv;charset=utf-8;'});
    //   const urlCsv = URL.createObjectURL(test);
    //
    // }, {delimiter: {field: '  ', wrap  : ''} });
    const csv = this.papa.unparse({
      fields: ['№ записи', '    Дата   ', ' Время  ', 'Уровень сахара', 'XE', 'Короткий инсулин', 'Продленный инсулин', 'Комментарий'],
      data: objectToCsv
    }, {quoteChar: '', delimiter: ' '});
    console.log(csv);
    this.file.writeFile(this.file.dataDirectory, 'data.csv', csv, {replace: true}).then( res => {
      this.socialSharing.share(null, null, res.nativeURL, null).then(e => {
        this.presentToast('Данные успешно экспортированы');
      }).catch(e => {
        this.presentToast('Ошибка экспорта.', 'danger');
      });
    }, err => {
      this.presentToast('Ошибка экспорта.', 'danger');
    });
    // this.socialSharing.share(null, null, urlCsv, null);
  }

  public backToDashboard(): void {
    this.router.navigate(['/dashboardGlueDrop']);
  }

  public async presentToast(messageString: string, type: string = 'success'): Promise<void> {
    const toast = await this.toastController.create({
      message: messageString,
      duration: 2000,
      color: type
    });
    toast.present();
  }

}
