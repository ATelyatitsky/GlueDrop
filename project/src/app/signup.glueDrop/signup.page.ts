import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {PersonModel} from '../shared/model/person.model';
import {LoginModel} from '../shared/model/login.model';
import {SignUpService} from '../shared/service/sign-up.service';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-signup-alt',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  public personData: PersonModel = new PersonModel();
  public loginData: LoginModel = new LoginModel();
  public checkPassword = '';

  public maxDate = new Date().toISOString();

  public customMonthName: string[] = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

  constructor(private router: Router, public signUpService: SignUpService, public toastController: ToastController) { }

  ngOnInit() {
  }

  public login() {
    this.router.navigate(['/loginGlueDrop']);
  }

  public signUp(): void {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (this.personData.loginName === '') {
      this.presentToast('Имя пользователя обязательно для заполнения', 'danger');
      return;
    }
    if (!re.test(String(this.loginData.login).toLowerCase())) {
      this.presentToast('Некорректный формат адреса почты', 'danger');
      return;
    }
    if (this.signUpService.checkByEmail(this.loginData.login)) {
      this.presentToast('Пользователь с такой почтой уже существует', 'danger');
      return;
    }
    if (this.loginData.password === '') {
      this.presentToast('Пароль обязательный для заполнения', 'danger');
      return;
    }

    if (this.loginData.password !== this.checkPassword) {
      this.presentToast('Пароли не совпадают', 'danger');
      return;
    }

    this.loginData.personModelId = this.signUpService.getLastPersonModelId() + 1;
    this.personData.id = this.signUpService.getLastPersonModelId() + 1;

    this.signUpService.saveLoginData(this.loginData);
    this.signUpService.savePersonData(this.personData);

    this.presentToast('Учетная запись успешно создана');
    this.login();

  }

  public async presentToast(messageString: string, type: string = 'success'): Promise<void> {
    const toast = await this.toastController.create({
      message: messageString,
      duration: 2000,
      color: type
    });
    toast.present();
  }

  public addCarbohydrates(): void {
    if (this.personData.carbohydrates < 30) {
      this.personData.carbohydrates += 1;
    }
  }

  public removeCarbohydrates(): void {
    if (this.personData.carbohydrates > 1) {
      this.personData.carbohydrates -= 1;
    }
  }

}
