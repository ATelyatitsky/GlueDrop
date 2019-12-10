import { Component, OnInit } from '@angular/core';
import {RowDiaryModel} from '../shared/model/row-diary.model';
import {ModalController, ToastController} from '@ionic/angular';
import {RowDiaryService} from '../shared/service/row-diary.service';
import {Router} from '@angular/router';
import {NotificationPage} from '../calendar.glueDrop/modalPage/notification.page';
import {SlidingListPage} from '../sliding-list/sliding-list.page';

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

  public editRowEnable = false;


  public modeArray: string[] = ['Сахар', 'Еда', 'Короткий инсулин', 'Продленный инсулин', 'Комментарий'];

  public rowDiaryModel: RowDiaryModel = new RowDiaryModel();
  public rowDiaryModelArray: RowDiaryModel[] = [];

  slideOpts = {
    autoplay: false
  };

  public dateNow: string = new Date().toISOString();

  constructor(public modalController: ModalController, public toastController: ToastController, public rowDiaryService: RowDiaryService, private router: Router) {
  }

  ngOnInit() {
     this.rowDiaryService.getDiaryRowValueByPersonId().then((val) => {
       this.rowDiaryModelArray =  val.reverse();
    });
  }

  public async addNewRecord(): Promise<void> {
    if (this.rowDiaryModel.comment === '' && (this.rowDiaryModel.extendedInsulinValue === '' ||  this.rowDiaryModel.extendedInsulinValue === '0.0') &&
        (this.rowDiaryModel.shortInsulinValue === '' || this.rowDiaryModel.shortInsulinValue === '0.0' ) && (this.rowDiaryModel.foodValue === '' || this.rowDiaryModel.foodValue === '0.0' ) &&
        (this.rowDiaryModel.sugarValue === '' || this.rowDiaryModel.sugarValue === '0.0')) {
      this.presentToast('Нельзя добавить пустую запись', 'warning');
      return;
    }
    this.rowDiaryModel.date = new Date(this.dateNow);

    this.rowDiaryService.saveDiaryRow(this.rowDiaryModel);

    this.rowDiaryModelArray = (await this.rowDiaryService.getDiaryRowValueByPersonId()).reverse();

    this.rowDiaryModel = new RowDiaryModel();
    this.changeSelectedMood(this.modeArray[0]);
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
      case 'Сахар': {
        if (this.editRowEnable) {
          let splitValue: string[] = [];
          if (this.rowDiaryModel.sugarValue.length > 1) {
            splitValue =  this.rowDiaryModel.sugarValue.split('.');
          } else if (this.rowDiaryModel.sugarValue.length === 1) {
            splitValue.push(this.rowDiaryModel.sugarValue);
          }

          this.selectedValue1 = splitValue.length >= 1 ? +splitValue[0] : 0;
          this.selectedValue2 = splitValue.length > 1 ? +splitValue[1] : 0;
          if (this.rowDiaryModel.sugarValue.length > 1) {
            this.rowValue = this.rowDiaryModel.sugarValue;
          }

        }

        this.selectedUnit = 'ммоль/л'; break;
      }
      case 'Еда': {
        if (this.editRowEnable) {
          let splitValue: string[] = [];
          if (this.rowDiaryModel.foodValue.length > 1) {
            splitValue =  this.rowDiaryModel.foodValue.split('.');
          } else if (this.rowDiaryModel.foodValue.length === 1) {
            splitValue.push(this.rowDiaryModel.foodValue);
          }

          this.selectedValue1 = splitValue.length >= 1 ? +splitValue[0] : 0;
          this.selectedValue2 = splitValue.length > 1 ? +splitValue[1] : 0;
          if (this.rowDiaryModel.foodValue.length > 1) {
            this.rowValue = this.rowDiaryModel.foodValue;
          }
        }
        this.selectedUnit = 'ХЕ'; break;
      }
      case 'Короткий инсулин': {
        if (this.editRowEnable) {
          let splitValue: string[] = [];
          if (this.rowDiaryModel.shortInsulinValue.length > 1) {
            splitValue =  this.rowDiaryModel.shortInsulinValue.split('.');
          } else if (this.rowDiaryModel.shortInsulinValue.length === 1) {
            splitValue.push(this.rowDiaryModel.shortInsulinValue);
          }

          this.selectedValue1 = splitValue.length >= 1 ? +splitValue[0] : 0;
          this.selectedValue2 = splitValue.length > 1 ? +splitValue[1] : 0;
          if (this.rowDiaryModel.shortInsulinValue.length > 1) {
            this.rowValue = this.rowDiaryModel.shortInsulinValue;
          }

        }
        this.selectedUnit = 'ед'; break;
      }
      case 'Продленный инсулин': {
        if (this.editRowEnable) {
          let splitValue: string[] = [];
          if (this.rowDiaryModel.extendedInsulinValue.length > 1) {
            splitValue =  this.rowDiaryModel.extendedInsulinValue.split('.');
          } else if (this.rowDiaryModel.extendedInsulinValue.length === 1) {
            splitValue.push(this.rowDiaryModel.extendedInsulinValue);
          }

          this.selectedValue1 = splitValue.length >= 1 ? +splitValue[0] : 0;
          this.selectedValue2 = splitValue.length > 1 ? +splitValue[1] : 0;
          if (this.rowDiaryModel.extendedInsulinValue.length > 1) {
            this.rowValue = this.rowDiaryModel.extendedInsulinValue;
          }
        }
        this.selectedUnit = 'ед'; break;
      }
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
    this.rowDiaryModelArray = (await this.rowDiaryService.deleteDiaryRow(this.rowDiaryModelArray[index].id)).reverse();
    this.presentToast('Запись успешно удалена');
  }

  public editRow(index: number): void {
    this.dateNow = this.rowDiaryModelArray[index].date.toISOString();
    this.rowDiaryModel = this.rowDiaryModelArray[index];

    let splitValue: string[] = [];
    if (this.rowDiaryModelArray[index].sugarValue.length > 1) {
      splitValue =  this.rowDiaryModelArray[index].sugarValue.split('.');
    } else if (this.rowDiaryModelArray[index].sugarValue.length === 1) {
      splitValue.push(this.rowDiaryModelArray[index].sugarValue);
    }

    this.selectedValue1 = splitValue.length >= 1 ? +splitValue[0] : 0;
    this.selectedValue2 = splitValue.length > 1 ? +splitValue[1] : 0;
    this.rowValue = this.rowDiaryModelArray[index].sugarValue.length > 1 ? this.rowDiaryModelArray[index].sugarValue : '0.0';

    this.editRowEnable = true;
  }

  public async editRecord(): Promise<void> {
    await this.rowDiaryService.saveDiaryRow(this.rowDiaryModel);

    this.rowDiaryModelArray = (await this.rowDiaryService.getDiaryRowValueByPersonId()).reverse();
    this.editRowEnable = false;
    this.presentToast('Запись успешно отредактирована');
    this.resetEditRowMod();
  }

  public async resetEditRowMod(): Promise<void> {
    this.editRowEnable = false;
    this.rowDiaryModel = new RowDiaryModel();
    this.changeSelectedMood(this.modeArray[0]);

    this.rowDiaryModelArray = (await this.rowDiaryService.getDiaryRowValueByPersonId()).reverse();
  }

  public goToDashboard(): void {
    this.router.navigate(['/dashboardGlueDrop']);
  }

  public trackByF(index, item: RowDiaryModel): number {
    return item.id;
  }

  public async openModal(): Promise<void> {
    const modal = await this.modalController.create({
      component: SlidingListPage,
      componentProps: {
        addedFood: this.rowDiaryModel.food
      },
    });
    await modal.present();
    const addedFood =  await modal.onWillDismiss();
    const summ =  addedFood.data.addedFood.reduce((a, b) => a + b.xeValue, 0);
    if (summ > 0) {
      let splitValue: string[] = [];
      if (summ.toString() > 1) {
        splitValue =  summ.toString().split('.');
      } else if (summ.toString().length === 1) {
        splitValue.push(summ.toString());
      }

      this.selectedValue1 = splitValue.length >= 1 ? +splitValue[0] : 0;
      this.selectedValue2 = splitValue.length > 1 ? +splitValue[1] : 0;
      this.rowValue = summ.toString() > 1 ? summ.toString() : '0.0';
      this.rowDiaryModel.food = addedFood.data.addedFood;
    }
  }

  public returnFoodRow(food: []): string {
    let row = '';
    food.forEach((element: any) => {
      row += element.name + ' - ' + element.value + ' ' + element.unit;
      row += ', ';
    });
    return row;
  }
}
