import { Component, OnInit } from '@angular/core';

import { environment } from '../../environments/environment';
import {RowDiaryService} from '../shared/service/row-diary.service';
import {RowDiaryModel} from '../shared/model/row-diary.model';
import {SocialSharing} from '@ionic-native/social-sharing/ngx';
import {Router} from '@angular/router';

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

  constructor(private router: Router, public rowDiaryService: RowDiaryService, public socialSharing: SocialSharing) { }

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
    this.socialSharing.share('test', null, null, null);
  }

  public backToDashboard(): void {
    this.router.navigate(['/dashboardGlueDrop']);
  }

}
