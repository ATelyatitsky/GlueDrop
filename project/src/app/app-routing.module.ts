import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'walkthroughSliderGlueDrop',
    pathMatch: 'full'
  },
  { path: 'profileSettings', loadChildren: './profile-settings/profile-settings.module#ProfileSettingsPageModule' },
  {
    path: 'walkthroughSliderGlueDrop', loadChildren: './walkthrough-slider.glueDrop/walkthrough-slider.module#WalkthroughSliderPageModule'
  },
  {
    path: 'loginGlueDrop', loadChildren: './login.glueDrop/login.module#LoginPageModule'
  },
  { path: 'signupGlueDrop/:id', loadChildren: './signup.glueDrop/signup.module#SignupPageModule' },
  { path: 'cardsGlueDrop', loadChildren: './cards.glueDrop/cards.module#CardsPageModule' },
  { path: 'dashboardGlueDrop', loadChildren: './dashboard.glueDrop/dashboard.module#DashboardPageModule' },
  { path: 'calendarGlueDrop', loadChildren: './calendar.glueDrop/calendar.module#CalendarPageModule' },
  { path: 'exportDataGlueDrop', loadChildren: './exportDataGlueDrop/empty-notification-third.module#EmptyNotificationThirdPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
