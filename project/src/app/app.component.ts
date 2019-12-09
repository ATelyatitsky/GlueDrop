import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { environment } from '../environments/environment';
import {NetworkService} from './shared/service/network.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public env = environment;

  public glueDropPages = [
    {
      title: 'Заставка',
      url: '/walkthroughSliderGlueDrop',
      icon: 'list'
    },
    {
      title: 'Авторизация',
      url: '/loginGlueDrop',
      icon: 'list'
    },
    {
      title: 'Регистрация',
      url: '/signupGlueDrop',
      icon: 'list'
    },
    {
      title: 'Мой дневник',
      url: '/cardsGlueDrop',
      icon: 'list'
    },
    {
      title: 'Статистика',
      url: '/dashboardGlueDrop',
      icon: 'list'
    },
    {
      title: 'Мои цели',
      url: '/calendarGlueDrop',
      icon: 'list'
    },
    {
      title: 'Профиль',
      url: '/profileSettings',
      icon: 'list'
    },
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private networkService: NetworkService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleLightContent();
      this.splashScreen.hide();
    });
  }
}
