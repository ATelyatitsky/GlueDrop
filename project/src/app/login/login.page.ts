import { Component, OnInit } from '@angular/core';
import {SignUpService} from '../shared/service/sign-up.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public passwordType: string;

  constructor(public signUpService: SignUpService) { }

  ngOnInit() {

  }

  togglePasswordType() {
    this.passwordType = this.passwordType || 'password';
    this.passwordType = (this.passwordType === 'password') ? 'text' : 'password';
  }

}
