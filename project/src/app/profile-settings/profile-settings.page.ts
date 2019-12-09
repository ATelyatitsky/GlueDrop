import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {SignUpService} from '../shared/service/sign-up.service';
import {NetworkService} from '../shared/service/network.service';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.page.html',
  styleUrls: ['./profile-settings.page.scss'],
})
export class ProfileSettingsPage implements OnInit {

  public personId = 0;

  constructor(private router: Router, public signUpService: SignUpService, public networkService: NetworkService) { }

  public async ngOnInit() {
    this.personId = await this.signUpService.getPersonModelId();
  }

  public editProfile(): void {
    this.router.navigate(['/signupGlueDrop/' + this.personId]);
  }

  public exit(): void {
    this.signUpService.removePersonId();
    this.router.navigate(['/loginGlueDrop']);
  }
}
