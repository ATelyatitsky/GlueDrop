import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-basic-list',
  templateUrl: './basic-list.page.html',
  styleUrls: ['./basic-list.page.scss'],
})
export class BasicListPage implements OnInit {

  items = [
    'Pokémon Yellow',
    'Super Metroid',
    'Mega Man X',
    'The Legend of Zelda',
    'Pac-Man',
    'Super Mario World',
    'Street Fighter II',
    'Half Life',
    'Final Fantasy VII',
    'Star Fox',
    'Tetris',
    'Donkey Kong III',
    'GoldenEye 007',
    'Doom',
    'Fallout',
    'GTA',
    'Halo'
  ];

  constructor() { }

  ngOnInit() {
  }

}
