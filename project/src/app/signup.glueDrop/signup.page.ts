import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PersonModel} from '../shared/model/person.model';
import {LoginModel} from '../shared/model/login.model';
import {SignUpService} from '../shared/service/sign-up.service';
import {AlertController, ToastController} from '@ionic/angular';
import {NetworkService} from '../shared/service/network.service';

@Component({
  selector: 'app-signup-alt',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  public personData: PersonModel = new PersonModel();
  public loginData: LoginModel = new LoginModel();
  public checkPassword = '';
  public oldPassword = '';

  public maxDate = new Date().toISOString();

  public customMonthName: string[] = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
  public id = 0;

  constructor(public networkService: NetworkService, private router: Router, public signUpService: SignUpService,
              public toastController: ToastController, private activateRoute: ActivatedRoute, public alertController: AlertController) { }

  public async ngOnInit() {
    this.id = +this.activateRoute.snapshot.params.id;

    if (this.id) {
      this.personData = await this.signUpService.getPersonModel(this.id);
      this.loginData = await this.signUpService.getLoginModel(this.id);
      this.checkPassword = this.loginData.password;
    }
  }

  public login() {
    if (this.id !== 0) {
      this.router.navigate(['/profileSettings']);
    } else {
      this.router.navigate(['/loginGlueDrop']);
    }
  }

  public signUp(): void {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!this.networkService.isInternet) {
      this.presentToast('Отсутствует интернет-соединение', 'danger');
      return;
    }
    if (this.personData.loginName === '') {
      this.presentToast('Имя пользователя обязательно для заполнения', 'danger');
      return;
    }
    if (!re.test(String(this.loginData.login).toLowerCase())) {
      this.presentToast('Некорректный формат адреса почты', 'danger');
      return;
    }
    if (this.signUpService.checkByEmail(this.loginData.login, this.loginData.id)) {
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

    if (this.id === 0) {
      this.loginData.personModelId = this.signUpService.getLastPersonModelId() + 1;
      this.personData.id = this.signUpService.getLastPersonModelId() + 1;

      this.signUpService.saveLoginData(this.loginData);
      this.signUpService.savePersonData(this.personData);

      this.presentToast('Учетная запись успешно создана');
    } else {
      this.signUpService.editLoginData(this.loginData);
      this.signUpService.editPersonData(this.personData);
      this.presentToast('Учетная запись успешно отредактирована');
    }
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

  public async changePassword() {
    const alert = await this.alertController.create({
      header: 'Смена пароля',
      message: 'Введите свой старый пароль и придумайте новый пароль',
      inputs: [
        {
          name: 'name1',
          type: 'text',
          placeholder: 'Старый пароль'
        },
        {
          name: 'name2',
          type: 'text',
          id: 'name2-id',
          placeholder: 'Новый пароль'
        },
      ],
      buttons: [
        {
          text: 'Отмена',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            this.oldPassword = data.name1;
            this.checkPassword = data.name2;
            this.changePasswordF();
          }
        }
      ]
    });

    await alert.present();
  }

  public changePasswordF(): void {
    if (!this.networkService.isInternet) {
      this.checkPassword = this.loginData.password;
      this.presentToast('Отсутствует интернет-соединение', 'danger');
      return;
    }
    if (this.oldPassword === '' || this.checkPassword === '') {
      this.checkPassword = this.loginData.password;
      this.presentToast('Оба поля обязательны для заполнения', 'danger');
      return;
    }
    if (this.loginData.password !== this.oldPassword) {
      this.checkPassword = this.loginData.password;
      this.presentToast('Старый пароль введен не верно', 'danger');
      return;
    }

    if (this.loginData.password === this.checkPassword) {
      this.checkPassword = this.loginData.password;
      this.presentToast('Старый и новый пароль совпадают', 'danger');
      return;
    }

    this.loginData.password = this.checkPassword;
  }

  public saveData(): void {
    console.log('ok');
  }
}
