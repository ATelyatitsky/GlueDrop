import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import {SignUpService} from '../shared/service/sign-up.service';

@Component({
  selector: 'app-walkthrough-slider',
  templateUrl: './walkthrough-slider.page.html',
  styleUrls: ['./walkthrough-slider.page.scss'],
})
export class WalkthroughSliderPage implements OnInit {
  slideOpts = {
    autoplay: true,
    effect: 'cube'
  };

  env = environment;

  constructor(private router: Router, public signUpService: SignUpService) { }

  ngOnInit() {
    this.signUpService.getPersonModelId().then((personModelId: number) => {
      if (personModelId !== 0) {
        this.router.navigate(['/cardsGlueDrop']);
      }
    });
  }

  public skip(): void {
    this.router.navigate(['/loginGlueDrop']);
  }
}
