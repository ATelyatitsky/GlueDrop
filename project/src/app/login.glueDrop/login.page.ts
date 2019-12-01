import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {SignUpService} from '../shared/service/sign-up.service';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-login-background',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public passwordType: string;

  public email: string;
  public password: string;

  constructor(private router: Router, public signUpService: SignUpService, public toastController: ToastController) { }

  ngOnInit() {
  }

  togglePasswordType() {
    this.passwordType = this.passwordType || 'password';
    this.passwordType = (this.passwordType === 'password') ? 'text' : 'password';
  }

  public async login(): Promise<void> {
    const personModelId: number =  await this.signUpService.login(this.email, this.password);
    if (personModelId !== -1) {
      this.router.navigate(['/cardsGlueDrop']);
    } else {
      this.presentToast();
    }

  }

  public async presentToast(): Promise<void> {
    const toast = await this.toastController.create({
      message: 'Учатная запись не найдена.',
      duration: 2000,
      color: 'danger'
    });
    toast.present();
  }

  public signUp(): void {
    this.router.navigate(['/signupGlueDrop']);
  }

}
