import {Component, Input, OnInit} from '@angular/core';
import {ModalController, PickerController, ToastController} from '@ionic/angular';

@Component({
  selector: 'app-sliding-list',
  templateUrl: './sliding-list.page.html',
  styleUrls: ['./sliding-list.page.scss'],
})
export class SlidingListPage implements OnInit {
  @Input() addedFood: any[] = [];

  public modeSegment = 'search';
  public filteredValue: any[] = [];
  public foodDictionary: any[] = [{
    name: 'Хлеб черный',
    value: 25,
    unit: 'грамм'
  },
    {
      name: 'Хлеб с отрубями',
      value: 30,
      unit: 'грамм'
    },
    {
      name: 'Хлеб ржаной',
      value: 25,
      unit: 'грамм'
    },
    {
      name: 'Молоко',
      value: 250,
      unit: 'миллилитры'
    },
    {
      name: 'Блины, оладьи',
      value: 1,
      unit: 'штуки'
    },
    {
      name: 'Вареники с творогом',
      value: 4,
      unit: 'штуки'
    },
    {
      name: 'Пельмени',
      value: 4,
      unit: 'штуки'
    },
    {
      name: 'Пюре картофельное',
      value: 100,
      unit: 'грамм'
    },
    {
      name: 'Сосиски',
      value: 2,
      unit: 'штуки'
    },
    {
      name: 'Сок',
      value: 0.5,
      unit: 'стакан'
    },
    {
      name: 'Картофель жареный',
      value: 50,
      unit: 'грамм'
    }
    ];

  public portionColumn = [ [...Array.from(Array(999).keys(), x => x + 1)], ['штуки']];
  public gramColumn = [ [...Array.from(Array(999).keys(), x => (x + 1) * 10)], ['грамм']];
  public glassColumn: any[] = [ [], ['стакан']];
  public milliliterColumn = [ [...Array.from(Array(999).keys(), x => (x + 1) * 10)], ['миллилитры']];

  constructor(private modalController: ModalController, public pickerController: PickerController, public toastController: ToastController) { }

  ngOnInit() {
    let i = 0;
    while (i < 999) {
      if (i !== 0) {
        this.glassColumn[0].push(i);
      }
      this.glassColumn[0].push(i + 0.5);
      i++;
    }
  }

  public closeCalc(): void {
    this.modalController.dismiss({
      addedFood: this.addedFood,
    });
  }

  public findFood(data): void {
    if (data.detail.value) {
      this.filteredValue = this.foodDictionary.filter((elem: any) => elem.name.toLowerCase().indexOf(data.detail.value.toLowerCase().trim()) !== -1);
    } else {
      this.clearFilter();
    }
  }

  public clearFilter(): void {
    this.filteredValue = [];
  }

  public async openPicker(mode: string, nameFood: string, valueFood: number, index: number = -1) {
    const numColumns = 2;
    const numOptions = 1000;
    let columnOptions;
    if (mode === 'штуки') {
      columnOptions = this.portionColumn;
    } else if (mode === 'грамм') {
      columnOptions = this.gramColumn;
    } else if (mode === 'стакан') {
      columnOptions = this.glassColumn;
    } else if (mode === 'миллилитры') {
      columnOptions = this.milliliterColumn;
    }

    const picker = await this.pickerController.create({
      columns: this.getColumns(numColumns, numOptions, columnOptions),
      buttons: [
        {
          text: 'Отмена',
          role: 'cancel'
        },
        {
          text: 'Добавить',
          handler: (value) => {
            if (index === -1) {
              this.addedFood.push({
                value: value['col-0'].text,
                standart: valueFood,
                unit: value['col-1'].text,
                name: nameFood,
                xeValue: value['col-0'].text / valueFood
              });
              this.presentToast('Продукт добавлен в корзину');
            } else {
              debugger
              this.addedFood[index] = {
                value: value['col-0'].text,
                unit: value['col-1'].text,
                standart: this.addedFood[index].standart,
                name: nameFood,
                xeValue: value['col-0'].text / this.addedFood[index].standart
              };
              this.presentToast('Продукт успешно отредактирован');
            }

          }
        }
      ]
    });
    await picker.present();
  }

  public getColumns(numColumns, numOptions, columnOptions) {
    const columns = [];
    for (let i = 0; i < numColumns; i++) {
      columns.push({
        name: `col-${i}`,
        options: this.getColumnOptions(i, numOptions, columnOptions)
      });
    }
    return columns;
  }
  public getColumnOptions(columnIndex, numOptions, columnOptions) {
    const options = [];
    for (let i = 0; i < numOptions; i++) {
      options.push({
        text: columnOptions[columnIndex][i % numOptions],
        value: i
      });
    }
    return options;
  }

  public async presentToast(messageString: string, type: string = 'success'): Promise<void> {
    const toast = await this.toastController.create({
      message: messageString,
      duration: 2000,
      color: type
    });
    toast.present();
  }

  public deleteRow(i: number): void {
    this.addedFood.splice(i, 1);
  }
}
