import { Component, OnInit } from '@angular/core';
import {RowDiaryModel} from '../shared/model/row-diary.model';
import {RowDiaryService} from '../shared/service/row-diary.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  public rowDiaryModelArray: RowDiaryModel[] = [];
  public filteredDiaryModelArray: RowDiaryModel[] = [];
  public customMonthName: string[] = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
  public dateNow: string = new Date().toISOString();

  public averageValue: string;
  public spreadValue: string;
  public lowValue: string;
  public normalValue: string;
  public highValue: string;

  public filterDaySegment = 'Day';

  lineChartData: Array<any> = [
    { data: [10, 6, 10, 12, 8, 15, 1], label: 'Сахар', lineTension: 0 },
    { data: [8, 4, 7, 9, 10, 5, 3], label: 'ХЕ', lineTension: 0 },
    { data: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9], label: 'Высокий уровень сахара'},
    { data: [4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5], label: 'Низкий уровень сахара'}
  ];
  lineChartLabels: Array<any> = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
  lineChartOptions: any = {
    legend: {
      labels: {
        fontColor: 'white', // legend color (can be hexadecimal too)
      },
    },
    animation: false,
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{
          id: 'x-axis-0',
          position: 'bottom',
          ticks: {
            fontColor: 'white',
          },
        gridLines: {
          color: 'transparent',
        },
      }],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
          ticks: {
            stepSize: 4,
            beginAtZero: true,
            fontColor: 'white',
          },
          gridLines: {
            color: 'gray',
          },
        },
      ],
    },
  };
  lineChartColors: Array<any> = [
    {
      backgroundColor: 'transparent',
      borderColor: '#63d0c5',
      pointBackgroundColor: 'rgba(255,255,255,1)',
      pointBorderColor: '#61CFE9',
    },
    {
      backgroundColor: 'transparent',
      borderColor: '#FFDD7D',
      pointBackgroundColor: 'rgba(255,255,255,1)',
      pointBorderColor: '#FFDD7D'
    },
    {
      backgroundColor: 'transparent',
      borderColor: 'rgba(255,137,192,1)',
      pointBackgroundColor: 'rgba(255,137,192,1)',
      pointBorderColor: 'rgba(255,137,192,1)'
    },
    {
      backgroundColor: 'transparent',
      borderColor: 'rgba(97,207,233,1)',
      pointBackgroundColor: 'rgba(97,207,233,1)',
      pointBorderColor: 'rgba(97,207,233,1)'
    }
  ];
  lineChartLegend = false;
  lineChartType = 'line';


  doughnutChartLabels: string[] = ['Высокий', 'Нормальный', 'Низкий', 'Не измерено'];
  doughnutChartData: number[] = [+this.highValue, +this.normalValue, +this.lowValue];
  doughnutChartType = 'doughnut';

  doughnutChartOptions: any = {
    circumference: Math.PI,
    rotation: 0.5 * Math.PI,
    responsive: true,
    maintainAspectRatio: false,

  };
  doughnutChartColors: Array<any> = [
    {
      backgroundColor: [
        'rgba(255,137,192,1)',
        'rgba(151,198,107,1)',
        'rgba(97,207,233,1)',
          'transparent'
      ]
    }
  ];
  doughnutChartLegend = false;

  constructor(public rowDiaryService: RowDiaryService, private router: Router) { }

  ngOnInit() {
    this.rowDiaryService.getDiaryRowValueByPersonId().then((val: RowDiaryModel[]) => {
      this.rowDiaryModelArray =  val;
      this.changeDate();
    });
  }

  public changeDate(): void {
    this.filteredDiaryModelArray = this.rowDiaryModelArray.filter((row: RowDiaryModel) => row.date.toDateString() === new Date(this.dateNow).toDateString());
    this.calcStatistics();
  }

  public calcStatistics(): void {
    if (this.filteredDiaryModelArray.length > 0) {
      let initialValue = 0;
      this.averageValue = (this.filteredDiaryModelArray.reduce((accumulator: number, currentValue: RowDiaryModel) => {
        return accumulator + +currentValue.sugarValue;
      }, initialValue) / this.filteredDiaryModelArray.length).toFixed(1);

      initialValue = 0;
      this.spreadValue = Math.sqrt(this.filteredDiaryModelArray.reduce((accumulator: number, currentValue: RowDiaryModel) => {
        return accumulator + Math.pow(Math.abs(+currentValue.sugarValue - +this.averageValue), 2);
      }, initialValue) / this.filteredDiaryModelArray.length).toFixed(1);

      this.lowValue = (this.filteredDiaryModelArray.filter((currentValue: RowDiaryModel) => +currentValue.sugarValue <= 4.5).length * 100 / this.filteredDiaryModelArray.length).toString();
      this.lowValue = this.lowValue === '100' ? this.lowValue.toString() : (+this.lowValue).toFixed(1);
      this.normalValue = (this.filteredDiaryModelArray.filter((currentValue: RowDiaryModel) => +currentValue.sugarValue > 4.5 && +currentValue.sugarValue < 9).length * 100 / this.filteredDiaryModelArray.length).toString();
      this.normalValue = this.normalValue === '100' ? this.normalValue.toString() : (+this.normalValue).toFixed(1);
      this.highValue = (this.filteredDiaryModelArray.filter((currentValue: RowDiaryModel) => +currentValue.sugarValue >= 9).length * 100 / this.filteredDiaryModelArray.length).toString();
      this.highValue = this.highValue === '100' ? this.highValue.toString() : (+this.highValue).toFixed(1);

      this.doughnutChartData = [+this.highValue, +this.normalValue, +this.lowValue];


      if (this.filterDaySegment === 'Day') {
        this.initChartData();
        this.filteredDiaryModelArray.forEach((currentValue: RowDiaryModel) => {
          const index: number = this.lineChartLabels.findIndex((elem: number) => elem === currentValue.date.getHours());
          this.lineChartData[0].data[index] = +currentValue.sugarValue;
          this.lineChartData[1].data[index] = currentValue.foodValue !== '' ? +currentValue.foodValue : null;
        });
      }
    } else {
      this.averageValue = '0.0';
      this.spreadValue = '0.0';
      this.lowValue = '0.0';
      this.normalValue = '0.0';
      this.highValue = '0.0';
      this.initChartData();
      this.doughnutChartData = [0, 0, 0, 100];
    }
  }

  private initChartData(): void {
    this.lineChartLabels = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

    this.lineChartData = [
      {
        data: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
        label: 'Сахар',
        lineTension: 0
      },
      {
        data: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
        label: 'ХЕ',
        lineTension: 0
      },
      {data: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9], label: 'Высокий уровень сахара'},
      {data: [4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5], label: 'Низкий уровень сахара'}
    ];
  }

  public routeToExportData(): void {
    this.router.navigate(['/exportDataGlueDrop']);
  }

}
