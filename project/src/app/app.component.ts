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
  ];

  public walletPages = [
    {
      title: 'Cards',
      url: '/cards',
      icon: 'list'
    },
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: 'list'
    },
    {
      title: 'Expense Overview',
      url: '/expenseOverview',
      icon: 'list'
    },
    {
      title: 'Payment History',
      url: '/paymentHistory',
      icon: 'list'
    },
    {
      title: 'Wallet',
      url: '/wallet',
      icon: 'list'
    },
    {
      title: 'Wallet Alternative',
      url: '/walletAlt',
      icon: 'list'
    }
  ];

  public organizerPages = [
    {
      title: 'Calendar',
      url: '/calendar',
      icon: 'list'
    },
    {
      title: 'Day Overview',
      url: '/dayOverview',
      icon: 'list'
    },
    {
      title: 'Schedule Day',
      url: '/scheduleDay',
      icon: 'list'
    },
    {
      title: 'Schedule Months',
      url: '/scheduleMonth',
      icon: 'list'
    }
  ];

  public introPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'list'
    },
    {
      title: 'Home Alternative',
      url: '/homeAlt',
      icon: 'list'
    },
    {
      title: 'Login',
      url: '/login',
      icon: 'list'
    },
    {
      title: 'Login with Background',
      url: '/loginBackground',
      icon: 'list'
    },
    {
      title: 'Login with Footer',
      url: '/loginFooter',
      icon: 'list'
    }
  ];

  public walkthroughPages = [
    {
      title: 'Walkthrough',
      url: '/walkthrough',
      icon: 'list'
    },
    {
      title: 'Walkthrough Alternative',
      url: '/walkthroughAlt',
      icon: 'list'
    },
    {
      title: 'Walkthrough Page Slider',
      url: '/walkthroughSlider',
      icon: 'list'
    }
  ];

  public profilePages = [
    {
      title: 'Profile Settings',
      url: '/profileSettings',
      icon: 'list'
    },
    {
      title: 'Profile Settings Alternative',
      url: '/alternativeProfile',
      icon: 'list'
    }
  ];

  public accountPages = [
    {
      title: 'Add an Account',
      url: '/addAccount',
      icon: 'list'
    },
    {
      title: 'Sign Up',
      url: '/signup',
      icon: 'list'
    },
    {
      title: 'Sign Up Alternative',
      url: '/signupAlt',
      icon: 'list'
    }
  ];

  public formPages = [
    {
      title: 'Contact Form',
      url: '/contactForm',
      icon: 'list'
    },
    {
      title: 'Contact Form Alternative',
      url: '/contactFormAlt',
      icon: 'list'
    },
    {
      title: 'Inputs and Validation',
      url: '/inputs',
      icon: 'list'
    }
  ];

  public cloudPages = [
    {
      title: 'Cloud',
      url: '/cloud',
      icon: 'list'
    },
    {
      title: 'Mail',
      url: '/mail',
      icon: 'list'
    },
    {
      title: 'Storage',
      url: '/storage',
      icon: 'list'
    }
  ];

  public eventPages = [
    {
      title: 'Calendar Event',
      url: '/calendarEvent',
      icon: 'list'
    },
    {
      title: 'Event Details',
      url: '/eventDetails',
      icon: 'list'
    }
  ];

  public commercePages = [
    {
      title: 'Commerce Home',
      url: '/commerce-home',
      icon: 'list'
    },
    {
      title: 'Albums',
      url: '/albums',
      icon: 'list'
    },
    {
      title: 'Products',
      url: '/products',
      icon: 'list'
    },
    {
      title: 'Product Details',
      url: '/product-details',
      icon: 'list'
    },
    {
      title: 'Products Grid',
      url: '/products-grid',
      icon: 'list'
    },
    {
      title: 'Products List',
      url: '/products-list',
      icon: 'list'
    }
  ];

  public componentPages = [
    {
      title: 'Buttons',
      url: '/buttons',
      icon: 'list'
    },
    {
      title: 'Dropdowns',
      url: '/dropdowns',
      icon: 'list'
    },
    {
      title: 'Toggles and Sliders',
      url: '/selectors',
      icon: 'list'
    }
  ];

  public enhancedListPages = [
    {
      title: 'Buttons and Thumb List',
      url: '/thumbButtonsList',
      icon: 'list'
    },
    {
      title: 'Buttons and Thumb List Alternative',
      url: '/thumbButtonsListAlt',
      icon: 'list'
    },
    {
      title: 'Condensed List',
      url: '/condensedList',
      icon: 'list'
    },
    {
      title: 'Condensed Sliding List',
      url: '/condensedSlidingList',
      icon: 'list'
    },
    {
      title: 'Events List',
      url: '/eventsList',
      icon: 'list'
    },
    {
      title: 'Grid Tiles',
      url: '/gridTiles',
      icon: 'list'
    },
    {
      title: 'Ordered List',
      url: '/orderedList',
      icon: 'list'
    },
    {
      title: 'Sliding List',
      url: '/slidingList',
      icon: 'list'
    },
    {
      title: 'Thumbnail List',
      url: '/listThumbStart',
      icon: 'list'
    },
    {
      title: 'Thumbnail List Clean',
      url: '/listThumbCentered',
      icon: 'list'
    },
    {
      title: 'Thumbnail List Reversed',
      url: '/listThumbEnd',
      icon: 'list'
    }
  ];

  public ionicListPages = [
    {
      title: 'Avatar List',
      url: '/avatarList',
      icon: 'list'
    },
    {
      title: 'Basic List',
      url: '/basicList',
      icon: 'list'
    },
    {
      title: 'Dividers List',
      url: '/dividersList',
      icon: 'list'
    },
    {
      title: 'Headers List',
      url: '/headersList',
      icon: 'list'
    },
    {
      title: 'Icon List',
      url: '/iconList',
      icon: 'list'
    },
    {
      title: 'Inset List',
      url: '/insetList',
      icon: 'list'
    },
    {
      title: 'Multi-line List',
      url: '/multiLineList',
      icon: 'list'
    },
    {
      title: 'No Lines List',
      url: '/noLinesList',
      icon: 'list'
    },
    {
      title: 'Sliding List',
      url: '/altSlidingList',
      icon: 'list'
    },
    {
      title: 'Thumbnail List',
      url: '/altThumbnailList',
      icon: 'list'
    }
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
