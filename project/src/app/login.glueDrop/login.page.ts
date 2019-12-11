import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {SignUpService} from '../shared/service/sign-up.service';
import {ToastController} from '@ionic/angular';
import {NetworkService} from '../shared/service/network.service';

@Component({
  selector: 'app-login-background',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public passwordType: string;

  public email: string;
  public password: string;

  constructor(private router: Router, public signUpService: SignUpService, public toastController: ToastController, public networkService: NetworkService) { }

  ngOnInit() {
    this.signUpService.getPersonModelId().then((personModelId: number) => {
      if (personModelId !== 0) {
        this.router.navigate(['/cardsGlueDrop']);
      }
    });
  }

  togglePasswordType() {
    this.passwordType = this.passwordType || 'password';
    this.passwordType = (this.passwordType === 'password') ? 'text' : 'password';
  }

  public async login(): Promise<void> {
    if (this.networkService.isInternet) {
      const personModelId: number =  await this.signUpService.login(this.email, this.password);
      if (personModelId !== -1) {
        this.router.navigate(['/cardsGlueDrop']);
      } else {
        this.presentToast('Учетная запись не найдена', 'danger');
      }
    } else {
      this.presentToast('Отсутствует интернет - соединение', 'danger');
    }
  }

  public async presentToast(messageString: string, type: string = 'success'): Promise<void> {
    const toast = await this.toastController.create({
      message: messageString,
      duration: 2000,
      color: type
    });
    toast.present();
  }

  public signUp(): void {
    this.router.navigate(['/signupGlueDrop/' + 0]);
  }

}
