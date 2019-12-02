import { Component, OnInit } from '@angular/core';
import {RowDiaryModel} from '../shared/model/row-diary.model';
import {ToastController} from '@ionic/angular';
import {RowDiaryService} from '../shared/service/row-diary.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.page.html',
  styleUrls: ['./cards.page.scss'],
})
export class CardsPage implements OnInit {
  public customMonthName: string[] = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
  public selectedMood = 'Сахар';
  public selectedUnit = 'ммоль/л';
  public rowValue = '0.0';
  public selectedValue1 = 0;
  public selectedValue2 = 0;

  public minFirstRangeValue = 0;
  public maxFirstRangeValue = 20;
  public stepRange = 1;


  public modeArray: string[] = ['Сахар', 'Еда', 'Короткий инсулин', 'Продленный инсулин', 'Комментарий'];

  public rowDiaryModel: RowDiaryModel = new RowDiaryModel();
  public rowDiaryModelArray: RowDiaryModel[] = [];

  slideOpts = {
    autoplay: false
  };

  public dateNow: string = new Date().toISOString();

  constructor(public toastController: ToastController, public rowDiaryService: RowDiaryService, private router: Router) {
  }

  ngOnInit() {
     this.rowDiaryService.getDiaryRowValueByPersonId().then((val) => {
       this.rowDiaryModelArray =  val;
    });
  }

  public async addNewRecord(): Promise<void> {
    if (this.rowDiaryModel.comment === '' && this.rowDiaryModel.extendedInsulinValue === '' &&
        this.rowDiaryModel.shortInsulinValue === '' && this.rowDiaryModel.foodValue === '' &&
        this.rowDiaryModel.sugarValue === '') {
      this.presentToast('Нельзя добавить пустую запись', 'warning');
      return;
    }
    this.rowDiaryModel.date = new Date(this.dateNow);
    console.log(this.rowDiaryModel);
    this.rowDiaryService.saveDiaryRow(this.rowDiaryModel);

    this.rowDiaryModelArray = await this.rowDiaryService.getDiaryRowValueByPersonId();

    this.presentToast('Запись добавлена');
  }

  public async presentToast(messageString: string, type: string = 'success'): Promise<void> {
    const toast = await this.toastController.create({
      message: messageString,
      duration: 2000,
      color: type
    });
    toast.present();
  }

  public setNextMode(): void {
    const index: number = this.modeArray.findIndex((mode: string) => mode === this.selectedMood);

    if (index === this.modeArray.length - 1) {
      return;
    }
    this.changeSelectedMood(this.modeArray[index + 1]);
  }

  public changeSelectedMood(mood: string) {
    if (mood === 'Продленный инсулин') {
      this.maxFirstRangeValue = 90;
      this.stepRange = 10;
    } else {
      this.maxFirstRangeValue = 20;
      this.stepRange = 1;
    }
    this.rowValue = '0.0';
    this.selectedValue1 = 0;
    this.selectedValue2 = 0;

    this.selectedMood = mood;
    switch (this.selectedMood) {
      case 'Сахар': this.selectedUnit = 'ммоль/л';  break;
      case 'Еда': this.selectedUnit = 'ХЕ'; break;
      case 'Короткий инсулин': this.selectedUnit = 'ед'; break;
      case 'Продленный инсулин': this.selectedUnit = 'ед'; break;
    }
  }

  public changeFirstRange(data: CustomEvent) {
    this.selectedValue1 = data.detail.value;
    this.rowValue = (this.selectedValue1 + this.selectedValue2 / 10).toString();
    this.rowValue = this.rowValue === '0' ? '0.0' : this.rowValue;

    switch (this.selectedMood) {
      case 'Сахар': this.rowDiaryModel.sugarValue = this.rowValue;  break;
      case 'Еда': this.rowDiaryModel.foodValue = this.rowValue; break;
      case 'Короткий инсулин': this.rowDiaryModel.shortInsulinValue = this.rowValue; break;
      case 'Продленный инсулин': this.rowDiaryModel.extendedInsulinValue = this.rowValue; break;
    }
  }

  public changeLastRange(data: CustomEvent): void {
    this.selectedValue2 = data.detail.value;
    this.rowValue = (this.selectedValue1 + this.selectedValue2 / 10).toString();
    this.rowValue = this.rowValue === '0' ? '0.0' : this.rowValue;

    switch (this.selectedMood) {
      case 'Сахар': this.rowDiaryModel.sugarValue = this.rowValue;  break;
      case 'Еда': this.rowDiaryModel.foodValue = this.rowValue; break;
      case 'Короткий инсулин': this.rowDiaryModel.shortInsulinValue = this.rowValue; break;
      case 'Продленный инсулин': this.rowDiaryModel.extendedInsulinValue = this.rowValue; break;
    }
  }

  public async deleteRow(index: number): Promise<void> {
    this.rowDiaryModelArray = await this.rowDiaryService.deleteDiaryRow(this.rowDiaryModelArray[index].id);
    console.log(this.rowDiaryModelArray);
  }

  public goToDashboard(): void {
    this.router.navigate(['/dashboardGlueDrop']);
  }
}
