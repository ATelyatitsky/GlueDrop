import { Component, OnInit } from '@angular/core';
import {RowDiaryModel} from '../shared/model/row-diary.model';
import {RowDiaryService} from '../shared/service/row-diary.service';
import {Router} from '@angular/router';
import * as pluginAnnotations from 'chartjs-plugin-annotation';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(public rowDiaryService: RowDiaryService, private router: Router) { }
  public rowDiaryModelArray: RowDiaryModel[] = [];
  public filteredDiaryModelArray: RowDiaryModel[] = [];
  public customMonthName: string[] = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
  public dateNow: string = new Date().toISOString();

  public minWeekDate: string = new Date().toISOString();
  public maxWeekDate: string = new Date().toISOString();

  public averageValue: string;
  public spreadValue: string;
  public lowValue: string;
  public normalValue: string;
  public highValue: string;

  public filterDaySegment = 'Day';

  lineChartData: Array<any> = [
    { data: [10, 6, 10, 12, 8, 15, 1], label: 'Сахар', lineTension: 0 },
    { data: [8, 4, 7, 9, 10, 5, 3], label: 'ХЕ', lineTension: 0 },
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
    showLines: true,
    spanGaps: true,
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
          // stacked: true
        },
      ],
    },
    annotation: {
  annotations: [
      {
        type: 'line',
        mode: 'horizontal',
        scaleID: 'y-axis-0',
        value: '4.5',
        borderColor: 'rgba(97,207,233,1)',
        borderWidth: 2,
        label: {
          enabled: true,
          backgroundColor: 'transparent',
          fontColor: 'white',
          content: 'Нижняя граница уровня сахара',
          fontSize: 10,
        }
      },
      {
        type: 'line',
        mode: 'horizontal',
        scaleID: 'y-axis-0',
        value: '9',
        borderColor: 'rgba(255,137,192,1)',
        borderWidth: 2,
        label: {
          enabled: true,
          backgroundColor: 'transparent',
          fontColor: 'white',
          content: 'Верхняя граница уровня сахара',
          fontSize: 10,
        }
      },
      ],
    }
  };
  public lineChartPlugins = [pluginAnnotations];

  lineChartOptions1: any = {
    legend: {
      labels: {
        fontColor: 'white', // legend color (can be hexadecimal too)
      },
    },
    animation: false,
    responsive: false,
    showLines: true,
    spanGaps: true,
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
          id: 'y-axis-01',
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
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'horizontal',
          scaleID: 'y-axis-01',
          value: '4.5',
          borderColor: 'rgba(97,207,233,1)',
          borderWidth: 2,
          label: {
            enabled: true,
            backgroundColor: 'transparent',
            fontColor: 'white',
            content: 'Нижняя граница уровня сахара',
            fontSize: 10,
          }
        },
        {
          type: 'line',
          mode: 'horizontal',
          scaleID: 'y-axis-01',
          value: '9',
          borderColor: 'rgba(255,137,192,1)',
          borderWidth: 2,
          label: {
            enabled: true,
            backgroundColor: 'transparent',
            fontColor: 'white',
            content: 'Верхняя граница уровня сахара',
            fontSize: 10,
          }
        },
      ]
    }
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
  public test = 1000;

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
          this.lineChartData[1].data[index] = currentValue.foodValue !== '' && currentValue.foodValue !== '0.0' ? +currentValue.foodValue : null;
        });
        this.filteredDiaryModelArray.reverse();
      } else if (this.filterDaySegment === 'Week')  {
        let i = 0;
        this.initChartData();
        this.lineChartLabels.length = 0;
        const date: Date = new Date();
        let averageValueArray: RowDiaryModel[] = [];
        date.setDate(date.getDate() - 7);
        do {
          if (i !== 0) {
            date.setDate(date.getDate() + 1);
          }
          const lengthChart = this.lineChartLabels.push(date.getDate());

          averageValueArray = this.filteredDiaryModelArray.filter((element: RowDiaryModel) => element.date.toDateString() === date.toDateString());

          if (averageValueArray.length > 0) {
            this.lineChartData[0].data[lengthChart - 1] = (averageValueArray.reduce((accumulator: number, currentValue: RowDiaryModel) => {
              return accumulator + +currentValue.sugarValue;
            }, initialValue) / averageValueArray.length).toFixed(1);
          }

        }while (i++ < 7);
        this.filteredDiaryModelArray.reverse();
      } else if (this.filterDaySegment === 'Month') {
        let i = 0;
        this.initChartData();
        this.lineChartLabels.length = 0;
        const date: Date = new Date();
        let averageValueArray: RowDiaryModel[] = [];
        date.setMonth(date.getMonth() - 1);
        do {
          if (i !== 0) {
            date.setDate(date.getDate() + 1);
          }
          const lengthChart = this.lineChartLabels.push(date.getDate());

          averageValueArray = this.filteredDiaryModelArray.filter((element: RowDiaryModel) => element.date.toDateString() === date.toDateString());

          if (averageValueArray.length > 0) {
            this.lineChartData[0].data[lengthChart - 1] = (averageValueArray.reduce((accumulator: number, currentValue: RowDiaryModel) => {
              return accumulator + +currentValue.sugarValue;
            }, initialValue) / averageValueArray.length).toFixed(1);
          }

        }while (i++ < 31);
        this.filteredDiaryModelArray.reverse();
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
    this.lineChartLabels.length = 0;
    this.lineChartLabels.push(...[6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]);

    this.lineChartData = [
      {
        data: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
        label: 'Сахар',
        lineTension: 0,
      },
      {
        data: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
        label: 'ХЕ',
        lineTension: 0
      }];
  }

  public segmentChange(): void {
    if (this.filterDaySegment === 'Day') {
      this.changeDate();
    } else if (this.filterDaySegment === 'Week') {
      this.weekChange();
    } else if (this.filterDaySegment === 'Month') {
      this.monthChange();
    }
  }

  public weekChange(): void {
    const minDate: Date = new Date(new Date());
    minDate.setDate(minDate.getDate() - 7);
    this.minWeekDate = minDate.toISOString();

    const maxDate: Date = new Date(this.maxWeekDate);
    this.filteredDiaryModelArray = this.rowDiaryModelArray.filter((row: RowDiaryModel) => row.date.getTime() >= minDate.getTime() && row.date.getTime() <= maxDate.getTime());
    this.calcStatistics();
  }

  public monthChange(): void {
    this.maxWeekDate = new Date().toISOString();
    const minDate: Date = new Date();
    minDate.setMonth(minDate.getMonth() - 1);
    this.minWeekDate = minDate.toISOString();

    const maxDate: Date = new Date(this.maxWeekDate);
    this.filteredDiaryModelArray = this.rowDiaryModelArray.filter((row: RowDiaryModel) => row.date.getTime() >= minDate.getTime() && row.date.getTime() <= maxDate.getTime());
    this.calcStatistics();
  }

  public routeToExportData(): void {
    this.router.navigate(['/exportDataGlueDrop']);
  }

}
