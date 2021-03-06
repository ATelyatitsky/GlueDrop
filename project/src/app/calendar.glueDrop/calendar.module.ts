import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CalendarPage } from './calendar.page';
import {NotificationPage} from './modalPage/notification.page';
import {NotificationService} from '../shared/service/notification.service';

const routes: Routes = [
  {
    path: '',
    component: CalendarPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CalendarPage, NotificationPage],
  entryComponents: [NotificationPage],
  providers: [NotificationService]
})
export class CalendarPageModule {}
