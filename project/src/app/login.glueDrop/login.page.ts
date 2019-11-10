import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-background',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public passwordType: string;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  togglePasswordType() {
    this.passwordType = this.passwordType || 'password';
    this.passwordType = (this.passwordType === 'password') ? 'text' : 'password';
  }

  public login(): void {
    this.router.navigate(['/cardsGlueDrop']);
  }

  public signUp(): void {
    this.router.navigate(['/signupGlueDrop']);
  }

}
