import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.page.html',
  styleUrls: ['./cards.page.scss'],
})
export class CardsPage implements OnInit {

  slideOpts = {
    autoplay: false
  };

  public dateNow: string = new Date().toISOString();

  constructor() { }

  ngOnInit() {
  }

}
